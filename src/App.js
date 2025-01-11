import logo from './logo.svg';
import './App.css';
import RegisterForm from './pages/register/registerform';
import Home from './pages/home/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './componnets/nav/nav';
function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
