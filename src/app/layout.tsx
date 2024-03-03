import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geo-Science",
  description: "Geo-Science Sample Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/" className="relative">
          {" "}
          <div className="fixed h-10 w-10 md:h-14 md:w-14  mx-12 mt-1 md:mx-24 md:mt-2">
            <img src="/Bengal.png" className=""></img>
          </div>
        </Link>
        {children}
      </body>
    </html>
  );
}
