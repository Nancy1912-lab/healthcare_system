import db from "../config/db.js";

// 🔹 ADD PRESCRIPTION
export const addPrescription = (req, res) => {
  const { appointment_id, diagnosis, medicines, notes } = req.body;

  if (!appointment_id || !diagnosis || !medicines || medicines.length === 0) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  const queries = medicines.map((med) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO PRESCRIPTION 
        (appointment_id, medicine, dosage, duration, diagnosis, notes)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          appointment_id,
          med.name,
          med.dosage,
          med.duration,
          diagnosis,
          notes
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  });

  Promise.all(queries)
    .then(() => {
      res.json({ message: "Prescription saved successfully ✅" });
    })
    .catch((err) => {
      console.error("INSERT ERROR:", err);
      res.status(500).json({ message: "Database error ❌" });
    });
};

// 🔹 GET PATIENT PRESCRIPTIONS
export const getPatientPrescriptions = (req, res) => {
  const { patient_id } = req.params;

  const sql = `
SELECT 
  p.prescription_id,
  p.appointment_id,
  p.medicine,
  p.dosage,
  p.duration,
  p.diagnosis,
  p.notes,

  d.name AS doctor_name,
  s.name AS specialization

FROM PRESCRIPTION p
JOIN APPOINTMENT a ON p.appointment_id = a.appointment_id
JOIN DOCTOR d ON a.doctor_id = d.doctor_id
JOIN SPECIALIZATION s ON d.specialization_id = s.specialization_id

WHERE a.patient_id = ?
ORDER BY p.prescription_id DESC
`;
db.query(sql, [patient_id], (err, results) => {
    if (err) {
      console.error("GET PRESCRIPTIONS ERROR:", err);
      return res.status(500).json({ message: "Database error ❌" });
    }

    res.json(results);
  });
};
