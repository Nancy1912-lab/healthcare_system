import express from "express";
import { addPrescription, getPatientPrescriptions } from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", addPrescription);
router.get("/patient/:patient_id", getPatientPrescriptions);

export default router;