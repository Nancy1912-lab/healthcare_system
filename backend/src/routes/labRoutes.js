import express from "express";
import { 
  patientUploadReport, 
  getDoctorPendingReports, 
  doctorReviewReport, 
  getPatientCompletedReports 
} from "../controllers/labController.js";

const router = express.Router();

// Patient routes
router.post("/upload", patientUploadReport);
router.get("/completed/:patientId", getPatientCompletedReports);

// Doctor routes
router.get("/pending/:doctorId", getDoctorPendingReports);
router.put("/review/:reportId", doctorReviewReport);

export default router;
