import { ArrowLeft, ArrowRight, Check, Hammer, Send } from "lucide-react";
import { useState } from "react"; /* ========================================================= WOOD TYPES ========================================================= */
import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import { BUSINESS, generateWhatsappLink } from "~/lib/constants";
import { submitEnquiry } from "~/lib/enquiries";
const woodTypes = [
  { id: "teak", name: { en: "Teak Wood", ta: "தேக்கு மரம்" } },
  { id: "rosewood", name: { en: "Rosewood", ta: "ரோஸ்வுட்" } },
  { id: "neem", name: { en: "Neem Wood", ta: "வேப்ப மரம்" } },
  { id: "country-wood", name: { en: "Country Wood", ta: "நாட்டு மரம்" } },
  { id: "mango", name: { en: "Mango Wood", ta: "மாமர மரம்" } },
  { id: "acacia", name: { en: "Acacia Wood", ta: "அகேசியா மரம்" } },
  { id: "jackwood", name: { en: "Jackwood", ta: "பலா மரம்" } },
  { id: "mahogany", name: { en: "Mahogany", ta: "மஹோகனி மரம்" } },
];
/* ========================================================= FURNITURE TYPES ========================================================= */ const furnitureTypes =
  [
    { id: "sofa", name: { en: "Sofa Set", ta: "சோபா செட்" } },
    { id: "bed", name: { en: "Bed", ta: "படுக்கை" } },
    { id: "dining", name: { en: "Dining Set", ta: "உணவறை செட்" } },
    { id: "wardrobe", name: { en: "Wardrobe", ta: "அலமாரி" } },
    { id: "table", name: { en: "Table", ta: "டேபிள்" } },
    { id: "chair", name: { en: "Chair", ta: "நாற்காலி" } },
    { id: "tv-unit", name: { en: "TV Unit", ta: "டிவி அலமாரி" } },
    { id: "temple", name: { en: "Pooja Temple", ta: "பூஜை கோயில்" } },
    { id: "bookshelf", name: { en: "Bookshelf", ta: "புத்தக அலமாரி" } },
    { id: "other", name: { en: "Other", ta: "மற்றொன்று" } },
  ];
/* ========================================================= FINISHES ========================================================= */ const finishes =
  [
    { id: "natural", name: { en: "Natural Polish", ta: "இயற்கை பாலிஷ்" } },
    { id: "dark", name: { en: "Dark Stain", ta: "கருமை நிறம்" } },
    { id: "honey", name: { en: "Honey Finish", ta: "தேன் நிறம்" } },
    { id: "mahogany", name: { en: "Mahogany", ta: "மஹோகனி" } },
    { id: "matte", name: { en: "Matte", ta: "மேட்" } },
    { id: "glossy", name: { en: "Glossy", ta: "க்ளாஸி" } },
  ];
/* ========================================================= UPHOLSTERY COLORS ========================================================= */ const upholsteryColors =
  [
    {
      id: "none",
      name: { en: "No Upholstery", ta: "துணி இல்லை" },
      color: "#e8dcc8",
    },
    { id: "cream", name: { en: "Cream", ta: "க்ரீம்" }, color: "#f5f0e8" },
    { id: "brown", name: { en: "Brown", ta: "பழுப்பு" }, color: "#7d5e3e" },
    { id: "maroon", name: { en: "Maroon", ta: "மரூன்" }, color: "#6b2c2c" },
    {
      id: "green",
      name: { en: "Forest Green", ta: "பச்சை" },
      color: "#3a4e2e",
    },
    { id: "blue", name: { en: "Navy Blue", ta: "நீலம்" }, color: "#1e3a5f" },
    { id: "black", name: { en: "Black", ta: "கருப்பு" }, color: "#1a1a1a" },
  ];
/* ========================================================= CUSTOM BUILDER PAGE ========================================================= */ export function CustomBuilderPage() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [woodId, setWoodId] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [finish, setFinish] = useState("");
  const [upholstery, setUpholstery] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  /* ========================================================= STEPS ========================================================= */ const steps =
    [
      "builder_step1",
      "builder_step2",
      "builder_step3",
      "builder_step4",
      "builder_step5",
    ];
  /* ========================================================= VALIDATION ========================================================= */ const canProceed =
    [
      !!type,
      !!woodId,
      !!(length || width || height),
      !!finish,
      !!(name && phone),
    ];
  /* ========================================================= SELECTED OBJECTS ========================================================= */ const woodObj =
    woodTypes.find((wood) => wood.id === woodId);
  const typeObj = furnitureTypes.find((furniture) => furniture.id === type);
  const finishObj = finishes.find((finishItem) => finishItem.id === finish);
  const upholsteryObj = upholsteryColors.find((item) => item.id === upholstery);
  /* ========================================================= BUILD WHATSAPP MESSAGE ========================================================= */ const buildMessage =
    () => {
      let msg = `Hello ${BUSINESS.name}!\n\n`;
      msg += `*Custom Furniture Request*\n\n`;
      /* Furniture Type */ if (typeObj) {
        msg += `Type: ${typeObj.name[lang]}\n`;
      }
      /* Wood Type */ if (woodObj) {
        msg += `Wood: ${woodObj.name[lang]}\n`;
      }
      /* Dimensions */ if (length || width || height) {
        msg += `Dimensions: ${length || "?"} x ${width || "?"} x ${height || "?"} cm\n`;
      }
      /* Finish */ if (finishObj) {
        msg += `Finish: ${finishObj.name[lang]}\n`;
      }
      /* Upholstery */ if (upholsteryObj && upholstery !== "none") {
        msg += `Upholstery: ${upholsteryObj.name[lang]}\n`;
      }
      /* Notes */ if (notes) {
        msg += `Notes: ${notes}\n`;
      }
      /* Customer */ msg += `\nName: ${name}`;
      msg += `\nPhone: ${phone}`;
      return msg;
    };
  /* ========================================================= SEND ENQUIRY ========================================================= */ const handleSend =
    async () => {
      const details = {
        type,
        wood_id: woodId,
        length,
        width,
        height,
        finish,
        upholstery,
        notes,
      };
      await submitEnquiry({
        name,
        phone,
        email: "",
        message: buildMessage(),
        enquiry_type: "custom_builder",
        details,
      });
      setSent(true);
      window.open(generateWhatsappLink(buildMessage()), "_blank");
    };
  /* ========================================================= SUCCESS SCREEN ========================================================= */ if (
    sent
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 py-20">
        {" "}
        <div className="max-w-md text-center">
          {" "}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-sage-100">
            {" "}
            <Check size={40} className="text-sage-600" />{" "}
          </div>{" "}
          <h2 className="mb-3 font-serif text-2xl font-semibold text-wood-900">
            {" "}
            {lang === "ta"
              ? "நன்றி! உங்கள் கோரிக்கை அனுப்பப்பட்டது"
              : "Thank you! Your request has been sent"}{" "}
          </h2>{" "}
          <p className="mb-6 text-wood-500">
            {" "}
            {lang === "ta"
              ? "வாட்ஸ்அப் மூலம் உங்கள் கோரிக்கையை அனுப்பியுள்ளோம். மனோகரன் விரைவில் தொடர்பு கொள்வார்."
              : `We've sent your request via WhatsApp. ${BUSINESS.owner} will contact you soon.`}{" "}
          </p>{" "}
          <button
            onClick={() => {
              setSent(false);
              setStep(0);
              setType("");
              setWoodId("");
              setLength("");
              setWidth("");
              setHeight("");
              setFinish("");
              setUpholstery("");
              setNotes("");
              setName("");
              setPhone("");
            }}
            className="btn-primary"
          >
            {" "}
            {lang === "ta" ? "புதிய கோரிக்கை" : "New Request"}{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
  /* ========================================================= MAIN PAGE ========================================================= */ return (
    <div className="min-h-screen">
      {" "}
      {/* ===================================================== HEADER ===================================================== */}{" "}
      <div className="relative py-16 overflow-hidden text-white bg-wood-900">
        {" "}
        <div className="absolute inset-0 grain-bg opacity-20" />{" "}
        <div className="relative px-6 mx-auto max-w-7xl">
          {" "}
          <div className="flex items-center gap-3 mb-3">
            {" "}
            <Hammer size={28} className="text-gold-400" />{" "}
            <span className="w-12 h-px bg-gold-500" />{" "}
          </div>{" "}
          <h1 className="font-serif text-4xl font-semibold text-white md:text-5xl">
            {" "}
            {t("builder_title", lang)}{" "}
          </h1>{" "}
          <p className="mt-3 text-lg text-wood-300">
            {" "}
            {t("builder_subtitle", lang)}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== BUILDER ===================================================== */}{" "}
      <div className="max-w-3xl px-6 py-12 mx-auto">
        {" "}
        {/* =================================================== PROGRESS =================================================== */}{" "}
        <div className="flex items-center justify-between mb-12">
          {" "}
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              {" "}
              <div className="flex flex-col items-center">
                {" "}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${i === step ? "bg-wood-700 text-white scale-110" : i < step ? "bg-sage-500 text-white" : "bg-wood-100 text-wood-400"}`}
                >
                  {" "}
                  {i < step ? <Check size={18} /> : i + 1}{" "}
                </div>{" "}
                <span className="hidden mt-1 text-[10px] text-wood-500 md:block text-center max-w-20">
                  {" "}
                  {t(
                    s as keyof typeof import("~/i18n/translations").translations,
                    lang,
                  )}{" "}
                </span>{" "}
              </div>{" "}
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-all ${i < step ? "bg-sage-500" : "bg-wood-200"}`}
                />
              )}{" "}
            </div>
          ))}{" "}
        </div>{" "}
        {/* =================================================== STEP CONTENT =================================================== */}{" "}
        <div className="p-6 card md:p-8 animate-fade-in">
          {" "}
          {/* ================================================= STEP 1 - FURNITURE TYPE ================================================= */}{" "}
          {step === 0 && (
            <div>
              {" "}
              <h2 className="mb-4 font-serif text-xl font-semibold text-wood-900">
                {" "}
                {t("builder_step1", lang)}{" "}
              </h2>{" "}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {" "}
                {furnitureTypes.map((ft) => (
                  <button
                    key={ft.id}
                    type="button"
                    onClick={() => setType(ft.id)}
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${type === ft.id ? "border-wood-700 bg-wood-50 text-wood-800" : "border-wood-200 text-wood-500 hover:border-wood-400"}`}
                  >
                    {" "}
                    {ft.name[lang]}{" "}
                  </button>
                ))}{" "}
              </div>{" "}
            </div>
          )}{" "}
          {/* ================================================= STEP 2 - WOOD TYPE ================================================= */}{" "}
          {step === 1 && (
            <div>
              {" "}
              <h2 className="mb-4 font-serif text-xl font-semibold text-wood-900">
                {" "}
                {t("builder_step2", lang)}{" "}
              </h2>{" "}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {" "}
                {woodTypes.map((wood) => (
                  <button
                    key={wood.id}
                    type="button"
                    onClick={() => setWoodId(wood.id)}
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${woodId === wood.id ? "border-wood-700 bg-wood-50 text-wood-800" : "border-wood-200 text-wood-500 hover:border-wood-400"}`}
                  >
                    {" "}
                    {wood.name[lang]}{" "}
                  </button>
                ))}{" "}
              </div>{" "}
            </div>
          )}{" "}
          {/* ================================================= STEP 3 - DIMENSIONS ================================================= */}{" "}
          {step === 2 && (
            <div>
              {" "}
              <h2 className="mb-4 font-serif text-xl font-semibold text-wood-900">
                {" "}
                {t("builder_step3", lang)}{" "}
              </h2>{" "}
              <div className="grid grid-cols-3 gap-4">
                {" "}
                <div>
                  {" "}
                  <label className="block mb-2 text-sm font-medium text-wood-700">
                    {" "}
                    {t("builder_length", lang)}{" "}
                  </label>{" "}
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="input-field"
                    placeholder="180"
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block mb-2 text-sm font-medium text-wood-700">
                    {" "}
                    {t("builder_width", lang)}{" "}
                  </label>{" "}
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="input-field"
                    placeholder="90"
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block mb-2 text-sm font-medium text-wood-700">
                    {" "}
                    {t("builder_height", lang)}{" "}
                  </label>{" "}
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="input-field"
                    placeholder="75"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <p className="mt-3 text-xs text-wood-400">
                {" "}
                {lang === "ta"
                  ? "அளவுகள் செ.மீ இல். உறுதியான அளவு இல்லையென்றால் காலியாக விடலாம்."
                  : "Dimensions in cm. Leave blank if unsure — we can help measure."}{" "}
              </p>{" "}
            </div>
          )}{" "}
          {/* ================================================= STEP 4 - FINISH & UPHOLSTERY ================================================= */}{" "}
          {step === 3 && (
            <div>
              {" "}
              <h2 className="mb-4 font-serif text-xl font-semibold text-wood-900">
                {" "}
                {t("builder_step4", lang)}{" "}
              </h2>{" "}
              {/* FINISH */}{" "}
              <div className="mb-6">
                {" "}
                <label className="block mb-3 text-sm font-medium text-wood-700">
                  {" "}
                  {t("builder_finish", lang)}{" "}
                </label>{" "}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {" "}
                  {finishes.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id)}
                      className={`p-3 rounded-xl border-2 text-center font-medium text-sm transition-all ${finish === f.id ? "border-wood-700 bg-wood-50 text-wood-800" : "border-wood-200 text-wood-500 hover:border-wood-400"}`}
                    >
                      {" "}
                      {f.name[lang]}{" "}
                    </button>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              {/* UPHOLSTERY */}{" "}
              <div>
                {" "}
                <label className="block mb-3 text-sm font-medium text-wood-700">
                  {" "}
                  {t("builder_upholstery", lang)}{" "}
                </label>{" "}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {" "}
                  {upholsteryColors.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUpholstery(u.id)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-2 transition-all ${upholstery === u.id ? "border-wood-700" : "border-wood-200 hover:border-wood-400"}`}
                    >
                      {" "}
                      <span
                        className="shrink-0 w-6 h-6 border rounded-full border-wood-200"
                        style={{ backgroundColor: u.color }}
                      />{" "}
                      <span className="text-xs font-medium text-wood-700">
                        {" "}
                        {u.name[lang]}{" "}
                      </span>{" "}
                    </button>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {/* ================================================= STEP 5 - REVIEW ================================================= */}{" "}
          {step === 4 && (
            <div>
              {" "}
              <h2 className="mb-4 font-serif text-xl font-semibold text-wood-900">
                {" "}
                {t("builder_step5", lang)}{" "}
              </h2>{" "}
              {/* SUMMARY */}{" "}
              <div className="p-4 mb-6 space-y-2 text-sm bg-wood-50 rounded-xl">
                {" "}
                {/* Furniture Type */}{" "}
                {typeObj && (
                  <div className="flex justify-between">
                    {" "}
                    <span className="text-wood-400">
                      {" "}
                      {t("builder_step1", lang)}:{" "}
                    </span>{" "}
                    <span className="font-medium text-wood-800">
                      {" "}
                      {typeObj.name[lang]}{" "}
                    </span>{" "}
                  </div>
                )}{" "}
                {/* Wood Type */}{" "}
                {woodObj && (
                  <div className="flex justify-between">
                    {" "}
                    <span className="text-wood-400">
                      {" "}
                      {t("builder_step2", lang)}:{" "}
                    </span>{" "}
                    <span className="font-medium text-wood-800">
                      {" "}
                      {woodObj.name[lang]}{" "}
                    </span>{" "}
                  </div>
                )}{" "}
                {/* Dimensions */}{" "}
                {(length || width || height) && (
                  <div className="flex justify-between">
                    {" "}
                    <span className="text-wood-400">
                      {" "}
                      {t("builder_step3", lang)}:{" "}
                    </span>{" "}
                    <span className="font-medium text-wood-800">
                      {" "}
                      {length || "?"} × {width || "?"} × {height || "?"} cm{" "}
                    </span>{" "}
                  </div>
                )}{" "}
                {/* Finish */}{" "}
                {finishObj && (
                  <div className="flex justify-between">
                    {" "}
                    <span className="text-wood-400">
                      {" "}
                      {t("builder_finish", lang)}:{" "}
                    </span>{" "}
                    <span className="font-medium text-wood-800">
                      {" "}
                      {finishObj.name[lang]}{" "}
                    </span>{" "}
                  </div>
                )}{" "}
                {/* Upholstery */}{" "}
                {upholsteryObj && upholstery !== "none" && (
                  <div className="flex justify-between">
                    {" "}
                    <span className="text-wood-400">
                      {" "}
                      {t("builder_upholstery", lang)}:{" "}
                    </span>{" "}
                    <span className="font-medium text-wood-800">
                      {" "}
                      {upholsteryObj.name[lang]}{" "}
                    </span>{" "}
                  </div>
                )}{" "}
              </div>{" "}
              {/* CUSTOMER DETAILS */}{" "}
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                {" "}
                <div>
                  {" "}
                  <label className="block mb-2 text-sm font-medium text-wood-700">
                    {" "}
                    {t("builder_your_name", lang)} *{" "}
                  </label>{" "}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label className="block mb-2 text-sm font-medium text-wood-700">
                    {" "}
                    {t("builder_your_phone", lang)} *{" "}
                  </label>{" "}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="98765 43210"
                  />{" "}
                </div>{" "}
              </div>{" "}
              {/* NOTES */}{" "}
              <div>
                {" "}
                <label className="block mb-2 text-sm font-medium text-wood-700">
                  {" "}
                  {t("builder_notes", lang)}{" "}
                </label>{" "}
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="resize-none input-field"
                  placeholder={
                    lang === "ta"
                      ? "கூடுதல் தகவல்..."
                      : "Any additional details..."
                  }
                />{" "}
              </div>{" "}
            </div>
          )}{" "}
          {/* ================================================= NAVIGATION ================================================= */}{" "}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-wood-100">
            {" "}
            {/* BACK */}{" "}
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {" "}
              <ArrowLeft size={18} /> {t("builder_back", lang)}{" "}
            </button>{" "}
            {/* NEXT / SEND */}{" "}
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed[step]}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {" "}
                {t("builder_next", lang)} <ArrowRight size={18} />{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!canProceed[step]}
                className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {" "}
                <Send size={18} /> {t("builder_send", lang)}{" "}
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
