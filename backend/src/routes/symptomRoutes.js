import express from "express";
import db from "../config/db.js";

const router = express.Router();

// 🔹 GET ALL SYMPTOMS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM SYMPTOM";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("SYMPTOM ERROR:", err);
      return res.status(500).json({ message: "Database error ❌" });
    }

    res.json(result); // ✅ IMPORTANT
  });
});

export default router;