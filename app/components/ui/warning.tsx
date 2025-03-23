"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface WarningProps {
  onDismiss: () => void;
}

export default function Warning({ onDismiss }: WarningProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if we're on a mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        // Initial check
        checkMobile();
        
        // Add resize listener
        window.addEventListener('resize', checkMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        onDismiss(); // Call the callback from the parent
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isMobile ? (
                // Mobile version - centered modal
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backdropFilter: "blur(5px)" }}
                >
                    <motion.div 
                        className="bg-amber-100 dark:bg-amber-900 w-full max-w-sm rounded-lg shadow-xl border border-amber-300 dark:border-amber-700 overflow-hidden"
                    >
                        <div className="p-4">
                            <div className="flex items-center mb-3">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 1, -1, 0]
                                    }}
                                    transition={{ 
                                        repeat: Infinity, 
                                        repeatDelay: 3,
                                        duration: 1 
                                    }}
                                    className="flex-shrink-0"
                                >
                                    <svg className="h-7 w-7 text-amber-600 dark:text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </motion.div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200">Atenção!</h3>
                                </div>
                            </div>
                            
                            <p className="text-amber-800 dark:text-amber-200 mb-4 text-left">
                                Produtos com nicotina. Nicotina é uma substância extremamente viciante, nós não nos responsabilizamos pelo uso indevido dos produtos. A venda é proibida para menores de 18 anos.
                            </p>
                            
                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleClose}
                                    className="px-4 py-2 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-md font-medium"
                                >
                                    Entendi
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                // Desktop version - top banner
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-0 left-0 w-full z-50"
                >
                    <div className="bg-amber-100 dark:bg-amber-900 border-b border-amber-300 dark:border-amber-700 shadow-lg">
                        <div className="max-w-7xl mx-auto py-3 px-4 lg:px-8">
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="flex-1 flex items-center">
                                    <motion.div
                                        animate={{ 
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 1, -1, 0]
                                        }}
                                        transition={{ 
                                            repeat: Infinity, 
                                            repeatDelay: 3,
                                            duration: 1 
                                        }}
                                        className="flex-shrink-0"
                                    >
                                        <svg className="h-6 w-6 text-amber-600 dark:text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </motion.div>
                                    <div className="ml-3 text-base font-medium text-amber-800 dark:text-amber-200">
                                        <span className="font-bold">Atenção!</span> substância extremamente viciante, nós não nos responsabilizamos pelo uso indevido dos produtos. A venda é proibida para menores de 18 anos.
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={handleClose}
                                        className="flex p-2 rounded-md hover:bg-amber-200 dark:hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
                                        aria-label="Fechar alerta"
                                    >
                                        <span className="sr-only">Fechar</span>
                                        <svg className="h-5 w-5 text-amber-600 dark:text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}