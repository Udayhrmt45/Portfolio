import Container from "./Container.jsx";

const Footer = () => {

  return (

    <footer className="bg-white py-10 transition-colors dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800">

      <Container>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Uday Hiremath. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">

            <a href="#home" className="hover:text-black dark:hover:text-white">
              Home
            </a>

            <a href="#projects" className="hover:text-black dark:hover:text-white">
              Projects
            </a>

            <a href="#contact" className="hover:text-black dark:hover:text-white">
              Contact
            </a>

          </div>

        </div>

      </Container>

    </footer>

  );

};

export default Footer;
