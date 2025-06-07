import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import '../styles/variables.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '../context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900']
});

export const metadata = {
  title: 'CookieBliss | Artisan Cookie Delights',
  description: 'Experience the perfect blend of tradition and innovation in every bite. Our cookies are handcrafted using premium ingredients and family recipes.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}