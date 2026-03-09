import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { fadeUp } from "../utils/animations";

const ROLES = [
  "Full Stack Software Developer",
  "Web3 Developer",
];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const atWordEnd = !isDeleting && displayedText === currentRole;
    const atWordStart = isDeleting && displayedText === "";
    const delay = atWordEnd ? 900 : isDeleting ? 45 : 95;

    const timer = setTimeout(() => {
      if (atWordEnd) {
        setIsDeleting(true);
        return;
      }

      if (atWordStart) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        return;
      }

      setDisplayedText((prev) =>
        isDeleting
          ? currentRole.slice(0, prev.length - 1)
          : currentRole.slice(0, prev.length + 1),
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        
        <div className="dark:hidden">
          <motion.div
            className="absolute -top-28 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-slate-300/35 blur-3xl"
            animate={{ x: [0, 12, 0], y: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gray-300/30 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
            transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-28 top-1/4 h-72 w-72 rounded-full bg-gray-200/35 blur-3xl"
            animate={{ x: [0, -14, 0], y: [0, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
        </div>

        
        <div className="hidden dark:block">
          <motion.div
            className="absolute -top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
            animate={{ x: [0, 8, 0], y: [0, 10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-36 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={{ x: [0, 16, 0], y: [0, -14, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-slate-300/10 blur-3xl"
            animate={{ x: [0, -14, 0], y: [0, 12, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/30" />
        </div>
      </motion.div>
      <Container>
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.16 } },
          }}
        >
          

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            Hi, I&apos;m Uday
            <span className="mt-4 block min-h-[3.2rem] text-2xl md:text-3xl font-semibold text-gray-500 dark:text-gray-300">
              {displayedText}
              <span className="ml-1 inline-block w-[1ch] animate-pulse text-gray-900 dark:text-white">
                |
              </span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Full-Stack Developer building scalable web, AI, and Web3 applications.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              View Projects
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-xl border border-gray-300 bg-white/80 px-8 py-3 font-medium text-gray-800 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              Let&apos;s Connect
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <p>Full-Stack Web Developer</p>
            <p>Blockchain and AI Enthusiast</p>
            <p>Building Scalable Applications</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
