import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KeenKeeper - Friendship Manager",
  description: "Keep track of your meaningful connections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8FAFC]`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}