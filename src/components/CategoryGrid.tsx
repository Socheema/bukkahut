import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Item, AddToCartFn } from '../types';

const categories = [
  {
    id: 1,
    name: 'Jollof Rice',
    price: '₦2,000',
    image: 'https://eatriteng.com/wp-content/uploads/2023/03/eatrite-day-200493-2-scaled-e1678448133515.webp'
  },
  {
    id: 2,
    name: 'Fried Rice',
    price: '₦2,200',
    image:'https://allnigerianfoods.com/wp-content/uploads/fried_rice_recipe-500x361.jpg'
  },
  {
    id: 3,
    name: 'Egusi Soup',
    price: '₦2,500',
    image:'https://cherdior.com/wp-content/uploads/2023/08/egusi.jpg'
  },
  {
    id: 4,
    name: 'Pounded Yam',
    price: '₦1,800',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNULFXDQ2cHe4SbU1Gbyt4jxf0vdqOC6d4tQ&s'
  },
  {
    id: 5,
    name: 'Suya Platter',
    price: '₦3,500',
    image:'https://cookingwithclaudy.com/wp-content/uploads/2024/05/FB_IMG_1714779479334.jpg'
  },
  {
    id: 6,
    name: 'Pepper Soup',
    price: '₦2,800',
    image:"https://bakasiafricarestaurantmadrid.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-23-at-5.42.11-AM.jpeg"
  },
  {
    id: 7,
    name: 'Moi Moi',
    price: '₦1,500',
    image:'https://i.pinimg.com/736x/99/e0/fb/99e0fb1068b452a4eea8fa33e8d9bbdf.jpg'
  },
  {
    id: 8,
    name: 'Amala & Ewedu',
    price: '₦2,300',
    image:'https://cdn.yoo.rs/uploads/187308/photos/1705427645-WhatsApp_Image_2.jpg-1705427645'
  },
  {
    id: 9,
    name: 'Ofada Rice',
    price: '₦2,400',
    image:'https://www.foodnify.com/wp-content/uploads/2024/09/offada-rice.jpg'
  },
  {
    id: 10,
    name: 'Boli (Plantain)',
    price: '₦1,200',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuinFAqDr2j18qYQ9vaZN0-AXgZyQYwPmoxg&s'
  },
  {
    id: 11,
    name: 'Akara',
    price: '₦800',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYHxYXzqjPRT2c3If8fT2lyvJmL8ytKJsmOw&s'
  },
  {
    id: 12,
    name: 'Efo Riro',
    price: '₦2,600',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWuW0kvtbxzcSwzZAaUCjd8s1XHoen3gehHg&s'
  }
];

export default function CategoryGrid({ onAddToCart, onDishClick }: { onAddToCart: AddToCartFn; onDishClick: (item: Item) => void }) {
  return (
    <div className="px-4 py-6 pb-24">
      <h2 className="mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
        Popular Dishes
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
          >
            <div
              className="relative h-32 w-full bg-gray-100 cursor-pointer"
              onClick={() => onDishClick(item)}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3
                className="mb-1 text-gray-900 cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                onClick={() => onDishClick(item)}
              >
                {item.name}
              </h3>
              <p
                className="text-[#FF6B35] mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {item.price}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(item);
                }}
                className="w-full bg-[#FF6B35] text-white py-2 rounded-full hover:bg-[#ff5722] transition-colors shadow-sm flex items-center justify-center"
                style={{
                  minHeight: '40px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
