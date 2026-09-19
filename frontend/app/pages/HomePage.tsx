import { ProductCard, RatingStars } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import bedProducts from "@/data/bed-data";
import {
  useCategories,
  useProducts,
  useTestimonials,
  useWoodTypes,
} from "@/hooks/useData";
import { t } from "@/i18n/translations";
import { BUSINESS, telLink, whatsappLink } from "@/lib/constants";
import { navigate } from "@/lib/router";
import {
  ArrowRight,
  Hammer,
  Home as HomeIcon,
  Phone,
  Ruler,
  Sparkles,
} from "lucide-react";
import shopImage from "../../public/shop.jpeg";

const experienceCards = [
  {
    icon: Hammer,
    key: "exp_custom_title" as const,
    descKey: "exp_custom_desc" as const,
    path: "/custom-builder",
    color: "bg-wood-700",
  },
  {
    icon: HomeIcon,
    key: "exp_room_title" as const,
    descKey: "exp_room_desc" as const,
    path: "/room-designer",
    color: "bg-sage-600",
  },
  {
    icon: Ruler,
    key: "exp_home_title" as const,
    descKey: "exp_home_desc" as const,
    path: "/made-for-home",
    color: "bg-sage-700",
  },
];

export function HomePage() {
  const { lang } = useLanguage();
  const { products, loading } = useProducts({ featured: true });
  const { categories } = useCategories();
  const { woodTypes } = useWoodTypes();
  const { testimonials } = useTestimonials();

  const iconMap: Record<string, typeof Hammer> = {
    Sofa: Hammer,
    BedDouble: Hammer,
    Utensils: Hammer,
    Archive: Hammer,
    Home: Hammer,
    Briefcase: Hammer,
    Hammer: Hammer,
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={shopImage} alt="" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-wood-950/90 via-wood-950/70 to-wood-900/40" />
        </div>

        <div className="relative z-10 px-6 py-20 mx-auto max-w-7xl">
          <div className="max-w-2xl pt-36">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-gold-500/20 text-gold-300 animate-fade-in">
              <Sparkles size={16} />
              {t("hero_badge", lang)}
            </span>
            <h1 className="font-serif text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl text-balance animate-fade-in-up">
              {lang === "ta" ? (
                <>
                  ஸ்ரீ கிருஷ்ணா
                  <br />
                  வுட்டன் ஃபர்னிச்சர்
                </>
              ) : (
                <>
                  Sri Krishna
                  <br />
                  Wooden Furniture
                </>
              )}
            </h1>
            <p
              className="max-w-xl mt-6 text-lg leading-relaxed md:text-xl text-wood-200 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {t("hero_subtitle", lang)}
            </p>
            <div
              className="flex flex-col gap-4 mt-8 sm:flex-row animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={() => navigate("/showroom")}
                className="btn-gold"
              >
                {t("hero_cta1", lang)}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/custom-builder")}
                className="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20"
              >
                {t("hero_cta2", lang)}
              </button>
            </div>

            {/* Quick contact */}
            <div
              className="flex items-center gap-6 mt-10 text-wood-300 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href={telLink()}
                className="flex items-center gap-2 transition-colors hover:text-gold-400"
              >
                <Phone size={18} className="text-gold-400" />
                <span className="font-medium">{BUSINESS.phoneDisplay}</span>
              </a>
              <span className="text-wood-500">|</span>
              <span className="text-sm">
                {BUSINESS.city}, {BUSINESS.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -translate-x-1/2 bottom-8 left-1/2 animate-float">
          <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
            <div className="w-1 h-3 mt-2 rounded-full bg-gold-400" />
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="py-12 text-white bg-wood-900">
        <div className="grid grid-cols-2 gap-8 px-6 mx-auto max-w-7xl md:grid-cols-4">
          {[
            { value: "20+", key: "stat_years" as const },
            { value: "5000+", key: "stat_products" as const },
            { value: "3000+", key: "stat_customers" as const },
            { value: "5+", key: "stat_wood" as const },
          ].map((stat) => (
            <div key={stat.key} className="text-center">
              <p className="font-serif text-3xl font-bold md:text-4xl text-gold-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-wood-300">{t(stat.key, lang)}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Experience Cards */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <SectionHeader
          title={t("experience_title", lang)}
          subtitle={t("experience_subtitle", lang)}
          center
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.key}
                onClick={() => navigate(card.path)}
                className="flex flex-col p-6 text-left card card-hover group"
              >
                <div
                  className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-wood-900">
                  {t(card.key, lang)}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-wood-500">
                  {t(card.descKey, lang)}
                </p>
                <span className="flex items-center gap-1 mt-4 text-sm font-medium transition-colors text-wood-600 group-hover:text-gold-600">
                  {t("view_details", lang)}{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </section>
      {/* Featured Products */}{" "}
      <section className="py-20 bg-wood-50">
        {" "}
        <div className="px-6 mx-auto max-w-7xl">
          {" "}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            {" "}
            <div>
              {" "}
              <SectionHeader
                title={t("featured_title", lang)}
                subtitle={t("featured_subtitle", lang)}
              />{" "}
            </div>{" "}
            <button onClick={() => navigate("/showroom")} className="btn-ghost">
              {" "}
              {t("view_all", lang)} <ArrowRight size={16} />{" "}
            </button>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {" "}
            {bedProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                imageUrl={product.image_url}
              />
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>
      {/* Categories */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <SectionHeader
          title={t("categories_title", lang)}
          subtitle={t("categories_subtitle", lang)}
          center
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Hammer;
            const name = lang === "ta" && cat.name_ta ? cat.name_ta : cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => navigate("/showroom")}
                className="flex flex-col items-center p-6 text-center card card-hover group"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-3 transition-colors rounded-2xl bg-wood-100 group-hover:bg-wood-700">
                  <Icon
                    size={28}
                    className="transition-colors text-wood-600 group-hover:text-white"
                  />
                </div>
                <h3 className="font-serif text-sm font-semibold text-wood-900">
                  {name}
                </h3>
              </button>
            );
          })}
        </div>
      </section>
      {/* Wood Preview */}
      {woodTypes.length > 0 && (
        <section className="relative py-20 overflow-hidden text-white bg-wood-900">
          <div className="absolute inset-0 grain-bg opacity-30" />
          <div className="relative px-6 mx-auto max-w-7xl">
            <SectionHeader
              title={
                <span className="text-white">{t("wood_title", lang)}</span>
              }
              subtitle={
                <span className="text-wood-300">
                  {t("wood_subtitle", lang)}
                </span>
              }
              center
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {woodTypes.map((wood) => (
                <button
                  key={wood.id}
                  onClick={() => navigate("/wood-library")}
                  className="relative overflow-hidden group aspect-square rounded-xl"
                >
                  <img
                    src={wood.image_url}
                    alt={wood.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wood-950/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <h3 className="font-serif text-sm font-semibold text-white">
                      {lang === "ta" && wood.name_ta ? wood.name_ta : wood.name}
                    </h3>
                    <p className="text-xs tracking-wider uppercase text-gold-400">
                      {wood.price_tier}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/wood-library")}
                className="btn-gold"
              >
                {t("view_all", lang)} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}
      {/* About teaser */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={shopImage}
              alt="Workshop"
              className="shadow-xl rounded-2xl"
            />
            <div className="absolute flex flex-col justify-center hidden w-48 h-48 p-6 text-white -bottom-6 -right-6 bg-wood-900 rounded-2xl md:flex">
              <p className="font-serif text-3xl font-bold text-gold-400">20+</p>
              <p className="mt-1 text-sm text-wood-300">
                {t("stat_years", lang)}
              </p>
            </div>
          </div>
          <div>
            <SectionHeader title={t("about_title", lang)} />
            <p className="mb-4 leading-relaxed text-wood-600">
              {t("about_p1", lang)}
            </p>
            <p className="mb-4 leading-relaxed text-wood-600">
              {t("about_p2", lang)}
            </p>
            <p className="mb-6 leading-relaxed text-wood-600">
              {t("about_p3", lang)}
            </p>
            <button onClick={() => navigate("/about")} className="btn-primary">
              {t("nav_about", lang)} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-sand-50">
          <div className="px-6 mx-auto max-w-7xl">
            <SectionHeader title={t("testimonials_title", lang)} center />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((testimonial) => (
                <div key={testimonial.id} className="flex flex-col p-6 card">
                  <RatingStars rating={testimonial.rating} size={18} />
                  <p className="flex-1 mt-4 italic leading-relaxed text-wood-700">
                    "
                    {lang === "ta" && testimonial.text_ta
                      ? testimonial.text_ta
                      : testimonial.text}
                    "
                  </p>
                  <div className="pt-4 mt-4 border-t border-wood-100">
                    <p className="font-serif font-semibold text-wood-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-wood-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* CTA */}
      <section className="relative py-20 overflow-hidden text-white bg-wood-950">
        <div className="absolute inset-0 grain-bg opacity-20" />
        <div className="relative max-w-3xl px-6 mx-auto text-center">
          <h2 className="mb-4 font-serif text-3xl font-semibold text-white md:text-4xl">
            {lang === "ta"
              ? "உங்கள் கனவு தளபாடத்தை உருவாக்க தயாரா?"
              : "Ready to craft your dream furniture?"}
          </h2>
          <p className="mb-8 text-lg text-wood-300">
            {lang === "ta"
              ? "மனோகரனை இன்றே தொடர்பு கொள்ளுங்கள் அல்லது தனவிருப்ப வடிவமைப்பை தொடங்குங்கள்"
              : `Contact ${BUSINESS.owner} today or start building your custom piece`}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={whatsappLink(
                `Hello ${BUSINESS.name}, I'd like to discuss custom furniture.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              {t("whatsapp_us", lang)}
            </a>
            <a
              href={telLink()}
              className="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20"
            >
              <Phone size={18} /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
