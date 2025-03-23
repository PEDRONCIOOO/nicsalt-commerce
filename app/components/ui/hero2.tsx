"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Categories } from "@/api/categories/categories";

// Import your category images
import podsImage from "@/public/pods-catego.png";
import nicSaltImage from "@/public/nicsalt.png";
import vapesImage from "@/public/vape.png";
import juicesImage from "@/public/juice.png";

const categoryImages: Record<string, StaticImageData> = {
  Pods: podsImage,
  Salt: nicSaltImage,
  Vapes: vapesImage,
  Juices: juicesImage,
};

export default function Hero2() {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.05 },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.75, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-[1200px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Middle Text */}
      <motion.div
        className="col-span-full text-center mb-6"
        variants={headingVariants}
      >
        <h2 className="text-3xl font-extrabold tracking-wide text-gray-800 dark:text-gray-300 uppercase">
          MELHORES CATEGORIAS
        </h2>
      </motion.div>

      {Categories.map((category) => (
        <motion.div
          key={category.id}
          className="relative bg-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-between h-64"
          variants={itemVariants}
          whileHover="hover"
        >
          {/* Image */}
          <motion.div
            className="w-3/4 h-3/4 flex items-center justify-center mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={categoryImages[category.name]}
              alt={category.name}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"
            variants={overlayVariants}
          ></motion.div>

          {/* Content */}
          <motion.div
            className="absolute bottom-0 w-full flex flex-col items-center p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-gray-100 text-xl font-bold mb-2 text-center">
              {category.name}
            </h3>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={category.href}
                className="bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-gray-200 transition"
              >
                Ver Categoria
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}