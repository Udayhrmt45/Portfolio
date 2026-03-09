// eslint-disable-next-line no-unused-vars
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {

  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-100"
    />
  );

};

export default ScrollProgress;