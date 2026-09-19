import { RatingStars } from "~/components/ProductCard";
import { useLanguage } from "~/context/LanguageContext";
import { useTestimonials } from "~/hooks/useData";
import { t } from "~/i18n/translations";
import { BUSINESS } from "~/lib/constants";
import { navigate } from "~/lib/router";
import { ArrowRight, Award, Hammer, Heart, TreeDeciduous } from "lucide-react";
import ownerimage from "/owner.jpeg";
import owner2image from "/owner2.jpeg";
import owner3image from "/owner3.jpeg";
import shopImage from "/shop.jpeg";

export function AboutPage() {
  const { lang } = useLanguage();
  const { testimonials } = useTestimonials();

  const values = [
    {
      icon: Hammer,
      title: { en: "Master Craftsmanship", ta: "சிறந்த கைவினை" },
      desc: {
        en: "Every piece is hand-built by skilled artisans with decades of experience.",
        ta: "ஒவ்வொரு படைப்பும் அனுபவம் வாய்ந்த கைவினைஞர்களால் கையால் உருவாக்கப்படுகிறது.",
      },
    },
    {
      icon: TreeDeciduous,
      title: { en: "Premium Materials", ta: "பிரீமியம் பொருட்கள்" },
      desc: {
        en: "We source only the finest teak, rosewood and other quality woods.",
        ta: "சிறந்த தேக்கு, சந்தன மற்றும் பிற தரமான மரங்களை மட்டுமே பயன்படுத்துகிறோம்.",
      },
    },
    {
      icon: Award,
      title: { en: "Built to Last", ta: "நீண்ட கால ஆயுள்" },
      desc: {
        en: "Furniture designed and constructed to serve for generations.",
        ta: "தலைமுறை தலைமுறையாக சேவை செய்ய வடிவமைக்கப்பட்ட தளபாடங்கள்.",
      },
    },
    {
      icon: Heart,
      title: { en: "Personal Service", ta: "தனிப்பட்ட சேவை" },
      desc: {
        en: `${BUSINESS.owner} personally guides every customer through their furniture journey.`,
        ta: `${BUSINESS.owner} ஒவ்வொரு வாடிக்கையாளருக்கும் தனிப்பட்ட வழிகாட்டுதல் அளிக்கிறார்.`,
      },
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={shopImage}
            alt="Workshop"
            className="object-left w-full h-full"
          />
          <div className="absolute inset-0 bg-wood-950/85" />
        </div>
        <div className="relative max-w-4xl px-6 mx-auto text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-gold-500" />
            <Hammer size={24} className="text-gold-400" />
            <span className="w-12 h-px bg-gold-500" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-white md:text-5xl">
            {t("about_title", lang)}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-wood-300">
            {BUSINESS.city} • Est. {BUSINESS.established}
          </p>
        </div>
      </section>
      {/* Story */}
      {/* Story + Owner */}
      {/* First Owner */}
      <section className="max-w-5xl px-4 py-12 mx-auto">
        <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* First Owner Content - LEFT */}
          <div>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-wood-900">
              {lang === "ta"
                ? "எங்கள் நிறுவனரை சந்திக்கவும்"
                : `Meet ${BUSINESS.owner}`}
            </h2>

            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {t("about_p1", lang)}
            </p>

            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {t("about_p2", lang)}
            </p>

            <p className="text-base leading-relaxed text-justify text-wood-700">
              {t("about_p3", lang)}
            </p>
          </div>

          {/* First Owner Image - RIGHT */}
          <div className="relative">
            <div className="w-full max-w-sm mx-auto h-95 md:h-105 overflow-hidden shadow-lg rounded-2xl">
              <img
                src={ownerimage}
                alt={BUSINESS.owner}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="absolute -bottom-3.75 right-0 md:-right-2.5 bg-wood-900 text-white rounded-xl p-4 shadow-lg">
              <p className="font-serif text-lg font-semibold text-gold-400">
                {BUSINESS.owner}
              </p>

              <p className="mt-1 text-xs text-wood-300">
                {lang === "ta"
                  ? "நிறுவனர் & கைவினைஞர்"
                  : "Founder & Master Craftsman"}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Second Owner */}
      <section className="max-w-5xl px-4 py-12 mx-auto">
        <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* Second Owner Image - LEFT */}
          <div className="relative order-2 md:order-1">
            <div className="w-full max-w-sm mx-auto h-95 md:h-105 overflow-hidden shadow-lg rounded-2xl">
              <img
                src={owner2image}
                alt="K. Chitty Babu"
                className="object-contain w-full h-full"
              />
            </div>

            <div className="absolute -bottom-3.75 left-0 md:-left-2.5 bg-wood-900 text-white rounded-xl p-4 shadow-lg">
              <p className="font-serif text-lg font-semibold text-gold-400">
                K. Chitty Babu
              </p>

              <p className="mt-1 text-xs text-wood-300">
                {lang === "ta" ? "இணை நிறுவனர்" : "Co-Founder"}
              </p>
            </div>
          </div>

          {/* Second Owner Content - RIGHT */}
          <div className="order-1 md:order-2">
            <h2 className="mb-4 font-serif text-3xl font-semibold text-wood-900">
              {lang === "ta"
                ? "கே. சிட்டி பாபுவை சந்திக்கவும்"
                : "Meet K. Chitty Babu"}
            </h2>

            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {lang === "ta"
                ? "கே. சிட்டி பாபு ஸ்ரீ கிருஷ்ணா வுட்டன் ஃபர்னிச்சரின் இணை நிறுவனர்களில் ஒருவராக இருந்து, தனது அனுபவம், அர்ப்பணிப்பு மற்றும் அறிவின் மூலம் நிறுவனத்தின் வளர்ச்சிக்கு முக்கிய பங்களிப்பை வழங்கி வருகிறார்."
                : "K. Chitty Babu is one of the co-founders of Sri Krishna Wooden Furniture, contributing his experience, dedication, and knowledge to the growth of the business."}
            </p>

            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {lang === "ta"
                ? "தரமான மரத் தளபாடங்கள் மற்றும் வாடிக்கையாளர் திருப்தி மீது கொண்ட ஆழ்ந்த ஆர்வத்துடன், நிறுவனத்தின் நற்பெயரை உருவாக்குவதில் அவர் முக்கிய பங்கு வகித்துள்ளார்."
                : "With a strong passion for quality wooden furniture and customer satisfaction, he has played an important role in building the company’s reputation."}
            </p>

            <p className="text-base leading-relaxed text-justify text-wood-700">
              {lang === "ta"
                ? "ஸ்ரீ கிருஷ்ணா வுட்டன் ஃபர்னிச்சர் குழுவினர் இணைந்து, தமிழ்நாடு, கர்நாடகா, கேரளா மற்றும் அதற்கு அப்பால் உள்ள வாடிக்கையாளர்களுக்கு உயர்தரமான, நீடித்த மற்றும் அழகாக வடிவமைக்கப்பட்ட மரத் தளபாடங்களை வழங்க உறுதிபூண்டுள்ளனர்."
                : "Together, the team at Sri Krishna Wooden Furniture is committed to providing high-quality, durable, and beautifully crafted furniture to customers across Tamil Nadu, Karnataka, Kerala, and beyond."}
            </p>

            <a
              href="tel:9842250210"
              className="inline-flex items-center gap-2 mt-6 btn-primary"
            >
              Call Us: 9842250210
            </a>
          </div>
        </div>
      </section>
      {/* Third Owner */}{" "}
      <section className="max-w-5xl px-4 py-12 mx-auto">
        {" "}
        <div className="grid items-center grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {" "}
          {/* Third Owner Content - LEFT */}{" "}
          <div>
            {" "}
            <h2 className="mb-4 font-serif text-3xl font-semibold text-wood-900">
              {" "}
              {lang === "ta"
                ? "லட்சுமண் தாஸை சந்திக்கவும்"
                : "Meet Laksman Das"}{" "}
            </h2>{" "}
            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {" "}
              {lang === "ta"
                ? "லட்சுமண் தாஸ் எங்கள் பயணத்தின் தொடக்கத்தில் முக்கிய பங்கு வகித்தவரும், எங்கள் குடும்பத்தின் மரத் தளபாடத் தொழில் பயணத்திற்கு உத்வேகமாக இருந்தவரும் ஆவார்."
                : "Laksman Das played an important part in our beginning and was an inspiration behind our journey."}{" "}
            </p>{" "}
            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {" "}
              {lang === "ta"
                ? "எங்கள் பயணத்தின் ஆரம்பத்தில், எங்கள் குடும்பம் மரத் தளபாடத் தொழிலைத் தொடங்குவதற்கு உதவியும் வழிகாட்டுதலும் வழங்குவதில் லட்சுமண் தாஸ் முக்கிய பங்கு வகித்தார். அவரது யோசனைகள், ஊக்கம் மற்றும் ஆதரவு, மரத் தளபாடத் துறையில் எங்கள் முதல் அடிகளை எடுத்து வைக்க எங்களுக்கு நம்பிக்கையையும் சரியான வழிகாட்டுதலையும் அளித்தன."
                : "At the beginning of our journey, Laksman Das played an important role in helping and guiding our family to start the furniture business. His ideas, encouragement, and support gave us the confidence and direction to take our first steps into the furniture industry."}{" "}
            </p>{" "}
            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {" "}
              {lang === "ta"
                ? "அவரது பங்களிப்பு எங்கள் குடும்பத்தின் கதையின் ஒரு முக்கிய பகுதியாகும். ஸ்ரீ கிருஷ்ணா வுட்டன் ஃபர்னிச்சரின் தொடக்கத்தில் அவர் வகித்த பங்கை நினைவுகூருவதில் நாங்கள் பெருமைப்படுகிறோம்."
                : "His contribution is an important part of our family's story, and we are proud to remember the role he played in the beginning of Sri Krishna Wooden Furniture."}{" "}
            </p>{" "}
            <p className="mb-4 text-base leading-relaxed text-justify text-wood-700">
              {" "}
              {lang === "ta"
                ? "அந்த ஆரம்ப காலத்திலிருந்து, கடின உழைப்பு, நம்பிக்கை மற்றும் வாடிக்கையாளர்களுடனான வலுவான உறவுகளின் மூலம் தமிழ்நாடு, கர்நாடகா மற்றும் கேரளா முழுவதும் எங்கள் வணிகத்தை வளர்த்துள்ளோம்."
                : "From those early beginnings, we have grown our business through hard work, trust, and strong relationships with customers across Tamil Nadu, Karnataka, and Kerala."}{" "}
            </p>{" "}
            <p className="text-base leading-relaxed text-justify text-wood-700">
              {" "}
              {lang === "ta"
                ? "இன்று, இந்தத் தொழில் தொடங்கப்பட்டபோது கடைப்பிடிக்கப்பட்ட தரம், நம்பிக்கை, அர்ப்பணிப்பு மற்றும் வாடிக்கையாளர் திருப்தி ஆகிய மதிப்புகளை தொடர்ந்து முன்னெடுத்துச் செல்கிறோம்."
                : "Today, we continue to carry forward the values with which the business was started — quality, trust, commitment, and customer satisfaction."}{" "}
            </p>{" "}
          </div>{" "}
          {/* Third Owner Image - RIGHT */}{" "}
          <div className="relative">
            {" "}
            <div className="w-full max-w-sm mx-auto h-95 md:h-105 overflow-hidden shadow-lg rounded-2xl">
              {" "}
              <img
                src={owner3image}
                alt="Laksman Das"
                className="object-contain w-full h-full"
              />{" "}
            </div>{" "}
            <div className="absolute -bottom-3.75 right-0 md:-right-2.5 bg-wood-900 text-white rounded-xl p-4 shadow-lg">
              {" "}
              <p className="font-serif text-lg font-semibold text-gold-400">
                {" "}
                Laksman Das{" "}
              </p>{" "}
              <p className="mt-1 text-xs text-wood-300">
                {" "}
                {lang === "ta"
                  ? "எங்கள் பயணத்தின் உத்வேகம்"
                  : "An Inspiration Behind Our Journey"}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      {/* Values */}
      <section className="py-16 bg-wood-50">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title.en} className="p-6 text-center card">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-wood-700 rounded-2xl">
                    <Icon size={28} className="text-gold-400" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-wood-900">
                    {value.title[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed text-wood-500">
                    {value.desc[lang]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Owner highlight */}
      {/* <section className="max-w-4xl px-6 py-20 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden shadow-xl aspect-square rounded-2xl">
              <img
                src="https://images.pexels.com/photos/5710910/pexels-photo-5710910.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={BUSINESS.owner}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute hidden w-48 p-5 text-white -bottom-6 -left-6 bg-wood-900 rounded-xl md:block">
              <p className="font-serif text-xl font-semibold text-gold-400">
                {BUSINESS.owner}
              </p>
              <p className="mt-1 text-xs text-wood-300">
                {lang === "ta"
                  ? "நிறுவனர் & கைவினைஞர்"
                  : "Founder & Master Craftsman"}
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-wood-900">
              {lang === "ta"
                ? "மனோகரனை சந்திக்கவும்"
                : `Meet ${BUSINESS.owner}`}
            </h2>
            <p className="mb-4 leading-relaxed text-wood-600">
              {lang === "ta"
                ? "மனோகரன் 20 ஆண்டுகளுக்கும் மேலான அனுபவம் கொண்ட மர தளபாட கைவினைஞர். ஒவ்வொரு தளபாடத்திலும் அவரது கையொப்பம் உள்ளது."
                : `${BUSINESS.owner} is a master wood furniture craftsman with over 20 years of experience. His personal touch is in every piece that leaves our workshop.`}
            </p>
            <p className="mb-6 leading-relaxed text-wood-600">
              {lang === "ta"
                ? "உங்கள் இல்லத்திற்கு சரியான தளபாடத்தை தேர்வு செய்ய அவர் உதவுவார்."
                : "He works directly with customers to ensure every piece is perfect for their home."}
            </p>
            <a href={telLink()} className="btn-primary">
              <Phone size={18} /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section> */}
      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-sand-50">
          <div className="px-6 mx-auto max-w-7xl">
            <h2 className="mb-10 font-serif text-3xl font-semibold text-center text-wood-900">
              {t("testimonials_title", lang)}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
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
      <section className="max-w-3xl px-6 py-20 mx-auto text-center">
        <h2 className="mb-4 font-serif text-3xl font-semibold text-wood-900">
          {lang === "ta"
            ? "எங்கள் காட்சி அறையை பார்க்க வாருங்கள்"
            : "Visit Our Showroom"}
        </h2>
        <p className="mb-8 text-lg text-wood-500">{BUSINESS.addressFull}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button onClick={() => navigate("/showroom")} className="btn-primary">
            {t("nav_showroom", lang)} <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="btn-secondary"
          >
            {t("nav_contact", lang)}
          </button>
        </div>
      </section>
    </div>
  );
}
