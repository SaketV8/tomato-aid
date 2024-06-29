import { AuthProvider } from "./context/AuthContext";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/container.css";

// import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn NextJs and Appwrite",
  description: "sample project for learning by doing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <NavBar />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
