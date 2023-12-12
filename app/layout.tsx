import { Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css'

// TODO Edit MetaDeta
export const metadata: Metadata = {
  title: 'Wise Spend',
  description: 'Spend Your Money Wisely',
}
const open = Open_Sans({
  subsets: ['latin'],
  weight: ['700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${open.className} antialiased bg-0`}>
        {children}
      </body>
    </html>
  )
}
