import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileAd } from '../components/layout/MobileAd';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { ScrollToTopOnNavigate } from '../components/layout/ScrollToTopOnNavigate';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopOnNavigate />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileAd />
      <ScrollToTop />
    </div>
  );
}
