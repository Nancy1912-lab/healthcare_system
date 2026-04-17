import express from "express";
import {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";
const router = express.Router();

router.post("/book", bookAppointment);

router.get("/patient/:id", getPatientAppointments);
router.get("/doctor/:id", getDoctorAppointments);
router.put("/status", updateAppointmentStatus);

export default router;