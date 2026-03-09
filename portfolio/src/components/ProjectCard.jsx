// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

const ProjectCard = ({ title, description, tech, link, image, github }) => {
  const formatUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>

        <p className="mb-4 text-gray-600 dark:text-slate-300">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tech?.map((item, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-slate-700"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {github && (
            <a
              href={formatUrl(github)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              GitHub
            </a>
          )}

          {link && (
            <a
              href={formatUrl(link)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
