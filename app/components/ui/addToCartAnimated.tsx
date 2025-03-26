"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "@/api/products/products";

interface AnimationManagerProps {
  children: React.ReactNode;
}

export type AnimationInfo = {
  product: Product;
  sourceRect: DOMRect;
  targetRect: DOMRect;
};

// Context for animation control
export const AnimationManager: React.FC<AnimationManagerProps> = ({ children }) => {
  const [animation, setAnimation] = useState<AnimationInfo | null>(null);
  
  useEffect(() => {
    // Expose animation trigger function globally
    window.triggerAddToCartAnimation = (product: Product, sourceEl: HTMLElement) => {
      // Find cart icon element
      const cartIcon = document.querySelector(".cart-icon");
      if (!cartIcon) return;
      
      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = cartIcon.getBoundingClientRect();
      
      setAnimation({ product, sourceRect, targetRect });
      
      // Clear animation after it completes
      setTimeout(() => {
        setAnimation(null);
      }, 1000);
    };
    
    return () => {
      delete window.triggerAddToCartAnimation;
    };
  }, []);
  
  return (
    <>
      {children}
      
      <AnimatePresence>
        {animation && (
          <AddToCartAnimation 
            product={animation.product}
            sourceRect={animation.sourceRect}
            targetRect={animation.targetRect}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Animation component
function AddToCartAnimation({ 
  product, 
  sourceRect, 
  targetRect 
}: AnimationInfo) {
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      initial={{ 
        x: sourceRect.left + sourceRect.width / 2, 
        y: sourceRect.top + sourceRect.height / 2,
        opacity: 1,
        scale: 0.2
      }}
      animate={{
        x: targetRect.left + targetRect.width / 2, 
        y: targetRect.top + targetRect.height / 2,
        scale: [0.2, 0.6, 0.2],
        transition: { 
          scale: {
            times: [0, 0.2, 1],
            duration: 0.8
          },
          type: "spring",
          duration: 0.8,
          bounce: 0.2
        }
      }}
      exit={{ 
        scale: 0, 
        opacity: 0,
        transition: { duration: 0.2 } 
      }}
    >
      <div className="relative w-16 h-16 -mt-8 -ml-8 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}

// Add global type definitions
declare global {
  interface Window {
    triggerAddToCartAnimation?: (product: Product, sourceElement: HTMLElement) => void;
  }
}