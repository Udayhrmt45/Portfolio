import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PortfolioHome from './components/PortfolioHome'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login.jsx'
import ScrollProgress from "./components/ScrollProgress";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <BrowserRouter>
      <ScrollProgress/>
      <Routes>
        <Route path="/" element = {<PortfolioHome toggleTheme={toggleTheme} darkMode={darkMode}/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/admin" element = {
          <ProtectedRoute>
            <AdminDashboard toggleTheme={toggleTheme} darkMode={darkMode}/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
