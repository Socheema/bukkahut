import React from "react";
import { X, Minus, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Item, AddToCartFn } from "../types";

export default function DishDetails({
  dish,
  onClose,
  onAddToCart,
}: {
  dish: Item | null;
  onClose: () => void;
  onAddToCart: AddToCartFn;
}) {
  const [quantity, setQuantity] = React.useState<number>(1);

  if (!dish) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...dish, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end md:items-center">
      <div
        className="
      bg-white
      w-full
      sm:w-full
      md:w-[480px]
      lg:w-[480px]
      max-w-[480px]
      max-h-[90vh]
      rounded-t-3xl
      md:rounded-3xl
      overflow-hidden
      animate-slide-up
      md:animate-fade-in
      mx-auto
      md:self-center
    "
        style={{
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        {/* Header */}
        <div className="relative">
          <div className="h-64 w-full bg-gray-100">
            <ImageWithFallback
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover  border border-red-500"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pb-32">
          <h2
            className="mb-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            {dish.name}
          </h2>
          <p
            className="text-[#FF6B35] mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            {dish.price}
          </p>

          <div className="mb-6">
            <h3
              className="mb-2"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {dish.description ||
                `Delicious ${dish.name} prepared fresh with authentic Nigerian ingredients and spices. A customer favorite!`}
            </p>
          </div>

          <div className="mb-6">
            <h3
              className="mb-3"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Quantity
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span
                className="text-2xl min-w-[40px] text-center"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-full bg-[#FF6B35] text-white hover:bg-[#ff5722] flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4">
            <p className="text-sm text-gray-700">
              <span
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                🚀 Fast Delivery:
              </span>{" "}
              Your order will be delivered within 30-45 minutes
            </p>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#FF6B35] text-white py-4 rounded-full hover:bg-[#ff5722] transition-colors shadow-md flex items-center justify-center"
            style={{
              minHeight: "56px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
            }}
          >
            Add {quantity} to Cart • {dish.price}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
