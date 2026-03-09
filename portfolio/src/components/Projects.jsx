import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/animations";
import { apiUrl } from "../utils/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl("/api/projects"));
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-gray-50 transition-colors dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-12 text-center">
          Projects
        </h2>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No projects available.</p>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
              key={project.id}
              {...project}
              tech={project.tech?.split(",")}
            />
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Projects;
