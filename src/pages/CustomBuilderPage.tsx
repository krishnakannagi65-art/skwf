import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Send, Hammer } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/i18n/translations';
import { useWoodTypes } from '@/hooks/useData';
import { BUSINESS, whatsappLink } from '@/lib/constants';
import { submitEnquiry } from '@/lib/enquiries';

const furnitureTypes = [
  { id: 'sofa', name: { en: 'Sofa Set', ta: 'சோபா செட்' } },
  { id: 'bed', name: { en: 'Bed', ta: 'படுக்கை' } },
  { id: 'dining', name: { en: 'Dining Set', ta: 'உணவறை செட்' } },
  { id: 'wardrobe', name: { en: 'Wardrobe', ta: 'அலமாரி' } },
  { id: 'table', name: { en: 'Table', ta: 'டேபிள்' } },
  { id: 'chair', name: { en: 'Chair', ta: 'நாற்காலி' } },
  { id: 'tv-unit', name: { en: 'TV Unit', ta: 'டிவி அலமாரி' } },
  { id: 'temple', name: { en: 'Pooja Temple', ta: 'பூஜை கோயில்' } },
  { id: 'bookshelf', name: { en: 'Bookshelf', ta: 'புத்தக அலமாரி' } },
  { id: 'other', name: { en: 'Other', ta: 'மற்றொன்று' } },
];

const finishes = [
  { id: 'natural', name: { en: 'Natural Polish', ta: 'இயற்கை பாலிஷ்' } },
  { id: 'dark', name: { en: 'Dark Stain', ta: 'கருமை நிறம்' } },
  { id: 'honey', name: { en: 'Honey Finish', ta: 'தேன் நிறம்' } },
  { id: 'mahogany', name: { en: 'Mahogany', ta: 'மஹோகனி' } },
  { id: 'matte', name: { en: 'Matte', ta: 'மேட்' } },
  { id: 'glossy', name: { en: 'Glossy', ta: 'க்ளாஸி' } },
];

const upholsteryColors = [
  { id: 'none', name: { en: 'No Upholstery', ta: 'துணி இல்லை' }, color: '#e8dcc8' },
  { id: 'cream', name: { en: 'Cream', ta: 'க்ரீம்' }, color: '#f5f0e8' },
  { id: 'brown', name: { en: 'Brown', ta: 'பழுப்பு' }, color: '#7d5e3e' },
  { id: 'maroon', name: { en: 'Maroon', ta: 'மரூன்' }, color: '#6b2c2c' },
  { id: 'green', name: { en: 'Forest Green', ta: 'பச்சை' }, color: '#3a4e2e' },
  { id: 'blue', name: { en: 'Navy Blue', ta: 'நீலம்' }, color: '#1e3a5f' },
  { id: 'black', name: { en: 'Black', ta: 'கருப்பு' }, color: '#1a1a1a' },
];

export function CustomBuilderPage() {
  const { lang } = useLanguage();
  const { woodTypes } = useWoodTypes();
  const [step, setStep] = useState(0);
  const [type, setType] = useState('');
  const [woodId, setWoodId] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [finish, setFinish] = useState('');
  const [upholstery, setUpholstery] = useState('');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const steps = ['builder_step1', 'builder_step2', 'builder_step3', 'builder_step4', 'builder_step5'];
  const canProceed = [
    !!type,
    !!woodId,
    !!(length || width || height),
    !!finish,
    !!(name && phone),
  ];

  const woodName = woodTypes.find((w) => w.id === woodId);
  const typeObj = furnitureTypes.find((f) => f.id === type);
  const finishObj = finishes.find((f) => f.id === finish);
  const UpholObj = upholsteryColors.find((u) => u.id === upholstery);

  const buildMessage = () => {
    let msg = `Hello ${BUSINESS.name}!\n\n*Custom Furniture Request*\n\n`;
    msg += `Type: ${typeObj ? typeObj.name[lang] : type}\n`;
    if (woodName) msg += `Wood: ${lang === 'ta' && woodName.name_ta ? woodName.name_ta : woodName.name}\n`;
    if (length || width || height) {
      msg += `Dimensions: ${length || '?'} x ${width || '?'} x ${height || '?'} cm\n`;
    }
    if (finishObj) msg += `Finish: ${finishObj.name[lang]}\n`;
    if (UpholObj && upholstery !== 'none') msg += `Upholstery: ${UpholObj.name[lang]}\n`;
    if (notes) msg += `Notes: ${notes}\n`;
    msg += `\nName: ${name}\nPhone: ${phone}`;
    return msg;
  };

  const handleSend = async () => {
    const details = {
      type, wood_id: woodId, length, width, height, finish, upholstery, notes,
    };
    await submitEnquiry({
      name, phone, email: '',
      message: buildMessage(),
      enquiry_type: 'custom_builder',
      details,
    });
    setSent(true);
    window.open(whatsappLink(buildMessage()), '_blank');
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-sage-600" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-wood-900 mb-3">
            {lang === 'ta' ? 'நன்றி! உங்கள் கோரிக்கை அனுப்பப்பட்டது' : 'Thank you! Your request has been sent'}
          </h2>
          <p className="text-wood-500 mb-6">
            {lang === 'ta'
              ? 'வாட்ஸ்அப் மூலம் உங்கள் கோரிக்கையை அனுப்பியுள்ளோம். மனோகரன் விரைவில் தொடர்பு கொள்வார்.'
              : `We've sent your request via WhatsApp. ${BUSINESS.owner} will contact you soon.`}
          </p>
          <button onClick={() => { setSent(false); setStep(0); }} className="btn-primary">
            {lang === 'ta' ? 'புதிய கோரிக்கை' : 'New Request'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-wood-900 text-white py-16 relative overflow-hidden">
        <div className="grain-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <Hammer size={28} className="text-gold-400" />
            <span className="h-px w-12 bg-gold-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">{t('builder_title', lang)}</h1>
          <p className="text-wood-300 mt-3 text-lg">{t('builder_subtitle', lang)}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  i === step ? 'bg-wood-700 text-white scale-110' : i < step ? 'bg-sage-500 text-white' : 'bg-wood-100 text-wood-400'
                }`}>
                  {i < step ? <Check size={18} /> : i + 1}
                </div>
                <span className="text-[10px] text-wood-500 mt-1 hidden md:block text-center max-w-[80px]">
                  {t(s as keyof typeof import('@/i18n/translations').translations, lang)}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-2 transition-all ${i < step ? 'bg-sage-500' : 'bg-wood-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="card p-6 md:p-8 animate-fade-in">
          {/* Step 1: Type */}
          {step === 0 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-wood-900 mb-4">{t('builder_step1', lang)}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {furnitureTypes.map((ft) => (
                  <button
                    key={ft.id}
                    onClick={() => setType(ft.id)}
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                      type === ft.id ? 'border-wood-700 bg-wood-50 text-wood-800' : 'border-wood-200 text-wood-500 hover:border-wood-400'
                    }`}
                  >
                    {ft.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Wood */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-wood-900 mb-4">{t('builder_step2', lang)}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {woodTypes.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => setWoodId(wood.id)}
                    className={`rounded-xl border-2 overflow-hidden transition-all ${
                      woodId === wood.id ? 'border-wood-700 scale-105' : 'border-wood-200 hover:border-wood-400'
                    }`}
                  >
                    <div className="aspect-video">
                      <img src={wood.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 text-center">
                      <p className="font-medium text-sm text-wood-800">
                        {lang === 'ta' && wood.name_ta ? wood.name_ta : wood.name}
                      </p>
                      <p className="text-xs text-gold-600 uppercase">{wood.price_tier}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Dimensions */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-wood-900 mb-4">{t('builder_step3', lang)}</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">{t('builder_length', lang)}</label>
                  <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" placeholder="180" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">{t('builder_width', lang)}</label>
                  <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" placeholder="90" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">{t('builder_height', lang)}</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input-field" placeholder="75" />
                </div>
              </div>
              <p className="text-xs text-wood-400 mt-3">
                {lang === 'ta' ? 'அளவுகள் செ.மீ இல். உறுதியான அளவு இல்லையென்றால் காலியாக விடலாம்.' : 'Dimensions in cm. Leave blank if unsure — we can help measure.'}
              </p>
            </div>
          )}

          {/* Step 4: Finish */}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-wood-900 mb-4">{t('builder_step4', lang)}</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-wood-700 mb-3">{t('builder_finish', lang)}</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {finishes.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f.id)}
                      className={`p-3 rounded-xl border-2 text-center font-medium text-sm transition-all ${
                        finish === f.id ? 'border-wood-700 bg-wood-50 text-wood-800' : 'border-wood-200 text-wood-500 hover:border-wood-400'
                      }`}
                    >
                      {f.name[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-3">{t('builder_upholstery', lang)}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {upholsteryColors.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setUpholstery(u.id)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-2 transition-all ${
                        upholstery === u.id ? 'border-wood-700' : 'border-wood-200 hover:border-wood-400'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full border border-wood-200 flex-shrink-0" style={{ backgroundColor: u.color }} />
                      <span className="text-xs font-medium text-wood-700">{u.name[lang]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 4 && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-wood-900 mb-4">{t('builder_step5', lang)}</h2>

              {/* Summary */}
              <div className="bg-wood-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                {typeObj && <div className="flex justify-between"><span className="text-wood-400">{t('builder_step1', lang)}:</span> <span className="font-medium text-wood-800">{typeObj.name[lang]}</span></div>}
                {woodName && <div className="flex justify-between"><span className="text-wood-400">{t('builder_step2', lang)}:</span> <span className="font-medium text-wood-800">{lang === 'ta' && woodName.name_ta ? woodName.name_ta : woodName.name}</span></div>}
                {(length || width || height) && <div className="flex justify-between"><span className="text-wood-400">{t('builder_step3', lang)}:</span> <span className="font-medium text-wood-800">{length || '?'} × {width || '?'} × {height || '?'} cm</span></div>}
                {finishObj && <div className="flex justify-between"><span className="text-wood-400">{t('builder_finish', lang)}:</span> <span className="font-medium text-wood-800">{finishObj.name[lang]}</span></div>}
                {UpholObj && upholstery !== 'none' && <div className="flex justify-between"><span className="text-wood-400">{t('builder_upholstery', lang)}:</span> <span className="font-medium text-wood-800">{UpholObj.name[lang]}</span></div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">{t('builder_your_name', lang)} *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-wood-700 mb-2">{t('builder_your_phone', lang)} *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-wood-700 mb-2">{t('builder_notes', lang)}</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="input-field resize-none" placeholder={lang === 'ta' ? 'கூடுதல் தகவல்...' : 'Any additional details...'} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-wood-100">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={18} /> {t('builder_back', lang)}
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed[step]}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('builder_next', lang)} <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!canProceed[step]}
                className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={18} /> {t('builder_send', lang)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
