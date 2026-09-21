import { useState } from "react";

import { ArrowLeft, Check, MessageCircle, Phone, Ruler } from "lucide-react";

import { useNavigate } from "react-router";
import { EnquiryForm } from "~/components/EnquiryForm";
import { ProductCard } from "~/components/ProductCard";
import { useLanguage } from "~/context/LanguageContext";
import bedProducts from "~/data/bed-data";
import { t } from "~/i18n/translations";
import {
  BUSINESS,
  generateTelLink,
  generateWhatsappLink,
} from "~/lib/constants";

interface ProductDetailPageProps {
  slug: string;
}

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  /*
   * Find the product directly from bed-data.ts
   * using the slug from the URL.
   */
  const product = bedProducts.find((item) => item.slug === slug);

  /*
   * Product not found
   */
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center">
          <p className="mb-4 text-lg text-wood-400">{t("no_results", lang)}</p>

          <button
            type="button"
            onClick={() => navigate("/showroom")}
            className="btn-primary"
          >
            {t("nav_showroom", lang)}
          </button>
        </div>
      </div>
    );
  }

  /*
   * Language
   */
  const name =
    lang === "ta" && product.name_ta ? product.name_ta : product.name;

  const description =
    lang === "ta" && product.description_ta
      ? product.description_ta
      : product.description;

  /*
   * Images
   *
   * bed-data.ts already contains the main image
   * and gallery_images.
   */
  const allImages = [
    product.image_url,
    ...(product.gallery_images || []),
  ].filter(Boolean);

  /*
   * Price
   */
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  /*
   * Related products
   */
  const relatedProducts = bedProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  /*
   * WhatsApp message
   */
  const waMessage = `Hello ${BUSINESS.name}!

I'm interested in:

*${name}*

Price Range: ${formatPrice(product.price_min)} - ${formatPrice(
    product.price_max,
  )}

Dimensions: ${product.dimensions}

Could you provide more details?`;

  return (
    <div className="min-h-screen">
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {/* Back to Showroom */}
        <button
          type="button"
          onClick={() => navigate("/showroom")}
          className="flex items-center gap-2 mb-6 text-sm transition-colors text-wood-500 hover:text-wood-700"
        >
          <ArrowLeft size={16} />

          {t("nav_showroom", lang)}
        </button>

        {/* Product */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* =========================
              IMAGE GALLERY
          ========================= */}
          <div>
            {/* Main Image */}
            <div className="mb-4 overflow-hidden aspect-square rounded-2xl bg-wood-100">
              <img
                src={allImages[activeImage]}
                alt={name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index
                        ? "border-wood-700 scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${name} ${index + 1}`}
                      className="object-contain w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================= */}
          <div>
            {/* Product Name */}
            <h1 className="mt-2 mb-3 font-serif text-3xl font-semibold md:text-4xl text-wood-900">
              {name}
            </h1>

            {/* Price */}
            <div className="p-4 mb-6 rounded-xl bg-wood-50">
              <span className="text-xs text-wood-400">
                {t("starting_from", lang)}
              </span>

              <p className="font-serif text-2xl font-bold text-wood-900">
                {formatPrice(product.price_min)}

                {product.price_max > product.price_min && (
                  <span className="text-base font-normal text-wood-400">
                    {" "}
                    - {formatPrice(product.price_max)}
                  </span>
                )}
              </p>
            </div>

            {/* Description */}
            <p className="mb-6 leading-relaxed text-wood-600">{description}</p>

            {/* Specifications */}
            <div className="mb-6 space-y-3">
              {/* Dimensions */}
              {product.dimensions && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-wood-100">
                    <Ruler size={18} className="text-wood-600" />
                  </div>

                  <div>
                    <p className="text-xs text-wood-400">
                      {t("product_dimensions", lang)}
                    </p>

                    <p className="text-sm font-medium text-wood-800">
                      {product.dimensions}
                    </p>
                  </div>
                </div>
              )}

              {/* Customizable */}
              {product.is_customizable && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sage-100">
                    <Check size={18} className="text-sage-600" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-sage-700">
                      {t("customizable", lang)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* WhatsApp */}
              <a
                href={generateWhatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-gold"
              >
                <MessageCircle size={18} />

                {t("get_quote", lang)}
              </a>

              {/* Call */}
              <a
                href={generateTelLink(BUSINESS.contact.primaryPhone.number)}
                className="flex-1 btn-secondary"
              >
                <Phone size={18} />

                {t("call_now", lang)}
              </a>
            </div>

            {/* Enquiry */}
            <button
              type="button"
              onClick={() => setShowEnquiry(!showEnquiry)}
              className="w-full mt-4 text-sm text-center transition-colors text-wood-500 hover:text-wood-700"
            >
              {t("product_enquire", lang)}
            </button>

            {showEnquiry && (
              <div className="p-4 mt-4 rounded-xl bg-wood-50">
                <EnquiryForm
                  enquiryType="product"
                  details={{
                    product_slug: product.slug,
                    product_name: name,
                  }}
                  defaultMessage={`I'm interested in the ${name}. Please contact me with more details.`}
                  compact
                />
              </div>
            )}
          </div>
        </div>

        {/* =========================
            RELATED PRODUCTS
        ========================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-wood-900">
              {t("product_related", lang)}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  imageUrl={relatedProduct.image_url}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
