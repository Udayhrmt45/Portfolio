import db from "../config/db.js";

export const getProjects = async (req, res) => {
    const [projects] = await db.query("SELECT * FROM projects ORDER BY created_at DESC");
    res.json(projects);
  };

  export const createProject = async (req, res) => {

    try {
  
      const { title, description, tech, link, github } = req.body;
  
      const image = req.file?.path || null;
  
      await db.query(
        "INSERT INTO projects (title, description,tech, link, github, image) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description,tech, link, github, image]
      );
  
      res.json({ message: "Project created successfully" });
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ message: "Failed to create project" });
  
    }
  
  };
  export const updateProject = async (req, res) => {

    try {
  
      const { id } = req.params;
      const { title, description,tech, link, github } = req.body;
  
      const [existing] = await db.query(
        "SELECT image FROM projects WHERE id=?",
        [id]
      );
  
      const image = req.file?.path || existing[0].image;
  
      await db.query(
        "UPDATE projects SET title=?, description=?, tech=?, link=?, github=?, image=? WHERE id=?",
        [title, description,tech, link, github, image, id]
      );
  
      res.json({ message: "Project updated successfully" });
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ message: "Update failed" });
  
    }
  
  };

export const deleteProject = async (req, res) => {
  const {id} = req.params;
  await db.query("DELETE FROM projects WHERE id = ?", [id]);
  res.status(201).json({message : "Project deleted"});
} 

