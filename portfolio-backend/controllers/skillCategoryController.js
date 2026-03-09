import db from "../config/db.js";


export const getSkillCategories = async (req, res) => {

  const [categories] = await db.query(
    "SELECT * FROM skill_categories ORDER BY id ASC"
  );

  res.json(categories);
};



export const createSkillCategory = async (req, res) => {

  const { name } = req.body;

  await db.query(
    "INSERT INTO skill_categories (name) VALUES (?)",
    [name]
  );

  res.json({ message: "Category created" });
};



export const updateSkillCategory = async (req, res) => {

  const { id } = req.params;
  const { name } = req.body;

  await db.query(
    "UPDATE skill_categories SET name=? WHERE id=?",
    [name, id]
  );

  res.json({ message: "Category updated" });
};



export const deleteSkillCategory = async (req, res) => {

  const { id } = req.params;

  const [skills] = await db.query(
    "SELECT * FROM skills WHERE category_id=?",
    [id]
  );

  if (skills.length > 0) {
    return res.status(400).json({
      message: "Cannot delete category with existing skills"
    });
  }

  await db.query(
    "DELETE FROM skill_categories WHERE id=?",
    [id]
  );

  res.json({ message: "Category deleted" });
};