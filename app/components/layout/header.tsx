"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Warning from "../ui/warning";
import CartIcon from "../ui/cart";
import { Categories } from "@/api/categories/categories";

export default function Header() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Animation lock to prevent interruptions
  const isAnimating = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to be passed to Warning component
  const handleWarningDismiss = () => {
    setShowHeader(true);
  };

  // Track scroll direction with debounce
  useEffect(() => {
    // Threshold for scroll detection sensitivity
    const scrollThreshold = 5;
    let scrollTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear previous timeout to implement debouncing
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Don't process scroll events if we're currently animating
      if (isAnimating.current) return;
      
      // Debounce scroll events to prevent rapid state changes
      scrollTimeout = setTimeout(() => {
        // Ignore small scroll movements
        if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;
        
        if (currentScrollY < 10) {
          // Always show header at the top of page
          setVisible(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show header
          setVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and not at the very top - hide header
          // Small delay before hiding to prevent flickering
          setVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      }, 0); // 50ms debounce delay
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, [lastScrollY]);

  // Function to handle animation start/end
  const handleAnimationStart = () => {
    isAnimating.current = true;
    
    // Clear any existing animation timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };
  
  const handleAnimationComplete = () => {
    // Set a small delay before allowing new animations
    animationTimeoutRef.current = setTimeout(() => {
      isAnimating.current = false;
    }, 100);
  };

  // Staggered animation variants (fixed opacity issue)
  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20, // Increased damping for smoother animation
        stiffness: 120, // Slightly increased stiffness
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3, // Explicit duration to ensure animation completes
      },
    },
    hidden: {
      y: -100,
      opacity: 0, // Changed from 1 to 0 for proper fading
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 120,
        when: "afterChildren",
        staggerChildren: 0.05, // Faster stagger for hiding
        staggerDirection: -1,
        duration: 0.2, // Slightly faster exit animation
      },
    },
  };

  // Child animation variants
  const itemVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 180, duration: 0.25 }
    },
    hidden: { 
      y: -20, 
      opacity: 0,
      transition: { type: "spring", damping: 20, stiffness: 180, duration: 0.2 }
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    }
  };

  return (
    <>
      <Warning onDismiss={handleWarningDismiss} />

      <AnimatePresence mode="wait">
        {showHeader && (
          <motion.header
            variants={headerVariants}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
            className="bg-gray-300 dark:bg-black shadow-sm sticky w-full top-0 z-40 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Three-column layout for perfect centering */}
              <div className="grid grid-cols-3 items-center py-3">
                {/* Left column - Logo */}
                <motion.div className="flex justify-start" variants={itemVariants}>
                  <Link href="/">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center"
                    >
                      <motion.h1 
                        className="text-3xl font-extrabold tracking-wider text-gray-800 dark:text-gray-300 uppercase mt-2 sm:mt-0"
                        whileHover={{ 
                          textShadow: "0px 0px 8px rgba(209, 213, 219, 0.5)"
                        }}
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-800 dark:from-gray-300 dark:to-gray-300 letter-spacing-wide">
                          TROTTA
                        </span>
                      </motion.h1>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Middle column - Navigation */}
                <motion.div className="flex justify-center" variants={itemVariants}>
                  <motion.nav
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="hidden md:flex space-x-8"
                  >
                    {Categories.map((category) => (
                      <motion.div
                        key={category.id}
                        variants={navItemVariants}
                        onHoverStart={() => setActiveCategory(category.id)}
                        onHoverEnd={() => setActiveCategory(null)}
                        className="relative"
                      >
                        <Link href={category.href}>
                          <motion.span
                            whileHover={{ 
                              scale: 1.05,
                              letterSpacing: "0.05em"
                            }}
                            className="text-gray-800 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-300 font-medium uppercase text-sm tracking-wider transition-all"
                          >
                            {category.name}
                          </motion.span>
                        </Link>
                        <AnimatePresence>
                          {activeCategory === category.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute z-50 mt-2 w-64 bg-gray-300 dark:bg-gray-800 rounded-md shadow-md p-4 text-sm text-gray-800 dark:text-gray-300 border border-gray-400 dark:border-gray-700"
                            >
                              {category.description}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.nav>
                </motion.div>

                {/* Right column - Cart and Mobile Menu */}
                <motion.div 
                  className="flex justify-end items-center space-x-4"
                  variants={itemVariants}
                >
                  {/* Cart Icon */}
                  <CartIcon 
                    itemCount={3} 
                    onClick={() => setCartOpen(!cartOpen)}
                  />
                  
                  {/* Mobile Menu Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden flex items-center"
                  >
                    <button className="text-gray-800 dark:text-gray-300">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      
      {/* Cart Dropdown/Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-300 dark:bg-gray-800 shadow-xl z-50"
          >
            {/* Cart content remains unchanged */}
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">Seu Carrinho</h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCartOpen(false)}
                  className="text-gray-800 dark:text-gray-300"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="flex-grow overflow-y-auto">
                {/* Cart is empty state */}
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <svg className="h-16 w-16 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">Seu carrinho está vazio</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Adicione alguns produtos para começar</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gray-800 dark:bg-gray-300 text-gray-300 dark:text-gray-800 rounded-md font-medium"
                    onClick={() => setCartOpen(false)}
                  >
                    Continuar Comprando
                  </motion.button>
                </div>
              </div>
              
              {/* Cart footer with total and checkout */}
              <div className="border-t border-gray-400 dark:border-gray-700 pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-800 dark:text-gray-300 font-medium">Total</span>
                  <span className="text-gray-800 dark:text-gray-300 font-bold">R$ 0,00</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gray-800 dark:bg-gray-300 text-gray-300 dark:text-gray-800 rounded-md font-medium text-center"
                >
                  Finalizar Compra
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay when cart is open */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}