import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "KeenKeeper - Friendship Manager",
  description: "Manage your connections effectively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FDFBF7]">
        
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}