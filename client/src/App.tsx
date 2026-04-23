import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import { Navbar } from "./components/Navbar";
import { AppNavbar } from "./components/AppNavbar";
import { Footer } from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Industries } from "./pages/Industries";
import { CaseStudies } from "./pages/CaseStudies";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { ESGCalculator } from "./pages/ESGCalculator";

const LayoutManager = () => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const isAuthenticated = !!user;

  if (loading) {
    return (
      <div className="h-screen w-full bg-[color:var(--bg-base)] flex items-center justify-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">
          Initializing Crux...
        </div>
      </div>
    );
  }

  const isAuthPage = pathname === "/auth";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && (isAuthenticated ? <AppNavbar /> : <Navbar />)}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/esg-calculator"
            element={
              <ProtectedRoute>
                <ESGCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />
            }
          />
        </Routes>
      </main>

      {!isAuthenticated && !isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <LayoutManager />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
