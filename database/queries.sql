USE healthcare_db;

-- ========================================
-- BASIC QUERIES
-- ========================================

-- View all patients
SELECT * FROM PATIENT;

-- View all doctors
SELECT * FROM DOCTOR;

-- View all appointments
SELECT * FROM APPOINTMENT;


-- ========================================
-- JOIN QUERIES (VERY IMPORTANT 🔥)
-- ========================================

-- Patient with their doctor and appointment details
SELECT 
    p.name AS patient_name,
    d.name AS doctor_name,
    a.appointment_date,
    a.appointment_time,
    a.status
FROM APPOINTMENT a
JOIN PATIENT p ON a.patient_id = p.patient_id
JOIN DOCTOR d ON a.doctor_id = d.doctor_id;

-- Doctor with specialization
SELECT 
    d.name AS doctor_name,
    s.name AS specialization
FROM DOCTOR d
JOIN SPECIALIZATION s ON d.specialization_id = s.specialization_id;


-- ========================================
-- AGGREGATE QUERIES
-- ========================================

-- Total patients
SELECT COUNT(*) AS total_patients FROM PATIENT;

-- Total doctors
SELECT COUNT(*) AS total_doctors FROM DOCTOR;

-- Total appointments
SELECT COUNT(*) AS total_appointments FROM APPOINTMENT;

-- Appointments per doctor
SELECT 
    d.name AS doctor_name,
    COUNT(a.appointment_id) AS total_appointments
FROM APPOINTMENT a
JOIN DOCTOR d ON a.doctor_id = d.doctor_id
GROUP BY d.name
ORDER BY total_appointments DESC;


-- ========================================
-- FILTER / REAL-WORLD QUERIES
-- ========================================

-- Today's appointments
SELECT * FROM APPOINTMENT
WHERE appointment_date = CURDATE();

-- Upcoming appointments
SELECT * FROM APPOINTMENT
WHERE appointment_date > CURDATE();

-- Completed appointments
SELECT * FROM APPOINTMENT
WHERE status = 'Completed';

-- Cancelled appointments
SELECT * FROM APPOINTMENT
WHERE status = 'Cancelled';


-- ========================================
-- ADVANCED QUERIES (HIGH MARKS 🔥)
-- ========================================

-- Most active doctor
SELECT 
    d.name,
    COUNT(a.appointment_id) AS total_appointments
FROM APPOINTMENT a
JOIN DOCTOR d ON a.doctor_id = d.doctor_id
GROUP BY d.name
ORDER BY total_appointments DESC
LIMIT 1;

-- Patients who had more than 2 appointments
SELECT 
    p.name,
    COUNT(a.appointment_id) AS visit_count
FROM APPOINTMENT a
JOIN PATIENT p ON a.patient_id = p.patient_id
GROUP BY p.name
HAVING COUNT(a.appointment_id) > 2;

-- Doctors with no appointments
SELECT d.name
FROM DOCTOR d
LEFT JOIN APPOINTMENT a ON d.doctor_id = a.doctor_id
WHERE a.appointment_id IS NULL;


-- ========================================
-- SORTING QUERIES
-- ========================================

-- Latest appointments first
SELECT * FROM APPOINTMENT
ORDER BY appointment_date DESC;

-- Patients sorted by name
SELECT * FROM PATIENT
ORDER BY name ASC;


-- ========================================
-- SUBQUERY QUERIES
-- ========================================

-- Patients who visited same doctor as patient_id = 1
SELECT DISTINCT p.name
FROM PATIENT p
JOIN APPOINTMENT a ON p.patient_id = a.patient_id
WHERE a.doctor_id = (
    SELECT doctor_id 
    FROM APPOINTMENT 
    WHERE patient_id = 1 
    LIMIT 1
);


-- ========================================
-- EXISTS / NOT EXISTS
-- ========================================

-- Patients who have at least one appointment
SELECT name
FROM PATIENT p
WHERE EXISTS (
    SELECT 1 FROM APPOINTMENT a 
    WHERE a.patient_id = p.patient_id
);

-- Patients with no appointments
SELECT name
FROM PATIENT p
WHERE NOT EXISTS (
    SELECT 1 FROM APPOINTMENT a 
    WHERE a.patient_id = p.patient_id
);


-- ========================================
-- NESTED AGGREGATE
-- ========================================

-- Doctors having above average appointments
SELECT d.name, COUNT(a.appointment_id) AS total
FROM DOCTOR d
JOIN APPOINTMENT a ON d.doctor_id = a.doctor_id
GROUP BY d.name
HAVING COUNT(a.appointment_id) > (
    SELECT AVG(counts) FROM (
        SELECT COUNT(*) AS counts
        FROM APPOINTMENT
        GROUP BY doctor_id
    ) AS temp
);


-- ========================================
-- CASE STATEMENT
-- ========================================

-- Appointment status meaning
SELECT 
    appointment_id,
    status,
    CASE
        WHEN status = 'booked' THEN 'Upcoming'
        WHEN status = 'Completed' THEN 'Done'
        WHEN status = 'Cancelled' THEN 'Not Done'
    END AS status_meaning
FROM APPOINTMENT;


-- ========================================
-- DATE FUNCTIONS
-- ========================================

-- Appointments in last 7 days
SELECT * FROM APPOINTMENT
WHERE appointment_date >= CURDATE() - INTERVAL 7 DAY;


-- ========================================
-- GROUP BY WITH CONDITION
-- ========================================

-- Doctors having more than 5 appointments
SELECT doctor_id, COUNT(*) AS total
FROM APPOINTMENT
GROUP BY doctor_id
HAVING COUNT(*) > 5;


-- ========================================
-- DISTINCT
-- ========================================

-- Unique doctors who handled appointments
SELECT DISTINCT doctor_id FROM APPOINTMENT;


-- ========================================
-- JOIN TYPES DEMO
-- ========================================

-- LEFT JOIN (all doctors including those without appointments)
SELECT d.name, a.appointment_id
FROM DOCTOR d
LEFT JOIN APPOINTMENT a ON d.doctor_id = a.doctor_id;


-- ========================================
-- LIMIT / PAGINATION
-- ========================================

-- First 5 patients
SELECT * FROM PATIENT LIMIT 5;

-- Next 5 patients
SELECT * FROM PATIENT LIMIT 5 OFFSET 5;


-- ========================================
-- VIEW (OPTIONAL BUT IMPRESSIVE 💯)
-- ========================================
CREATE VIEW patient_doctor_view AS
SELECT 
    p.name AS patient,
    d.name AS doctor,
    a.appointment_date
FROM APPOINTMENT a
JOIN PATIENT p ON a.patient_id = p.patient_id
JOIN DOCTOR d ON a.doctor_id = d.doctor_id;

-- Use the view
SELECT * FROM patient_doctor_view;

-- Doctor with most appointments on a single day
SELECT 
    doctor_id,
    appointment_date,
    COUNT(*) AS total
FROM APPOINTMENT
GROUP BY doctor_id, appointment_date
ORDER BY total DESC
LIMIT 1;

-- Most common appointment hour
SELECT 
    HOUR(appointment_time) AS hour,
    COUNT(*) AS total
FROM APPOINTMENT
GROUP BY hour
ORDER BY total DESC
LIMIT 1;

-- Last appointment of each patient
SELECT 
    patient_id,
    MAX(appointment_date) AS last_visit
FROM APPOINTMENT
GROUP BY patient_id;

-- Classify doctors by workload
SELECT 
    d.name,
    COUNT(a.appointment_id) AS total,
    CASE
        WHEN COUNT(a.appointment_id) > 2 THEN 'Very Busy'
        WHEN COUNT(a.appointment_id) > 1 THEN 'Moderate'
        ELSE 'Low'
    END AS workload
FROM DOCTOR d
LEFT JOIN APPOINTMENT a ON d.doctor_id = a.doctor_id
GROUP BY d.name;

-- Patients with multiple appointments on same day
SELECT 
    patient_id,
    appointment_date,
    COUNT(*) AS total
FROM APPOINTMENT
GROUP BY patient_id, appointment_date
HAVING COUNT(*) > 1;

-- Most frequent appointment status
SELECT 
    status,
    COUNT(*) AS total
FROM APPOINTMENT
GROUP BY status
ORDER BY total DESC
LIMIT 1;

-- Doctors with no appointments in last 30 days
SELECT d.name
FROM DOCTOR d
WHERE d.doctor_id NOT IN (
    SELECT DISTINCT doctor_id
    FROM APPOINTMENT
    WHERE appointment_date >= CURDATE() - INTERVAL 30 DAY
);




