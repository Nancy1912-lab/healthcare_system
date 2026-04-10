import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// 🔹 DOCTOR REGISTER
export const registerDoctor = (req, res) => {
  const { name, experience, phone, email, password, specialization_id } = req.body;

  const checkUser = "SELECT * FROM DOCTOR WHERE email = ?";

  db.query(checkUser, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO DOCTOR (name, experience, phone, email, password, specialization_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, experience, phone, email, hashedPassword, specialization_id],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Doctor registered successfully ✅" });
      }
    );
  });
};

// 🔹 DOCTOR LOGIN
export const loginDoctor = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM DOCTOR WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    const user = result[0];

    // 🔐 COMPARE PASSWORD
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