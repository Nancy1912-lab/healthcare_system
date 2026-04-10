import db from "../config/db.js";

export const getPatientProfile = (req, res) => {
  const patientId = req.user.id; // from JWT

  const sql = `
  SELECT p.patient_id, p.name, p.email, p.phone, p.age, p.gender,
         b.type AS blood_group
  FROM PATIENT p
  LEFT JOIN BLOOD_GROUP b
  ON p.blood_group_id = b.blood_group_id
  WHERE p.patient_id = ?
`;

  db.query(sql, [patientId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Patient not found ❌" });
    }

    res.json(result[0]);
  });
};