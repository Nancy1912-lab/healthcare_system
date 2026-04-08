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

('Cardiology', 'Heart and cardiovascular system'),
('Cardiothoracic & Vascular Surgery', 'Heart and chest surgeries'),
('Neurology', 'Brain and nervous system'),
('Neurosurgery', 'Surgical treatment of brain and nerves'),
('Nephrology & Dialysis', 'Kidney related diseases and dialysis'),
('Urology', 'Urinary tract and male reproductive system'),
('Gastroenterology', 'Digestive system and liver'),

('General Surgery', 'General surgical procedures'),
('Laparoscopic Surgery', 'Minimally invasive surgeries'),
('Bariatric Surgery', 'Weight loss surgeries'),
('Surgical Oncology', 'Surgical treatment of cancer'),
('Medical Oncology', 'Cancer treatment using medicines'),
('Radiation Oncology', 'Cancer treatment using radiation'),
('Orthopaedic & Joint Replacement', 'Bones, joints and replacement surgeries'),
('Spine Surgery', 'Spine related surgical procedures'),
('Plastic & Reconstructive Surgery', 'Cosmetic and reconstructive procedures'),

('Obstetrics', 'Pregnancy and childbirth care'),
('Gynaecology', 'Women reproductive health'),
('Neonatology', 'Newborn baby care'),
('Paediatrics', 'Child healthcare'),

('Ophthalmology', 'Eye related diseases'),
('ENT', 'Ear, nose and throat'),
('Dermatology', 'Skin, hair and nail care'),

('Radiology', 'Medical imaging and scans'),
('Laboratory Medicine', 'Diagnostic lab services'),
('Pathology', 'Disease diagnosis through lab tests'),
('Physiotherapy', 'Physical therapy and rehabilitation'),
('Rehabilitation Medicine', 'Recovery and rehabilitation care'),

('Liver Transplant', 'Liver transplant procedures'),
('Kidney Transplant', 'Kidney transplant procedures'),
('Heart Transplant', 'Heart transplant procedures'),
('Lung Transplant', 'Lung transplant procedures');

-- =========================
-- DOCTOR (password added)
-- =========================
INSERT INTO DOCTOR (name, experience, phone, email, specialization_id, password) VALUES

-- CARDIOLOGY (5)
('Dr. Rakesh Patel', 15, '9876500001', 'rakesh.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), NULL),
('Dr. Nidhi Shah', 12, '9876500002', 'nidhi.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), NULL),
('Dr. Mihir Mehta', 10, '9876500003', 'mihir.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), NULL),
('Dr. Kunal Desai', 9, '9876500004', 'kunal.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), NULL),
('Dr. Bhavik Trivedi', 14, '9876500005', 'bhavik.trivedi@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), NULL),

-- NEUROLOGY (4)
('Dr. Aakash Joshi', 13, '9876500006', 'aakash.joshi@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), NULL),
('Dr. Pooja Mehta', 9, '9876500007', 'pooja.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), NULL),
('Dr. Hiren Shah', 11, '9876500008', 'hiren.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), NULL),
('Dr. Rupal Vyas', 8, '9876500009', 'rupal.vyas@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), NULL),

-- NEUROSURGERY (3)
('Dr. Sandeep Patel', 16, '9876500010', 'sandeep.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurosurgery'), NULL),
('Dr. Jinal Shah', 10, '9876500011', 'jinal.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurosurgery'), NULL),
('Dr. Parth Mehta', 12, '9876500012', 'parth.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurosurgery'), NULL),

-- ORTHOPAEDIC & JOINT REPLACEMENT (5)
('Dr. Darshan Patel', 14, '9876500013', 'darshan.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), NULL),
('Dr. Meet Shah', 11, '9876500014', 'meet.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), NULL),
('Dr. Krunal Desai', 9, '9876500015', 'krunal.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), NULL),
('Dr. Harsh Vyas', 8, '9876500016', 'harsh.vyas@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), NULL),
('Dr. Tejas Joshi', 13, '9876500017', 'tejas.joshi@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), NULL),

-- GASTROENTEROLOGY (5)
('Dr. Ketan Patel', 12, '9876500018', 'ketan.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), NULL),
('Dr. Bhumi Shah', 9, '9876500019', 'bhumi.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), NULL),
('Dr. Ronak Mehta', 10, '9876500020', 'ronak.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), NULL),
('Dr. Yash Desai', 7, '9876500021', 'yash.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), NULL),
('Dr. Nikunj Trivedi', 11, '9876500022', 'nikunj.trivedi@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), NULL),

-- UROLOGY (5)
('Dr. Dhruv Patel', 13, '9876500023', 'dhruv.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), NULL),
('Dr. Jigar Shah', 10, '9876500024', 'jigar.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), NULL),
('Dr. Chirag Mehta', 9, '9876500025', 'chirag.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), NULL),
('Dr. Viral Desai', 8, '9876500026', 'viral.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), NULL),
('Dr. Ankit Joshi', 12, '9876500027', 'ankit.joshi@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), NULL);

-- SURGICAL ONCOLOGY (4)
('Dr. Rajiv Patel', 15, '9876500028', 'rajiv.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), NULL),
('Dr. Neel Shah', 11, '9876500029', 'neel.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), NULL),
('Dr. Paresh Mehta', 13, '9876500030', 'paresh.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), NULL),
('Dr. Tushar Desai', 9, '9876500031', 'tushar.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), NULL),

-- MEDICAL ONCOLOGY (4)
('Dr. Hemal Patel', 14, '9876500032', 'hemal.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), NULL),
('Dr. Ritesh Shah', 10, '9876500033', 'ritesh.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), NULL),
('Dr. Vimal Mehta', 12, '9876500034', 'vimal.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), NULL),
('Dr. Kiran Desai', 8, '9876500035', 'kiran.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), NULL),

-- RADIATION ONCOLOGY (4)
('Dr. Ajay Patel', 13, '9876500036', 'ajay.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), NULL),
('Dr. Pankaj Shah', 11, '9876500037', 'pankaj.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), NULL),
('Dr. Sagar Mehta', 10, '9876500038', 'sagar.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), NULL),
('Dr. Mahesh Desai', 9, '9876500039', 'mahesh.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), NULL),

-- OBSTETRICS (4)
('Dr. Nisha Patel', 12, '9876500040', 'nisha.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), NULL),
('Dr. Komal Shah', 9, '9876500041', 'komal.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), NULL),
('Dr. Rina Mehta', 11, '9876500042', 'rina.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), NULL),
('Dr. Heena Desai', 8, '9876500043', 'heena.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), NULL),

-- GYNAECOLOGY (4)
('Dr. Bhavna Patel', 13, '9876500044', 'bhavna.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), NULL),
('Dr. Pinal Shah', 10, '9876500045', 'pinal.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), NULL),
('Dr. Minal Mehta', 9, '9876500046', 'minal.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), NULL),
('Dr. Rupal Desai', 11, '9876500047', 'rupal.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), NULL),

-- PAEDIATRICS (4)
('Dr. Khyati Patel', 10, '9876500048', 'khyati.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), NULL),
('Dr. Janki Shah', 8, '9876500049', 'janki.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), NULL),
('Dr. Sejal Mehta', 9, '9876500050', 'sejal.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), NULL),
('Dr. Aarti Desai', 7, '9876500051', 'aarti.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), NULL);

-- OPHTHALMOLOGY (4)
('Dr. Devang Patel', 11, '9876500052', 'devang.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), NULL),
('Dr. Nayan Shah', 9, '9876500053', 'nayan.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), NULL),
('Dr. Rakesh Mehta', 12, '9876500054', 'rakesh.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), NULL),
('Dr. Hitesh Desai', 8, '9876500055', 'hitesh.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), NULL),

-- ENT (4)
('Dr. Jignesh Patel', 10, '9876500056', 'jignesh.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), NULL),
('Dr. Ketan Shah', 9, '9876500057', 'ketan.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), NULL),
('Dr. Mayur Mehta', 11, '9876500058', 'mayur.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), NULL),
('Dr. Alpesh Desai', 8, '9876500059', 'alpesh.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), NULL),

-- DERMATOLOGY (4)
('Dr. Nisha Patel', 9, '9876500060', 'nisha2.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), NULL),
('Dr. Ruchi Shah', 7, '9876500061', 'ruchi.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), NULL),
('Dr. Pooja Mehta', 8, '9876500062', 'pooja2.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), NULL),
('Dr. Heena Desai', 6, '9876500063', 'heena2.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), NULL),

-- GENERAL SURGERY (2)
('Dr. Bharat Patel', 14, '9876500064', 'bharat.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='General Surgery'), NULL),
('Dr. Kalpesh Shah', 10, '9876500065', 'kalpesh.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='General Surgery'), NULL),

-- LAPAROSCOPIC SURGERY (2)
('Dr. Vipul Mehta', 11, '9876500066', 'vipul.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laparoscopic Surgery'), NULL),
('Dr. Sanjay Desai', 13, '9876500067', 'sanjay.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laparoscopic Surgery'), NULL),

-- BARIATRIC SURGERY (2)
('Dr. Pravin Patel', 12, '9876500068', 'pravin.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Bariatric Surgery'), NULL),
('Dr. Mahendra Shah', 15, '9876500069', 'mahendra.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Bariatric Surgery'), NULL),

-- SPINE SURGERY (2)
('Dr. Ajit Mehta', 11, '9876500070', 'ajit.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Spine Surgery'), NULL),
('Dr. Ramesh Desai', 13, '9876500071', 'ramesh.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Spine Surgery'), NULL),

-- PLASTIC SURGERY (2)
('Dr. Chirag Patel', 9, '9876500072', 'chirag.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Plastic & Reconstructive Surgery'), NULL),
('Dr. Deepak Shah', 10, '9876500073', 'deepak.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Plastic & Reconstructive Surgery'), NULL),

-- NEONATOLOGY (2)
('Dr. Hiral Mehta', 8, '9876500074', 'hiral.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neonatology'), NULL),
('Dr. Sneha Desai', 7, '9876500075', 'sneha.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neonatology'), NULL),

-- RADIOLOGY (2)
('Dr. Anil Patel', 12, '9876500076', 'anil.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiology'), NULL),
('Dr. Nitin Shah', 10, '9876500077', 'nitin.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiology'), NULL),

-- LABORATORY MEDICINE (2)
('Dr. Jay Mehta', 11, '9876500078', 'jay.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laboratory Medicine'), NULL),
('Dr. Kiran Desai', 9, '9876500079', 'kiran2.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laboratory Medicine'), NULL),

-- PATHOLOGY (2)
('Dr. Manoj Patel', 13, '9876500080', 'manoj.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Pathology'), NULL),
('Dr. Rajesh Shah', 11, '9876500081', 'rajesh2.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Pathology'), NULL),

-- PHYSIOTHERAPY (2)
('Dr. Vivek Mehta', 8, '9876500082', 'vivek.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Physiotherapy'), NULL),
('Dr. Mehul Desai', 7, '9876500083', 'mehul.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Physiotherapy'), NULL),

-- REHABILITATION MEDICINE (2)
('Dr. Tapan Patel', 9, '9876500084', 'tapan.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Rehabilitation Medicine'), NULL),
('Dr. Paresh Shah', 10, '9876500085', 'paresh.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Rehabilitation Medicine'), NULL),

-- TRANSPLANT (2 EACH)
('Dr. Harish Mehta', 14, '9876500086', 'harish.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Liver Transplant'), NULL),
('Dr. Kunal Desai', 12, '9876500087', 'kunal2.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Liver Transplant'), NULL),

('Dr. Jitesh Patel', 13, '9876500088', 'jitesh.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Kidney Transplant'), NULL),
('Dr. Suresh Shah', 11, '9876500089', 'suresh.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Kidney Transplant'), NULL),

('Dr. Rohan Mehta', 12, '9876500090', 'rohan.mehta@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Heart Transplant'), NULL),
('Dr. Bharat Desai', 10, '9876500091', 'bharat.desai@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Heart Transplant'), NULL),

('Dr. Nikhil Patel', 11, '9876500092', 'nikhil.patel@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Lung Transplant'), NULL),
('Dr. Tejas Shah', 9, '9876500093', 'tejas.shah@kd.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Lung Transplant'), NULL);

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
