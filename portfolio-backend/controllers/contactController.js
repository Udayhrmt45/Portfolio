import db from "../config/db.js";


export const getContacts = async (req, res) => {
  try {

    const [contacts] = await db.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );

    res.status(200).json(contacts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};



export const createContact = async (req, res) => {
  try {

    const { name, email, message } = req.body;

    await db.query(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(201).json({
      message: "Contact message sent successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to send contact message"
    });
  }
};



export const deleteContact = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM contacts WHERE id = ?",
      [id]
    );

    res.status(200).json({
      message: "Contact message deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete message"
    });
  }
};