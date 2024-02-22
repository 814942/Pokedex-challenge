import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PokemonProvider } from "@/context/data.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Natural Tech House challengue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
