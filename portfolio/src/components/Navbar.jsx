import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Code2 } from "lucide-react";

const sections = [
  "home",
  "about",
  "skills",
  "projects",
  "certifications",
  "contact",
];

const Navbar = ({ toggleTheme, darkMode }) => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-gray-900 dark:text-slate-50">
        
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Code2 size={20} className="text-gray-700 dark:text-slate-200" />
          <span>Uday.dev</span>
        </Link>

        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {location.pathname === "/" &&
            sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition duration-300 ${
                  active === section
                    ? "text-black dark:text-white"
                    : "text-gray-500 hover:text-black dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {section}
              </a>
            ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          
          
        </div>

        
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-2xl leading-none text-gray-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      
      {open && (
        <div className="border-b border-gray-100 bg-white px-6 pb-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {location.pathname === "/" &&
            sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="block py-2 capitalize text-gray-600 dark:text-slate-300"
                onClick={() => setOpen(false)}
              >
                {section}
              </a>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
