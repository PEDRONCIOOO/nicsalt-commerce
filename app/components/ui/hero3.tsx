"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Products, Product } from "@/api/products/products";
import { useCart } from "./CartContext";

export default function Hero3() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState(250);
  //cart
  const { addToCart } = useCart();

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(Products.map((product) => product.category))),
  ];

  useEffect(() => {
    let result = [...Products];

    result = result.filter((product) => product.price <= priceRange);

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [searchTerm, activeCategory, sortOption, priceRange]);

  // Handle modal open/close
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = "unset";
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      // Make sure to re-enable scrolling when component unmounts
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const maxPrice = Math.ceil(
    Math.max(...Products.map((product) => product.price))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const panelVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const searchVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Modal animation variants
  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { delay: 0.2, duration: 0.3 } },
  };

  const modalVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      rotate: -5,
      y: 100,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        duration: 0.5,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotate: 5,
      y: -100,
      transition: { duration: 0.3 },
    },
  };

  // Modal content animation variants
  const modalContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const modalItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20, stiffness: 200 },
    },
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-8 items-center"
        variants={searchVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 pr-12 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="py-3 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
          >
            <option value="featured">Filtro</option>
            <option value="priceLow">Preço: Baixo p/ Alto</option>
            <option value="priceHigh">Preço: Alto p/ Baixo</option>
            <option value="name">Nome: A à Z</option>
          </select>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          className="md:w-64 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 md:sticky md:top-24 h-fit shadow-md"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Categorias
          </h3>
          <div className="space-y-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category
                    ? "bg-gray-800 dark:bg-gray-600 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Preço
            </h3>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-gray-800 dark:accent-gray-400"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>R$ 0</span>
                <span>R$ {priceRange}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-300 dark:border-gray-700">
            <motion.button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                setPriceRange(maxPrice);
                setSortOption("featured");
              }}
              className="text-gray-800 dark:text-gray-200 hover:underline text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resetar Filtros
            </motion.button>
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Produto" : "Produtos"}
              {activeCategory !== "All" ? ` em ${activeCategory}` : ""}
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchTerm + sortOption + priceRange}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      {product.featured && (
                        <motion.span
                          className="absolute top-2 left-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Destaque
                        </motion.span>
                      )}
                      <div className="w-full h-full flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105">
                        <Image
                          src={product.image}
                          alt={product.name}
                          className="max-h-full object-contain rounded-lg bg-white w-fit"
                          draggable="false"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {product.name}
                        </h3>
                        <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.flavors &&
                          product.flavors.map((flavor) => (
                            <span
                              key={flavor}
                              className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            >
                              {flavor}
                            </span>
                          ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                            {product.category}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 bg-gray-800 dark:bg-gray-700 text-white rounded-md text-sm"
                            onClick={() => openModal(product)}
                          >
                            Ver Produto
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full text-center py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium text-sm"
                          onClick={() => {
                            addToCart(product);
                            // Show toast notification
                            if (window.showToast) {
                              window.showToast(
                                `${product.name} adicionado ao carrinho!`,
                                "success"
                              );
                            }
                          }}
                        >
                          Adicionar ao Carrinho
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full flex flex-col items-center justify-center p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Nenhum produto encontrado.
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tente ajustar sua pesquisa ou os filtros.
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All");
                      setPriceRange(maxPrice);
                    }}
                    className="mt-4 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Resetar Filtros
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              variants={modalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
            >
              {/* Modal Content */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="p-6"
                  variants={modalContentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Close button */}
                  <div className="flex justify-end">
                    <motion.button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <motion.div
                      className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-[300px]"
                      variants={modalItemVariants}
                    >
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="max-h-full object-contain rounded-lg"
                        width={400}
                        height={400}
                      />
                    </motion.div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <motion.div
                          variants={modalItemVariants}
                          className="flex justify-between items-start mb-1"
                        >
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                              {selectedProduct.name}
                            </h2>
                            <div className="flex items-center mt-1">
                              <span className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 mr-2">
                                {selectedProduct.category}
                              </span>
                              {selectedProduct.featured && (
                                <span className="px-2 py-1 text-xs rounded bg-yellow-600 text-white">
                                  Produto em Destaque
                                </span>
                              )}
                            </div>
                          </div>
                          <motion.div
                            variants={modalItemVariants}
                            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
                          >
                            R$ {selectedProduct.price.toFixed(2)}
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
                          variants={modalItemVariants}
                        >
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Descrição
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {selectedProduct.description}
                          </p>
                        </motion.div>

                        <motion.div
                          className="grid grid-cols-2 gap-4 mt-4"
                          variants={modalItemVariants}
                        >
                          {selectedProduct.nicotineStrength && (
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Nível de Nicotina
                              </h4>
                              <p className="text-gray-800 dark:text-gray-200 font-semibold">
                                {selectedProduct.nicotineStrength} mg
                              </p>
                            </div>
                          )}

                          {selectedProduct.volume && (
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Volume
                              </h4>
                              <p className="text-gray-800 dark:text-gray-200 font-semibold">
                                {selectedProduct.volume} ml
                              </p>
                            </div>
                          )}
                        </motion.div>

                        {selectedProduct.flavors &&
                          selectedProduct.flavors.length > 0 && (
                            <motion.div
                              className="mt-4"
                              variants={modalItemVariants}
                            >
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Sabores
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct.flavors.map((flavor) => (
                                  <span
                                    key={flavor}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                                  >
                                    {flavor}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}

                        {selectedProduct.colors &&
                          selectedProduct.colors.length > 0 && (
                            <motion.div
                              className="mt-4"
                              variants={modalItemVariants}
                            >
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Cores Disponíveis
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct.colors.map((color) => (
                                  <span
                                    key={color}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                                  >
                                    {color}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                      </div>

                      <motion.div className="mt-8" variants={modalItemVariants}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full text-center py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium text-sm"
                          onClick={() => {
                            addToCart(selectedProduct);
                            // Show toast notification
                            if (window.showToast) {
                              window.showToast(
                                `${selectedProduct.name} adicionado ao carrinho!`,
                                "success"
                              );
                            }
                          }}
                        >
                          Adicionar ao Carrinho
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Additional info section */}
                  <motion.div
                    className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6"
                    variants={modalItemVariants}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Informações Adicionais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          ID do Produto
                        </h4>
                        <p className="text-gray-800 dark:text-gray-200">
                          {selectedProduct.id}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Disponibilidade
                        </h4>
                        <p
                          className={`${
                            selectedProduct.inStock
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedProduct.inStock
                            ? "Em estoque"
                            : "Fora de estoque"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
