import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS, whatsappLink } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/i18n/translations';

export function WhatsAppFloat() {
  const { lang } = useLanguage();
  const [showLabel, setShowLabel] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const message = `Hello ${BUSINESS.name}! I'm interested in your wooden furniture. Could you please help me?`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showLabel && !dismissed && (
        <div className="glass shadow-lg rounded-2xl px-4 py-3 max-w-[220px] animate-slide-in-right relative">
          <button
            onClick={() => setDismissed(true)}
            className="absolute -top-2 -left-2 w-6 h-6 bg-wood-700 text-white rounded-full flex items-center justify-center hover:bg-wood-800 transition-colors"
          >
            <X size={14} />
          </button>
          <p className="text-sm font-medium text-wood-800">
            {lang === 'ta' ? 'வணக்கம்! எப்படி உதவ வல்லேன்?' : 'Hello! How can we help you?'}
          </p>
          <p className="text-xs text-wood-500 mt-1">
            {lang === 'ta' ? 'மனோகரனுடன் உரையாடுங்கள்' : `Chat with ${BUSINESS.owner}`}
          </p>
        </div>
      )}
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-300 animate-float"
        aria-label={t('whatsapp_us', lang)}
      >
        <MessageCircle size={28} className="text-white" fill="white" />
      </a>
    </div>
  );
}
