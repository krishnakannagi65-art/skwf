import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language } from '@/types';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('skwf-lang');
    return stored === 'ta' ? 'ta' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('skwf-lang', lang);
    document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
    document.body.classList.toggle('lang-tamil', lang === 'ta');
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);
  const toggleLang = () => setLangState((prev) => (prev === 'en' ? 'ta' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
