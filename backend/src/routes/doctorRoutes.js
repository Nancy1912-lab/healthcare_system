import express from "express";
import {
  addDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor
} from "../controllers/doctorController.js";

const router = express.Router();

// CREATE
router.post("/", addDoctor);

// READ ALL
router.get("/", getAllDoctors);

// READ ONE
router.get("/:id", getDoctor);

// UPDATE
router.put("/:id", updateDoctor);

// DELETE
router.delete("/:id", deleteDoctor);

export default router;