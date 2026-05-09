import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/prescription", prescriptionRoutes);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});