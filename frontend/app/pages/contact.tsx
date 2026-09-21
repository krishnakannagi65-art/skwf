import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "~/components/EnquiryForm";
import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import {
  BUSINESS,
  generateTelLink,
  generateWhatsappLink,
} from "~/lib/constants";

export function ContactPage() {
  const { lang } = useLanguage();
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.location.mapQuery)}&z=15&output=embed`;

  return (
    <div className="min-h-screen">
      <div className="bg-wood-900 text-white py-16 relative overflow-hidden">
        <div className="grain-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">
            {t("contact_title", lang)}
          </h1>
          <p className="text-wood-300 mt-3 text-lg">
            {t("contact_subtitle", lang)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-wood-600" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-wood-900 mb-1">
                    {t("contact_address", lang)}
                  </h3>
                  <p className="text-sm text-wood-600">
                    {BUSINESS.location.addressFull}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="card card-hover p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-wood-600" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-wood-900 mb-1">
                    {t("contact_phone", lang)}
                  </h3>
                  {BUSINESS.contact.displayPhones.map((phone) => (
                    <a
                      key={phone}
                      href={generateTelLink(phone)}
                      className="text-sm text-wood-600 block"
                    >
                      {phone}
                    </a>
                  ))}
                  <p className="text-xs text-wood-400 mt-1">
                    {lang === "ta" ? "உரிமையாளர்" : "Owner"}: {BUSINESS.owner}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-wood-600" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-wood-900 mb-1">
                    {t("contact_email", lang)}
                  </h3>
                  <p className="text-sm text-wood-600">
                    {BUSINESS.contact.email}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={22} className="text-wood-600" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-wood-900 mb-1">
                    {t("contact_hours", lang)}
                  </h3>
                  <p className="text-sm text-wood-600">
                    {BUSINESS.hours.display}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={generateTelLink(BUSINESS.contact.primaryPhone.display)}
                className="btn-primary flex-1"
              >
                <Phone size={18} /> {t("call_now", lang)}
              </a>
              <a
                href={generateWhatsappLink(
                  `Hello ${BUSINESS.name}, I'd like to know more about your furniture.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1"
              >
                <MessageCircle size={18} /> {t("whatsapp_us", lang)}
              </a>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={mapSrc}
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                title="Store Location"
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <div className="card p-6 md:p-8">
              <h2 className="font-serif text-2xl font-semibold text-wood-900 mb-2">
                {t("send_enquiry", lang)}
              </h2>
              <p className="text-sm text-wood-500 mb-6">
                {lang === "ta"
                  ? "உங்கள் விவரங்களை நிரப்புங்கள், நாங்கள் உங்களை தொடர்பு கொள்வோம்"
                  : "Fill in your details and we will get back to you"}
              </p>
              <EnquiryForm enquiryType="contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
