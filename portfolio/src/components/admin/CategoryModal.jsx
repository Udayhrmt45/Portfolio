import { useState } from "react";
import { apiUrl } from "../../utils/api";

const CategoryModal = ({ close, refresh }) => {

  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const inputClassName =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-gray-100";

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(apiUrl("/api/skill-categories/create"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h3 className="text-xl font-semibold mb-6">
          Add Category
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="category-name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category Name
            </label>
            <input
              id="category-name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClassName}
            />
          </div>

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
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CategoryModal;
