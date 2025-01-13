import logo from './logo.svg';
import './App.css';
import RegisterForm from './pages/register/registerform';
import Home from './pages/home/home';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from './componnets/nav/nav';
import Footer from './componnets/footer/footer';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
    });
  }, [])
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Nav/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<Home />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;


const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Handle smooth scrolling to specific hash
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to top for regular page changes
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null; // This component doesn't render anything
};