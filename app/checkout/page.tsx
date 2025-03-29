"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/app/components/ui/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError("Por favor, forneça um email válido.");
      return;
    }
    
    // Proceed to payment
    router.push(`/checkout/payment?email=${encodeURIComponent(email)}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Adicione alguns produtos antes de prosseguir para o checkout.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="bg-gray-800 dark:bg-gray-700 text-white py-2 px-6 rounded-md"
          >
            Voltar para a loja
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Checkout
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Customer information */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Informações do Cliente
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="seu-email@exemplo.com"
                  required
                />
                {emailError && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-1">{emailError}</p>
                )}
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Você receberá a confirmação do pedido neste email.
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Método de Pagamento
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pix"
                      name="payment_method"
                      checked
                      readOnly
                      className="h-5 w-5 text-gray-800 dark:text-gray-300"
                    />
                    <label htmlFor="pix" className="ml-3 text-gray-700 dark:text-gray-300">
                      PIX
                    </label>
                    <img 
                      src="/pix-logo.png" 
                      alt="PIX" 
                      className="h-8 ml-auto" 
                    />
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
              >
                Continuar para pagamento
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-96">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Resumo do Pedido
            </h2>
            
            <div className="max-h-80 overflow-y-auto mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-sm font-medium text-gray-800 dark:text-gray-200">
                      <h3 className="truncate">{item.product.name}</h3>
                      <p className="ml-1">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mb-2">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mb-2">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-800 dark:text-gray-200 font-bold text-lg mt-4">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}