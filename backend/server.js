import express from "express";
import cors from "cors";
import db from "./src/config/db.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import { verifyToken } from "./src/middleware/authMiddleware.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import prescriptionRoutes from "./src/routes/prescriptionRoutes.js";
import labRoutes from "./src/routes/labRoutes.js";
import symptomRoutes from "./src/routes/symptomRoutes.js";



import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors());

app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/symptom", symptomRoutes);


// app.get("/api/patients", (req, res) => {
//   db.query("SELECT * FROM PATIENT", (err, result) => {
//     if (err) return res.send(err);
//     res.json(result);
//   });
// });

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user
  });
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT * FROM PATIENT", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});


