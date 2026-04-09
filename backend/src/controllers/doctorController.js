import db from "../config/db.js";

// ➕ Add Doctor
export const addDoctor = (req, res) => {
  const { name, experience, phone, email, password, specialization_id } = req.body;

  const sql = `
    INSERT INTO DOCTOR (name, experience, phone, email, password, specialization_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, experience, phone, email, password, specialization_id],
    (err, result) => {
      if (err) {
        console.error(err);

        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }

        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        message: "Doctor added successfully",
        doctor_id: result.insertId
      });
    }
  );
};

// 📥 Get All Doctors
export const getAllDoctors = (req, res) => {
  db.query("SELECT * FROM DOCTOR", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// 📄 Get Single Doctor
export const getDoctor = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM DOCTOR WHERE doctor_id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.json(results[0]);
    }
  );
};

// ✏️ Update Doctor
export const updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, experience, phone, email, password, specialization_id } = req.body;

  const sql = `
    UPDATE DOCTOR
    SET name=?, experience=?, phone=?, email=?, password=?, specialization_id=?
    WHERE doctor_id=?
  `;

  db.query(
    sql,
    [name, experience, phone, email, password, specialization_id, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Doctor updated successfully" });
    }
  );
};

// ❌ Delete Doctor
export const deleteDoctor = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM DOCTOR WHERE doctor_id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Doctor deleted successfully" });
    }
  );
};