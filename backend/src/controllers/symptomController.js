import db from "../config/db.js";

export const getSymptoms = (req, res) => {
  const sql = `
    SELECT sm.symptom_id, sm.name, s.name as specialization
    FROM SYMPTOM_MASTER sm
    JOIN SYMPTOM_SPECIALIZATION ss ON sm.symptom_id = ss.symptom_id
    JOIN SPECIALIZATION s ON ss.specialization_id = s.specialization_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("GET SYMPTOMS ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
};