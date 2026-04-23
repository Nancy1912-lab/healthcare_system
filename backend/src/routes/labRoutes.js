import express from "express";
import { 
  patientUploadReport, 
  getDoctorPendingReports, 
  doctorReviewReport, 
  getPatientCompletedReports,
  getDoctorCompletedReports
} from "../controllers/labController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const router = express.Router();

// Patient routes
router.post("/upload", patientUploadReport);
router.get("/completed/:patientId", getPatientCompletedReports);

// Doctor routes
router.get("/pending/:doctorId", getDoctorPendingReports);
router.get("/completed-doctor/:doctorId", getDoctorCompletedReports);
router.put("/review/:reportId", upload.single("reportFile"), doctorReviewReport);

export default router;
