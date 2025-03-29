"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  
  useEffect(() => {
    // If no order ID is provided, redirect to home page
    if (!orderId) {
      router.push("/");
    }
  }, [orderId, router]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-green-100 dark:bg-green-900 p-8 rounded-lg max-w-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, times: [0, 0.8, 1] }}
          className="w-20 h-20 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-4">
          Pagamento Confirmado!
        </h2>
        
        <p className="text-green-600 dark:text-green-300 mb-6">
          Seu pedido #{orderId} foi realizado com sucesso. Você receberá um e-mail com os detalhes da compra.
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Informações do pedido
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">Pedido:</span> #{orderId}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-semibold">Data:</span> {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Status:</span> Aguardando envio
          </p>
        </div>
        
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md focus:outline-none"
          >
            Continuar Comprando
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}