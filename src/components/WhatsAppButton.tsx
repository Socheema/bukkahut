import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp business number
    const phoneNumber = '2348012345678'; // Example Nigerian number
    const message = encodeURIComponent('Hi! I want to order from Bukkahut Bhlodoo');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-4 bg-[#2E7D32] text-white p-4 rounded-full shadow-lg hover:bg-[#1b5e20] transition-all hover:scale-110 z-40"
      aria-label="Chat on WhatsApp"
      style={{ minHeight: '56px', minWidth: '56px' }}
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </button>
  );
}
