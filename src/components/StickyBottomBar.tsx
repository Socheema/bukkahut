import React from 'react';
import { Menu, ShoppingCart, ClipboardList } from 'lucide-react';
import { Badge } from './ui/badge';
import type { AddToCartFn } from '../types';

export default function StickyBottomBar({ cartCount, activeTab, onTabChange }: { cartCount: number; activeTab: 'menu' | 'cart' | 'orders'; onTabChange: (tab: 'menu' | 'cart' | 'orders') => void }) {
  const tabs: { id: 'menu' | 'cart' | 'orders'; label: string; icon: any }[] = [
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-3 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-3 transition-colors relative ${
                isActive
                  ? 'text-[#FF6B35]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{ minHeight: '64px' }}
            >
              <div className="relative">
                <Icon className="w-6 h-6 mb-1" />
                {tab.id === 'cart' && cartCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 bg-[#2E7D32] text-white border-0 px-1.5 min-w-[20px] h-5 flex items-center justify-center"
                    style={{ fontSize: '11px' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span
                className="text-xs"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: isActive ? 600 : 400 }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
