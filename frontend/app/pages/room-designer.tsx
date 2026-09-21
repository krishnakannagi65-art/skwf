import {
  ArrowRight,
  BedDouble,
  Check,
  Home as HomeIcon,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { ProductCard } from "~/components/ProductCard";
import { useLanguage } from "~/context/LanguageContext";
import { useProducts } from "~/hooks/useData";
import { t } from "~/i18n/translations";
import { BUSINESS, generateWhatsappLink } from "~/lib/constants";

const roomTypes = [
  {
    id: "living",
    icon: HomeIcon,
    name: { en: "Living Room", ta: "வரவேற்பறை" },
    catSlug: "living-room",
    image:
      "https://images.pexels.com/photos/7166640/pexels-photo-7166640.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "bedroom",
    icon: BedDouble,
    name: { en: "Bedroom", ta: "படுக்கையறை" },
    catSlug: "bedroom",
    image:
      "https://images.pexels.com/photos/8141958/pexels-photo-8141958.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "dining",
    icon: Utensils,
    name: { en: "Dining Room", ta: "உணவறை" },
    catSlug: "dining-room",
    image:
      "https://images.pexels.com/photos/24461264/pexels-photo-24461264.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export function RoomDesignerPage() {
  const { lang } = useLanguage();
  const { products } = useProducts();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedCombo, setSelectedCombo] = useState<string[]>([]);

  const room = roomTypes.find((r) => r.id === selectedRoom);
  const roomProducts = products.filter(
    (p) => p.category?.slug === room?.catSlug,
  );

  const toggleCombo = (id: string) => {
    setSelectedCombo((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const buildWhatsAppMessage = () => {
    const selected = selectedCombo
      .map((id) => {
        const p = products.find((pr) => pr.id === id);
        return p ? (lang === "ta" && p.name_ta ? p.name_ta : p.name) : "";
      })
      .filter(Boolean);

    return `Hello ${BUSINESS.name}!\n\nI'm interested in this ${room?.name[lang]} setup:\n${selected.map((s) => `• ${s}`).join("\n")}\n\nCould you help me with this combination?`;
  };

  return (
    <div className="min-h-screen">
      <div className="bg-wood-900 text-white py-16 relative overflow-hidden">
        <div className="grain-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <HomeIcon size={28} className="text-gold-400" />
            <span className="h-px w-12 bg-gold-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">
            {t("designer_title", lang)}
          </h1>
          <p className="text-wood-300 mt-3 text-lg">
            {t("designer_subtitle", lang)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Room selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roomTypes.map((r) => {
            const Icon = r.icon;
            const isActive = selectedRoom === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRoom(r.id);
                  setSelectedCombo([]);
                }}
                className={`group relative aspect-4/3 rounded-2xl overflow-hidden border-2 transition-all ${
                  isActive
                    ? "border-gold-500 scale-[1.02] shadow-xl"
                    : "border-transparent hover:scale-[1.01]"
                }`}
              >
                <img
                  src={r.image}
                  alt={r.name[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-wood-950/90 via-wood-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all ${isActive ? "bg-gold-500" : "bg-white/20 backdrop-blur-sm"}`}
                  >
                    <Icon
                      size={24}
                      className={isActive ? "text-wood-950" : "text-white"}
                    />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {r.name[lang]}
                  </h3>
                  {isActive && (
                    <p className="text-gold-400 text-sm mt-1 flex items-center gap-1">
                      <Check size={14} /> Selected
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Room products */}
        {room && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-2xl font-semibold text-wood-900 mb-2">
              {room.name[lang]} {lang === "ta" ? "தளபாடங்கள்" : "Furniture"}
            </h2>
            <p className="text-wood-500 mb-6">
              {t("designer_select_combo", lang)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {roomProducts.map((product) => (
                <div key={product.id} className="relative">
                  <div
                    onClick={() => toggleCombo(product.id)}
                    className="cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </div>
                  {selectedCombo.includes(product.id) && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Check size={18} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedCombo.length > 0 && (
              <div className="card p-6 sticky bottom-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-serif text-lg font-semibold text-wood-900">
                      {selectedCombo.length}{" "}
                      {lang === "ta"
                        ? "தளபாடங்கள் தேர்ந்தெடுக்கப்பட்டது"
                        : "items selected"}
                    </p>
                    <p className="text-sm text-wood-500">
                      {t("designer_request", lang)}
                    </p>
                  </div>
                  <a
                    href={generateWhatsappLink(buildWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    {t("designer_request", lang)} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {!room && (
          <div className="text-center py-12">
            <p className="text-wood-400 text-lg">
              {lang === "ta"
                ? "தயவுசெய்து ஒரு அறையை தேர்வு செய்யவும்"
                : "Please select a room to begin"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
