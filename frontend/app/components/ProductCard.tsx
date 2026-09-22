import { Star } from "lucide-react";
import { Link } from "react-router";

import { useLanguage } from "~/context/LanguageContext";
import type { Product, WoodType } from "~/types";

interface ProductCardProps {
  product: Product;
  woodType?: WoodType;
  imageUrl?: string;
}

export function ProductCard({ product, woodType, imageUrl }: ProductCardProps) {
  const { lang } = useLanguage();

  const name =
    lang === "ta" && product.name_ta ? product.name_ta : product.name;
  const woodName = woodType
    ? lang === "ta" && woodType.name_ta
      ? woodType.name_ta
      : woodType.name
    : product.wood_type
      ? lang === "ta" && product.wood_type.name_ta
        ? product.wood_type.name_ta
        : product.wood_type.name
      : "";

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="flex flex-col text-left card card-hover group"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-wood-100">
        <img
          src={imageUrl || product.image_url}
          alt={name}
          loading="lazy"
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {product.is_featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-gold-500 text-wood-950 text-xs font-semibold rounded-full shadow-sm">
            ★ Featured
          </span>
        )}
        {product.is_customizable && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-wood-900/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            Customizable
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {woodName && (
          <span className="mb-1 text-xs font-medium tracking-wider uppercase text-sage-600">
            {woodName}
          </span>
        )}
        <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-wood-900 line-clamp-2">
          {name}
        </h3>
        {product.dimensions && (
          <p className="mb-3 text-xs text-wood-400 line-clamp-1">
            {product.dimensions}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-wood-400">From</span>
            <p className="font-semibold text-wood-800">
              {formatPrice(product.price_min)}

              {product.price_max > product.price_min && (
                <span className="text-sm text-wood-400">
                  {" "}
                  - {formatPrice(product.price_max)}
                </span>
              )}
            </p>
          </div>
          <span className="text-sm font-medium transition-colors text-wood-600 group-hover:text-gold-600">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-4/3 bg-wood-200" />
      <div className="p-4">
        <div className="w-1/3 h-3 mb-2 rounded bg-wood-200" />
        <div className="w-3/4 h-5 mb-3 rounded bg-wood-200" />
        <div className="w-1/2 h-4 rounded bg-wood-200" />
      </div>
    </div>
  );
}

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating ? "text-gold-500 fill-gold-500" : "text-wood-200"
          }
        />
      ))}
    </div>
  );
}
