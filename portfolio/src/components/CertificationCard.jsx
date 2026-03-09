import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations.js";

const CertificationCard = ({ title, issuer, year, image, document_link }) => {
  const formatUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      

      {image && (
        <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">
          {issuer} • {year}
        </p>

        {document_link && (
          <a
            href={formatUrl(document_link)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            View Certificate
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificationCard;
