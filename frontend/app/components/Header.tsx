import { Globe, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import { BUSINESS, generateTelLink } from "~/lib/constants";

import type { Route } from "~/types";

const navItems: {
  route: Route;
  key: keyof typeof import("~/i18n/translations").translations;
}[] = [
  { route: { name: "home" }, key: "nav_home" },
  { route: { name: "showroom" }, key: "nav_showroom" },
  { route: { name: "custom-builder" }, key: "nav_custom" },
  { route: { name: "room-designer" }, key: "nav_room" },
  // { route: { name: 'wood-library' }, key: 'nav_wood' },
  // { route: { name: 'gallery' }, key: 'nav_gallery' },
  // { route: { name: 'made-for-home' }, key: 'nav_home_fit' },
  { route: { name: "about" }, key: "nav_about" },
  { route: { name: "contact" }, key: "nav_contact" },
];

export function Header() {
  const location = useLocation();
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-wood-900 text-wood-100 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <span className="font-medium">
            {BUSINESS.location.addressShort} • {BUSINESS.hours.display}
          </span>
          <div className="flex items-center gap-4">
            {BUSINESS.contact.displayPhones.map((phone) => (
              <a
                key={phone}
                href={generateTelLink(phone)}
                className="flex items-center gap-1 hover:text-gold-400 transition-colors"
              >
                <Phone size={12} />
                {phone}
              </a>
            ))}

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
            >
              <Globe size={12} />
              {lang === "en" ? "தமிழ்" : "English"}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-md shadow-wood-900/5" : "bg-wood-50/95"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-lg wood-gradient flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-serif text-gold-400 text-xl md:text-2xl font-bold">
                  SK
                </span>
              </div>
              <div className="text-left">
                <h1 className="font-serif text-lg md:text-xl font-semibold text-wood-900 leading-tight">
                  Sri Krishna
                </h1>
                <p className="text-[10px] md:text-xs text-wood-500 uppercase tracking-wider font-medium">
                  Wooden Furniture
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={`/${item.route.name}`}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-wood-800 bg-wood-200/60"
                        : "text-wood-600 hover:text-wood-800 hover:bg-wood-100"
                    }`
                  }
                >
                  {t(item.key, lang)}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="lg:hidden flex items-center gap-1 px-3 py-2 text-sm font-medium text-wood-600 rounded-lg hover:bg-wood-100 transition-colors"
              >
                <Globe size={16} />
                {lang === "en" ? "தமிழ்" : "EN"}
              </button>
              <a
                href={generateTelLink(BUSINESS.contact.primaryPhone.display)}
                className="hidden md:flex btn-primary py-2! px-4! text-sm"
              >
                <Phone size={16} />
                Call Now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-wood-700 hover:bg-wood-100 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden glass border-t border-wood-200 animate-fade-in-down">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={`/${item.route.name}`}
                  className={({ isActive }) =>
                    `px-4 py-3 text-left text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-wood-800 bg-wood-200/60"
                        : "text-wood-600 hover:bg-wood-100"
                    }`
                  }
                >
                  {t(item.key, lang)}
                </NavLink>
              ))}
              {BUSINESS.contact.displayPhones.map((phone) => (
                <a
                  key={phone}
                  href={generateTelLink(phone)}
                  className="flex items-center gap-1 hover:text-gold-400 transition-colors"
                >
                  <Phone size={12} />
                  {phone}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
