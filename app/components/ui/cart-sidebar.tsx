"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronUp, ChevronDown, Trash2, ShoppingBag } from 'lucide-react';
import { useCart, CartItem as CartItemType } from './CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Cart drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-gray-100 dark:bg-gray-800 shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                Seu Carrinho
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </motion.button>
            </div>
            
            {/* Cart items */}
            <div className="flex-grow overflow-y-auto p-4">
              {items.length > 0 ? (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { 
                      transition: { staggerChildren: 0.05 } 
                    },
                    hidden: {}
                  }}
                >
                  {items.map((item) => (
                    <CartItem 
                      key={item.product.id} 
                      item={item} 
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </motion.ul>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-4"
                >
                  <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Adicione alguns produtos para começar a comprar
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md font-medium"
                    onClick={onClose}
                  >
                    Continuar Comprando
                  </motion.button>
                </motion.div>
              )}
            </div>
            
            {/* Footer with total and checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Total</span>
                  <span className="text-gray-800 dark:text-gray-200 font-bold text-xl">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium text-sm flex items-center justify-center"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Limpar Carrinho
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm"
                  >
                    Finalizar Compra
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Individual cart item component
function CartItem({ 
  item, 
  updateQuantity, 
  removeFromCart 
}: { 
  item: CartItemType; 
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}) {
  return (
    <motion.li 
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
    >
      {/* Product image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white">
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={80}
          height={80}
          className="h-full w-full object-contain object-center"
        />
      </div>
      
      {/* Product details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-sm font-medium text-gray-800 dark:text-gray-200">
          <h3 className="truncate max-w-[150px]">
            {item.product.name}
          </h3>
          <p className="ml-1">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {item.product.category}
        </p>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity adjuster */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
            <motion.button 
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-2 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <ChevronDown size={16} />
            </motion.button>
            
            <span className="w-8 text-center text-gray-800 dark:text-gray-200">
              {item.quantity}
            </span>
            
            <motion.button 
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <ChevronUp size={16} />
            </motion.button>
          </div>
          
          {/* Remove button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => removeFromCart(item.product.id)}
            className="text-red-500 hover:text-red-600 text-xs"
          >
            Remover
          </motion.button>
        </div>
      </div>
    </motion.li>
  );
}