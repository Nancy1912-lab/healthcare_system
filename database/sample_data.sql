USE healthcare_db;
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
('Dr. Rakesh Patel', 15, '9876500001', 'rakesh.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Nidhi Shah', 12, '9876500002', 'nidhi.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Mihir Mehta', 10, '9876500003', 'mihir.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Kunal Desai', 9, '9876500004', 'kunal.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Bhavik Trivedi', 14, '9876500005', 'bhavik.trivedi@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Cardiology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),

-- NEUROLOGY (4)
('Dr. Aakash Joshi', 13, '9876500006', 'aakash.joshi@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Pooja Mehta', 9, '9876500007', 'pooja.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Hiren Shah', 11, '9876500008', 'hiren.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Rupal Vyas', 8, '9876500009', 'rupal.vyas@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),

-- NEUROSURGERY (3)
('Dr. Sandeep Patel', 16, '9876500010', 'sandeep.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurosurgery'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Jinal Shah', 10, '9876500011', 'jinal.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurosurgery'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Parth Mehta', 12, '9876500012', 'parth.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neurosurgery'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- ORTHOPAEDIC & JOINT REPLACEMENT (5)
('Dr. Darshan Patel', 14, '9876500013', 'darshan.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Meet Shah', 11, '9876500014', 'meet.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Krunal Desai', 9, '9876500015', 'krunal.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Harsh Vyas', 8, '9876500016', 'harsh.vyas@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Tejas Joshi', 13, '9876500017', 'tejas.joshi@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Orthopaedic & Joint Replacement'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- GASTROENTEROLOGY (5)
('Dr. Ketan Patel', 12, '9876500018', 'ketan.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Bhumi Shah', 9, '9876500019', 'bhumi.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Ronak Mehta', 10, '9876500020', 'ronak.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Yash Desai', 7, '9876500021', 'yash.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Nikunj Trivedi', 11, '9876500022', 'nikunj.trivedi@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gastroenterology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- UROLOGY (5)
('Dr. Dhruv Patel', 13, '9876500023', 'dhruv.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Jigar Shah', 10, '9876500024', 'jigar.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Chirag Mehta', 9, '9876500025', 'chirag.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Viral Desai', 8, '9876500026', 'viral.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Ankit Joshi', 12, '9876500027', 'ankit.joshi@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Urology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- SURGICAL ONCOLOGY (4)
('Dr. Rajiv Patel', 15, '9876500028', 'rajiv.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Neel Shah', 11, '9876500029', 'neel.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Paresh Mehta', 13, '9876500030', 'paresh.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Tushar Desai', 9, '9876500031', 'tushar.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Surgical Oncology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),

-- MEDICAL ONCOLOGY (4)
('Dr. Hemal Patel', 14, '9876500032', 'hemal.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Ritesh Shah', 10, '9876500033', 'ritesh.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Vimal Mehta', 12, '9876500034', 'vimal.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Kiran Desai', 8, '9876500035', 'kiran.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Medical Oncology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),

-- RADIATION ONCOLOGY (4)
('Dr. Ajay Patel', 13, '9876500036', 'ajay.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Pankaj Shah', 11, '9876500037', 'pankaj.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Sagar Mehta', 10, '9876500038', 'sagar.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Mahesh Desai', 9, '9876500039', 'mahesh.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiation Oncology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),

-- OBSTETRICS (4)
('Dr. Nisha Patel', 12, '9876500040', 'nisha.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Komal Shah', 9, '9876500041', 'komal.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Rina Mehta', 11, '9876500042', 'rina.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Heena Desai', 8, '9876500043', 'heena.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Obstetrics'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),

-- GYNAECOLOGY (4)
('Dr. Bhavna Patel', 13, '9876500044', 'bhavna.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Pinal Shah', 10, '9876500045', 'pinal.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Minal Mehta', 9, '9876500046', 'minal.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Rupal Desai', 11, '9876500047', 'rupal.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Gynaecology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- PAEDIATRICS (4)
('Dr. Khyati Patel', 10, '9876500048', 'khyati.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Janki Shah', 8, '9876500049', 'janki.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Sejal Mehta', 9, '9876500050', 'sejal.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Aarti Desai', 7, '9876500051', 'aarti.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Paediatrics'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),

-- OPHTHALMOLOGY (4)
('Dr. Devang Patel', 11, '9876500052', 'devang.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Nayan Shah', 9, '9876500053', 'nayan.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Rakesh Mehta', 12, '9876500054', 'rakesh.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Hitesh Desai', 8, '9876500055', 'hitesh.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Ophthalmology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),

-- ENT (4)
('Dr. Jignesh Patel', 10, '9876500056', 'jignesh.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Ketan Shah', 9, '9876500057', 'ketan.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Mayur Mehta', 11, '9876500058', 'mayur.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Alpesh Desai', 8, '9876500059', 'alpesh.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='ENT'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),

-- DERMATOLOGY (4)
('Dr. Nisha Patel', 9, '9876500060', 'nisha2.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Ruchi Shah', 7, '9876500061', 'ruchi.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Pooja Mehta', 8, '9876500062', 'pooja2.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Heena Desai', 6, '9876500063', 'heena2.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Dermatology'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),

-- GENERAL SURGERY (2)
('Dr. Bharat Patel', 14, '9876500064', 'bharat.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='General Surgery'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Kalpesh Shah', 10, '9876500065', 'kalpesh.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='General Surgery'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),

-- LAPAROSCOPIC SURGERY (2)
('Dr. Vipul Mehta', 11, '9876500066', 'vipul.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laparoscopic Surgery'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Sanjay Desai', 13, '9876500067', 'sanjay.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laparoscopic Surgery'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- BARIATRIC SURGERY (2)
('Dr. Pravin Patel', 12, '9876500068', 'pravin.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Bariatric Surgery'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Mahendra Shah', 15, '9876500069', 'mahendra.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Bariatric Surgery'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),

-- SPINE SURGERY (2)
('Dr. Ajit Mehta', 11, '9876500070', 'ajit.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Spine Surgery'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Ramesh Desai', 13, '9876500071', 'ramesh.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Spine Surgery'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),

-- PLASTIC SURGERY (2)
('Dr. Chirag Patel', 9, '9876500072', 'chirag.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Plastic & Reconstructive Surgery'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Deepak Shah', 10, '9876500073', 'deepak.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Plastic & Reconstructive Surgery'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),

-- NEONATOLOGY (2)
('Dr. Hiral Mehta', 8, '9876500074', 'hiral.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neonatology'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Sneha Desai', 7, '9876500075', 'sneha.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Neonatology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),

-- RADIOLOGY (2)
('Dr. Anil Patel', 12, '9876500076', 'anil.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Nitin Shah', 10, '9876500077', 'nitin.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Radiology'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

-- LABORATORY MEDICINE (2)
('Dr. Jay Mehta', 11, '9876500078', 'jay.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laboratory Medicine'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Kiran Desai', 9, '9876500079', 'kiran2.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Laboratory Medicine'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),

-- PATHOLOGY (2)
('Dr. Manoj Patel', 13, '9876500080', 'manoj.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Pathology'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Rajesh Shah', 11, '9876500081', 'rajesh2.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Pathology'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),

-- PHYSIOTHERAPY (2)
('Dr. Vivek Mehta', 8, '9876500082', 'vivek.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Physiotherapy'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Mehul Desai', 7, '9876500083', 'mehul.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Physiotherapy'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),

-- REHABILITATION MEDICINE (2)
('Dr. Tapan Patel', 9, '9876500084', 'tapan.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Rehabilitation Medicine'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),
('Dr. Paresh Shah', 10, '9876500085', 'paresh.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Rehabilitation Medicine'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),

-- TRANSPLANT (2 EACH)
('Dr. Harish Mehta', 14, '9876500086', 'harish.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Liver Transplant'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),
('Dr. Kunal Desai', 12, '9876500087', 'kunal2.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Liver Transplant'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),

('Dr. Jitesh Patel', 13, '9876500088', 'jitesh.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Kidney Transplant'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Suresh Shah', 11, '9876500089', 'suresh.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Kidney Transplant'), '$2b$10$huGEtitX2FmYuPAtG0bE9uMzpt3rT/5CESuGRfbrqzPlQfyqYmLE.'),

('Dr. Rohan Mehta', 12, '9876500090', 'rohan.mehta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Heart Transplant'), '$2b$10$7ZfoPYIgL/gqzoVFZtq9pOOhOP6odK/L42iiJ/g5XNRCcEyw1uYDW'),
('Dr. Bharat Desai', 10, '9876500091', 'bharat.desai@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Heart Transplant'), '$2b$10$De2xg5iWBAqnrcjZ4h8lTug91xJDtWzfM6OMUM6zvD2J9ZLFxOOiS'),

('Dr. Nikhil Patel', 11, '9876500092', 'nikhil.patel@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Lung Transplant'), '$2b$10$gcVmllLMeOJnF/tDBcsHq..C2HS2u/xI2dhV8e1eeQDm6nJ/WfFne'),
('Dr. Tejas Shah', 9, '9876500093', 'tejas.shah@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='Lung Transplant'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK'),
('Dr. Ramesh Gupta', 10, '9876500094', 'ramesh.gupta@nexora.com',
 (SELECT specialization_id FROM SPECIALIZATION WHERE name='General Surgery'), '$2b$10$En3GZ.9LEpZIuG90M3GORu1vNASij9AVsxM73BKlBkhg.RPR6fnOK');

-- =========================
-- PATIENT (password added)
-- =========================
INSERT INTO patient (name, age, gender, phone, email, blood_group_id, password) VALUES

('Shukkoor T', 42, 'Male', '9100002001', 'shukkoor@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sourav Das', 39, 'Male', '9100002002', 'sourav@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sudhakar Chaudhary', 45, 'Male', '9100002003', 'sudhakar@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sumit Tripathi', 38, 'Male', '9100002004', 'sumit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Trudeep Dave', 41, 'Male', '9100002005', 'trudeep@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Veerabhadra Rotte', 43, 'Male', '9100002006', 'veerabhadra@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Yogesh Shah', 40, 'Male', '9100002007', 'yogesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Jiten Shah', 45, 'Male', '9100002008', 'jiten@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kamlesh Joshi', 44, 'Male', '9100002009', 'kamlesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kannan Iyer', 46, 'Male', '9100002010', 'kannan@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Krupa Shah', 34, 'Female', '9100002011', 'krupa@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Kshitij Bhargava', 37, 'Male', '9100002012', 'kshitij@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kumar Abhishek', 39, 'Male', '9100002013', 'abhishek@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('M K Barua', 50, 'Male', '9100002014', 'barua@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mahesh Mungule', 41, 'Male', '9100002015', 'mahesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Mahuya Bandyopadhyay', 45, 'Female', '9100002016', 'mahuya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mamta Sharma', 38, 'Female', '9100002017', 'mamta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Manjunath K', 40, 'Male', '9100002018', 'manjunath@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Manoj Choudhuri', 44, 'Male', '9100002019', 'manoj@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Meera A Vasani', 39, 'Female', '9100002020', 'meera@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mithilesh K Dikshit', 42, 'Male', '9100002021', 'mithilesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mohit Kumar', 37, 'Male', '9100002022', 'mohit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Navneet Khanna', 36, 'Male', '9100002023', 'navneet@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Nimisha Agarwal', 34, 'Female', '9100002024', 'nimisha@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Nishant Sharma', 35, 'Male', '9100002025', 'nishant@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('PL Ramkumar', 43, 'Male', '9100002026', 'ramkumar@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Prakash A Dabhi', 46, 'Male', '9100002027', 'prakash@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pramod Bhingole', 42, 'Male', '9100002028', 'pramod@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Prasun Chandra Tripathi', 35, 'Male', '9100002029', 'prasun@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pravin Jadhav', 39, 'Male', '9100002030', 'pravin@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Aarav Patel', 28, 'Male', '9100003001', 'aarav@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Vivaan Shah', 31, 'Male', '9100003002', 'vivaan@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Aditya Mehta', 35, 'Male', '9100003003', 'aditya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Krish Desai', 29, 'Male', '9100003004', 'krish@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ishaan Trivedi', 33, 'Male', '9100003005', 'ishaan@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Diya Shah', 27, 'Female', '9100003006', 'diya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ananya Patel', 30, 'Female', '9100003007', 'ananya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Riya Mehta', 26, 'Female', '9100003008', 'riya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kavya Desai', 32, 'Female', '9100003009', 'kavya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sneha Shah', 34, 'Female', '9100003010', 'sneha@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Rahul Verma', 38, 'Male', '9100003011', 'rahul.verma@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Amit Kumar', 40, 'Male', '9100003012', 'amit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sandeep Yadav', 36, 'Male', '9100003013', 'sandeep@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Vikas Singh', 37, 'Male', '9100003014', 'vikas@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rohit Sharma', 35, 'Male', '9100003015', 'rohit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Pooja Verma', 29, 'Female', '9100003016', 'pooja@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Neha Gupta', 33, 'Female', '9100003017', 'neha@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Swati Mishra', 31, 'Female', '9100003018', 'swati@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kiran Yadav', 34, 'Female', '9100003019', 'kiran@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Anjali Singh', 28, 'Female', '9100003020', 'anjali@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Arjun Patel', 29, 'Male', '9100003021', 'arjun.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Harsh Shah', 34, 'Male', '9100003022', 'harsh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jay Mehta', 31, 'Male', '9100003023', 'jay.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Nirav Desai', 36, 'Male', '9100003024', 'nirav.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Parth Trivedi', 28, 'Male', '9100003025', 'parth.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Rohit Shah', 32, 'Male', '9100003026', 'rohit.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kunal Patel', 35, 'Male', '9100003027', 'kunal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Dhruv Mehta', 30, 'Male', '9100003028', 'dhruv.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jatin Desai', 37, 'Male', '9100003029', 'jatin.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Tushar Shah', 39, 'Male', '9100003030', 'tushar.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Hiral Patel', 27, 'Female', '9100003031', 'hiral.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pinal Shah', 33, 'Female', '9100003032', 'pinal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jinal Mehta', 29, 'Female', '9100003033', 'jinal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Komal Desai', 31, 'Female', '9100003034', 'komal.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rupal Trivedi', 35, 'Female', '9100003035', 'rupal.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Sejal Shah', 28, 'Female', '9100003036', 'sejal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bhumi Patel', 32, 'Female', '9100003037', 'bhumi.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mansi Mehta', 30, 'Female', '9100003038', 'mansi.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rina Desai', 34, 'Female', '9100003039', 'rina.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Heena Shah', 29, 'Female', '9100003040', 'heena.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Yash Patel', 29, 'Male', '9100003041', 'yash.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Meet Shah', 33, 'Male', '9100003042', 'meet.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ronak Mehta', 31, 'Male', '9100003043', 'ronak.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Chirag Desai', 36, 'Male', '9100003044', 'chirag.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Tejas Trivedi', 28, 'Male', '9100003045', 'tejas.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Vivek Shah', 35, 'Male', '9100003046', 'vivek.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mehul Patel', 32, 'Male', '9100003047', 'mehul.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kishan Mehta', 30, 'Male', '9100003048', 'kishan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Alpesh Desai', 37, 'Male', '9100003049', 'alpesh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Hitesh Shah', 39, 'Male', '9100003050', 'hitesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Rakesh Patel', 41, 'Male', '9100003051', 'rakesh.patel2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Nilesh Shah', 38, 'Male', '9100003052', 'nilesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ketan Mehta', 34, 'Male', '9100003053', 'ketan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bhavesh Desai', 36, 'Male', '9100003054', 'bhavesh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jignesh Trivedi', 40, 'Male', '9100003055', 'jignesh.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Devang Shah', 31, 'Male', '9100003056', 'devang.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Parth Patel', 28, 'Male', '9100003057', 'parth.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Dhaval Mehta', 33, 'Male', '9100003058', 'dhaval.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Niraj Desai', 35, 'Male', '9100003059', 'niraj.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ankit Shah', 29, 'Male', '9100003060', 'ankit.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Bhavik Patel', 32, 'Male', '9100003061', 'bhavik.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jatin Shah', 34, 'Male', '9100003062', 'jatin.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Krunal Mehta', 30, 'Male', '9100003063', 'krunal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Tapan Desai', 37, 'Male', '9100003064', 'tapan.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Viral Shah', 36, 'Male', '9100003065', 'viral.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Hiral Patel', 28, 'Female', '9100003066', 'hiral.patel2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pooja Shah', 31, 'Female', '9100003067', 'pooja.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Riya Mehta', 27, 'Female', '9100003068', 'riya.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kavita Desai', 33, 'Female', '9100003069', 'kavita.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Neha Shah', 35, 'Female', '9100003070', 'neha.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Sagar Patel', 34, 'Male', '9100003071', 'sagar.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Yogesh Shah', 38, 'Male', '9100003072', 'yogesh.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rohan Mehta', 29, 'Male', '9100003073', 'rohan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Manish Desai', 36, 'Male', '9100003074', 'manish.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Deepak Trivedi', 41, 'Male', '9100003075', 'deepak.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Prakash Shah', 45, 'Male', '9100003076', 'prakash.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Naresh Patel', 40, 'Male', '9100003077', 'naresh.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kirit Mehta', 37, 'Male', '9100003078', 'kirit.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Paresh Desai', 42, 'Male', '9100003079', 'paresh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mahendra Shah', 46, 'Male', '9100003080', 'mahendra.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Bhavin Patel', 31, 'Male', '9100003081', 'bhavin.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jignesh Shah', 35, 'Male', '9100003082', 'jignesh.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kalpesh Mehta', 33, 'Male', '9100003083', 'kalpesh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bharat Desai', 39, 'Male', '9100003084', 'bharat.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ramesh Trivedi', 47, 'Male', '9100003085', 'ramesh.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Nayan Shah', 32, 'Male', '9100003086', 'nayan.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Tejas Patel', 30, 'Male', '9100003087', 'tejas.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Krunal Shah', 34, 'Male', '9100003088', 'krunal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Milan Mehta', 36, 'Male', '9100003089', 'milan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Hiren Desai', 41, 'Male', '9100003090', 'hiren.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Nisha Patel', 29, 'Female', '9100003091', 'nisha.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pinal Shah', 33, 'Female', '9100003092', 'pinal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jinal Mehta', 28, 'Female', '9100003093', 'jinal.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Heena Desai', 35, 'Female', '9100003094', 'heena.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Komal Shah', 31, 'Female', '9100003095', 'komal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Bhumi Patel', 30, 'Female', '9100003096', 'bhumi.patel2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rupal Shah', 34, 'Female', '9100003097', 'rupal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sejal Mehta', 29, 'Female', '9100003098', 'sejal.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Aarti Desai', 32, 'Female', '9100003099', 'aarti.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mansi Shah', 33, 'Female', '9100003100', 'mansi.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Akash Patel', 30, 'Male', '9100003101', 'akash.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Vimal Shah', 35, 'Male', '9100003102', 'vimal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Suresh Mehta', 42, 'Male', '9100003103', 'suresh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Ravindra Desai', 39, 'Male', '9100003104', 'ravindra.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mahesh Trivedi', 44, 'Male', '9100003105', 'mahesh.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Kishor Shah', 47, 'Male', '9100003106', 'kishor.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Arvind Patel', 41, 'Male', '9100003107', 'arvind.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Dinesh Mehta', 38, 'Male', '9100003108', 'dinesh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Nitin Desai', 36, 'Male', '9100003109', 'nitin.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sanjay Shah', 45, 'Male', '9100003110', 'sanjay.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Paresh Patel', 37, 'Male', '9100003111', 'paresh.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jayesh Shah', 40, 'Male', '9100003112', 'jayesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mukesh Mehta', 43, 'Male', '9100003113', 'mukesh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kirit Desai', 39, 'Male', '9100003114', 'kirit.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bipin Trivedi', 46, 'Male', '9100003115', 'bipin.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Ramesh Shah', 48, 'Male', '9100003116', 'ramesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jagdish Patel', 50, 'Male', '9100003117', 'jagdish.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bhupendra Mehta', 47, 'Male', '9100003118', 'bhupendra.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Raghav Desai', 35, 'Male', '9100003119', 'raghav.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pradeep Trivedi', 44, 'Male', '9100003120', 'pradeep.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Nikita Shah', 29, 'Female', '9100003121', 'nikita.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Shruti Patel', 31, 'Female', '9100003122', 'shruti.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Riddhi Mehta', 28, 'Female', '9100003123', 'riddhi.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Vaishali Desai', 34, 'Female', '9100003124', 'vaishali.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bhavna Shah', 36, 'Female', '9100003125', 'bhavna.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Minal Patel', 33, 'Female', '9100003126', 'minal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Hiral Mehta', 30, 'Female', '9100003127', 'hiral.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pooja Desai', 32, 'Female', '9100003128', 'pooja.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Komal Patel', 29, 'Female', '9100003129', 'komal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jinal Shah', 35, 'Female', '9100003130', 'jinal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Amit Patel', 34, 'Male', '9100003131', 'amit.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rohit Shah', 37, 'Male', '9100003132', 'rohit.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kunal Mehta', 31, 'Male', '9100003133', 'kunal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jay Desai', 29, 'Male', '9100003134', 'jay.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Nirav Trivedi', 36, 'Male', '9100003135', 'nirav.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Parth Shah', 30, 'Male', '9100003136', 'parth.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Dhruv Patel', 28, 'Male', '9100003137', 'dhruv.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Tushar Mehta', 35, 'Male', '9100003138', 'tushar.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Harsh Desai', 32, 'Male', '9100003139', 'harsh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Vikas Shah', 39, 'Male', '9100003140', 'vikas.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Ankit Patel', 33, 'Male', '9100003141', 'ankit.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Bhavesh Shah', 38, 'Male', '9100003142', 'bhavesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jatin Mehta', 34, 'Male', '9100003143', 'jatin.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Krunal Desai', 31, 'Male', '9100003144', 'krunal.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Tapan Shah', 40, 'Male', '9100003145', 'tapan.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Rina Patel', 29, 'Female', '9100003146', 'rina.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Heena Shah', 35, 'Female', '9100003147', 'heena.shah3@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Komal Mehta', 30, 'Female', '9100003148', 'komal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pooja Desai', 33, 'Female', '9100003149', 'pooja.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Jinal Patel', 28, 'Female', '9100003150', 'jinal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Bhumi Shah', 32, 'Female', '9100003151', 'bhumi.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Mansi Mehta', 31, 'Female', '9100003152', 'mansi.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Rupal Desai', 34, 'Female', '9100003153', 'rupal.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sejal Shah', 29, 'Female', '9100003154', 'sejal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Aarti Patel', 36, 'Female', '9100003155', 'aarti.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),

('Neha Shah', 33, 'Female', '9100003156', 'neha.shah3@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Kavya Mehta', 27, 'Female', '9100003157', 'kavya.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Riya Patel', 26, 'Female', '9100003158', 'riya.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Sneha Desai', 35, 'Female', '9100003159', 'sneha.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK'),
('Pinal Shah', 30, 'Female', '9100003160', 'pinal.shah3@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), '$2b$10$Nzfzd0yNG4hRCul.QArAX.FQvE/qeoGkoAUgcNkeu1zPlKdJNC.cK');

-- =========================
-- MEDICAL_HISTORY
-- ========================

INSERT INTO MEDICAL_HISTORY (patient_id, disease, diagnosis_date, status) VALUES

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 0),'Diabetes','2021-05-10','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 1),'Hypertension','2020-03-15','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 2),'Asthma','2019-08-20','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 3),'Migraine','2022-01-12','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 4),'Thyroid Disorder','2021-11-05','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 5),'Anemia','2023-02-18','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 6),'Arthritis','2020-07-10','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 7),'Depression','2022-04-22','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 8),'Allergy','2021-09-30','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 9),'Bronchitis','2020-12-11','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 10),'Diabetes','2019-06-25','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 11),'Hypertension','2021-01-14','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 12),'Asthma','2020-10-05','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 13),'Migraine','2023-03-17','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 14),'Thyroid Disorder','2022-08-09','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 15),'Anemia','2021-02-28','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 16),'Arthritis','2020-06-19','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 17),'Depression','2022-09-11','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 18),'Allergy','2023-01-25','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 19),'Bronchitis','2021-04-03','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 20),'Diabetes','2020-07-22','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 21),'Hypertension','2019-11-30','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 22),'Asthma','2021-06-18','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 23),'Migraine','2022-12-05','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 24),'Thyroid Disorder','2020-09-27','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 25),'Anemia','2023-02-10','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 26),'Arthritis','2021-03-08','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 27),'Depression','2022-05-21','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 28),'Allergy','2020-10-14','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 29),'Bronchitis','2021-12-19','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 30),'Heart Disease','2020-02-14','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 31),'Kidney Stones','2021-06-10','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 32),'Liver Disorder','2019-09-25','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 33),'Skin Allergy','2022-03-18','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 34),'Sinusitis','2021-12-05','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 35),'Diabetes','2020-08-21','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 36),'Hypertension','2019-04-11','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 37),'Asthma','2021-07-09','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 38),'Migraine','2023-02-13','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 39),'Thyroid Disorder','2022-06-22','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 40),'Anemia','2021-01-30','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 41),'Arthritis','2020-05-15','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 42),'Depression','2022-10-08','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 43),'Allergy','2023-03-02','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 44),'Bronchitis','2021-08-27','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 45),'Heart Disease','2020-11-12','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 46),'Kidney Infection','2021-09-19','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 47),'Liver Disorder','2019-12-07','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 48),'Skin Allergy','2022-04-25','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 49),'Sinusitis','2021-10-14','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 50),'Diabetes','2020-03-11','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 51),'Hypertension','2019-07-29','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 52),'Asthma','2021-02-17','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 53),'Migraine','2022-11-06','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 54),'Thyroid Disorder','2020-05-23','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 55),'Anemia','2023-01-09','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 56),'Arthritis','2021-06-30','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 57),'Depression','2022-08-15','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 58),'Allergy','2020-09-03','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 59),'Bronchitis','2021-11-21','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 60),'Tuberculosis','2018-06-14','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 61),'Epilepsy','2020-01-22','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 62),'Gastritis','2021-03-19','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 63),'Ulcer','2019-07-11','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 64),'Pneumonia','2022-02-08','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 65),'Diabetes','2020-09-10','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 66),'Hypertension','2019-12-05','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 67),'Asthma','2021-04-18','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 68),'Migraine','2023-01-28','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 69),'Thyroid Disorder','2022-07-16','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 70),'Anxiety Disorder','2021-02-25','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 71),'Osteoporosis','2020-10-30','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 72),'Back Pain','2022-05-13','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 73),'Neck Pain','2021-08-09','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 74),'Sciatica','2020-11-17','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 75),'Heart Disease','2019-03-21','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 76),'Kidney Stones','2021-09-14','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 77),'Liver Disorder','2020-06-06','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 78),'Skin Infection','2022-12-12','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 79),'Sinusitis','2021-01-04','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 80),'Diabetes','2020-04-07','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 81),'Hypertension','2019-08-19','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 82),'Asthma','2021-06-23','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 83),'Migraine','2022-10-10','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 84),'Thyroid Disorder','2020-02-27','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 85),'Anemia','2023-03-05','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 86),'Arthritis','2021-07-29','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 87),'Depression','2022-09-02','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 88),'Allergy','2020-11-13','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 89),'Bronchitis','2021-05-26','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 90),'Chickenpox','2018-04-12','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 91),'Dengue','2021-09-18','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 92),'Malaria','2020-07-25','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 93),'COVID-19','2021-05-10','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 94),'Typhoid','2019-11-03','cured'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 95),'Psoriasis','2020-03-14','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 96),'Eczema','2021-06-21','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 97),'Acne','2022-02-17','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 98),'Fungal Infection','2021-08-29','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 99),'Dermatitis','2020-12-05','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 100),'Obesity','2022-01-11','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 101),'Sleep Apnea','2021-04-27','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 102),'Insomnia','2023-03-06','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 103),'Anxiety Disorder','2022-07-19','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 104),'Panic Disorder','2021-10-30','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 105),'Heart Disease','2019-06-08','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 106),'Stroke','2020-02-22','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 107),'High Cholesterol','2021-11-15','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 108),'Coronary Artery Disease','2018-09-09','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 109),'Arrhythmia','2022-05-13','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 110),'Kidney Failure','2020-01-17','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 111),'Urinary Infection','2022-06-04','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 112),'Gallstones','2021-03-12','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 113),'Pancreatitis','2020-08-26','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 114),'Hepatitis B','2019-07-07','ongoing'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 115),'Fracture','2022-09-14','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 116),'Sprain','2021-12-01','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 117),'Ligament Tear','2020-10-18','cured'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 118),'Joint Pain','2022-04-03','ongoing'),
((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 119),'Osteoarthritis','2021-07-25','ongoing');

-- =========================
-- APPOINTMENT
-- =========================
INSERT INTO APPOINTMENT (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 0),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rakesh Patel' LIMIT 1),
 '2026-04-01','10:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nidhi Shah' LIMIT 1),
 '2026-04-02','11:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 2),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mihir Mehta' LIMIT 1),
 '2026-04-03','12:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 3),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kunal Desai' LIMIT 1),
 '2026-04-04','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 4),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bhavik Trivedi' LIMIT 1),
 '2026-04-05','10:30:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 5),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Aakash Joshi' LIMIT 1),
 '2026-04-06','11:30:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 6),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pooja Mehta' LIMIT 1),
 '2026-04-07','12:30:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 7),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hiren Shah' LIMIT 1),
 '2026-04-08','09:15:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 8),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rupal Vyas' LIMIT 1),
 '2026-04-09','10:45:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 9),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sandeep Patel' LIMIT 1),
 '2026-04-10','11:15:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 10),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Jinal Shah' LIMIT 1),
 '2026-04-11','12:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 11),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Parth Mehta' LIMIT 1),
 '2026-04-12','10:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 12),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Darshan Patel' LIMIT 1),
 '2026-04-13','11:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 13),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Meet Shah' LIMIT 1),
 '2026-04-14','12:00:00','completed'),

((SELECT patient_id FROM PATIENT WHERE name='Pravin Jadhav'LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Krunal Desai' LIMIT 1),
 '2026-04-15','09:30:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 14),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Harsh Vyas' LIMIT 1),
 '2026-04-16','10:30:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 15),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Tejas Joshi'LIMIT 1),
 '2026-04-17','11:45:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 16),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ketan Patel' LIMIT 1),
 '2026-04-18','12:15:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 17),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bhumi Shah'LIMIT 1),
 '2026-04-19','09:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 18),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ronak Mehta'LIMIT 1),
 '2026-04-20','10:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 19),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Yash Desai'LIMIT 1),
 '2026-04-21','11:00:00','completed'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 20),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nikunj Trivedi' LIMIT 1),
 '2026-04-22','12:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Parth Shah'LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Dhruv Patel' LIMIT 1),
 '2026-04-23','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 21),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Jigar Shah'LIMIT 1),
 '2026-04-24','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 22),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Chirag Mehta' LIMIT 1),
 '2026-04-25','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 23),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Viral Desai' LIMIT 1),
 '2026-04-26','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 24),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ankit Joshi' LIMIT 1),
 '2026-04-27','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 25),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rajiv Patel' LIMIT 1),
 '2026-04-28','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 26),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Neel Shah' LIMIT 1),
 '2026-04-29','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 27),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Paresh Mehta' LIMIT 1),
 '2026-04-30','12:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Mahesh Mungule'LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Tushar Desai' LIMIT 1),
 '2026-05-01','09:30:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Mahuya Bandyopadhyay'LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hemal Patel'LIMIT 1),
 '2026-05-02','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 28),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ritesh Shah'LIMIT 1),
 '2026-05-03','11:30:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Manjunath K'LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Vimal Mehta' LIMIT 1),
 '2026-05-04','12:15:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 29),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kiran Desai' LIMIT 1),
 '2026-05-05','09:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 30),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ajay Patel' LIMIT 1),
 '2026-05-06','10:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 31),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pankaj Shah' LIMIT 1),
 '2026-05-07','11:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 32),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sagar Mehta' LIMIT 1),
 '2026-05-08','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 33),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mahesh Desai' LIMIT 1),
 '2026-05-09','09:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 34),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nisha Patel' LIMIT 1),
 '2026-05-10','10:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 35),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Komal Shah' LIMIT 1),
 '2026-05-11','11:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 36),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rina Mehta' LIMIT 1),
 '2026-05-12','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 37),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Heena Desai' LIMIT 1),
 '2026-05-13','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 38),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bhavna Patel' LIMIT 1),
 '2026-05-14','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 39),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pinal Shah' LIMIT 1),
 '2026-05-15','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 40),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Minal Mehta' LIMIT 1),
 '2026-05-16','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 41),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rupal Desai' LIMIT 1),
 '2026-05-17','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 42),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Khyati Patel' LIMIT 1),
 '2026-05-18','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 43),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Janki Shah' LIMIT 1),
 '2026-05-19','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 44),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sejal Mehta' LIMIT 1),
 '2026-05-20','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 45),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Aarti Desai' LIMIT 1),
 '2026-05-21','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 46),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Devang Patel' LIMIT 1),
 '2026-05-22','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 47),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nayan Shah' LIMIT 1),
 '2026-05-23','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 48),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rakesh Mehta' LIMIT 1),
 '2026-05-24','12:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 49),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hitesh Desai' LIMIT 1),
 '2026-05-25','09:45:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Vivaan Shah'LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Jignesh Patel' LIMIT 1),
 '2026-05-26','10:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 50),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ketan Shah' LIMIT 1),
 '2026-05-27','11:15:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 51),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mayur Mehta' LIMIT 1),
 '2026-05-28','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 52),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Alpesh Desai' LIMIT 1),
 '2026-05-29','09:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 53),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bharat Patel' LIMIT 1),
 '2026-05-30','10:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 54),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kalpesh Shah' LIMIT 1),
 '2026-05-31','11:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 55),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Vipul Mehta' LIMIT 1),
 '2026-06-01','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 56),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sanjay Desai' LIMIT 1),
 '2026-06-02','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 57),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pravin Patel' LIMIT 1),
 '2026-06-03','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 58),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mahendra Shah' LIMIT 1),
 '2026-06-04','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 59),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ajit Mehta' LIMIT 1),
 '2026-06-05','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 60),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ramesh Desai' LIMIT 1),
 '2026-06-06','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 61),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Chirag Patel' LIMIT 1),
 '2026-06-07','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 62),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Deepak Shah' LIMIT 1),
 '2026-06-08','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 63),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hiral Mehta'LIMIT 1),
 '2026-06-09','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 64),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sneha Desai' LIMIT 1),
 '2026-06-10','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 65),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Anil Patel' LIMIT 1),
 '2026-06-11','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 66),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nitin Shah' LIMIT 1),
 '2026-06-12','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 67),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Jay Mehta' LIMIT 1),
 '2026-06-13','12:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 68),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kiran Desai' LIMIT 1),
 '2026-06-14','09:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 69),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Manoj Patel' LIMIT 1),
 '2026-06-15','10:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 70),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rajesh Shah' LIMIT 1),
 '2026-06-16','11:15:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 71),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Vivek Mehta' LIMIT 1),
 '2026-06-17','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 72),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mehul Desai' LIMIT 1),
 '2026-06-18','09:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 73),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Tapan Patel' LIMIT 1),
 '2026-06-19','10:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 74),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Paresh Shah' LIMIT 1),
 '2026-06-20','11:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 75),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Harish Mehta' LIMIT 1),
 '2026-06-21','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 76),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kunal Desai' LIMIT 1),
 '2026-06-22','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 77),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Jitesh Patel' LIMIT 1),
 '2026-06-23','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 78),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Suresh Shah' LIMIT 1),
 '2026-06-24','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 79),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rohan Mehta' LIMIT 1),
 '2026-06-25','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 80),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bharat Desai' LIMIT 1),
 '2026-06-26','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 81),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nikhil Patel' LIMIT 1),
 '2026-06-27','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 82),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Tejas Shah' LIMIT 1),
 '2026-06-28','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 83),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rakesh Mehta' LIMIT 1),
 '2026-06-29','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 84),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ketan Shah' LIMIT 1),
 '2026-06-30','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 85),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rakesh Patel' LIMIT 1),
 '2026-07-01','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 86),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hitesh Desai' LIMIT 1),
 '2026-07-02','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 87),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nikunj Trivedi' LIMIT 1),
 '2026-07-03','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 88),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pinal Shah' LIMIT 1),
 '2026-07-04','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 89),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pooja Mehta' LIMIT 1),
 '2026-07-05','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 90),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Aakash Joshi' LIMIT 1),
 '2026-07-06','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 91),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Manoj Patel' LIMIT 1),
 '2026-07-07','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 92),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pinal Shah' LIMIT 1),
 '2026-07-08','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 93),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nisha Patel'LIMIT 1),
 '2026-07-09','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 94),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ruchi Shah' LIMIT 1),
 '2026-07-10','11:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 95),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ruchi Shah' LIMIT 1),
 '2026-07-11','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 96),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pooja Mehta' LIMIT 1),
 '2026-07-12','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 97),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nisha Patel' LIMIT 1),
 '2026-07-13','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 98),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Komal Shah' LIMIT 1),
 '2026-07-14','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 99),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bhavna Patel' LIMIT 1),
 '2026-07-15','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 100),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pinal Shah' LIMIT 1),
 '2026-07-16','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 101),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Minal Mehta' LIMIT 1),
 '2026-07-17','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 102),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rupal Desai' LIMIT 1),
 '2026-07-18','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 103),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Khyati Patel' LIMIT 1),
 '2026-07-19','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 104),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Janki Shah' LIMIT 1),
 '2026-07-20','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 105),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sejal Mehta' LIMIT 1),
 '2026-07-21','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 106),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Aarti Desai' LIMIT 1),
 '2026-07-22','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 107),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Devang Patel' LIMIT 1),
 '2026-07-23','12:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 108),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nayan Shah' LIMIT 1),
 '2026-07-24','09:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 109),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rakesh Mehta' LIMIT 1),
 '2026-07-25','10:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 110),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hitesh Desai' LIMIT 1),
 '2026-07-26','11:15:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 111),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Jignesh Patel' LIMIT 1),
 '2026-07-27','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 112),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ketan Shah' LIMIT 1),
 '2026-07-28','09:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 113),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mayur Mehta' LIMIT 1),
 '2026-07-29','10:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 114),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Alpesh Desai' LIMIT 1),
 '2026-07-30','11:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 115),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bharat Patel' LIMIT 1),
 '2026-07-31','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 116),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kalpesh Shah' LIMIT 1),
 '2026-08-01','09:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 117),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Vipul Mehta' LIMIT 1),
 '2026-08-02','10:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 118),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Sanjay Desai' LIMIT 1),
 '2026-08-03','11:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 119),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pravin Patel' LIMIT 1),
 '2026-08-04','12:30:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 120),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mahendra Shah' LIMIT 1),
 '2026-08-05','09:00:00','cancelled'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 121),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ajit Mehta' LIMIT 1),
 '2026-08-06','10:15:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 122),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ramesh Desai' LIMIT 1),
 '2026-08-07','11:45:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 123),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Chirag Patel' LIMIT 1),
 '2026-08-08','12:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1 OFFSET 124),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Deepak Shah' LIMIT 1),
 '2026-08-09','09:30:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Shukkoor T' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Rakesh Patel' LIMIT 1),
 '2026-04-01','14:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Shukkoor T' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Nidhi Shah' LIMIT 1),
 '2026-08-11','11:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Sourav Das' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Mihir Mehta' LIMIT 1),
 '2026-04-02','14:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Sourav Das' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Kunal Desai' LIMIT 1),
 '2026-04-02','15:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Sudhakar Chaudhary' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Bhavik Trivedi' LIMIT 1),
 '2026-08-14','10:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Sudhakar Chaudhary' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Aakash Joshi' LIMIT 1),
 '2026-08-15','11:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Sumit Tripathi' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Pooja Mehta' LIMIT 1),
 '2026-08-16','10:00:00','booked'),

((SELECT patient_id FROM PATIENT WHERE name='Sumit Tripathi' LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Hiren Shah' LIMIT 1),
 '2026-08-17','11:00:00','booked'),

((SELECT patient_id FROM PATIENT LIMIT 1),
 (SELECT doctor_id FROM DOCTOR WHERE name='Dr. Ramesh Gupta' LIMIT 1),
 '2026-01-15','09:00:00','completed');

-- =========================
-- SYMPTOM
-- =========================

INSERT INTO SYMPTOM (patient_id, description, date_recorded) VALUES

(1,'Fever','2026-04-01'),(1,'Fatigue','2026-04-01'),
(2,'Cough','2026-04-02'),
(3,'Headache','2026-04-03'),(3,'Dizziness','2026-04-03'),
(4,'Cold','2026-04-04'),
(5,'Chest Pain','2026-04-05'),
(6,'Palpitations','2026-04-06'),
(7,'Weakness','2026-04-07'),
(8,'Abdominal Pain','2026-04-08'),(8,'Nausea','2026-04-08'),
(9,'Vomiting','2026-04-09'),
(10,'Back Pain','2026-04-10'),
(11,'Joint Pain','2026-04-11'),
(12,'Skin Rash','2026-04-12'),
(13,'Allergy','2026-04-13'),
(14,'High Blood Pressure','2026-04-14'),
(15,'Low Blood Pressure','2026-04-15'),
(16,'Pregnancy Symptoms','2026-04-16'),
(17,'Shortness of Breath','2026-04-17'),

(18,'Fever','2026-04-18'),(18,'Headache','2026-04-18'),
(19,'Cough','2026-04-19'),
(20,'Fatigue','2026-04-20'),
(21,'Chest Pain','2026-04-21'),
(22,'Back Pain','2026-04-22'),
(23,'Joint Pain','2026-04-23'),
(24,'Cold','2026-04-24'),
(25,'Nausea','2026-04-25'),
(26,'Vomiting','2026-04-26'),
(27,'Dizziness','2026-04-27'),
(28,'Skin Rash','2026-04-28'),
(29,'Allergy','2026-04-29'),
(30,'Weakness','2026-04-30'),
(31,'High Blood Pressure','2026-05-01'),
(32,'Low Blood Pressure','2026-05-02'),
(33,'Fever','2026-05-03'),
(34,'Headache','2026-05-04'),
(35,'Cough','2026-05-05'),
(36,'Fatigue','2026-05-06'),

(37,'Chest Pain','2026-05-07'),
(38,'Shortness of Breath','2026-05-08'),
(39,'Cold','2026-05-09'),
(40,'Nausea','2026-05-10'),
(41,'Vomiting','2026-05-11'),
(42,'Back Pain','2026-05-12'),
(43,'Joint Pain','2026-05-13'),
(44,'Skin Rash','2026-05-14'),
(45,'Allergy','2026-05-15'),
(46,'Weakness','2026-05-16'),
(47,'High Blood Pressure','2026-05-17'),
(48,'Low Blood Pressure','2026-05-18'),
(49,'Fever','2026-05-19'),
(50,'Headache','2026-05-20'),
(51,'Cough','2026-05-21'),
(52,'Fatigue','2026-05-22'),
(53,'Chest Pain','2026-05-23'),
(54,'Shortness of Breath','2026-05-24'),
(55,'Cold','2026-05-25'),
(56,'Nausea','2026-05-26'),

(57,'Vomiting','2026-05-27'),
(58,'Back Pain','2026-05-28'),
(59,'Joint Pain','2026-05-29'),
(60,'Skin Rash','2026-05-30'),
(61,'Allergy','2026-05-31'),
(62,'Weakness','2026-06-01'),
(63,'High Blood Pressure','2026-06-02'),
(64,'Low Blood Pressure','2026-06-03'),
(65,'Fever','2026-06-04'),
(66,'Headache','2026-06-05'),
(67,'Cough','2026-06-06'),
(68,'Fatigue','2026-06-07'),
(69,'Chest Pain','2026-06-08'),
(70,'Shortness of Breath','2026-06-09'),
(71,'Cold','2026-06-10'),
(72,'Nausea','2026-06-11'),
(73,'Vomiting','2026-06-12'),
(74,'Back Pain','2026-06-13'),
(75,'Joint Pain','2026-06-14'),
(76,'Skin Rash','2026-06-15'),

(77,'Allergy','2026-06-16'),
(78,'Weakness','2026-06-17'),
(79,'High Blood Pressure','2026-06-18'),
(80,'Low Blood Pressure','2026-06-19'),
(81,'Fever','2026-06-20'),
(82,'Headache','2026-06-21'),
(83,'Cough','2026-06-22'),
(84,'Fatigue','2026-06-23'),
(85,'Chest Pain','2026-06-24'),
(86,'Shortness of Breath','2026-06-25'),
(87,'Cold','2026-06-26'),
(88,'Nausea','2026-06-27'),
(89,'Vomiting','2026-06-28'),
(90,'Back Pain','2026-06-29'),
(91,'Joint Pain','2026-06-30'),
(92,'Skin Rash','2026-07-01'),
(93,'Allergy','2026-07-02'),
(94,'Weakness','2026-07-03'),
(95,'High Blood Pressure','2026-07-04'),
(96,'Low Blood Pressure','2026-07-05'),

(97,'Fever','2026-07-06'),
(98,'Headache','2026-07-07'),
(99,'Cough','2026-07-08'),
(100,'Fatigue','2026-07-09'),
(101,'Chest Pain','2026-07-10'),
(102,'Shortness of Breath','2026-07-11'),
(103,'Cold','2026-07-12'),
(104,'Nausea','2026-07-13'),
(105,'Vomiting','2026-07-14'),
(106,'Back Pain','2026-07-15'),
(107,'Joint Pain','2026-07-16'),
(108,'Skin Rash','2026-07-17'),
(109,'Allergy','2026-07-18'),
(110,'Weakness','2026-07-19'),
(111,'High Blood Pressure','2026-07-20'),
(112,'Low Blood Pressure','2026-07-21'),
(113,'Pregnancy Symptoms','2026-07-22'),
(114,'Fever','2026-07-23'),
(115,'Cough','2026-07-24'),
(116,'Headache','2026-07-25');

-- =========================
-- PRESCRIPTION
-- =========================

INSERT INTO PRESCRIPTION (appointment_id, medicine, dosage, duration) VALUES

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 0),'Paracetamol','500mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 1),'Ibuprofen','400mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 2),'Azithromycin','250mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 3),'Amoxicillin','500mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 4),'Cetirizine','10mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 5),'Metformin','500mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 6),'Amlodipine','5mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 7),'Pantoprazole','40mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 8),'Omeprazole','20mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 9),'Dolo 650','650mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 10),'Crocin','500mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 11),'Augmentin','625mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 12),'Telmisartan','40mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 13),'Losartan','50mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 14),'Atorvastatin','10mg','30 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 15),'Levocetirizine','5mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 16),'Montelukast','10mg','10 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 17),'Diclofenac','50mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 18),'Ranitidine','150mg','10 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 19),'Ciprofloxacin','500mg','7 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 20),'Doxycycline','100mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 21),'Clarithromycin','500mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 22),'Insulin','10 units','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 23),'Salbutamol','2 puffs','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 24),'Hydroxyzine','25mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 25),'Fexofenadine','120mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 26),'Glimepiride','2mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 27),'Ramipril','5mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 28),'Esomeprazole','40mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 29),'Domperidone','10mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 30),'Naproxen','250mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 31),'Ketorolac','10mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 32),'Prednisolone','10mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 33),'Methylprednisolone','8mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 34),'Chlorpheniramine','4mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 35),'Glibenclamide','5mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 36),'Pioglitazone','15mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 37),'Atenolol','50mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 38),'Bisoprolol','5mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 39),'Rosuvastatin','10mg','30 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 40),'Loratadine','10mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 41),'Desloratadine','5mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 42),'Meloxicam','7.5mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 43),'Aceclofenac','100mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 44),'Famotidine','20mg','10 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 45),'Levofloxacin','500mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 46),'Ofloxacin','200mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 47),'Linezolid','600mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 48),'Meropenem','1g','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 49),'Amikacin','500mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 50),'Vitamin D3','60000 IU','4 weeks'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 51),'Calcium Carbonate','500mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 52),'Iron Folic Acid','100mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 53),'Zinc','50mg','15 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 54),'Multivitamin','1 tablet','30 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 55),'Ondansetron','4mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 56),'Metoclopramide','10mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 57),'Loperamide','2mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 58),'ORS','1 sachet','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 59),'Probiotic','1 capsule','7 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 60),'Etoricoxib','60mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 61),'Tramadol','50mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 62),'Codeine','30mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 63),'Dexamethasone','4mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 64),'Hydrocortisone','10mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 65),'Empagliflozin','10mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 66),'Sitagliptin','100mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 67),'Carvedilol','6.25mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 68),'Clopidogrel','75mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 69),'Simvastatin','20mg','30 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 70),'Diphenhydramine','25mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 71),'Brompheniramine','4mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 72),'Indomethacin','25mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 73),'Piroxicam','20mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 74),'Cimetidine','400mg','10 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 75),'Cefixime','200mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 76),'Ceftriaxone','1g','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 77),'Vancomycin','500mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 78),'Tigecycline','50mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 79),'Colistin','150mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 80),'Vitamin B12','500mcg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 81),'Folic Acid','5mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 82),'Magnesium','250mg','15 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 83),'Potassium','20mEq','10 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 84),'Electrolyte Solution','1 bottle','3 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 85),'Domperidone','10mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 86),'Rabeprazole','20mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 87),'Sucralfate','1g','10 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 88),'Hyoscine','10mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 89),'Dicycloverine','10mg','5 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 90),'Ketoconazole','200mg','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 91),'Fluconazole','150mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 92),'Acyclovir','400mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 93),'Oseltamivir','75mg','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 94),'Ivermectin','12mg','3 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 95),'Methotrexate','7.5mg','weekly'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 96),'Cyclosporine','50mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 97),'Tacrolimus','2mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 98),'Mycophenolate','500mg','14 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 99),'Azathioprine','50mg','14 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 100),'Sertraline','50mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 101),'Fluoxetine','20mg','30 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 102),'Clonazepam','0.5mg','10 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 103),'Alprazolam','0.5mg','10 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 104),'Escitalopram','10mg','30 days'),

((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 105),'Lactulose','15ml','7 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 106),'Bisacodyl','5mg','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 107),'Senna','2 tablets','5 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 108),'Glycerin Suppository','1 unit','3 days'),
((SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 109),'Psyllium Husk','1 spoon','7 days');

-- =========================
-- LAB
-- =========================
INSERT INTO LAB (name, location, contact, email) VALUES

('KD Hospital Lab', 'Ahmedabad', '7777777701', 'kdlab@hospital.com'),
('City Lab', 'Ahmedabad', '7777777702', 'citylab@gmail.com'),
('Apollo Diagnostics', 'Ahmedabad', '7777777703', 'apollo@diagnostics.com'),
('SRL Diagnostics', 'Ahmedabad', '7777777704', 'srl@diagnostics.com'),
('Thyrocare Lab', 'Ahmedabad', '7777777705', 'thyrocare@lab.com'),
('Advanced Path Lab', 'Ahmedabad', '7777777706', 'advancedpath@lab.com');

-- =========================
-- TEST
-- =========================
INSERT INTO TEST (test_name, cost, description) VALUES

-- 🩸 BASIC & BLOOD TESTS
('Blood Test', 500, 'Basic blood analysis'),
('Complete Blood Count (CBC)', 800, 'Measures different components of blood'),
('Blood Sugar Test', 300, 'Checks glucose level'),
('Lipid Profile', 900, 'Measures cholesterol levels'),

-- 🧪 ORGAN FUNCTION TESTS
('Liver Function Test (LFT)', 1000, 'Checks liver health'),
('Kidney Function Test (KFT)', 950, 'Evaluates kidney performance'),
('Thyroid Test (TSH)', 700, 'Checks thyroid hormone levels'),

-- 🚽 ROUTINE TESTS
('Urine Test', 400, 'Routine urine examination'),

-- 🫀 HEART RELATED TESTS
('ECG', 600, 'Measures electrical activity of heart'),
('2D Echo', 1500, 'Ultrasound imaging of heart'),

-- 🧠 IMAGING TESTS
('X-Ray', 1200, 'Radiographic imaging'),
('MRI Scan', 5000, 'Detailed internal imaging'),
('CT Scan', 4500, 'Cross-sectional imaging'),
('Ultrasound', 1300, 'Imaging of internal organs'),

-- 🦠 DISEASE TESTS
('Covid-19 Test', 800, 'Detects coronavirus infection'),
('Dengue Test', 900, 'Detects dengue virus'),
('Malaria Test', 700, 'Detects malaria infection'),

-- 💊 VITAMIN / GENERAL HEALTH
('Vitamin D Test', 1200, 'Checks vitamin D levels'),

-- 🤰 GYNECOLOGY / OBSTETRICS
('Pregnancy Test', 600, 'Detects pregnancy'),
('Beta hCG Test', 1200, 'Measures pregnancy hormone level');

-- =========================
-- LAB REPORT
-- =========================

INSERT INTO LAB_REPORT (appointment_id, test_id, lab_id, result, report_date, status) VALUES

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 0),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Normal', '2026-04-03', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 1),
 (SELECT test_id FROM TEST WHERE test_name = 'Complete Blood Count (CBC)'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Normal', '2026-04-03', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 2),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Sugar Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'High', '2026-04-04', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 3),
 (SELECT test_id FROM TEST WHERE test_name = 'Lipid Profile'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Normal', '2026-04-06', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 4),
 (SELECT test_id FROM TEST WHERE test_name = 'Liver Function Test (LFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Critical', '2026-04-05', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 5),
 (SELECT test_id FROM TEST WHERE test_name = 'Kidney Function Test (KFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Normal', '2026-04-08', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 6),
 (SELECT test_id FROM TEST WHERE test_name = 'Thyroid Test (TSH)'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'High', '2026-04-08', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 7),
 (SELECT test_id FROM TEST WHERE test_name = 'Urine Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Normal', '2026-04-10', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 8),
 (SELECT test_id FROM TEST WHERE test_name = 'X-Ray'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Normal', '2026-04-09', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 9),
 (SELECT test_id FROM TEST WHERE test_name = 'MRI Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Critical', '2026-04-10', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 10),
 (SELECT test_id FROM TEST WHERE test_name = 'CT Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Normal', '2026-04-11', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 11),
 (SELECT test_id FROM TEST WHERE test_name = 'ECG'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'High', '2026-04-14', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 12),
 (SELECT test_id FROM TEST WHERE test_name = '2D Echo'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Normal', '2026-04-13', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 13),
 (SELECT test_id FROM TEST WHERE test_name = 'Ultrasound'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Normal', '2026-04-16', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 14),
 (SELECT test_id FROM TEST WHERE test_name = 'Vitamin D Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Normal', '2026-04-15', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 15),
 (SELECT test_id FROM TEST WHERE test_name = 'Covid-19 Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Negative', '2026-04-17', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 16),
 (SELECT test_id FROM TEST WHERE test_name = 'Dengue Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Negative', '2026-04-18', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 17),
 (SELECT test_id FROM TEST WHERE test_name = 'Malaria Test'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Positive', '2026-04-18', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 18),
 (SELECT test_id FROM TEST WHERE test_name = 'Pregnancy Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Positive', '2026-04-21', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 19),
 (SELECT test_id FROM TEST WHERE test_name = 'Beta hCG Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-04-22', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 20),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Normal', '2026-04-21', 'completed'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 21),
 (SELECT test_id FROM TEST WHERE test_name = 'Complete Blood Count (CBC)'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-04-23', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 22),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Sugar Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-04-24', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 23),
 (SELECT test_id FROM TEST WHERE test_name = 'Lipid Profile'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-04-25', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 24),
 (SELECT test_id FROM TEST WHERE test_name = 'Liver Function Test (LFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-04-27', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 25),
 (SELECT test_id FROM TEST WHERE test_name = 'Kidney Function Test (KFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-04-28', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 26),
 (SELECT test_id FROM TEST WHERE test_name = 'Thyroid Test (TSH)'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-04-29', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 27),
 (SELECT test_id FROM TEST WHERE test_name = 'Urine Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-04-30', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 28),
 (SELECT test_id FROM TEST WHERE test_name = 'X-Ray'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-04-29', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 29),
 (SELECT test_id FROM TEST WHERE test_name = 'MRI Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-05-02', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 30),
 (SELECT test_id FROM TEST WHERE test_name = 'CT Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-05-01', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 31),
 (SELECT test_id FROM TEST WHERE test_name = 'ECG'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-05-02', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 32),
 (SELECT test_id FROM TEST WHERE test_name = '2D Echo'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-05-05', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 33),
 (SELECT test_id FROM TEST WHERE test_name = 'Ultrasound'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-05-04', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 34),
 (SELECT test_id FROM TEST WHERE test_name = 'Vitamin D Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-05-06', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 35),
 (SELECT test_id FROM TEST WHERE test_name = 'Covid-19 Test'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-05-07', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 36),
 (SELECT test_id FROM TEST WHERE test_name = 'Dengue Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-05-09', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 37),
 (SELECT test_id FROM TEST WHERE test_name = 'Malaria Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-05-08', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 38),
 (SELECT test_id FROM TEST WHERE test_name = 'Pregnancy Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-05-11', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 39),
 (SELECT test_id FROM TEST WHERE test_name = 'Beta hCG Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-05-11', 'pending'
),
 
(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 40),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-05-12', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 41),
 (SELECT test_id FROM TEST WHERE test_name = 'Complete Blood Count (CBC)'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-05-12', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 42),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Sugar Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-05-13', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 43),
 (SELECT test_id FROM TEST WHERE test_name = 'Lipid Profile'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-05-14', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 44),
 (SELECT test_id FROM TEST WHERE test_name = 'Liver Function Test (LFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-05-17', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 45),
 (SELECT test_id FROM TEST WHERE test_name = 'Kidney Function Test (KFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-05-16', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 46),
 (SELECT test_id FROM TEST WHERE test_name = 'Thyroid Test (TSH)'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-05-19', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 47),
 (SELECT test_id FROM TEST WHERE test_name = 'Urine Test'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-05-19', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 48),
 (SELECT test_id FROM TEST WHERE test_name = 'X-Ray'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-05-20', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 49),
 (SELECT test_id FROM TEST WHERE test_name = 'MRI Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-05-21', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 50),
 (SELECT test_id FROM TEST WHERE test_name = 'CT Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-05-21', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 51),
 (SELECT test_id FROM TEST WHERE test_name = 'ECG'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-05-23', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 52),
 (SELECT test_id FROM TEST WHERE test_name = '2D Echo'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-05-23', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 53),
 (SELECT test_id FROM TEST WHERE test_name = 'Ultrasound'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-05-26', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 54),
 (SELECT test_id FROM TEST WHERE test_name = 'Vitamin D Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-05-27', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 55),
 (SELECT test_id FROM TEST WHERE test_name = 'Covid-19 Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-05-27', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 56),
 (SELECT test_id FROM TEST WHERE test_name = 'Dengue Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-05-29', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 57),
 (SELECT test_id FROM TEST WHERE test_name = 'Malaria Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-05-28', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 58),
 (SELECT test_id FROM TEST WHERE test_name = 'Pregnancy Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-05-29', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 59),
 (SELECT test_id FROM TEST WHERE test_name = 'Beta hCG Test'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-06-01', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 60),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-05-31', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 61),
 (SELECT test_id FROM TEST WHERE test_name = 'Complete Blood Count (CBC)'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-06-03', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 62),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Sugar Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-06-02', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 63),
 (SELECT test_id FROM TEST WHERE test_name = 'Lipid Profile'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-06-04', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 64),
 (SELECT test_id FROM TEST WHERE test_name = 'Liver Function Test (LFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-06-04', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 65),
 (SELECT test_id FROM TEST WHERE test_name = 'Kidney Function Test (KFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-06-05', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 66),
 (SELECT test_id FROM TEST WHERE test_name = 'Thyroid Test (TSH)'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-06-08', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 67),
 (SELECT test_id FROM TEST WHERE test_name = 'Urine Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-06-09', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 68),
 (SELECT test_id FROM TEST WHERE test_name = 'X-Ray'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-06-10', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 69),
 (SELECT test_id FROM TEST WHERE test_name = 'MRI Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-06-11', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 70),
 (SELECT test_id FROM TEST WHERE test_name = 'CT Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-06-11', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 71),
 (SELECT test_id FROM TEST WHERE test_name = 'ECG'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-06-13', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 72),
 (SELECT test_id FROM TEST WHERE test_name = '2D Echo'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-06-13', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 73),
 (SELECT test_id FROM TEST WHERE test_name = 'Ultrasound'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-06-14', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 74),
 (SELECT test_id FROM TEST WHERE test_name = 'Vitamin D Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-06-14', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 75),
 (SELECT test_id FROM TEST WHERE test_name = 'Covid-19 Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-06-17', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 76),
 (SELECT test_id FROM TEST WHERE test_name = 'Dengue Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-06-18', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 77),
 (SELECT test_id FROM TEST WHERE test_name = 'Malaria Test'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-06-17', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 78),
 (SELECT test_id FROM TEST WHERE test_name = 'Pregnancy Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-06-20', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 79),
 (SELECT test_id FROM TEST WHERE test_name = 'Beta hCG Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-06-19', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 80),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-06-22', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 81),
 (SELECT test_id FROM TEST WHERE test_name = 'Complete Blood Count (CBC)'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-06-23', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 82),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Sugar Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-06-22', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 83),
 (SELECT test_id FROM TEST WHERE test_name = 'Lipid Profile'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-06-23', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 84),
 (SELECT test_id FROM TEST WHERE test_name = 'Liver Function Test (LFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-06-25', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 85),
 (SELECT test_id FROM TEST WHERE test_name = 'Kidney Function Test (KFT)'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-06-27', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 86),
 (SELECT test_id FROM TEST WHERE test_name = 'Thyroid Test (TSH)'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-06-28', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 87),
 (SELECT test_id FROM TEST WHERE test_name = 'Urine Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-06-27', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 88),
 (SELECT test_id FROM TEST WHERE test_name = 'X-Ray'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-06-28', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 89),
 (SELECT test_id FROM TEST WHERE test_name = 'MRI Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-06-29', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 90),
 (SELECT test_id FROM TEST WHERE test_name = 'CT Scan'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-07-01', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 91),
 (SELECT test_id FROM TEST WHERE test_name = 'ECG'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-07-02', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 92),
 (SELECT test_id FROM TEST WHERE test_name = '2D Echo'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-07-03', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 93),
 (SELECT test_id FROM TEST WHERE test_name = 'Ultrasound'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-07-05', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 94),
 (SELECT test_id FROM TEST WHERE test_name = 'Vitamin D Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-07-04', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 95),
 (SELECT test_id FROM TEST WHERE test_name = 'Covid-19 Test'),
 (SELECT lab_id FROM LAB WHERE name = 'KD Hospital Lab'),
 'Pending', '2026-07-06', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 96),
 (SELECT test_id FROM TEST WHERE test_name = 'Dengue Test'),
 (SELECT lab_id FROM LAB WHERE name = 'City Lab'),
 'Pending', '2026-07-06', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 97),
 (SELECT test_id FROM TEST WHERE test_name = 'Malaria Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Apollo Diagnostics'),
 'Pending', '2026-07-07', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 98),
 (SELECT test_id FROM TEST WHERE test_name = 'Pregnancy Test'),
 (SELECT lab_id FROM LAB WHERE name = 'SRL Diagnostics'),
 'Pending', '2026-07-10', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 99),
 (SELECT test_id FROM TEST WHERE test_name = 'Beta hCG Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Thyrocare Lab'),
 'Pending', '2026-07-11', 'pending'
),

(
 (SELECT appointment_id FROM APPOINTMENT LIMIT 1 OFFSET 100),
 (SELECT test_id FROM TEST WHERE test_name = 'Blood Test'),
 (SELECT lab_id FROM LAB WHERE name = 'Advanced Path Lab'),
 'Pending', '2026-07-10', 'pending'
);
