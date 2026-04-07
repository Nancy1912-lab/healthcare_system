-- =========================
-- CLEAN RESET
-- =========================
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE LAB_REPORT;
TRUNCATE TABLE PRESCRIPTION;
TRUNCATE TABLE APPOINTMENT;
TRUNCATE TABLE MEDICAL_HISTORY;
TRUNCATE TABLE SYMPTOM;
TRUNCATE TABLE PATIENT;
TRUNCATE TABLE DOCTOR;
TRUNCATE TABLE SPECIALIZATION;
TRUNCATE TABLE BLOOD_GROUP;
TRUNCATE TABLE LAB;
TRUNCATE TABLE TEST;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================
-- BLOOD GROUP
-- =========================
INSERT INTO BLOOD_GROUP (type) VALUES 
('A+'), ('A-'), ('B+'), ('B-'), ('O+'), ('O-'), ('AB+'), ('AB-');

-- =========================
-- SPECIALIZATION
-- =========================
INSERT INTO SPECIALIZATION (name, description) VALUES
('Cardiology', 'Heart related issues'),
('Neurology', 'Brain and nerves'),
('Orthopedic', 'Bones and joints'),
('Dermatology', 'Skin related'),
('General Physician', 'General health');

-- =========================
-- DOCTOR (password added)
-- =========================
INSERT INTO DOCTOR (name, experience, phone, email, specialization_id, password) VALUES
('Dr. Amit Sharma', 10, '9876543210', 'amit@hospital.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name = 'Cardiology'), NULL),

('Dr. Priya Mehta', 7, '9876543211', 'priya@hospital.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name = 'Neurology'), NULL),

('Dr. Raj Patel', 5, '9876543212', 'raj@hospital.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name = 'Orthopedic'), NULL),

('Dr. Neha Singh', 8, '9876543213', 'neha@hospital.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name = 'Dermatology'), NULL),

('Dr. Karan Verma', 12, '9876543214', 'karan@hospital.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name = 'General Physician'), NULL);

-- =========================
-- PATIENT (password added)
-- =========================
INSERT INTO PATIENT (name, age, gender, phone, email, blood_group_id, password) VALUES
('Rahul Patel', 25, 'Male', '9000000001', 'rahul@gmail.com',
 (SELECT blood_group_id FROM BLOOD_GROUP WHERE type = 'A+'), NULL),

('Anita Shah', 30, 'Female', '9000000002', 'anita@gmail.com',
 (SELECT blood_group_id FROM BLOOD_GROUP WHERE type = 'B+'), NULL);

-- =========================
-- APPOINTMENT
-- =========================
INSERT INTO APPOINTMENT (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES
(
 (SELECT patient_id FROM PATIENT WHERE name = 'Rahul Patel'),
 (SELECT doctor_id FROM DOCTOR WHERE name = 'Dr. Amit Sharma'),
 '2026-04-10', '10:00:00', 'completed'
);

-- =========================
-- LAB
-- =========================
INSERT INTO LAB (name, location, contact, email) VALUES
('City Lab', 'Ahmedabad', '7777777777', 'lab@gmail.com');

-- =========================
-- TEST
-- =========================
INSERT INTO TEST (test_name, cost, description) VALUES
('Blood Test', 500, 'Basic test');

-- =========================
-- LAB REPORT
-- =========================
INSERT INTO LAB_REPORT (appointment_id, test_id, lab_id, result, report_date, status) VALUES
(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Normal', '2026-04-10', 'completed'
);

SELECT * FROM PATIENT;
SELECT * FROM DOCTOR;
SELECT * FROM APPOINTMENT;
SELECT * FROM LAB_REPORT;

-- =========================
-- EXTRA DOCTORS
-- =========================
INSERT INTO DOCTOR (name, experience, phone, email, specialization_id, password)
SELECT 
    CONCAT('Dr. Doctor ', n),
    FLOOR(3 + RAND()*15),
    CONCAT('98', FLOOR(10000000 + RAND()*89999999)),
    CONCAT('doctor', n, '@hospital.com'),
    (SELECT specialization_id FROM SPECIALIZATION ORDER BY RAND() LIMIT 1),
    NULL
FROM (
    SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
) AS temp;

-- =========================
-- EXTRA PATIENTS
-- =========================
INSERT INTO PATIENT (name, age, gender, phone, email, blood_group_id, password)
SELECT 
    CONCAT('Patient ', n),
    FLOOR(18 + RAND()*50),
    IF(RAND()>0.5, 'Male', 'Female'),
    CONCAT('9', FLOOR(100000000 + RAND()*899999999)),
    CONCAT('patient', n, '@gmail.com'),
    (SELECT blood_group_id FROM BLOOD_GROUP ORDER BY RAND() LIMIT 1),
    NULL
FROM (
    SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
    UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
) AS temp;

INSERT INTO APPOINTMENT (patient_id, doctor_id, appointment_date, appointment_time, status)
SELECT 
    (SELECT patient_id FROM PATIENT ORDER BY RAND() LIMIT 1),
    (SELECT doctor_id FROM DOCTOR ORDER BY RAND() LIMIT 1),
    DATE('2026-04-01') + INTERVAL FLOOR(RAND()*10) DAY,
    TIME(CONCAT(FLOOR(9+RAND()*8), ':00:00')),
    ELT(FLOOR(1 + RAND()*3), 'booked', 'completed', 'cancelled')
FROM (
    SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
) AS temp;

SELECT * FROM appointment;