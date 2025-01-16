import './App.css';
import RegisterForm from './pages/register/registerform';
import Home from './pages/home/home';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Nav from './componnets/nav/nav';
import Footer from './componnets/footer/footer';
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from 'react';
import UserDetails from './pages/status/status';
import ParticipantDetails from './pages/admin/participantDetails/participantDetails';
import Login from './pages/admin/login/login.jsx/login';


export const ROUTENAME = {
  REGISTER: 'register',
  STATUS: 'status',
  LOGIN: 'login',
  PARTICIPANTS: 'participants',
}

export const ROUTES = {
  HOME: '/',
  REGISTER: `/${ROUTENAME.REGISTER}`,
  STATUS: `/${ROUTENAME.STATUS}`,
  LOGIN: `/${ROUTENAME.LOGIN}`,
  PARTICIPANTS: `/${ROUTENAME.PARTICIPANTS}`,
}



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
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTENAME.REGISTER} element={<RegisterForm />} />
        <Route path={`${ROUTENAME.STATUS}/:id`} element={<UserDetails />} />
        <Route path={ROUTENAME.LOGIN} element={<Login />} />
        <Route
          path={ROUTENAME.PARTICIPANTS}
          element={<ProtectedRoute element={<ParticipantDetails />} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
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




export function ProtectedRoute({ element: Component, ...rest }) {
  const token = sessionStorage.getItem('token'); // Adjust token storage location as needed

  return token ? (
    Component
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
}
