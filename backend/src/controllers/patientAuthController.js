import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// REGISTER PATIENT
export const registerPatient = async (req, res) => {
  const { name, dob, gender, phone, email, password, blood_group } = req.body; // ✅ using dob

  console.log("REQ BODY:", req.body); // 🔍 debug

  // 🔥 STEP 1: Convert DOB → AGE
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (!dob) {
  return res.status(400).json({ message: "DOB is required ❌" });
}

  const checkUser = "SELECT * FROM PATIENT WHERE email = ?";

  db.query(checkUser, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 STEP 2: Convert blood_group → id
    const findBloodGroup = `
      SELECT blood_group_id 
      FROM BLOOD_GROUP 
      WHERE LOWER(type) = LOWER(?)
    `;

    db.query(findBloodGroup, [blood_group], (err, bgResult) => {
      if (err) return res.status(500).json(err);

      console.log("BG RESULT:", bgResult); // 🔍 debug

      if (bgResult.length === 0) {
        return res.status(400).json({ message: "Invalid blood group ❌" });
      }

      const blood_group_id = bgResult[0].blood_group_id;

      const sql = `
        INSERT INTO PATIENT (name, age, gender, phone, email, password, blood_group_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [name, age, gender, phone, email, hashedPassword, blood_group_id],
        (err, insertResult) => {   // ✅ FIXED variable name
          if (err) {
            console.log("INSERT ERROR:", err);
            return res.status(500).json(err);
          }

          console.log("INSERT RESULT:", insertResult); // ✅ correct log

          res.json({ message: "Patient registered successfully ✅" });
        }
      );
    });
  });
};

// LOGIN PATIENT (UNCHANGED)
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