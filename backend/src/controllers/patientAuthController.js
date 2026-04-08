import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// REGISTER PATIENT
export const registerPatient = async (req, res) => {
  const { name, age, gender, phone, email, password } = req.body;

  const checkUser = "SELECT * FROM PATIENT WHERE email = ?";

  db.query(checkUser, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO PATIENT (name, age, gender, phone, email, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, age, gender, phone, email, hashedPassword], (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Patient registered successfully ✅" });
    });
  });
};

// LOGIN PATIENT
export const loginPatient = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM PATIENT WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

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
  message: "Patient login successful ✅",
  token,
  user
});
  });
};