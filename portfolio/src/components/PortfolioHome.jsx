import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Contact from "./Contact";
import { motion } from "framer-motion";
import Footer from "./Footer";

const PortfolioHome = ({ toggleTheme, darkMode}) => {
    return (
      <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <div className="pt-20">
          <Hero />
          <About darkmode={darkMode} />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
        </div>
      </motion.div>
    )
  }
  
  export default PortfolioHome