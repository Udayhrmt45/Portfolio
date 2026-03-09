import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificateModal from "./CertificateModal";

const CertificationCarousel = ({ certifications }) => {
  const [index, setIndex] = useState(0);
  const [preview, setPreview] = useState(null);
  const [direction, setDirection] = useState(1);
  const total = certifications?.length ?? 0;

  const formatUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  useEffect(() => {
    if (total <= 1 || preview) return undefined;

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total, preview]);

  if (!certifications || total === 0) return null;

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const cert = certifications[index];
  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
    }),
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={cert.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <div
            className="relative h-64 bg-gray-50 flex items-center justify-center p-4 cursor-pointer dark:bg-slate-900"
            onClick={() => setPreview(cert.image)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">
              {cert.issuer} • {cert.year}
            </p>
            {cert.document_link && (
              <a
                href={formatUrl(cert.document_link)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                View Certificate
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-full w-10 h-10 shadow flex items-center justify-center"
        aria-label="Previous certification"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-full w-10 h-10 shadow flex items-center justify-center"
        aria-label="Next certification"
      >
        ›
      </button>

      <div className="flex justify-center mt-4 gap-2">
        {certifications.map((item, dotIndex) => (
          <button
            key={item.id ?? dotIndex}
            onClick={() => {
              setDirection(dotIndex > index ? 1 : -1);
              setIndex(dotIndex);
            }}
            className={`h-2.5 rounded-full transition-all ${
              dotIndex === index
                ? "w-6 bg-black dark:bg-white"
                : "w-2.5 bg-gray-300 dark:bg-slate-600"
            }`}
            aria-label={`Go to certification ${dotIndex + 1}`}
          />
        ))}
      </div>

      <CertificateModal image={preview} onClose={() => setPreview(null)} />
    </div>
  );
};

export default CertificationCarousel;
