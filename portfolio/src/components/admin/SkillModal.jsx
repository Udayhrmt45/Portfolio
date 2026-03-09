/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CategoryManager from "./CategoryManager";
import { apiUrl } from "../../utils/api";

const SkillModal = ({ close, refresh, existing }) => {
  const token = localStorage.getItem("token");
  const inputClassName =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-gray-100";

  const [name, setName] = useState(existing?.name || "");
  const [displayOrder] = useState(existing?.display_order || 0);
  const [categoryId, setCategoryId] = useState(existing?.category_id || "");

  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const [openCategoryManager, setOpenCategoryManager] = useState(false);

  

  const fetchCategories = async () => {
    const res = await fetch(apiUrl("/api/skill-categories"));
    const data = await res.json();

    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  

  const handleCreateCategory = async () => {
    if (!newCategory) return;

    await fetch(apiUrl("/api/skill-categories/create"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCategory }),
    });

    setNewCategory("");
    setShowCategoryInput(false);

    await fetchCategories();
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = existing ? "PUT" : "POST";
    const url = existing
      ? apiUrl(`/api/skills/${existing.id}`)
      : apiUrl("/api/skills/create");

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        category_id: categoryId,
        display_order: displayOrder,
      }),
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">
          {existing ? "Edit Skill" : "Create Skill"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          

          <div>
            <label htmlFor="skill-name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skill Name
            </label>
            <input
              id="skill-name"
              placeholder="Enter skill name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClassName}
            />
          </div>

          

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Category
            </label>

            <div className="flex gap-3 mt-2">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowCategoryInput(true)}
                className="border px-4 rounded-lg hover:bg-gray-100"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => setOpenCategoryManager(true)}
                className="text-sm text-blue-600"
              >
                Manage
              </button>
            </div>
          </div>

          

          {showCategoryInput && (
            <div>
              <label htmlFor="new-category" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Category Name
              </label>
              <div className="flex gap-3">
                <input
                  id="new-category"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-gray-100"
                />

                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="bg-black text-white px-4 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {openCategoryManager && (
            <CategoryManager close={() => setOpenCategoryManager(false)} />
          )}

          

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={close}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillModal;
