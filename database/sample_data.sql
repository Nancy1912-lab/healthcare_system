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

('Shukkoor T', 42, 'Male', '9100002001', 'shukkoor@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Sourav Das', 39, 'Male', '9100002002', 'sourav@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Sudhakar Chaudhary', 45, 'Male', '9100002003', 'sudhakar@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Sumit Tripathi', 38, 'Male', '9100002004', 'sumit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Trudeep Dave', 41, 'Male', '9100002005', 'trudeep@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Veerabhadra Rotte', 43, 'Male', '9100002006', 'veerabhadra@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Yogesh Shah', 40, 'Male', '9100002007', 'yogesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Jiten Shah', 45, 'Male', '9100002008', 'jiten@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Kamlesh Joshi', 44, 'Male', '9100002009', 'kamlesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Kannan Iyer', 46, 'Male', '9100002010', 'kannan@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Krupa Shah', 34, 'Female', '9100002011', 'krupa@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),

('Kshitij Bhargava', 37, 'Male', '9100002012', 'kshitij@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Kumar Abhishek', 39, 'Male', '9100002013', 'abhishek@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('M K Barua', 50, 'Male', '9100002014', 'barua@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Mahesh Mungule', 41, 'Male', '9100002015', 'mahesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Mahuya Bandyopadhyay', 45, 'Female', '9100002016', 'mahuya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Mamta Sharma', 38, 'Female', '9100002017', 'mamta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Manjunath K', 40, 'Male', '9100002018', 'manjunath@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Manoj Choudhuri', 44, 'Male', '9100002019', 'manoj@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),

('Meera A Vasani', 39, 'Female', '9100002020', 'meera@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Mithilesh K Dikshit', 42, 'Male', '9100002021', 'mithilesh@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Mohit Kumar', 37, 'Male', '9100002022', 'mohit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),

('Navneet Khanna', 36, 'Male', '9100002023', 'navneet@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Nimisha Agarwal', 34, 'Female', '9100002024', 'nimisha@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Nishant Sharma', 35, 'Male', '9100002025', 'nishant@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('PL Ramkumar', 43, 'Male', '9100002026', 'ramkumar@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Prakash A Dabhi', 46, 'Male', '9100002027', 'prakash@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Pramod Bhingole', 42, 'Male', '9100002028', 'pramod@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Prasun Chandra Tripathi', 35, 'Male', '9100002029', 'prasun@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Pravin Jadhav', 39, 'Male', '9100002030', 'pravin@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL);

('Aarav Patel', 28, 'Male', '9100003001', 'aarav@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Vivaan Shah', 31, 'Male', '9100003002', 'vivaan@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Aditya Mehta', 35, 'Male', '9100003003', 'aditya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Krish Desai', 29, 'Male', '9100003004', 'krish@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Ishaan Trivedi', 33, 'Male', '9100003005', 'ishaan@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),

('Diya Shah', 27, 'Female', '9100003006', 'diya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Ananya Patel', 30, 'Female', '9100003007', 'ananya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Riya Mehta', 26, 'Female', '9100003008', 'riya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Kavya Desai', 32, 'Female', '9100003009', 'kavya@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Sneha Shah', 34, 'Female', '9100003010', 'sneha@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Rahul Verma', 38, 'Male', '9100003011', 'rahul.verma@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Amit Kumar', 40, 'Male', '9100003012', 'amit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Sandeep Yadav', 36, 'Male', '9100003013', 'sandeep@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Vikas Singh', 37, 'Male', '9100003014', 'vikas@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Rohit Sharma', 35, 'Male', '9100003015', 'rohit@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Pooja Verma', 29, 'Female', '9100003016', 'pooja@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Neha Gupta', 33, 'Female', '9100003017', 'neha@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Swati Mishra', 31, 'Female', '9100003018', 'swati@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Kiran Yadav', 34, 'Female', '9100003019', 'kiran@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Anjali Singh', 28, 'Female', '9100003020', 'anjali@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL);

('Arjun Patel', 29, 'Male', '9100003021', 'arjun.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Harsh Shah', 34, 'Male', '9100003022', 'harsh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Jay Mehta', 31, 'Male', '9100003023', 'jay.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Nirav Desai', 36, 'Male', '9100003024', 'nirav.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Parth Trivedi', 28, 'Male', '9100003025', 'parth.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),

('Rohit Shah', 32, 'Male', '9100003026', 'rohit.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Kunal Patel', 35, 'Male', '9100003027', 'kunal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Dhruv Mehta', 30, 'Male', '9100003028', 'dhruv.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Jatin Desai', 37, 'Male', '9100003029', 'jatin.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Tushar Shah', 39, 'Male', '9100003030', 'tushar.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Hiral Patel', 27, 'Female', '9100003031', 'hiral.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Pinal Shah', 33, 'Female', '9100003032', 'pinal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Jinal Mehta', 29, 'Female', '9100003033', 'jinal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Komal Desai', 31, 'Female', '9100003034', 'komal.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Rupal Trivedi', 35, 'Female', '9100003035', 'rupal.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Sejal Shah', 28, 'Female', '9100003036', 'sejal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Bhumi Patel', 32, 'Female', '9100003037', 'bhumi.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Mansi Mehta', 30, 'Female', '9100003038', 'mansi.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Rina Desai', 34, 'Female', '9100003039', 'rina.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Heena Shah', 29, 'Female', '9100003040', 'heena.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL);

('Yash Patel', 29, 'Male', '9100003041', 'yash.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Meet Shah', 33, 'Male', '9100003042', 'meet.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Ronak Mehta', 31, 'Male', '9100003043', 'ronak.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Chirag Desai', 36, 'Male', '9100003044', 'chirag.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Tejas Trivedi', 28, 'Male', '9100003045', 'tejas.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),

('Vivek Shah', 35, 'Male', '9100003046', 'vivek.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Mehul Patel', 32, 'Male', '9100003047', 'mehul.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Kishan Mehta', 30, 'Male', '9100003048', 'kishan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Alpesh Desai', 37, 'Male', '9100003049', 'alpesh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Hitesh Shah', 39, 'Male', '9100003050', 'hitesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Rakesh Patel', 41, 'Male', '9100003051', 'rakesh.patel2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Nilesh Shah', 38, 'Male', '9100003052', 'nilesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Ketan Mehta', 34, 'Male', '9100003053', 'ketan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Bhavesh Desai', 36, 'Male', '9100003054', 'bhavesh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Jignesh Trivedi', 40, 'Male', '9100003055', 'jignesh.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Devang Shah', 31, 'Male', '9100003056', 'devang.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Parth Patel', 28, 'Male', '9100003057', 'parth.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Dhaval Mehta', 33, 'Male', '9100003058', 'dhaval.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Niraj Desai', 35, 'Male', '9100003059', 'niraj.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Ankit Shah', 29, 'Male', '9100003060', 'ankit.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),

('Bhavik Patel', 32, 'Male', '9100003061', 'bhavik.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Jatin Shah', 34, 'Male', '9100003062', 'jatin.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Krunal Mehta', 30, 'Male', '9100003063', 'krunal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Tapan Desai', 37, 'Male', '9100003064', 'tapan.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Viral Shah', 36, 'Male', '9100003065', 'viral.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),

('Hiral Patel', 28, 'Female', '9100003066', 'hiral.patel2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Pooja Shah', 31, 'Female', '9100003067', 'pooja.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Riya Mehta', 27, 'Female', '9100003068', 'riya.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Kavita Desai', 33, 'Female', '9100003069', 'kavita.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Neha Shah', 35, 'Female', '9100003070', 'neha.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL);

('Sagar Patel', 34, 'Male', '9100003071', 'sagar.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Yogesh Shah', 38, 'Male', '9100003072', 'yogesh.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Rohan Mehta', 29, 'Male', '9100003073', 'rohan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Manish Desai', 36, 'Male', '9100003074', 'manish.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Deepak Trivedi', 41, 'Male', '9100003075', 'deepak.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),

('Prakash Shah', 45, 'Male', '9100003076', 'prakash.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Naresh Patel', 40, 'Male', '9100003077', 'naresh.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Kirit Mehta', 37, 'Male', '9100003078', 'kirit.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Paresh Desai', 42, 'Male', '9100003079', 'paresh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Mahendra Shah', 46, 'Male', '9100003080', 'mahendra.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Bhavin Patel', 31, 'Male', '9100003081', 'bhavin.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Jignesh Shah', 35, 'Male', '9100003082', 'jignesh.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Kalpesh Mehta', 33, 'Male', '9100003083', 'kalpesh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Bharat Desai', 39, 'Male', '9100003084', 'bharat.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Ramesh Trivedi', 47, 'Male', '9100003085', 'ramesh.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Nayan Shah', 32, 'Male', '9100003086', 'nayan.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Tejas Patel', 30, 'Male', '9100003087', 'tejas.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Krunal Shah', 34, 'Male', '9100003088', 'krunal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Milan Mehta', 36, 'Male', '9100003089', 'milan.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Hiren Desai', 41, 'Male', '9100003090', 'hiren.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),

('Nisha Patel', 29, 'Female', '9100003091', 'nisha.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Pinal Shah', 33, 'Female', '9100003092', 'pinal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Jinal Mehta', 28, 'Female', '9100003093', 'jinal.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Heena Desai', 35, 'Female', '9100003094', 'heena.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Komal Shah', 31, 'Female', '9100003095', 'komal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),

('Bhumi Patel', 30, 'Female', '9100003096', 'bhumi.patel2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Rupal Shah', 34, 'Female', '9100003097', 'rupal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Sejal Mehta', 29, 'Female', '9100003098', 'sejal.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Aarti Desai', 32, 'Female', '9100003099', 'aarti.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Mansi Shah', 33, 'Female', '9100003100', 'mansi.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL);

('Akash Patel', 30, 'Male', '9100003101', 'akash.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Vimal Shah', 35, 'Male', '9100003102', 'vimal.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Suresh Mehta', 42, 'Male', '9100003103', 'suresh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Ravindra Desai', 39, 'Male', '9100003104', 'ravindra.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Mahesh Trivedi', 44, 'Male', '9100003105', 'mahesh.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),

('Kishor Shah', 47, 'Male', '9100003106', 'kishor.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Arvind Patel', 41, 'Male', '9100003107', 'arvind.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Dinesh Mehta', 38, 'Male', '9100003108', 'dinesh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Nitin Desai', 36, 'Male', '9100003109', 'nitin.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Sanjay Shah', 45, 'Male', '9100003110', 'sanjay.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Paresh Patel', 37, 'Male', '9100003111', 'paresh.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Jayesh Shah', 40, 'Male', '9100003112', 'jayesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Mukesh Mehta', 43, 'Male', '9100003113', 'mukesh.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Kirit Desai', 39, 'Male', '9100003114', 'kirit.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Bipin Trivedi', 46, 'Male', '9100003115', 'bipin.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Ramesh Shah', 48, 'Male', '9100003116', 'ramesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Jagdish Patel', 50, 'Male', '9100003117', 'jagdish.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Bhupendra Mehta', 47, 'Male', '9100003118', 'bhupendra.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Raghav Desai', 35, 'Male', '9100003119', 'raghav.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Pradeep Trivedi', 44, 'Male', '9100003120', 'pradeep.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),

('Nikita Shah', 29, 'Female', '9100003121', 'nikita.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Shruti Patel', 31, 'Female', '9100003122', 'shruti.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Riddhi Mehta', 28, 'Female', '9100003123', 'riddhi.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Vaishali Desai', 34, 'Female', '9100003124', 'vaishali.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Bhavna Shah', 36, 'Female', '9100003125', 'bhavna.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),

('Minal Patel', 33, 'Female', '9100003126', 'minal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Hiral Mehta', 30, 'Female', '9100003127', 'hiral.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Pooja Desai', 32, 'Female', '9100003128', 'pooja.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Komal Patel', 29, 'Female', '9100003129', 'komal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Jinal Shah', 35, 'Female', '9100003130', 'jinal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL);

('Amit Patel', 34, 'Male', '9100003131', 'amit.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Rohit Shah', 37, 'Male', '9100003132', 'rohit.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Kunal Mehta', 31, 'Male', '9100003133', 'kunal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Jay Desai', 29, 'Male', '9100003134', 'jay.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Nirav Trivedi', 36, 'Male', '9100003135', 'nirav.trivedi@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),

('Parth Shah', 30, 'Male', '9100003136', 'parth.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Dhruv Patel', 28, 'Male', '9100003137', 'dhruv.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Tushar Mehta', 35, 'Male', '9100003138', 'tushar.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Harsh Desai', 32, 'Male', '9100003139', 'harsh.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Vikas Shah', 39, 'Male', '9100003140', 'vikas.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),

('Ankit Patel', 33, 'Male', '9100003141', 'ankit.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Bhavesh Shah', 38, 'Male', '9100003142', 'bhavesh.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Jatin Mehta', 34, 'Male', '9100003143', 'jatin.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Krunal Desai', 31, 'Male', '9100003144', 'krunal.desai@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Tapan Shah', 40, 'Male', '9100003145', 'tapan.shah@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),

('Rina Patel', 29, 'Female', '9100003146', 'rina.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Heena Shah', 35, 'Female', '9100003147', 'heena.shah3@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),
('Komal Mehta', 30, 'Female', '9100003148', 'komal.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Pooja Desai', 33, 'Female', '9100003149', 'pooja.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Jinal Patel', 28, 'Female', '9100003150', 'jinal.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),

('Bhumi Shah', 32, 'Female', '9100003151', 'bhumi.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Mansi Mehta', 31, 'Female', '9100003152', 'mansi.mehta2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL),
('Rupal Desai', 34, 'Female', '9100003153', 'rupal.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O-'), NULL),
('Sejal Shah', 29, 'Female', '9100003154', 'sejal.shah2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB-'), NULL),
('Aarti Patel', 36, 'Female', '9100003155', 'aarti.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A+'), NULL),

('Neha Shah', 33, 'Female', '9100003156', 'neha.shah3@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B+'), NULL),
('Kavya Mehta', 27, 'Female', '9100003157', 'kavya.mehta@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='O+'), NULL),
('Riya Patel', 26, 'Female', '9100003158', 'riya.patel@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='AB+'), NULL),
('Sneha Desai', 35, 'Female', '9100003159', 'sneha.desai2@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='A-'), NULL),
('Pinal Shah', 30, 'Female', '9100003160', 'pinal.shah3@patient.com',(SELECT blood_group_id FROM BLOOD_GROUP WHERE type='B-'), NULL);
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
