import { useState } from "react";
import { Ruler, Sparkles, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import { useProducts } from "~/hooks/useData";
import { ProductCard } from "~/components/ProductCard";
import { BUSINESS, whatsappLink } from "~/lib/constants";

const roomTypes = [
  {
    id: "living",
    name: { en: "Living Room", ta: "வரவேற்பறை" },
    catSlug: "living-room",
  },
  {
    id: "bedroom",
    name: { en: "Bedroom", ta: "படுக்கையறை" },
    catSlug: "bedroom",
  },
  {
    id: "dining",
    name: { en: "Dining Room", ta: "உணவறை" },
    catSlug: "dining-room",
  },
  {
    id: "storage",
    name: { en: "Storage", ta: "சேமிப்பு" },
    catSlug: "storage",
  },
  {
    id: "pooja",
    name: { en: "Pooja Room", ta: "பூஜை அறை" },
    catSlug: "pooja-room",
  },
  {
    id: "office",
    name: { en: "Office & Study", ta: "அலுவலகம்" },
    catSlug: "office-study",
  },
];

const budgetRanges = [
  {
    id: "low",
    name: { en: "Under ₹50,000", ta: "₹50,000 க்குள்" },
    min: 0,
    max: 50000,
  },
  {
    id: "mid",
    name: { en: "₹50,000 - ₹1,00,000", ta: "₹50,000 - ₹1,00,000" },
    min: 50000,
    max: 100000,
  },
  {
    id: "high",
    name: { en: "₹1,00,000 - ₹2,00,000", ta: "₹1,00,000 - ₹2,00,000" },
    min: 100000,
    max: 200000,
  },
  {
    id: "premium",
    name: { en: "Above ₹2,00,000", ta: "₹2,00,000 க்கு மேல்" },
    min: 200000,
    max: 999999999,
  },
];

export function MadeForHomePage() {
  const { lang } = useLanguage();
  const { products } = useProducts();
  const [roomType, setRoomType] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [budget, setBudget] = useState("");
  const [showResults, setShowResults] = useState(false);

  const room = roomTypes.find((r) => r.id === roomType);
  const budgetRange = budgetRanges.find((b) => b.id === budget);

  const recommendations = products
    .filter((p) => {
      if (room && p.category?.slug !== room.catSlug) return false;
      if (budgetRange) {
        if (p.price_max < budgetRange.min || p.price_min > budgetRange.max)
          return false;
      }
      return true;
    })
    .slice(0, 6);

  const roomArea = length && width ? parseFloat(length) * parseFloat(width) : 0;
  const isLargeRoom = roomArea > 200;

  const buildWhatsAppMessage = () => {
    let msg = `Hello ${BUSINESS.name}!\n\n*Made for My Home Request*\n\n`;
    msg += `Room: ${room?.name[lang] || "Any"}\n`;
    if (length && width)
      msg += `Room Size: ${length} × ${width} ft (${roomArea.toFixed(0)} sq ft)\n`;
    if (budgetRange) msg += `Budget: ${budgetRange.name[lang]}\n`;
    msg += `\nI'd like furniture recommendations for this space.`;
    return msg;
  };

  return (
    <div className="min-h-screen">
      <div className="bg-wood-900 text-white py-16 relative overflow-hidden">
        <div className="grain-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <Ruler size={28} className="text-gold-400" />
            <span className="h-px w-12 bg-gold-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">
            {t("homefit_title", lang)}
          </h1>
          <p className="text-wood-300 mt-3 text-lg">
            {t("homefit_subtitle", lang)}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Form */}
        <div className="card p-6 md:p-8 mb-8">
          <div className="space-y-6">
            {/* Room type */}
            <div>
              <label className="block text-sm font-medium text-wood-700 mb-3">
                {t("homefit_room_type", lang)}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roomTypes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRoomType(r.id)}
                    className={`p-3 rounded-xl border-2 text-center font-medium text-sm transition-all ${
                      roomType === r.id
                        ? "border-wood-700 bg-wood-50 text-wood-800"
                        : "border-wood-200 text-wood-500 hover:border-wood-400"
                    }`}
                  >
                    {r.name[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-2">
                  {t("homefit_length", lang)}
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="input-field"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-2">
                  {t("homefit_width", lang)}
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="input-field"
                  placeholder="15"
                />
              </div>
            </div>
            {roomArea > 0 && (
              <div className="bg-wood-50 rounded-lg p-3 text-sm text-wood-600 flex items-center gap-2">
                <Ruler size={16} className="text-wood-500" />
                {lang === "ta"
                  ? `அறை பரப்பு: ${roomArea.toFixed(0)} சதுர அடி`
                  : `Room area: ${roomArea.toFixed(0)} sq ft`}
                {isLargeRoom && (
                  <span className="text-sage-600">
                    • {lang === "ta" ? "பெரிய அறை" : "Large room"}
                  </span>
                )}
              </div>
            )}

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-wood-700 mb-3">
                {t("homefit_budget", lang)}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {budgetRanges.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={`p-3 rounded-xl border-2 text-center font-medium text-sm transition-all ${
                      budget === b.id
                        ? "border-wood-700 bg-wood-50 text-wood-800"
                        : "border-wood-200 text-wood-500 hover:border-wood-400"
                    }`}
                  >
                    {b.name[lang]}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResults(true)}
              disabled={!roomType}
              className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles size={18} /> {t("homefit_get_reco", lang)}
            </button>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-wood-900">
                  {t("homefit_reco_title", lang)}
                </h2>
                <p className="text-sm text-wood-500">
                  {room?.name[lang]}{" "}
                  {budgetRange && `• ${budgetRange.name[lang]}`}
                </p>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {recommendations.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="card p-6 text-center">
                  <p className="text-wood-600 mb-4">
                    {lang === "ta"
                      ? "இந்த பரிந்துரைகளை வாட்ஸ்அப் மூலம் பெற விரும்புகிறீர்களா?"
                      : "Want these recommendations sent via WhatsApp?"}
                  </p>
                  <a
                    href={whatsappLink(buildWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    {t("whatsapp_us", lang)} <ArrowRight size={18} />
                  </a>
                </div>
              </>
            ) : (
              <div className="card p-12 text-center">
                <p className="text-wood-400 text-lg mb-4">
                  {t("no_results", lang)}
                </p>
                <a
                  href={whatsappLink(buildWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {t("whatsapp_us", lang)}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
