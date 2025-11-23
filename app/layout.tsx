import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Suellen Karin Oliveira Doy - Senior Software Engineer",
    template: "%s | Suellen Karin Oliveira Doy",
  },
  description:
    "Senior Software Engineer specializing in Java, Kotlin, Spring Boot, and blockchain systems",
  keywords: [
    "Software Engineer",
    "Java",
    "Kotlin",
    "Spring Boot",
    "Blockchain",
    "Corda",
    "Developer Portfolio",
  ],
  authors: [{ name: "Suellen Karin Oliveira Doy" }],
  creator: "Suellen Karin Oliveira Doy",
  publisher: "Suellen Karin Oliveira Doy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suellen-portfolio.vercel.app",
    title: "Suellen Karin Oliveira Doy - Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in Java, Kotlin, Spring Boot, and blockchain systems",
    siteName: "Suellen Karin Oliveira Doy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suellen Karin Oliveira Doy - Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in Java, Kotlin, Spring Boot, and blockchain systems",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
