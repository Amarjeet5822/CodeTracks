import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar, FooterPage } from './components/index';
import { useEffect } from 'react';
import { LandingPage } from './pages/index';
import { useSelector } from 'react-redux';


function App() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.authUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // ✅ Check if current path is one of the public full-screen pages
  const fullPageRoutes = ['/', '/login', '/register'];
  const isFullPage = fullPageRoutes.includes(location.pathname);

  // 🔁 1. If full page (Landing/Login/Register), just show that without navbar/footer
  if (isFullPage) {
    if (location.pathname === '/') return <LandingPage />;
    return <Outlet />; // this will render Login or Register
  }

  // 🔁 2. If authenticated, show layout with Navbar, Outlet, Footer
  if (isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <div className="sticky top-0 z-50 bg-white w-full shadow-sm">
          <div className="max-w-full mx-auto">
            <Navbar />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
            <FooterPage />
          </div>
        </footer>
      </div>
    );
  }

  // 👇 Catch for non-authenticated users trying to access protected routes
  return <LandingPage />;
}

export default App;
