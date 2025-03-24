"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import container1 from "@/public/ct1.png";
import container2 from "@/public/ct2.png";
import container3 from "@/public/ct3.png";

export default function Hero1() {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Combined itemVariants with border animation
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { 
      scale: 1.05, 
      borderColor: "rgba(255, 255, 255, 0.8)",
      transition: { duration: 0.3 }
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-[1200px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Banner */}
      <motion.div
        className="md:col-span-2 relative bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 transition-all"
        variants={itemVariants}
        whileHover="hover"
      >
        <Image src={container1} alt="Pods NX" className="w-full h-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-75"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6">
          <motion.h2
            className="text-gray-100 text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Pods
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg font-medium mb-6 hidden sm:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Variações de Pods.
          </motion.p>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              href="/shop/mi-pod"
              className="bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition"
            >
              Compre Agora
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column - Smaller Banners */}
      <div className="grid grid-cols-1 gap-6">
        {/* Banner 1 */}
        <motion.div
          className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg border-2 border-gray-600 transition-all"
          variants={itemVariants}
          whileHover="hover"
        >
          <Image src={container3} alt="Pods NX" className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-transparent opacity-75"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4">
            <motion.h3
              className="text-gray-100 text-xl font-bold mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Nic-Salts 30mg/50mg
            </motion.h3>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/shop/lower-nicotine"
                className="bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition"
              >
                Compre Agora
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Banner 2 */}
        <motion.div
          className="relative bg-gray-600 rounded-lg overflow-hidden shadow-lg border-2 border-gray-500 transition-all"
          variants={itemVariants}
          whileHover="hover"
        >
          <Image src={container2} alt="Pods NX" className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-transparent opacity-75"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4">
            <motion.h3
              className="text-gray-100 text-xl font-bold mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Descartáveis
            </motion.h3>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/shop/zimo"
                className="bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition"
              >
                Compre Agora
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}