import { useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-lg font-semibold tracking-tight">
        Portfolio Admin
      </h1>

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          View Site
        </button>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default AdminTopbar;