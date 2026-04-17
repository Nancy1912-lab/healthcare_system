import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// 🔹 DOCTOR REGISTER
export const registerDoctor = (req, res) => {
  const { name, experience, phone, email, password, specialization } = req.body;

  console.log("REGISTER API HIT");
  console.log("Incoming body:", req.body);

  const checkUser = "SELECT * FROM DOCTOR WHERE email = ?";

  db.query(checkUser, [email], async (err, existing) => {
    if (err) {
      console.error("FULL ERROR:", err);
      return res.status(500).json(err);
    }

    if (existing.length > 0) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const findSpecialization = `
      SELECT specialization_id 
      FROM SPECIALIZATION 
      WHERE TRIM(LOWER(name)) = TRIM(LOWER(?))
    `;

    db.query(findSpecialization, [specialization], (err, specResult) => {
      if (err) {
        console.error("FULL ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("Spec result:", specResult);

      if (specResult.length === 0) {
        return res.status(400).json({ message: "Invalid specialization ❌" });
      }

      const specialization_id = specResult[0].specialization_id;

      const sql = `
        INSERT INTO DOCTOR 
        (name, experience, phone, email, password, specialization_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [name, experience, phone, email, hashedPassword, specialization_id],
        (err, insertResult) => {
          if (err) {
            console.error("FULL ERROR:", err);
            return res.status(500).json(err);
          }

          console.log("INSERT RESULT:", insertResult);
          res.json({ message: "Doctor registered successfully ✅" });
        }
      );
    });
  });
};

// 🔹 DOCTOR LOGIN
export const loginDoctor = (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN API HIT");
  console.log("Incoming body:", req.body);

  const sql = "SELECT * FROM DOCTOR WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    const token = generateToken(user);

    res.json({
      message: "Doctor login successful ✅",
      token,
      user
    });
  });
};