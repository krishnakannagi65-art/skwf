import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import bedProducts from "@/data/bed-data";
import { useCategories, useProducts, useWoodTypes } from "@/hooks/useData";
import { t } from "@/i18n/translations";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

export function ShowroomPage() {
  const { lang } = useLanguage();

  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const { woodTypes } = useWoodTypes();

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [selectedWood, setSelectedWood] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // =========================
  // Filter Products
  // =========================
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (search) {
        const q = search.toLowerCase();

        const name = (
          lang === "ta" && p.name_ta ? p.name_ta : p.name
        ).toLowerCase();

        if (!name.includes(q)) {
          return false;
        }
      }

      // Category
      if (selectedCat && p.category_id !== selectedCat) {
        return false;
      }

      // Wood type
      if (selectedWood && p.wood_type_id !== selectedWood) {
        return false;
      }

      return true;
    });
  }, [products, search, selectedCat, selectedWood, lang]);

  const hasFilters = selectedCat || selectedWood || search;

  return (
    <div className="min-h-screen">
      {/* =========================
          Page Header
      ========================= */}
      <div className="py-16 text-white bg-wood-900">
        <div className="px-6 mx-auto max-w-7xl">
          <h1 className="font-serif text-4xl font-semibold text-white md:text-5xl">
            {t("nav_showroom", lang)}
          </h1>

          <p className="mt-3 text-lg text-wood-300">
            {lang === "ta"
              ? "எங்கள் தளபாடங்களின் முழு சேகரிப்பை உலாவுங்கள்"
              : "Browse our complete collection of handcrafted furniture"}
          </p>
        </div>
      </div>

      {/* =========================
          Main Content
      ========================= */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        {/* =========================
            Search Bar
        ========================= */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute -translate-y-1/2 left-3 top-1/2 text-wood-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search", lang)}
              className="pl-10 input-field"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary lg:hidden"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="flex gap-8">
          {/* =========================
              Sidebar Filters
          ========================= */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0 space-y-6`}
          >
            <div className="p-5 card">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-wood-900">
                  {t("filter_by", lang)}
                </h3>

                {hasFilters && (
                  <button
                    onClick={() => {
                      setSelectedCat("");
                      setSelectedWood("");
                      setSearch("");
                    }}
                    className="flex items-center gap-1 text-xs text-wood-500 hover:text-wood-700"
                  >
                    <X size={14} />
                    Clear
                  </button>
                )}
              </div>

              {/* =========================
                  Categories
              ========================= */}
              <div className="mb-6">
                <h4 className="mb-2 text-xs font-semibold tracking-wider uppercase text-wood-500">
                  {t("category", lang)}
                </h4>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCat("")}
                    className={`chip ${
                      !selectedCat ? "chip-active" : "chip-inactive"
                    }`}
                  >
                    {t("all", lang)}
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
                      className={`chip ${
                        selectedCat === cat.id ? "chip-active" : "chip-inactive"
                      }`}
                    >
                      {lang === "ta" && cat.name_ta ? cat.name_ta : cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* =========================
                  Wood Types
              ========================= */}
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-wider uppercase text-wood-500">
                  {t("wood_type", lang)}
                </h4>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedWood("")}
                    className={`chip ${
                      !selectedWood ? "chip-active" : "chip-inactive"
                    }`}
                  >
                    {t("all", lang)}
                  </button>

                  {woodTypes.map((wood) => (
                    <button
                      key={wood.id}
                      onClick={() => setSelectedWood(wood.id)}
                      className={`chip ${
                        selectedWood === wood.id
                          ? "chip-active"
                          : "chip-inactive"
                      }`}
                    >
                      {lang === "ta" && wood.name_ta ? wood.name_ta : wood.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* =========================
              Products Grid
          ========================= */}
          <div className="flex-1">
            {/* Product Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-wood-500">
                {loading
                  ? ""
                  : `${filtered.length} ${
                      lang === "ta" ? "தயாரிப்புகள்" : "products"
                    }`}
              </p>
            </div>

            {/* =========================
                Loading
            ========================= */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              /* =========================
                 No Results
              ========================= */
              <div className="p-12 text-center card">
                <p className="text-lg text-wood-400">{t("no_results", lang)}</p>
              </div>
            ) : (
              /* =========================
                 Product Cards
              ========================= */
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product as any}
                    imageUrl={product.image_url}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
