import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Account Template",
  description: "Account based project template",
  metadataBase: new URL("https://dev.salamski.com"),
  manifest: new URL("https://dev.salamski.com/manifest.json"),
};
const open = Open_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${open.className} bg-dark-100 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
