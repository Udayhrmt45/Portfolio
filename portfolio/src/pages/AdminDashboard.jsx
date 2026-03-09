/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import ProjectModal from "../components/admin/ProjectModal";
import CertificationModal from "../components/admin/CertificationModal";
import SkillModal from "../components/admin/SkillModal";
import CategoryModal from "../components/admin/CategoryModal";
import SortableSkills from "../components/admin/SortableSkills";
import { apiUrl } from "../utils/api";

const AdminDashboard = ({ toggleTheme, darkMode }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "projects";

  const token = localStorage.getItem("token");

  

  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openCertModal, setOpenCertModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const [skills, setSkills] = useState([]);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [contacts, setContacts] = useState([]);

  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  

  const fetchProjects = async () => {
    const res = await fetch(apiUrl("/api/projects"));
    const data = await res.json();
    setProjects(data);
  };

  const fetchCertifications = async () => {
    const res = await fetch(apiUrl("/api/certifications"));
    const data = await res.json();
    setCertifications(data);
  };

  const fetchSkills = async () => {
    const res = await fetch(apiUrl("/api/skills"));
    const data = await res.json();
    setSkills(data);
  };

  const fetchContacts = async () => {
    const res = await fetch(apiUrl("/api/contact"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setContacts(data);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);

    return acc;
  }, {});

  useEffect(() => {
    fetchProjects();
    fetchCertifications();
    fetchSkills();
    fetchContacts();
  }, []);

  

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setOpenSkillModal(true);
  };

  const handleEditCert = (cert) => {
    setSelectedCert(cert);
    setOpenCertModal(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setOpenProjectModal(true);
  };

  

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    await fetch(apiUrl(`/api/projects/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProjects();
  };

  const handleDeleteCert = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certification?"
    );
    if (!confirmDelete) return;

    await fetch(apiUrl(`/api/certifications/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCertifications();
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    await fetch(apiUrl(`/api/skills/${id}`), {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSkills();
  };

  const handleDeleteContact = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    await fetch(apiUrl(`/api/contact/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchContacts();
  };

  

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      
      <AdminSidebar />

      
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <AdminTopbar />

        
        <div className="p-10 overflow-y-auto">
          
          {tab === "projects" && (
            <>
              <div className="grid grid-cols-3 items-center mb-8">
                <div />
                <h2 className="text-2xl font-semibold text-center">Projects</h2>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setOpenProjectModal(true);
                    }}
                    className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    + Create Project
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {projects.length === 0 && (
                  <div className="p-6 text-gray-500 dark:text-gray-400">
                    No projects available.
                  </div>
                )}

                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 border-b border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.tech}</p>
                    </div>

                    <div className="flex gap-6 text-sm">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          handleEditProject(project);
                          setOpenProjectModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {openProjectModal && (
                <ProjectModal
                  close={() => {
                    setOpenProjectModal(false);
                    setSelectedProject(null);
                  }}
                  refresh={fetchProjects}
                  existing={selectedProject}
                />
              )}
            </>
          )}

          
          {tab === "certifications" && (
            <>
              <div className="grid grid-cols-3 items-center mb-8">
                <div />
                <h2 className="text-2xl font-semibold text-center">Certifications</h2>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedCert(null);
                      setOpenCertModal(true);
                    }}
                    className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    + Add Certification
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {certifications.length === 0 && (
                  <div className="p-6 text-gray-500 dark:text-gray-400">
                    No certifications available.
                  </div>
                )}

                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-6 border-b border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{cert.title}</h3>
                      <p className="text-sm text-gray-500">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>

                    <div className="flex gap-6 text-sm">
                      <button
                        onClick={() => {
                          setSelectedCert(cert);
                          handleEditCert(cert);
                          setOpenCertModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteCert(cert.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {openCertModal && (
                <CertificationModal
                  close={() => {
                    setOpenCertModal(false);
                    setSelectedCert(null);
                  }}
                  refresh={fetchCertifications}
                  existing={selectedCert}
                />
              )}
            </>
          )}

          
          
          {tab === "skills" && (
            <>
              <div className="grid grid-cols-3 items-center mb-8">
                <div />
                <h2 className="text-2xl font-semibold text-center">Skills</h2>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedSkill(null);
                      setOpenSkillModal(true);
                    }}
                    className="bg-black text-white px-5 py-2 rounded-lg"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              {Object.keys(groupedSkills).map((category) => (
                <div key={category} className="mb-10">
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>

                  <SortableSkills
                    skills={groupedSkills[category]}
                    refresh={fetchSkills}
                    onEdit={handleEditSkill}
                    onDelete={handleDeleteSkill}
                  />
                </div>
              ))}
            </>
          )}

          {openSkillModal && (
            <SkillModal
              close={() => {
                setOpenSkillModal(false);
                setSelectedSkill(null);
              }}
              refresh={fetchSkills}
              existing={selectedSkill}
            />
          )}

          {openCategoryModal && (
            <CategoryModal
              close={() => setOpenCategoryModal(false)}
              refresh={fetchSkills}
            />
          )}

          
          {tab === "inbox" && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Inbox</h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {contacts.length === 0 && (
                  <div className="p-6 text-gray-500 dark:text-gray-400">No messages yet.</div>
                )}

                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-6 border-b border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>

                        <p className="text-sm text-gray-500">{contact.email}</p>

                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(contact.created_at).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-white leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
