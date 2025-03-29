"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/app/components/ui/CartContext";
import { createPixPayment, checkPaymentStatus } from "@/api/abacate-pay/communication";
import Image from "next/image";

interface PaymentData {
  id: string;
  expires_at: string;
  qrcode_text: string;
  qrcode_image_url: string;
  status?: string;
  metadata?: {
    order_id?: string;
  };
}

export default function PaymentPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
      return;
    }

    async function initiatePayment() {
      try {
        setLoading(true);
        const data = await createPixPayment(items, email);
        setPaymentData(data);
        
        // Calculate expiration time
        const expiresAt = new Date(data.expires_at).getTime();
        const now = new Date().getTime();
        setTimeLeft(Math.max(0, Math.floor((expiresAt - now) / 1000)));
      } catch (err) {
        setError("Falha ao criar pagamento. Por favor, tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    initiatePayment();
  }, [items, email, router]);

  // Handle countdown timer
  useEffect(() => {
    if (!timeLeft) return;
    
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  
  // Check payment status periodically
  useEffect(() => {
    if (!paymentData?.id || timeLeft === 0) return;
    
    const checkStatus = async () => {
      if (checkingStatus) return;
      
      try {
        setCheckingStatus(true);
        const status = await checkPaymentStatus(paymentData.id);
        
        if (status.status === 'paid' || status.status === 'completed') {
          // Payment successful, clear cart and redirect to success page
          clearCart();
          router.push(`/checkout/success?order_id=${status.metadata?.order_id || ''}`);
        }
        
        setCheckingStatus(false);
      } catch (err) {
        setCheckingStatus(false);
        console.error("Error checking payment status:", err);
      }
    };
    
    // Check immediately on load
    checkStatus();
    
    // Then check every 5 seconds
    const intervalId = setInterval(checkStatus, 5000);
    return () => clearInterval(intervalId);
  }, [paymentData, timeLeft, clearCart, router, checkingStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const copyToClipboard = () => {
    if (paymentData?.qrcode_text) {
      navigator.clipboard.writeText(paymentData.qrcode_text);
      if (window.showToast) {
        window.showToast("Código PIX copiado para a área de transferência!", "success");
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Gerando pagamento...</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Por favor, aguarde enquanto processamos seu pedido.</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center bg-red-100 dark:bg-red-900 p-6 rounded-lg max-w-md"
        >
          <svg className="w-12 h-12 text-red-600 dark:text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-200 mb-2">Erro no pagamento</h2>
          <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button 
            onClick={() => router.push("/checkout")}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Voltar para o checkout
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Pagamento via PIX</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Escaneie o QR code abaixo com o aplicativo do seu banco para finalizar o pagamento.
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
            {paymentData?.qrcode_image_url && (
              <div className="bg-white p-4 rounded-lg mb-4">
                <Image 
                  src={paymentData.qrcode_image_url} 
                  alt="QR Code PIX" 
                  width={250} 
                  height={250}
                  className="mx-auto"
                />
              </div>
            )}
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Tempo restante para pagamento:
              </p>
              <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 py-2 px-4 rounded-md text-xl font-mono font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Detalhes do pedido
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Valor total: <span className="font-bold text-gray-800 dark:text-gray-200">
                  R$ {total.toFixed(2)}
                </span>
              </p>
              
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Ou copie o código PIX abaixo:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={paymentData?.qrcode_text || ""}
                    className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-3 text-sm font-mono"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-800 dark:bg-gray-600 text-white px-4 rounded-r-md hover:bg-gray-700"
                  >
                    Copiar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-md">
              <h4 className="text-amber-800 dark:text-amber-200 font-semibold mb-2">
                Instruções
              </h4>
              <ol className="text-amber-700 dark:text-amber-300 list-decimal pl-4 space-y-2 text-sm">
                <li>Abra o aplicativo do seu banco</li>
                <li>Escolha a opção de pagamento por PIX</li>
                <li>Escaneie o QR code ou cole o código copiado</li>
                <li>Confirme as informações e finalize o pagamento</li>
                <li>Aguarde a confirmação automática nesta página</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={() => router.push("/checkout")}
            className="text-gray-600 dark:text-gray-400 hover:underline"
          >
            Voltar
          </button>
          
          <button
            onClick={() => {
              if (window.showToast) {
                window.showToast("Verificando status do pagamento...", "info");
              }
              if (paymentData?.id) {
                checkPaymentStatus(paymentData.id);
              }
            }}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
            disabled={checkingStatus}
          >
            {checkingStatus ? "Verificando..." : "Verifiquei o pagamento"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}