import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 min-h-screen p-6">
      <h2 className="text-xl font-semibold mb-8">Admin</h2>

      <nav className="space-y-3 text-sm font-medium">
        <NavLink
          to="/admin?tab=skills"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Skills
        </NavLink>

        <NavLink
          to="/admin?tab=projects"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Projects
        </NavLink>

        <NavLink
          to="/admin?tab=certifications"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Certifications
        </NavLink>

        <NavLink
          to="/admin?tab=inbox"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Inbox
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
