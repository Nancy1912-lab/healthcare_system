import db from "../config/db.js";

// 🔹 BOOK APPOINTMENT
export const bookAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

  // ✅ validation
  if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  const sql = `
    INSERT INTO APPOINTMENT 
    (patient_id, doctor_id, appointment_date, appointment_time, status)
    VALUES (?, ?, ?, ?, 'booked')
  `;

  db.query(
    sql,
    [patient_id, doctor_id, appointment_date, appointment_time],
    (err, result) => {
      if (err) {
        console.error("BOOK ERROR:", err);
        return res.status(500).json({ message: "Database error ❌" });
      }

      res.json({
        message: "Appointment booked successfully ✅",
        appointment_id: result.insertId
      });
    }
  );
};


// 🔹 GET PATIENT APPOINTMENTS
export const getPatientAppointments = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT a.*, d.name AS doctor_name
    FROM APPOINTMENT a
    JOIN DOCTOR d ON a.doctor_id = d.doctor_id
    WHERE a.patient_id = ?
    ORDER BY appointment_date DESC
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 🔹 GET DOCTOR APPOINTMENTS
export const getDoctorAppointments = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT a.*, p.name AS patient_name
    FROM APPOINTMENT a
    JOIN PATIENT p ON a.patient_id = p.patient_id
    WHERE a.doctor_id = ?
    ORDER BY appointment_date DESC
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 🔹 UPDATE STATUS
export const updateAppointmentStatus = (req, res) => {
  const { appointment_id, status } = req.body;

  const sql = `
    UPDATE APPOINTMENT 
    SET status = ?
    WHERE appointment_id = ?
  `;

  db.query(sql, [status, appointment_id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Status updated successfully ✅" });
  });
};