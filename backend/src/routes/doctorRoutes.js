import express from "express";
import {
  addDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsBySpecialization 
} from "../controllers/doctorController.js";
import { registerDoctor, loginDoctor } from "../controllers/doctorAuthController.js";


const router = express.Router();

// AUTH
router.post("/register", registerDoctor);
router.post("/login", loginDoctor);


// CREATE
router.post("/", addDoctor);

// READ ALL
router.get("/", getAllDoctors);

// 🔥 ADD HERE
router.get("/specialization/:id", getDoctorsBySpecialization);

// READ ONE
router.get("/:id", getDoctor);

// UPDATE
router.put("/:id", updateDoctor);

// DELETE
router.delete("/:id", deleteDoctor);

export default router;