import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Industries from "./pages/Industries";
// import CaseStudies from "./pages/CaseStudies";
// import Blog from "./pages/Blog";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ESGCalculator from "./pages/ESGCalculator";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} /> */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/esg-calculator"
              element={
                <ProtectedRoute>
                  <ESGCalculator />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
