import './globals.css';
import { Inter } from 'next/font/google';

// Load Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CookieBliss - Delightful Cookies Crafted With Love',
  description: 'Experience the perfect blend of tradition and innovation in every bite. Our cookies are handcrafted using premium ingredients and family recipes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Playfair Display and Poppins fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}