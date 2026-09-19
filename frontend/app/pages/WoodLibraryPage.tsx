import { TreeDeciduous } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import { useWoodTypes } from "~/hooks/useData";
import { SectionHeader } from "~/components/SectionHeader";
import { navigate } from "~/lib/router";

const tierColors: Record<string, string> = {
  premium: "bg-gold-100 text-gold-800",
  standard: "bg-sage-100 text-sage-700",
  economy: "bg-wood-100 text-wood-600",
};

export function WoodLibraryPage() {
  const { lang } = useLanguage();
  const { woodTypes, loading } = useWoodTypes();

  return (
    <div className="min-h-screen">
      <div className="bg-wood-900 text-white py-16 relative overflow-hidden">
        <div className="grain-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <TreeDeciduous size={28} className="text-gold-400" />
            <span className="h-px w-12 bg-gold-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">
            {t("woodlib_title", lang)}
          </h1>
          <p className="text-wood-300 mt-3 text-lg">
            {t("woodlib_subtitle", lang)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-wood-300 border-t-wood-700 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-12">
            {woodTypes.map((wood, idx) => {
              const name =
                lang === "ta" && wood.name_ta ? wood.name_ta : wood.name;
              const characteristics =
                lang === "ta" && wood.characteristics_ta
                  ? wood.characteristics_ta
                  : wood.characteristics;
              const colorDesc =
                lang === "ta" && wood.color_description_ta
                  ? wood.color_description_ta
                  : wood.color_description;

              return (
                <div
                  key={wood.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                >
                  {/* Image */}
                  <div
                    className={`relative ${idx % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={wood.image_url}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-xl hidden md:block">
                      <img
                        src={wood.grain_texture_url}
                        alt={`${name} grain`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div
                    className={`${idx % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${tierColors[wood.price_tier] || tierColors.economy}`}
                      >
                        {wood.price_tier}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl font-semibold text-wood-900 mb-4">
                      {name}
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold text-wood-500 uppercase tracking-wider mb-1">
                          {t("woodlib_characteristics", lang)}
                        </h3>
                        <p className="text-wood-700 leading-relaxed">
                          {characteristics}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-wood-500 uppercase tracking-wider mb-1">
                          {t("woodlib_color", lang)}
                        </h3>
                        <p className="text-wood-700">{colorDesc}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-xs font-semibold text-wood-500 uppercase tracking-wider mb-1">
                            {t("woodlib_durability", lang)}
                          </h3>
                          <p className="text-wood-700 font-medium">
                            {wood.durability}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/custom-builder")}
                      className="btn-primary mt-6"
                    >
                      {lang === "ta"
                        ? "இந்த மரத்தில் தளபாடம் வடிவமைக்க"
                        : `Build with ${wood.name}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
