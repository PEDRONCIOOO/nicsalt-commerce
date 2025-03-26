"use client";

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

interface CartIconProps {
    className?: string;
    size?: number;
    color?: string;
    onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({
    className = "",
    size = 24,
    color,
    onClick,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { itemCount } = useCart();

    return (
        <motion.div 
            className={`relative inline-flex items-center justify-center cursor-pointer cart-icon ${className}`}
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                animate={isHovered ? { y: [0, -3, 0], rotate: [-2, 2, -2, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                <ShoppingCart 
                    size={size} 
                    color={color || "currentColor"} 
                    className="text-gray-800 dark:text-gray-300" 
                />
            </motion.div>
            
            {/* Cart item counter badge */}
            <AnimatePresence>
                {itemCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-amber-500 dark:bg-amber-600 text-white dark:text-gray-900 text-xs font-bold rounded-full flex items-center justify-center"
                        style={{ 
                            minWidth: `${itemCount > 9 ? 22 : 18}px`, 
                            height: '18px',
                            padding: '0 4px'
                        }}
                    >
                        {itemCount > 99 ? '99+' : itemCount}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Tooltip on hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -bottom-8 whitespace-nowrap bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs rounded py-1 px-2 pointer-events-none z-50"
                    >
                        {itemCount === 0 ? "Carrinho vazio" : `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} no carrinho`}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Visual feedback when clicked */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
};

export default CartIcon;