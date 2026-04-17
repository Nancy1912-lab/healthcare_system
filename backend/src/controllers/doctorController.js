import db from "../config/db.js";


// ➕ ADD DOCTOR
export const addDoctor = (req, res) => {
  const { name, experience, phone, email, password, specialization_id } = req.body;

  if (!name || !email || !specialization_id) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const sql = `
    INSERT INTO doctor (name, experience, phone, email, password, specialization_id)
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



// 📥 GET ALL DOCTORS (NO PASSWORD)
export const getAllDoctors = (req, res) => {
  const sql = `
    SELECT 
      d.doctor_id,
      d.name,
      d.experience,
      d.phone,
      d.email,
      s.name AS specialization
    FROM doctor d
    LEFT JOIN specialization s 
    ON d.specialization_id = s.specialization_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};



// 📄 GET SINGLE DOCTOR (NO PASSWORD)
export const getDoctor = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      d.doctor_id,
      d.name,
      d.experience,
      d.phone,
      d.email,
      s.name AS specialization
    FROM doctor d
    LEFT JOIN specialization s 
    ON d.specialization_id = s.specialization_id
    WHERE d.doctor_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(results[0]);
  });
};



// ✏️ UPDATE DOCTOR
export const updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, experience, phone, email, password, specialization_id } = req.body;

  const sql = `
    UPDATE doctor
    SET name = ?, experience = ?, phone = ?, email = ?, password = ?, specialization_id = ?
    WHERE doctor_id = ?
  `;

  db.query(
    sql,
    [name, experience, phone, email, password, specialization_id, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Doctor updated successfully" });
    }
  );
};



// ❌ DELETE DOCTOR
export const deleteDoctor = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM doctor WHERE doctor_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Doctor deleted successfully" });
    }
  );
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const getDoctorsBySpecialization = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT * FROM DOCTOR 
    WHERE specialization_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.json(result);
  });
};