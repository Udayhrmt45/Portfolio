import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons/SocialIcons";
import Container from "./Container";
import { apiUrl } from "../utils/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(apiUrl("/api/contact/create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="py-28 bg-gray-50 transition-colors dark:bg-slate-900"
    >
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12">Contact</h2>

          <div className="grid md:grid-cols-2 gap-12">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Send Message
              </button>

              {status && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {status}
                </p>
              )}
            </form>

            
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300">
                You can also connect with me through these platforms.
              </p>

              <div className="flex gap-6">
                <a
                  href="https://github.com/Udayhrmt45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-700"
                >
                  <GithubIcon />
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/uday-hiremath-45ln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-700"
                >
                  <LinkedinIcon />
                  LinkedIn
                </a>

                <a
                  href="mailto:udayhrmt90@gmail.com"
                  className="flex items-center gap-2 hover:text-gray-700"
                >
                  <MailIcon />
                  Email
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;
