CREATE DATABASE healthcare_db;
USE healthcare_db;

-- BLOOD GROUP
CREATE TABLE BLOOD_GROUP (
    blood_group_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(5) UNIQUE NOT NULL
);

-- SPECIALIZATION
CREATE TABLE SPECIALIZATION (
    specialization_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description TEXT
);

-- TEST
CREATE TABLE TEST (
    test_id INT PRIMARY KEY AUTO_INCREMENT,
    test_name VARCHAR(100),
    cost DECIMAL(10,2),
    description TEXT
);

-- LAB
CREATE TABLE LAB (
    lab_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    location VARCHAR(150),
    contact VARCHAR(15),
    email VARCHAR(100)
);

-- PATIENT
CREATE TABLE PATIENT (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    age INT CHECK (age > 0),
    gender VARCHAR(10),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    blood_group_id INT,
    FOREIGN KEY (blood_group_id) REFERENCES BLOOD_GROUP(blood_group_id)
);

-- DOCTOR
CREATE TABLE DOCTOR (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    experience INT,
    phone VARCHAR(15),
    email VARCHAR(100),
    password VARCHAR(255),
    specialization_id INT,
    FOREIGN KEY (specialization_id) REFERENCES SPECIALIZATION(specialization_id)
);

-- APPOINTMENT
CREATE TABLE APPOINTMENT (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES DOCTOR(doctor_id)
);

-- PRESCRIPTION
CREATE TABLE PRESCRIPTION (
    prescription_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id INT UNIQUE,
    diagnosis TEXT,
    medicines TEXT,
    notes TEXT,
    FOREIGN KEY (appointment_id) REFERENCES APPOINTMENT(appointment_id)
);

-- MEDICAL HISTORY
CREATE TABLE MEDICAL_HISTORY (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    details TEXT,
    record_date DATE,
    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id)
);

-- SYMPTOM
CREATE TABLE SYMPTOM (
    symptom_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    description TEXT,
    date_recorded DATE,
    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id)
);

-- LAB REPORT
CREATE TABLE LAB_REPORT (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id INT,
    test_id INT,
    lab_id INT,
    result TEXT,
    report_date DATE,
    status VARCHAR(20),
    FOREIGN KEY (appointment_id) REFERENCES APPOINTMENT(appointment_id),
    FOREIGN KEY (test_id) REFERENCES TEST(test_id),
    FOREIGN KEY (lab_id) REFERENCES LAB(lab_id)
);