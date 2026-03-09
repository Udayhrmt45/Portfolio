import db from "../config/db.js";

export const getSkills = async (req, res) => {

  const [skills] = await db.query(`
    SELECT skills.*, skill_categories.name AS category
    FROM skills
    JOIN skill_categories
    ON skills.category_id = skill_categories.id
    ORDER BY skill_categories.id ASC
  `);

  res.json(skills);
};

export const createSkill = async (req, res) => {

  const { name, category_id, display_order } = req.body;

  await db.query(
    "INSERT INTO skills (name, category_id, display_order) VALUES (?, ?, ?)",
    [name, category_id, display_order]
  );

  res.json({ message: "Skill created" });
};

export const updateSkill = async (req, res) => {

  const { name, category_id } = req.body;
  const { id } = req.params;

  await db.query(
    "UPDATE skills SET name=?, category_id=? WHERE id=?",
    [name, category_id, id]
  );

  res.json({ message: "Skill updated" });
};

export const deleteSkill = async (req, res) => {
    const {id} = req.params;
    await db.query("DELETE FROM skills WHERE id = ?", [id]);
    res.json({message: "Skill deleted"});
}

export const reorderSkills = async (req, res) => {

  const { skills, category_id } = req.body;

  for (let i = 0; i < skills.length; i++) {

    await db.query(
      "UPDATE skills SET display_order=? WHERE id=? AND category_id=?",
      [i + 1, skills[i], category_id]
    );

  }

  res.json({ message: "Skill order updated" });

};
