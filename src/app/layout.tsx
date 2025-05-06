import { ReactNode } from "react";

import Header from "../components/header";
import Footer from "../components/footer";

import "./globals.css";

export default function RootLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
