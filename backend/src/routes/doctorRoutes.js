import express from "express";
import { registerDoctor, loginDoctor } from "../controllers/doctorAuthController.js";

const router = express.Router();

router.post("/register", registerDoctor);
router.post("/login", loginDoctor);

export default router;