import express from "express";
import { registerPatient, loginPatient } from "../controllers/patientAuthController.js";
import { getPatientProfile } from "../controllers/patientController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerPatient);
router.post("/login", loginPatient);

router.get("/profile", verifyToken, getPatientProfile);

export default router;