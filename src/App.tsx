import React, { useState } from 'react';
import HeroCarousel from './components/HeroCarousel';
import CategoryGrid from './components/CategoryGrid';
import StickyBottomBar from './components/StickyBottomBar';
import WhatsAppButton from './components/WhatsAppButton';
import Header from './components/Header';
import DishDetails from './components/DishDetails';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import type { Item, Order, AddToCartFn } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'orders'>('menu');
  const [selectedDish, setSelectedDish] = useState<Item | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddToCart: AddToCartFn = (item) => {
    const quantityToAdd = item.quantity || 1;

    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + quantityToAdd }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: quantityToAdd }];
    });

    toast.success(`${item.name} added to cart!`, {
      duration: 2000,
      style: {
        background: '#2E7D32',
        color: '#fff',
      },
    });
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        body {
          max-width: 480px;
          margin: 0 auto;
          background-color: #fff;
        }
      `}</style>

      <Header cartCount={totalCartItems} />

      <main className="pb-20">
        {activeTab === 'menu' && (
          <>
            <HeroCarousel onAddToCart={handleAddToCart} />
            <CategoryGrid
              onAddToCart={handleAddToCart}
              onDishClick={setSelectedDish}
            />
          </>
        )}

        {activeTab === 'cart' && (
          <div className="p-6">
            <h2 className="mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Your Cart
            </h2>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="bg-[#FF6B35] text-white px-8 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <h3
                        className="mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[#FF6B35]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setCartItems((prev) =>
                            prev
                              .map((cartItem) =>
                                cartItem.id === item.id
                                  ? { ...cartItem, quantity: (cartItem.quantity ?? 0) - 1 }
                                  : cartItem
                              )
                              .filter((cartItem) => (cartItem.quantity ?? 0) > 0)
                          );
                        }}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          setCartItems((prev) =>
                            prev.map((cartItem) =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 }
                                : cartItem
                            )
                          );
                        }}
                        className="w-8 h-8 rounded-full bg-[#FF6B35] text-white hover:bg-[#ff5722] flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const newOrder = {
                      id: Date.now(),
                      items: [...cartItems],
                      date: new Date().toLocaleString('en-NG', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }),
                      status: 'Preparing'
                    };

                    setOrders((prev) => [newOrder, ...prev]);

                    toast.success('Order placed successfully!', {
                      duration: 3000,
                      style: {
                        background: '#2E7D32',
                        color: '#fff',
                      },
                    });
                    setCartItems([]);
                    setActiveTab('orders');
                  }}
                  className="w-full bg-[#2E7D32] text-white py-4 rounded-full hover:bg-[#1b5e20] transition-colors mt-6 shadow-lg flex items-center justify-center"
                  style={{
                    minHeight: '56px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-6">
            <h2 className="mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Your Orders
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You have no orders yet</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="bg-[#FF6B35] text-white px-8 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-[#FF6B35] to-[#ff5722] p-4 text-white">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                            Order #{order.id.toString().slice(-6)}
                          </p>
                          <p className="text-sm opacity-90">{order.date}</p>
                        </div>
                        <span
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p
                              className="text-[#FF6B35]"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                            >
                              {item.price}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between items-center">
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            Total Items
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                            {order.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0)} items
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
                        <p className="text-sm text-green-800">
                          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            🚀 Estimated Delivery:
                          </span>
                          {' '}30-45 minutes
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <StickyBottomBar
        cartCount={totalCartItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <WhatsAppButton />

      {selectedDish && (
        <DishDetails
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}
