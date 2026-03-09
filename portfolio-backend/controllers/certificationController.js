import db from "../config/db.js";

export const getCertifications = async (req, res) => {
    const [certifications] = await db.query("SELECT * FROM certifications ORDER BY created_at DESC");
    res.json(certifications);
  };

  export const createCertification = async (req, res) => {

    try {
      console.log("BODY", req.body);
      const { title, issuer, year } = req.body;
  
      const image = req.files?.image?.[0]?.path || null;
      const document_link = req.files?.document?.[0]?.path || null;
  
      await db.query(
        "INSERT INTO certifications (title, issuer, year, image, document_link) VALUES (?, ?, ?, ?, ?)",
        [title, issuer, year, image, document_link]
      );
  
      res.json({ message: "Certification created successfully" });
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ message: "Failed to create certification" });
  
    }
  
  };

  export const updateCertification = async (req, res) => {

    try {
  
      const { id } = req.params;
      const { title, issuer, year } = req.body;
  
      const image = req.files?.image?.[0]?.path;
      const document_link = req.files?.document?.[0]?.path;
  
      await db.query(
        `UPDATE certifications
         SET title=?, issuer=?, year=?, image=?, document_link=?
         WHERE id=?`,
        [title, issuer, year, image, document_link, id]
      );
  
      res.json({ message: "Certification updated successfully" });
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ message: "Update failed" });
  
    }
  
  };

export const deleteCertification = async (req, res) => {
    const {id} = req.params;
    await db.query("DELETE FROM certifications WHERE id = ?", [id]);
    res.status(201).json({message : "Certification deleted"});
}

