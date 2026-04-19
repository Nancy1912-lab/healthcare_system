import db from "../config/db.js";

// 🔹 ADD PRESCRIPTION
export const addPrescription = (req, res) => {
  const { appointment_id, diagnosis, medicines, notes } = req.body;

  if (!appointment_id || !diagnosis || !medicines) {
    return res.status(400).json({ message: "Appointment ID, Diagnosis, and Medicines are required ❌" });
  }

  const sql = `
    INSERT INTO PRESCRIPTION 
    (appointment_id, diagnosis, medicines, notes)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [appointment_id, diagnosis, medicines, notes],
    (err, result) => {
      if (err) {
        console.error("ADD PRESCRIPTION ERROR:", err);
        return res.status(500).json({ message: "Database error ❌" });
      }

      res.status(201).json({
        message: "Prescription added successfully ✅",
        prescription_id: result.insertId
      });
    }
  );
};

// 🔹 GET PATIENT PRESCRIPTIONS
export const getPatientPrescriptions = (req, res) => {
  const { patient_id } = req.params;

  const sql = `
    SELECT 
      p.prescription_id, 
      p.diagnosis, 
      p.medicines, 
      p.notes, 
      p.created_at,
      d.name as doctor_name,
      s.name as specialization
    FROM PRESCRIPTION p
    JOIN APPOINTMENT a ON p.appointment_id = a.appointment_id
    JOIN DOCTOR d ON a.doctor_id = d.doctor_id
    JOIN SPECIALIZATION s ON d.specialization_id = s.specialization_id
    WHERE a.patient_id = ?
    ORDER BY p.created_at DESC
  `;

  db.query(sql, [patient_id], (err, results) => {
    if (err) {
      console.error("GET PRESCRIPTIONS ERROR:", err);
      return res.status(500).json({ message: "Database error ❌" });
    }

    res.json(results);
  });
};
