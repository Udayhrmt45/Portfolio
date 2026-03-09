import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";

const CategoryManager = ({ close }) => {

  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  const fetchCategories = async () => {

    const res = await fetch(apiUrl("/api/skill-categories"));
    const data = await res.json();

    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = async (id) => {

    await fetch(apiUrl(`/api/skill-categories/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    setEditingId(null);
    setName("");

    fetchCategories();
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this category?")) return;

    await fetch(apiUrl(`/api/skill-categories/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchCategories();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white dark:bg-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-lg">

        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Manage Categories
          </h2>

          <button onClick={close}>✕</button>
        </div>

        <div className="space-y-4">

          {categories.map((cat) => (

            <div
              key={cat.id}
              className="flex items-center justify-between border p-3 rounded-lg"
            >

              {editingId === cat.id ? (

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg w-full dark:bg-gray-900 dark:text-gray-100"
                />

              ) : (

                <span>{cat.name}</span>

              )}

              <div className="flex gap-3 ml-4">

                {editingId === cat.id ? (

                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="text-green-600"
                  >
                    Save
                  </button>

                ) : (

                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setName(cat.name);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                )}

                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default CategoryManager;
