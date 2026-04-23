import db from "../config/db.js";

// 1. Patient initiates a report upload (linked to an appointment)
export const patientUploadReport = (req, res) => {
  const { appointment_id, report_date } = req.body;

  if (!appointment_id) {
    return res.status(400).json({ message: "Appointment ID is required to link the report. ❌" });
  }

  const sql = `
    INSERT INTO LAB_REPORT (appointment_id, report_date, status)
    VALUES (?, ?, 'pending')
  `;

  db.query(sql, [appointment_id, report_date || new Date()], (err, result) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Report entry created! Waiting for doctor to fill results. ⏳", reportId: result.insertId });
  });
};

// 2. Doctor gets pending reports for their patients
export const getDoctorPendingReports = (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT lr.*, p.name as patient_name, t.test_name
    FROM LAB_REPORT lr
    JOIN APPOINTMENT a ON lr.appointment_id = a.appointment_id
    JOIN PATIENT p ON a.patient_id = p.patient_id
    LEFT JOIN TEST t ON lr.test_id = t.test_id
    WHERE a.doctor_id = ? AND lr.status = 'pending'
    ORDER BY lr.report_date DESC
  `;

  db.query(sql, [doctorId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 3. Doctor reviews and fills the report content
export const doctorReviewReport = (req, res) => {
  const { reportId } = req.params;
  const { result, urgency, test_id, lab_id, test_name } = req.body;

  if (isNaN(reportId)) {
    return res.status(400).json({ message: "Invalid Report ID. Please provide a numeric ID. ❌" });
  }

  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // We use explicit values or keep existing ones, and lookup test_id based on test_name if provided
  const sql = `
    UPDATE LAB_REPORT 
    SET result = ?, 
        urgency = ?, 
        test_id = COALESCE(?, (SELECT test_id FROM TEST WHERE test_name = ? LIMIT 1), test_id), 
        lab_id = COALESCE(?, lab_id), 
        file_url = CASE WHEN ? IS NOT NULL THEN ? ELSE file_url END,
        status = 'completed'
    WHERE report_id = ?
  `;

  const params = [
    result || "", 
    urgency || 'normal', 
    test_id || null, 
    test_name || null,
    lab_id || null, 
    fileUrl, fileUrl,
    reportId
  ];

  db.query(sql, params, (err, updateResult) => {
    if (err) {
      console.error("REVIEW ERROR:", err);
      return res.status(500).json(err);
    }
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Report not found or already updated. ❌" });
    }
    res.json({ message: "Report results filled and completed ✅" });
  });
};

// 4. Patient views their completed reports
export const getPatientCompletedReports = (req, res) => {
  const { patientId } = req.params;

  const sql = `
    SELECT lr.*, t.test_name, l.name as lab_name, d.name as doctor_name
    FROM LAB_REPORT lr
    JOIN APPOINTMENT a ON lr.appointment_id = a.appointment_id
    JOIN DOCTOR d ON a.doctor_id = d.doctor_id
    LEFT JOIN TEST t ON lr.test_id = t.test_id
    LEFT JOIN LAB l ON lr.lab_id = l.lab_id
    WHERE a.patient_id = ? AND lr.status = 'completed'
    ORDER BY lr.report_date DESC
  `;

  db.query(sql, [patientId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 5. Doctor views their completed reports
export const getDoctorCompletedReports = (req, res) => {
  const { doctorId } = req.params;

  const sql = `
    SELECT lr.*, p.name as patient_name, p.patient_id as p_id, t.test_name, l.name as lab_name
    FROM LAB_REPORT lr
    JOIN APPOINTMENT a ON lr.appointment_id = a.appointment_id
    JOIN PATIENT p ON a.patient_id = p.patient_id
    LEFT JOIN TEST t ON lr.test_id = t.test_id
    LEFT JOIN LAB l ON lr.lab_id = l.lab_id
    WHERE a.doctor_id = ? AND lr.status = 'completed'
    ORDER BY lr.report_date DESC
  `;

  db.query(sql, [doctorId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
