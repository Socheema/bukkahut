import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroItems = [
  {
    id: 1,
    name: 'Jollof Rice & Chicken',
    description: 'Aromatic party jollof with grilled chicken',
    price: '₦2,500',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrylJIJEBxXRG7xC8Emnvm83GjIwMRU2ES1Q&s'
  },
  {
    id: 4,
    name: 'Amala and Ewedu',
    description: 'Rich and delicious Amala with Ewedu soup',
    price: '₦2,500',
    image: 'https://adukeskitchenkokolounge.com/wp-content/uploads/2024/02/Amala-gbegiri-Ewedu-and-assorted_1.jpg'
  },
  {
    id: 2,
    name: 'Egusi Soup',
    description: 'Rich melon soup',
    price: '₦3,200',
    image: 'https://s3.amazonaws.com/shecodesio-production/uploads/files/000/020/480/original/Pounded-yam-and-equsi-with-cowleg-and-snail-600x400-1.jpeg?1636046706'
  },
  {
    id: 3,
    name: 'Premium Pounded Yam',
    description: 'Fresh pounded yam with assorted meat',
    price: '₦2,800',
    image: 'https://www.nigerianfoodtv.com/wp-content/uploads/2020/08/EFO-RIRO-480x480.jpg'
  },
];

import type { Item, AddToCartFn } from '../types';

export default function HeroCarousel({ onAddToCart }: { onAddToCart: AddToCartFn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % heroItems.length);
  };

  const currentItem = heroItems[currentIndex];

  return (
    <div className="relative w-full bg-gradient-to-b from-orange-50 to-white">
      <div className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[280px] w-full">
          <ImageWithFallback
            src={currentItem.image}
            alt={currentItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {currentItem.name}
          </h2>
          <p className="text-sm text-white/90 mb-3">{currentItem.description}</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              {currentItem.price}
            </span>
            <button
              onClick={() => onAddToCart(currentItem)}
              className="bg-[#FF6B35] text-white px-8 py-3 rounded-full hover:bg-[#ff5722] transition-colors shadow-lg"
              style={{
                minHeight: '48px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {heroItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
