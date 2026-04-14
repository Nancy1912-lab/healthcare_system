import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


// 🔹 DOCTOR REGISTER
export const registerDoctor = async (req, res) => {
  try {
    console.log("REGISTER API HIT");
    console.log("Incoming body:", req.body);

    const { name, experience, phone, email, password, specialization } = req.body;

    // ✅ 1. CHECK EXISTING DOCTOR
    const [existing] = await db.promise().query(
      "SELECT * FROM DOCTOR WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // ✅ 2. GET SPECIALIZATION ID
    const [specResult] = await db.promise().query(
      `SELECT specialization_id 
       FROM SPECIALIZATION 
       WHERE TRIM(LOWER(name)) = TRIM(LOWER(?))`,
      [specialization]
    );

    console.log("Spec result:", specResult);

    if (specResult.length === 0) {
      return res.status(400).json({ message: "Invalid specialization ❌" });
    }

    const specialization_id = specResult[0].specialization_id;

    // ✅ 3. HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 4. INSERT DOCTOR
    await db.promise().query(
      `INSERT INTO DOCTOR 
      (name, experience, phone, email, password, specialization_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, experience, phone, email, hashedPassword, specialization_id]
    );

    res.json({ message: "Doctor registered successfully ✅" });

  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ message: "Server error ❌" });
  }
};



// 🔹 DOCTOR LOGIN
export const loginDoctor = async (req, res) => {
  try {
    console.log("LOGIN API HIT");
    console.log("Incoming body:", req.body);

    const { email, password } = req.body;

    // ✅ 1. FIND DOCTOR
    const [result] = await db.promise().query(
      "SELECT * FROM DOCTOR WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    const user = result[0];

    // ✅ 2. COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    // ✅ 3. GENERATE TOKEN
    const token = generateToken(user);

    res.json({
      message: "Doctor login successful ✅",
      token,
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error ❌" });
  }
};