"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  // Get background color based on type
  const getBgColor = () => {
    switch (type) {
      case "success": return "bg-green-600";
      case "error": return "bg-red-600";
      case "info": return "bg-blue-600";
      default: return "bg-gray-800";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      className={`${getBgColor()} text-white p-3 rounded-lg shadow-md flex items-center gap-2 max-w-xs`}
    >
      <div className="flex-1">{message}</div>
      <button 
        onClick={onClose} 
        className="text-white hover:text-gray-200"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

// Container to manage multiple toasts
export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Array<{id: string; message: string; type: 'success' | 'error' | 'info'}>>([]);
  
  // Function to add a toast
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };
  
  // Add the function to the window object to use it globally
  useEffect(() => {
    window.showToast = addToast;
    
    return () => {
      delete window.showToast;
    };
  }, []);
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Global type definition for the toast function
declare global {
  interface Window {
    showToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  }
}