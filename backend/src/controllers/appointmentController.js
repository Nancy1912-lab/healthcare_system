import db from "../config/db.js";


export const bookAppointment = (req, res) => {
    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        symptoms   // ✅ NEW
    } = req.body;

    // ✅ validation
    if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
        return res.status(400).json({ message: "All fields required ❌" });
    }

    // 1️⃣ Insert appointment
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

            const appointmentId = result.insertId;

            // ❗ If no symptoms, just return
            if (!symptoms || symptoms.length === 0) {
                return res.json({
                    message: "Appointment booked successfully ✅",
                    appointment_id: appointmentId
                });
            }

            // 2️⃣ Handle symptoms
            let completed = 0;

            symptoms.forEach((symptomName) => {

                // check if symptom exists
                db.query(
                    "SELECT symptom_id FROM SYMPTOM_MASTER WHERE name = ?",
                    [symptomName],
                    (err, rows) => {

                        if (err) {
                            console.error(err);
                            return;
                        }

                        const insertMapping = (symptomId) => {
                            db.query(
                                "INSERT INTO APPOINTMENT_SYMPTOM (appointment_id, symptom_id) VALUES (?, ?)",
                                [appointmentId, symptomId],
                                (err) => {
                                    if (err) console.error(err);

                                    completed++;

                                    // when all done → send response
                                    if (completed === symptoms.length) {
                                        res.json({
                                            message: "Appointment booked with symptoms ✅",
                                            appointment_id: appointmentId
                                        });
                                    }
                                }
                            );
                        };

                        if (rows.length === 0) {
                            // insert new symptom
                            db.query(
                                "INSERT INTO SYMPTOM_MASTER (name) VALUES (?)",
                                [symptomName],
                                (err, newSymptom) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    insertMapping(newSymptom.insertId);
                                }
                            );
                        } else {
                            insertMapping(rows[0].symptom_id);
                        }
                    }
                );
            });
        }
    );
};


// 🔹 GET PATIENT APPOINTMENTS
export const getPatientAppointments = (req, res) => {
    const { id } = req.params;

    const sql = `
   SELECT 
  a.*, 
  d.name AS doctor_name,
  s.name AS specialization
FROM APPOINTMENT a
JOIN DOCTOR d ON a.doctor_id = d.doctor_id
JOIN SPECIALIZATION s ON d.specialization_id = s.specialization_id
WHERE a.patient_id = ?
ORDER BY a.appointment_date ASC, a.appointment_time ASC;
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
SELECT 
  a.*, 
  p.name AS patient_name,
  p.age,
  p.gender
FROM APPOINTMENT a
JOIN PATIENT p ON a.patient_id = p.patient_id
WHERE a.doctor_id = ?
AND a.appointment_date = CURDATE()
AND a.appointment_time >= CURTIME()
ORDER BY a.appointment_time ASC
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

export const getDoctorsBySymptom = (req, res) => {
    const { symptom_id } = req.params;

    const sql = `
    SELECT d.*
    FROM DOCTOR d
    JOIN SYMPTOM_SPECIALIZATION ss 
      ON d.specialization_id = ss.specialization_id
    WHERE ss.symptom_id = ?
  `;

    db.query(sql, [symptom_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching doctors ❌" });
        }

        res.json(result);
    });
};