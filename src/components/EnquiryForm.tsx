import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/i18n/translations';
import { submitEnquiry } from '@/lib/enquiries';
import { BUSINESS } from '@/lib/constants';

interface EnquiryFormProps {
  enquiryType?: string;
  details?: Record<string, unknown>;
  compact?: boolean;
  defaultMessage?: string;
}

export function EnquiryForm({
  enquiryType = 'general',
  details = {},
  compact = false,
  defaultMessage = '',
}: EnquiryFormProps) {
  const { lang } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setStatus('submitting');
    const ok = await submitEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
      enquiry_type: enquiryType,
      details,
    });

    setStatus(ok ? 'success' : 'error');
    if (ok) {
      setName('');
      setPhone('');
      setEmail('');
      setMessage(defaultMessage);
    }
  };

  if (status === 'success') {
    return (
      <div className="card p-8 text-center animate-scale-in">
        <CheckCircle size={48} className="text-sage-500 mx-auto mb-4" />
        <h3 className="font-serif text-xl font-semibold text-wood-900 mb-2">
          {t('contact_success', lang)}
        </h3>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary mt-4"
        >
          {lang === 'ta' ? 'மற்றொரு விசாரணை அனுப்பு' : 'Send another enquiry'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? '' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label className="block text-sm font-medium text-wood-700 mb-1.5">
            {t('contact_name', lang)} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder={lang === 'ta' ? 'உங்கள் பெயர்' : 'Enter your name'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-wood-700 mb-1.5">
            {t('contact_phone', lang)} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
            placeholder="98765 43210"
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label className="block text-sm font-medium text-wood-700 mb-1.5">
            {t('contact_email', lang)}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="you@email.com"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-wood-700 mb-1.5">
          {t('contact_message', lang)}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={compact ? 3 : 4}
          className="input-field resize-none"
          placeholder={lang === 'ta' ? 'உங்கள் செய்தியை இங்கே எழுதுங்கள்...' : 'Type your message here...'}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle size={18} />
          {t('contact_error', lang)}
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
        {t('send_enquiry', lang)}
      </button>

      <p className="text-xs text-wood-400 text-center">
        {lang === 'ta'
          ? `அல்லது ${BUSINESS.owner} ${BUSINESS.phoneDisplay} என்பதில் நேரடியாக அழைக்கவும்`
          : `Or call ${BUSINESS.owner} directly at ${BUSINESS.phoneDisplay}`}
      </p>
    </form>
  );
}
