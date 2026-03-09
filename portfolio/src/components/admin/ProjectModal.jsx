import { useState } from "react";
import { apiUrl } from "../../utils/api";

const ProjectModal = ({ close, refresh, existing }) => {
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [tech, setTech] = useState(existing?.tech || "");
  const [link, setLink] = useState(existing?.link || "");
  const [image, setImage] = useState(null);
  const existingImage = existing?.image || "";
  const [github, setGithub] = useState(existing?.github || "");

  const token = localStorage.getItem("token");
  const inputClassName =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-gray-100";

  const normalizeUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = existing ? "PUT" : "POST";
    const url = existing
      ? apiUrl(`/api/projects/${existing.id}`)
      : apiUrl("/api/projects/create");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("tech", tech);
      formData.append("link", normalizeUrl(link));
      formData.append("github", normalizeUrl(github));
    
      if (image) {
        formData.append("image", image);
      }

      

      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">
          {existing ? "Edit Project" : "Create Project"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="project-title" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Title
            </label>
            <input
              id="project-title"
              placeholder="Enter project title"
              className={inputClassName}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-description" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="project-description"
              placeholder="Enter project description"
              className={inputClassName}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-tech" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Technologies
            </label>
            <input
              id="project-tech"
              placeholder="Tech stack (comma separated)"
              className={inputClassName}
              value={tech}
              onChange={(e) => setTech(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-link" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Link
            </label>
            <input
              id="project-link"
              placeholder="Enter live project URL"
              className={inputClassName}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="project-image" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Image
            </label>
            <input
              id="project-image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="project-github" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              GitHub Link
            </label>
            <input
              id="project-github"
              placeholder="Enter repository URL"
              className={inputClassName}
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          {image && (
            <p className="text-sm text-gray-500 mt-2">Selected: {image.name}</p>
          )}

          {!image && existingImage && (
            <p className="text-sm text-gray-500 mt-2">
              Current: {existingImage.split("/").pop()}
            </p>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
