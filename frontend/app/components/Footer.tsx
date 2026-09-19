import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import { BUSINESS, telLink, whatsappLink } from "~/lib/constants";
import { navigate } from "~/lib/router";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export function Footer() {
  const { lang } = useLanguage();

  const quickLinks = [
    { label: t("nav_showroom", lang), path: "/showroom" },
    { label: t("nav_custom", lang), path: "/custom-builder" },
    { label: t("nav_room", lang), path: "/room-designer" },
    // { label: t("nav_wood", lang), path: "/wood-library" },
    // { label: t("nav_gallery", lang), path: "/gallery" },
    // { label: t("nav_home_fit", lang), path: "/made-for-home" },
    { label: t("nav_about", lang), path: "/about" },
    { label: t("nav_contact", lang), path: "/contact" },
  ];

  return (
    <footer className="mt-20 bg-wood-950 text-wood-200">
      {/* Main footer */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg wood-gradient">
                <span className="font-serif text-2xl font-bold text-gold-400">
                  SK
                </span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  Sri Krishna
                </h3>
                <p className="text-xs tracking-wider uppercase text-wood-400">
                  Wooden Furniture
                </p>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-wood-400">
              {t("footer_tagline", lang)}
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink(
                  `Hello ${BUSINESS.name}, I would like to know more about your furniture.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-wood-800 hover:bg-sage-600"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-wood-800 hover:bg-wood-700"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-wood-800 hover:bg-wood-700"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold text-white">
              {t("footer_quick_links", lang)}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm transition-colors text-wood-400 hover:text-gold-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold text-white">
              {t("footer_contact", lang)}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-wood-400">
                <MapPin
                  size={18}
                  className="text-gold-400 flex-shrink-0 mt-0.5"
                />
                <span>{BUSINESS.addressFull}</span>
              </li>
              <li>
                <a
                  href={telLink()}
                  className="flex items-center gap-3 text-sm transition-colors text-wood-400 hover:text-gold-400"
                >
                  <Phone size={18} className="flex-shrink-0 text-gold-400" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-wood-400">
                <Mail
                  size={18}
                  className="text-gold-400 flex-shrink-0 mt-0.5"
                />
                <span>{BUSINESS.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-wood-400">
                <Clock
                  size={18}
                  className="text-gold-400 flex-shrink-0 mt-0.5"
                />
                <span>{BUSINESS.hours}</span>
              </li>
            </ul>
          </div>

          {/* Admin link */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-wood-800">
        <div className="flex flex-col items-center justify-between gap-3 px-6 py-6 mx-auto max-w-7xl md:flex-row">
          <p className="text-xs text-wood-500">
            © {new Date().getFullYear()} {BUSINESS.name}.{" "}
            {t("footer_rights", lang)}
          </p>
          <p className="text-xs text-wood-500">
            {BUSINESS.city} • {BUSINESS.pincode}
          </p>
        </div>
      </div>
    </footer>
  );
}
