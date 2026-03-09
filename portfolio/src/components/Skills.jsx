/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/animations";
import { apiUrl } from "../utils/api";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const res = await fetch(apiUrl("/api/skills"));
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="bg-white py-16 transition-colors dark:bg-slate-950 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="mb-10 text-2xl font-bold text-center sm:text-3xl">Skills</h2>

        {Object.keys(groupedSkills).map((category) => (
          <div
            key={category}
            className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/60 md:p-6"
          >
            <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-slate-100 md:text-lg">
              {category}
            </h3>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {groupedSkills[category].map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="flex min-h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                >
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
