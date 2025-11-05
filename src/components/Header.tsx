import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Item } from '../types';

export default function Header({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <ImageWithFallback
            src="https://bhlodoo.bukkahut.com/web/image/website/1/logo/Bukkahut%20Your%20Delicious%209ja%20meal?unique=2d7bc94"
            alt="Bukkahut Logo"
            className="h-10 w-auto object-contain"
          />
          <h1 className="text-[#FF6B35]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Bukka{
              /* Add an inline color fallback on the span so it renders even if Tailwind's
                 arbitrary color class isn't present in the compiled CSS in some builds */
            }<span className="text-[#B76428]" style={{ color: '#B76428' }}>hut</span>
          </h1>
        </div>
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 bg-[#2E7D32] text-white border-0 px-1.5 min-w-[20px] h-5 flex items-center justify-center"
              style={{ fontSize: '11px' }}
            >
              {cartCount}
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}
