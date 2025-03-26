import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "./components/layout/header";
import { CartProvider } from "./components/ui/CartContext";
import { ToastContainer } from "./components/ui/toastSucess";
import { AnimationManager } from "./components/ui/addToCartAnimated";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TROTTA - Nic-Salt e Pods",
  description: "Uma grande variedade de produtos de nicotina de alta qualidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <AnimationManager>
            <Header />
            <main>{children}</main>
            <ToastContainer />
            </AnimationManager>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
