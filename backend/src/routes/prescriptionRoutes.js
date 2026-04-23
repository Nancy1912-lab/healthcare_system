import express from "express";
import { addPrescription, getPatientPrescriptions, getPrescriptionByAppointmentId } from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", addPrescription);
router.get("/patient/:patient_id", getPatientPrescriptions);
router.get("/appointment/:appointment_id", getPrescriptionByAppointmentId);

export default router;