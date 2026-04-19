import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// ─── Color palette from image ───────────────────────────────────────────────
// Navy: #2E4156 | Teal: #567C8D | Sky: #CBD8E6 | Beige: #F5EFEB | White: #FFFFFF

// ─── Data ───────────────────────────────────────────────────────────────────
const specialities = [
//   {
//     name: "Anaesthesiology", featured: false, tag: "Critical Care",
//     img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
//     intro: "Our anaesthesiology department provides safe, effective pain management and anaesthetic care across all surgical procedures, ensuring patient comfort and safety from pre-op through recovery.",
//     stats: [{ n: "25K+", l: "Procedures/yr" }, { n: "98%", l: "Safety Rate" }, { n: "40+", l: "Specialists" }],
//     treatments: ["General Anaesthesia", "Regional Blocks", "Epidural Anaesthesia", "Sedation Management", "Pain Control"],
//     conditions: ["Pre-surgical Assessment", "Post-op Pain Relief", "ICU Sedation", "Chronic Pain", "Pediatric Cases"],
//   },
  {
    name: "Bariatric Surgery", featured: false, tag: "Surgical",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80",
    intro: "We offer advanced minimally invasive weight-loss surgeries to help patients achieve long-term health transformation through comprehensive pre- and post-operative programs.",
    stats: [{ n: "5K+", l: "Surgeries Done" }, { n: "85%", l: "Weight Loss Success" }, { n: "12", l: "Expert Surgeons" }],
    treatments: ["Gastric Bypass", "Sleeve Gastrectomy", "Gastric Banding", "Mini Bypass", "Revisional Surgery"],
    conditions: ["Morbid Obesity", "Type 2 Diabetes", "Hypertension", "Sleep Apnea", "Joint Pain"],
  },
//   {
//     name: "Breast Clinic", featured: false, tag: "Oncology",
//     img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
//     intro: "A dedicated centre for comprehensive breast health services including screening, diagnosis, and treatment, offering personalised, compassionate care for every patient.",
//     stats: [{ n: "3K+", l: "Patients/yr" }, { n: "99%", l: "Biopsy Accuracy" }, { n: "18", l: "Specialists" }],
//     treatments: ["Mammography", "Biopsy", "Lumpectomy", "Mastectomy", "Reconstruction"],
//     conditions: ["Breast Cancer", "Benign Lumps", "Fibrocystic Changes", "Nipple Disorders", "BRCA Carriers"],
//   },
  {
    name: "Cardiothoracic & Vascular Surgery", featured: false, tag: "Cardiology",
    img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
    intro: "Our cardiac surgery unit performs complex heart procedures with state-of-the-art technology, achieving outstanding outcomes for patients with even the most challenging conditions.",
    stats: [{ n: "2K+", l: "Surgeries/yr" }, { n: "97%", l: "Success Rate" }, { n: "30", l: "Cardiologists" }],
    treatments: ["Bypass Surgery", "Valve Replacement", "Heart Transplant", "Angioplasty", "Pacemaker"],
    conditions: ["Coronary Disease", "Valve Disease", "Aortic Aneurysm", "Arrhythmia", "Heart Failure"],
  },
  {
    name: "Cardiology", featured: false, tag: "Heart",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80",
    intro: "Comprehensive non-invasive and interventional cardiology services for the prevention, diagnosis and treatment of all forms of heart and vascular disease.",
    stats: [{ n: "10K+", l: "Patients/yr" }, { n: "96%", l: "Satisfaction" }, { n: "22", l: "Cardiologists" }],
    treatments: ["ECG & Echo", "Stress Testing", "Catheterisation", "Stenting", "Cardiac Rehab"],
    conditions: ["Chest Pain", "Heart Attack", "Hypertension", "Cholesterol", "Palpitations"],
  },
//   {
//     name: "Critical Care Medicine", featured: false, tag: "ICU",
//     img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80",
//     intro: "Our intensive care unit provides 24/7 expert monitoring and life-support for critically ill patients, employing the latest technologies and multidisciplinary teamwork.",
//     stats: [{ n: "500+", l: "ICU Beds" }, { n: "24/7", l: "Expert Cover" }, { n: "50+", l: "Intensivists" }],
//     treatments: ["Mechanical Ventilation", "Haemofiltration", "ECMO", "Sepsis Protocols", "Organ Support"],
//     conditions: ["Septic Shock", "Multi-organ Failure", "ARDS", "Post-surgical ICU", "Trauma"],
//   },
//   {
//     name: "Dentistry & Implant Centre", featured: false, tag: "Dental",
//     img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=80",
//     intro: "Offering a full range of dental treatments from preventive care to complex implant surgery and smile makeovers, using the latest digital dentistry techniques.",
//     stats: [{ n: "8K+", l: "Patients/yr" }, { n: "99%", l: "Implant Success" }, { n: "15", l: "Dentists" }],
//     treatments: ["Implants", "Veneers", "Teeth Whitening", "Orthodontics", "Root Canal"],
//     conditions: ["Missing Teeth", "Gum Disease", "Decay", "Misalignment", "TMJ Disorders"],
//   },
  {
    name: "Dermatology", featured: false, tag: "Skin",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=80",
    intro: "Expert dermatological care for skin, hair and nail disorders combined with a full range of cosmetic treatments to enhance your natural appearance.",
    stats: [{ n: "12K+", l: "Patients/yr" }, { n: "95%", l: "Satisfaction" }, { n: "18", l: "Dermatologists" }],
    treatments: ["Laser Therapy", "Botox", "Fillers", "Chemical Peel", "Microneedling"],
    conditions: ["Acne", "Eczema", "Psoriasis", "Hair Loss", "Skin Cancer"],
  },
  {
    name: "Emergency Medicine", featured: true, tag: "Emergency",
    img: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=900&q=80",
    intro: "Our emergency department operates around the clock to deliver rapid, expert care for all life-threatening and urgent medical conditions with minimal wait times.",
    stats: [{ n: "200+", l: "Daily Cases" }, { n: "<8min", l: "Triage Time" }, { n: "60", l: "ER Doctors" }],
    treatments: ["Trauma Care", "Resuscitation", "Emergency Surgery", "Toxicology", "Stroke Protocol"],
    conditions: ["Heart Attack", "Stroke", "Fractures", "Poisoning", "Severe Infections"],
  },
//   {
//     name: "Endocrinology", featured: false, tag: "Hormonal",
//     img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
//     intro: "Specialised diagnosis and management of hormonal disorders covering diabetes, thyroid disease, adrenal conditions, and metabolic syndromes with a holistic approach.",
//     stats: [{ n: "6K+", l: "Patients/yr" }, { n: "92%", l: "Glucose Control" }, { n: "12", l: "Endocrinologists" }],
//     treatments: ["Insulin Therapy", "Thyroid Ablation", "HRT", "Pituitary Surgery", "Diabetes Education"],
//     conditions: ["Diabetes", "Thyroid Disease", "PCOS", "Adrenal Disorders", "Osteoporosis"],
//   },
  {
    name: "ENT", featured: false, tag: "Head & Neck",
    img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80",
    intro: "Our ENT specialists diagnose and treat disorders of the ear, nose, throat, head and neck, offering surgical and non-surgical solutions for patients of all ages.",
    stats: [{ n: "9K+", l: "Patients/yr" }, { n: "94%", l: "Success Rate" }, { n: "14", l: "Surgeons" }],
    treatments: ["Tonsillectomy", "Sinus Surgery", "Hearing Aids", "Cochlear Implant", "Rhinoplasty"],
    conditions: ["Sinusitis", "Hearing Loss", "Tonsillitis", "Snoring", "Head & Neck Cancer"],
  },
  {
    name: "Neurology", featured: true, tag: "Neurology",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
    intro: "A dedicated epilepsy programme offering advanced medical and surgical treatment for drug-resistant epilepsy using cutting-edge neuroimaging and intraoperative monitoring.",
    stats: [{ n: "500+", l: "Surgeries/yr" }, { n: "75%", l: "Seizure Freedom" }, { n: "8", l: "Epileptologists" }],
    treatments: ["EEG Monitoring", "Resection Surgery", "VNS", "RNS Implant", "Ketogenic Diet"],
    conditions: ["Drug-resistant Epilepsy", "Focal Seizures", "Temporal Lobe Epilepsy", "Infantile Spasms", "Lennox-Gastaut"],
  },
  {
    name: "Obstetrics", featured: false, tag: "Reproductive",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    intro: "A compassionate fertility centre offering the latest assisted reproductive technologies to help individuals and couples achieve their dream of parenthood.",
    stats: [{ n: "3K+", l: "IVF Cycles/yr" }, { n: "55%", l: "Success Rate" }, { n: "10", l: "Fertility Experts" }],
    treatments: ["IVF", "IUI", "Egg Freezing", "Sperm Banking", "Surrogacy Support"],
    conditions: ["Infertility", "PCOS", "Low Sperm Count", "Endometriosis", "Recurrent Miscarriage"],
  },
//   {
//     name: "Neonatology", featured: false, tag: "Maternal",
//     img: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=900&q=80",
//     intro: "Specialist prenatal diagnosis and foetal intervention services, offering detailed ultrasound, genetic counselling and in-utero procedures for complex foetal conditions.",
//     stats: [{ n: "2K+", l: "Cases/yr" }, { n: "99%", l: "Detection Rate" }, { n: "6", l: "Foetal Specialists" }],
//     treatments: ["Anomaly Scan", "Amniocentesis", "Foetal Therapy", "Genetic Testing", "NIPT"],
//     conditions: ["Foetal Anomalies", "Twin Complications", "IUGR", "Chromosomal Disorders", "Placenta Previa"],
//   },
  {
    name: "Gastroenterology", featured: false, tag: "Digestive",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=900&q=80",
    intro: "Expert care for all digestive system disorders, offering advanced endoscopy services, diagnostic imaging and personalised medical and surgical treatment plans.",
    stats: [{ n: "11K+", l: "Patients/yr" }, { n: "96%", l: "Endoscopy Accuracy" }, { n: "16", l: "Gastroenterologists" }],
    treatments: ["Colonoscopy", "ERCP", "Endoscopy", "Liver Biopsy", "Capsule Endoscopy"],
    conditions: ["IBS", "Crohn's Disease", "Liver Cirrhosis", "Colorectal Cancer", "GERD"],
  },
//   {
//     name: "Gastrosurgery", featured: false, tag: "Surgical",
//     img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80",
//     intro: "Advanced gastrointestinal surgical care covering both open and minimally invasive approaches for conditions of the oesophagus, stomach, intestines, liver and pancreas.",
//     stats: [{ n: "4K+", l: "Surgeries/yr" }, { n: "95%", l: "Success Rate" }, { n: "14", l: "GI Surgeons" }],
//     treatments: ["Hernia Repair", "Colectomy", "Whipple Procedure", "Gastrectomy", "Bariatric Conversion"],
//     conditions: ["GI Cancer", "Hernia", "Appendicitis", "Pancreatitis", "Diverticular Disease"],
//   },
  {
    name: "General Surgery", featured: false, tag: "Surgical",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80",
    intro: "Our general surgery team performs a wide range of procedures with expertise in both traditional and laparoscopic techniques, ensuring optimal outcomes and fast recovery.",
    stats: [{ n: "15K+", l: "Surgeries/yr" }, { n: "97%", l: "Success Rate" }, { n: "28", l: "Surgeons" }],
    treatments: ["Laparoscopic Surgery", "Appendectomy", "Cholecystectomy", "Thyroidectomy", "Hernia Repair"],
    conditions: ["Appendicitis", "Gallstones", "Thyroid Nodules", "Hernias", "Abdominal Masses"],
  },
  {
    name: "Gynaecology", featured: false, tag: "Women's Health",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
    intro: "Comprehensive women's health services covering routine gynaecological care, menstrual health, reproductive medicine, and advanced minimally invasive surgeries.",
    stats: [{ n: "14K+", l: "Patients/yr" }, { n: "96%", l: "Satisfaction" }, { n: "20", l: "Gynaecologists" }],
    treatments: ["Hysteroscopy", "Laparoscopy", "Hysterectomy", "Colposcopy", "Fibroid Removal"],
    conditions: ["Endometriosis", "PCOS", "Uterine Fibroids", "Cervical Cancer", "Menopause"],
  },
  {
    name: "Health Check-up Packages", featured: false, tag: "Preventive",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80",
    intro: "Tailored preventive health screening packages for all ages and risk profiles, helping detect conditions early and maintain optimal health year-round.",
    stats: [{ n: "20K+", l: "Checkups/yr" }, { n: "12", l: "Package Types" }, { n: "Same Day", l: "Reports" }],
    treatments: ["Blood Panel", "Cardiac Screening", "Cancer Markers", "Imaging", "Diet Consult"],
    conditions: ["Preventive Screening", "Pre-employment", "Executive Health", "Diabetes Risk", "Heart Risk"],
  },
  {
    name: "Health @ Home", featured: true, tag: "Home Care",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    intro: "Professional medical care delivered to your doorstep — from nursing and physiotherapy to diagnostics and IV therapy — providing hospital-quality care in the comfort of your home.",
    stats: [{ n: "500+", l: "Daily Visits" }, { n: "50+", l: "Services" }, { n: "24/7", l: "Availability" }],
    treatments: ["Home Nursing", "IV Therapy", "Physiotherapy", "Sample Collection", "Wound Dressing"],
    conditions: ["Post-surgical Care", "Elderly Care", "Chronic Disease", "Palliative Care", "ICU@Home"],
  },
//   {
//     name: "Liver Transplant", featured: false, tag: "Liver",
//     img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
//     intro: "Specialist liver care covering all hepatic diseases from viral hepatitis to cirrhosis and liver cancer, with access to our world-class liver transplant programme.",
//     stats: [{ n: "5K+", l: "Patients/yr" }, { n: "93%", l: "Treatment Success" }, { n: "10", l: "Hepatologists" }],
//     treatments: ["Fibroscan", "Liver Biopsy", "Antiviral Therapy", "TIPS Procedure", "Portal Care"],
//     conditions: ["Hepatitis B & C", "Liver Cirrhosis", "Fatty Liver", "Liver Cancer", "Autoimmune Hepatitis"],
//   },
//   {
//     name: "Immigrants Visa Health Checkup", featured: false, tag: "Visa Medical",
//     img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80",
//     intro: "Authorised medical examination centre for visa and immigration health clearances, providing accurate reports for all major embassies and immigration bodies.",
//     stats: [{ n: "10K+", l: "Clearances/yr" }, { n: "Same Day", l: "Reports" }, { n: "30+", l: "Countries" }],
//     treatments: ["Physical Exam", "Chest X-ray", "Blood Tests", "Vaccination", "Medical Report"],
//     conditions: ["Visa Medical", "Embassy Requirements", "Immigration Clearance", "Work Permit", "PR Applications"],
//   },
  {
    name: "General Medicine", featured: false, tag: "General Medicine",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80",
    intro: "Expert diagnosis and management of complex adult medical conditions, coordinating care across specialities to ensure comprehensive treatment for multi-system diseases.",
    stats: [{ n: "18K+", l: "Patients/yr" }, { n: "95%", l: "Satisfaction" }, { n: "35", l: "Internists" }],
    treatments: ["Diagnostic Workup", "Chronic Disease Mgmt", "Medication Review", "Referral Coordination", "Preventive Care"],
    conditions: ["Fever", "Hypertension", "Diabetes", "Infections", "Multi-system Disease"],
  },
//   {
//     name: "Interventional Radiology", featured: false, tag: "Radiology",
//     img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80",
//     intro: "Minimally invasive image-guided procedures that treat a wide range of conditions without the need for open surgery, offering faster recovery and fewer complications.",
//     stats: [{ n: "3K+", l: "Procedures/yr" }, { n: "97%", l: "Precision" }, { n: "8", l: "IR Specialists" }],
//     treatments: ["Embolisation", "Angioplasty", "Stenting", "Biopsies", "Drainage Procedures"],
//     conditions: ["Vascular Disease", "Tumour Ablation", "Uterine Fibroids", "Deep Vein Thrombosis", "Liver Cancer"],
//   },
//   {
//     name: "Orthopaedic & Joint Replacement", featured: false, tag: "Orthopaedic",
//     img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
//     intro: "Cutting-edge robotic-assisted joint replacement surgery for the knee, hip and shoulder, delivering unmatched accuracy, faster recovery and longer-lasting implants.",
//     stats: [{ n: "4K+", l: "Joints/yr" }, { n: "99%", l: "Precision" }, { n: "0.5mm", l: "Accuracy" }],
//     treatments: ["Robotic Knee Replacement", "Hip Replacement", "Shoulder Replacement", "Unicompartmental", "Revision Surgery"],
//     conditions: ["Osteoarthritis", "Rheumatoid Arthritis", "Avascular Necrosis", "Post-trauma", "Failed Previous Replacement"],
//   },
//   {
//     name: "KD Blood Centre", featured: false, tag: "Blood Bank",
//     img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=900&q=80",
//     intro: "A fully equipped blood bank and transfusion medicine centre providing safe, typed and cross-matched blood products 24/7 for surgical, medical and emergency needs.",
//     stats: [{ n: "50K+", l: "Units/yr" }, { n: "100%", l: "Tested Blood" }, { n: "24/7", l: "Available" }],
//     treatments: ["Blood Typing", "Cross-match", "Apheresis", "Platelet Donation", "Whole Blood Donation"],
//     conditions: ["Surgical Needs", "Anaemia", "Haematological Cancer", "Trauma", "Thalassemia"],
//   },
  {
    name: "Laboratory Medicine", featured: false, tag: "Diagnostics",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
    intro: "State-of-the-art diagnostic laboratory services covering haematology, biochemistry, microbiology and molecular testing with rapid turnaround and pinpoint accuracy.",
    stats: [{ n: "1M+", l: "Tests/yr" }, { n: "Same Day", l: "Reports" }, { n: "99.9%", l: "Accuracy" }],
    treatments: ["Blood Tests", "Cultures", "Molecular Diagnostics", "Histopathology", "Cytology"],
    conditions: ["Infection Diagnosis", "Cancer Markers", "Metabolic Disorders", "Drug Monitoring", "Genetic Testing"],
  },
  {
    name: "Liver Transplant", featured: false, tag: "Transplant",
    img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
    intro: "One of the country's leading liver transplant programmes, performing both deceased-donor and living-donor transplants with exceptional long-term survival outcomes.",
    stats: [{ n: "300+", l: "Transplants/yr" }, { n: "92%", l: "5yr Survival" }, { n: "20", l: "Transplant Surgeons" }],
    treatments: ["Living Donor Transplant", "Deceased Donor", "Split Liver", "Paediatric Transplant", "Post-transplant Care"],
    conditions: ["End-stage Liver Disease", "Acute Liver Failure", "Liver Cancer", "Biliary Atresia", "PSC"],
  },
  {
    name: "Neonatology & Paediatrics", featured: false, tag: "Child Health",
    img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=80",
    intro: "Dedicated neonatal intensive care and comprehensive paediatric services providing expert care for newborns through adolescents in a warm, family-centred environment.",
    stats: [{ n: "5K+", l: "NICU Babies/yr" }, { n: "96%", l: "Survival (<28wks)" }, { n: "25", l: "Paediatricians" }],
    treatments: ["NICU Care", "Surfactant Therapy", "Paediatric Surgery", "Vaccination", "Developmental Assessment"],
    conditions: ["Prematurity", "Neonatal Jaundice", "Congenital Anomalies", "Paediatric Infections", "Growth Disorders"],
  },
  {
    name: "Nephrology & Dialysis Centre", featured: false, tag: "Kidney",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
    intro: "Comprehensive kidney care from early-stage CKD management to advanced dialysis and transplant coordination, with a dedicated dialysis unit running multiple sessions daily.",
    stats: [{ n: "200+", l: "Dialysis/day" }, { n: "3K+", l: "CKD Patients" }, { n: "14", l: "Nephrologists" }],
    treatments: ["Haemodialysis", "Peritoneal Dialysis", "Kidney Biopsy", "CKD Management", "Transplant Prep"],
    conditions: ["Chronic Kidney Disease", "ESRD", "Glomerulonephritis", "Polycystic Kidney", "Lupus Nephritis"],
  },
//   {
//     name: "Spine Surgery", featured: false, tag: "Brain & Spine",
//     img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
//     intro: "Expert neurological care for all brain and nervous system disorders, with advanced diagnostic capabilities including high-field MRI, neurophysiology and subspecialty clinics.",
//     stats: [{ n: "10K+", l: "Patients/yr" }, { n: "95%", l: "Diagnostic Accuracy" }, { n: "18", l: "Neurologists" }],
//     treatments: ["EEG", "EMG/NCS", "Brain MRI", "Nerve Block", "Botulinum Therapy"],
//     conditions: ["Stroke", "Epilepsy", "Migraine", "Multiple Sclerosis", "Parkinson's Disease"],
//   },
  {
    name: "Neurosurgery", featured: false, tag: "Brain Surgery",
    img: "https://images.unsplash.com/photo-1583912267550-d974f54f3ced?w=900&q=80",
    intro: "Our neurosurgical team performs complex brain and spinal surgeries with exceptional precision, using neuronavigation, intraoperative MRI and minimally invasive approaches.",
    stats: [{ n: "1.5K+", l: "Surgeries/yr" }, { n: "97%", l: "Success Rate" }, { n: "12", l: "Neurosurgeons" }],
    treatments: ["Craniotomy", "Spinal Fusion", "Deep Brain Stimulation", "Gamma Knife", "Endoscopic Surgery"],
    conditions: ["Brain Tumour", "Aneurysm", "Hydrocephalus", "Spinal Disc Disease", "AVM"],
  },
  {
    name: "Obstetrics", featured: false, tag: "Maternity",
    img: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=900&q=80",
    intro: "Comprehensive maternity care from early pregnancy through postpartum, with expert support for normal and high-risk pregnancies and a state-of-the-art birthing centre.",
    stats: [{ n: "6K+", l: "Deliveries/yr" }, { n: "99%", l: "Safe Deliveries" }, { n: "22", l: "Obstetricians" }],
    treatments: ["Antenatal Care", "Normal Delivery", "C-Section", "Epidural", "High-risk Management"],
    conditions: ["High-risk Pregnancy", "Pre-eclampsia", "Gestational Diabetes", "Multiple Pregnancy", "Preterm Labour"],
  },
  {
    name: "Oncology", featured: false, tag: "Cancer Care",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    intro: "A multidisciplinary cancer care programme offering personalised oncology services from diagnosis to treatment, with access to the latest targeted therapies and clinical trials.",
    stats: [{ n: "8K+", l: "New Cases/yr" }, { n: "15+", l: "Cancer Types" }, { n: "30", l: "Oncologists" }],
    treatments: ["Chemotherapy", "Immunotherapy", "Targeted Therapy", "Radiation", "Bone Marrow Transplant"],
    conditions: ["Lung Cancer", "Breast Cancer", "Blood Cancer", "GI Cancer", "Head & Neck Cancer"],
  },
  {
    name: "Ophthalmology", featured: false, tag: "Eye Care",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
    intro: "Complete eye care services from routine vision check-ups and spectacle prescriptions to advanced cataract surgery, retina care and laser vision correction.",
    stats: [{ n: "15K+", l: "Patients/yr" }, { n: "99%", l: "Cataract Success" }, { n: "16", l: "Eye Specialists" }],
    treatments: ["LASIK", "Cataract Surgery", "Retina Surgery", "Glaucoma Management", "Corneal Transplant"],
    conditions: ["Cataract", "Glaucoma", "Retinal Detachment", "Diabetic Retinopathy", "Myopia"],
  },
  {
    name: "Orthopedics", featured: false, tag: "Bone & Joint",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
    intro: "Full-spectrum orthopaedic care covering fractures, sports injuries, spinal disorders and joint replacement with cutting-edge robotic surgical systems.",
    stats: [{ n: "12K+", l: "Procedures/yr" }, { n: "96%", l: "Satisfaction" }, { n: "24", l: "Orthopaedic Surgeons" }],
    treatments: ["Joint Replacement", "Arthroscopy", "Fracture Fixation", "Spine Surgery", "Sports Injury Rehab"],
    conditions: ["Arthritis", "Fractures", "Sports Injuries", "Scoliosis", "Tendon Disorders"],
  },
//   {
//     name: "Physiotherapy Centre", featured: false, tag: "Rehabilitation",
//     img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
//     intro: "Evidence-based physiotherapy and rehabilitation services helping patients recover function and independence after injury, surgery or neurological illness.",
//     stats: [{ n: "500+", l: "Sessions/day" }, { n: "95%", l: "Patient Recovery" }, { n: "30", l: "Physiotherapists" }],
//     treatments: ["Manual Therapy", "Hydrotherapy", "Neurological Rehab", "Sports Rehab", "Post-surgical Physio"],
//     conditions: ["Post-op Recovery", "Stroke Rehab", "Back Pain", "Sports Injuries", "Cerebral Palsy"],
//   },
  {
    name: "Plastic & Reconstructive Surgery", featured: false, tag: "Reconstructive",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=80",
    intro: "Expert plastic and reconstructive surgery from post-trauma reconstruction to cosmetic enhancements, performed by internationally trained surgeons using the latest techniques.",
    stats: [{ n: "3K+", l: "Surgeries/yr" }, { n: "97%", l: "Satisfaction" }, { n: "10", l: "Plastic Surgeons" }],
    treatments: ["Rhinoplasty", "Breast Augmentation", "Tummy Tuck", "Cleft Repair", "Burns Reconstruction"],
    conditions: ["Burns", "Cleft Palate", "Breast Reconstruction", "Body Contouring", "Facial Trauma"],
  },
//   {
//     name: "Pulmonology", featured: false, tag: "Respiratory",
//     img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80",
//     intro: "Comprehensive respiratory care for lung and airway conditions, offering advanced bronchoscopy, sleep studies and pulmonary rehabilitation in a dedicated respiratory unit.",
//     stats: [{ n: "8K+", l: "Patients/yr" }, { n: "94%", l: "Asthma Control" }, { n: "12", l: "Pulmonologists" }],
//     treatments: ["Bronchoscopy", "Sleep Study", "Spirometry", "Nebulisation", "CPAP Therapy"],
//     conditions: ["Asthma", "COPD", "Sleep Apnea", "Interstitial Lung Disease", "Pneumonia"],
//   },
  {
    name: "Radiology", featured: false, tag: "Imaging",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80",
    intro: "Full diagnostic imaging services including 3T MRI, 128-slice CT, PET-CT and digital X-ray with subspecialty radiologists providing same-day reports.",
    stats: [{ n: "200K+", l: "Scans/yr" }, { n: "Same Day", l: "Reports" }, { n: "25", l: "Radiologists" }],
    treatments: ["MRI", "CT Scan", "PET-CT", "Ultrasound", "X-ray"],
    conditions: ["Cancer Staging", "Neurological Diagnosis", "Cardiac Imaging", "MSK Imaging", "Vascular Assessment"],
  },
//   {
//     name: "Robotic Surgery", featured: true, tag: "Robotic",
//     img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80",
//     intro: "Pioneers of robotic-assisted surgery in the region, offering da Vinci robotic procedures across urology, gynaecology, general surgery and orthopaedics for precision and rapid recovery.",
//     stats: [{ n: "5K+", l: "Robotic Surgeries/yr" }, { n: "0.1mm", l: "Precision" }, { n: "3", l: "Robotic Systems" }],
//     treatments: ["Prostatectomy", "Hysterectomy", "Colectomy", "Nephrectomy", "Joint Replacement"],
//     conditions: ["Prostate Cancer", "Uterine Cancer", "Colorectal Cancer", "Kidney Disease", "Arthritis"],
//   },
//   {
//     name: "Sleep Clinic", featured: false, tag: "Sleep Medicine",
//     img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80",
//     intro: "Dedicated sleep medicine clinic offering comprehensive assessment and treatment for all sleep disorders, with a state-of-the-art in-lab sleep study facility.",
//     stats: [{ n: "2K+", l: "Studies/yr" }, { n: "96%", l: "OSA Detection" }, { n: "6", l: "Sleep Specialists" }],
//     treatments: ["Polysomnography", "CPAP Titration", "Home Sleep Test", "CBT-I", "MAD Therapy"],
//     conditions: ["Sleep Apnea", "Insomnia", "Narcolepsy", "Restless Legs", "Parasomnias"],
//   },
  {
    name: "Spine Surgery", featured: false, tag: "Spine",
    img: "https://images.unsplash.com/photo-1583912267550-d974f54f3ced?w=900&q=80",
    intro: "Advanced spinal surgery from minimally invasive disc procedures to complex deformity corrections, with a dedicated spine rehabilitation programme for optimal outcomes.",
    stats: [{ n: "2K+", l: "Surgeries/yr" }, { n: "96%", l: "Pain Relief" }, { n: "14", l: "Spine Surgeons" }],
    treatments: ["Microdiscectomy", "Spinal Fusion", "Vertebroplasty", "Spinal Stimulation", "Endoscopic Spine"],
    conditions: ["Disc Herniation", "Spondylolisthesis", "Scoliosis", "Spinal Stenosis", "Compression Fracture"],
  },
//   {
//     name: "Transplant Services", featured: true, tag: "Transplant",
//     img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
//     intro: "A comprehensive multi-organ transplant programme covering kidney, liver, heart, lung and bone marrow transplants, supported by a dedicated transplant coordination team.",
//     stats: [{ n: "500+", l: "Transplants/yr" }, { n: "90%", l: "5yr Survival" }, { n: "40", l: "Transplant Specialists" }],
//     treatments: ["Kidney Transplant", "Liver Transplant", "Heart Transplant", "Bone Marrow", "Corneal Transplant"],
//     conditions: ["ESRD", "Liver Failure", "Heart Failure", "Blood Cancer", "Corneal Blindness"],
//   },
//   {
//     name: "Trauma Centre", featured: true, tag: "Emergency",
//     img: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=900&q=80",
//     intro: "A Level 1 trauma centre equipped to handle the most severe injuries with round-the-clock trauma surgeons, anaesthesiologists, and a dedicated trauma ICU.",
//     stats: [{ n: "100+", l: "Major Traumas/day" }, { n: "<5min", l: "Activation Time" }, { n: "50", l: "Trauma Specialists" }],
//     treatments: ["Damage Control Surgery", "Trauma ICU", "Orthopaedic Trauma", "Neurotrauma", "Burns Care"],
//     conditions: ["Road Traffic Accidents", "Fall Injuries", "Gunshot Wounds", "Burns", "Crush Injuries"],
//   },
//   {
//     name: "Uro Oncology", featured: false, tag: "Oncology",
//     img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=900&q=80",
//     intro: "Specialised oncological care for cancers of the urinary tract and male reproductive system, offering robotic surgery, targeted therapy and immunotherapy.",
//     stats: [{ n: "1.5K+", l: "Cases/yr" }, { n: "96%", l: "Early-stage Cure Rate" }, { n: "10", l: "Uro-oncologists" }],
//     treatments: ["Robotic Prostatectomy", "Cystectomy", "Nephrectomy", "Immunotherapy", "Brachytherapy"],
//     conditions: ["Prostate Cancer", "Bladder Cancer", "Kidney Cancer", "Testicular Cancer", "Penile Cancer"],
//   },
  {
    name: "Urology", featured: true, tag: "Urological",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
    intro: "Full-spectrum urological care covering both medical and surgical management of kidney stones, prostate disease, incontinence, and urological cancers.",
    stats: [{ n: "10K+", l: "Patients/yr" }, { n: "97%", l: "Stone Clearance" }, { n: "16", l: "Urologists" }],
    treatments: ["Laser Stone Surgery", "TURP", "Urodynamics", "Cystoscopy", "Vasectomy"],
    conditions: ["Kidney Stones", "BPH", "Incontinence", "UTI", "Bladder Cancer"],
  },
//   {
//     name: "Vascular & Thoracic Surgery", featured: false, tag: "Vascular",
//     img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
//     intro: "Expert surgical care for diseases of the blood vessels and chest, including aortic aneurysm repair, peripheral arterial disease and thoracoscopic lung surgery.",
//     stats: [{ n: "2K+", l: "Surgeries/yr" }, { n: "96%", l: "Success Rate" }, { n: "12", l: "Vascular Surgeons" }],
//     treatments: ["Aortic Repair", "Carotid Endarterectomy", "VATS", "Bypass Surgery", "Varicose Vein Treatment"],
//     conditions: ["Aortic Aneurysm", "Carotid Stenosis", "Lung Disease", "Peripheral Artery Disease", "Varicose Veins"],
//   },

{
  name: "Laparoscopic Surgery", featured: false, tag: "Surgical",
  img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80",
  intro: "Minimally invasive surgical procedures performed using advanced laparoscopic techniques ensuring faster recovery and reduced complications.",
  stats: [{ n: "6K+", l: "Surgeries/yr" }, { n: "96%", l: "Success Rate" }, { n: "14", l: "Surgeons" }],
  treatments: ["Laparoscopic Cholecystectomy", "Hernia Repair", "Appendectomy", "Fundoplication", "Diagnostic Laparoscopy"],
  conditions: ["Gallstones", "Hernia", "Appendicitis", "Reflux Disease", "Abdominal Pain"],
},
{
  name: "Surgical Oncology", featured: false, tag: "Cancer Surgery",
  img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
  intro: "Specialized surgical procedures for the treatment of cancer with focus on tumor removal and patient recovery.",
  stats: [{ n: "3K+", l: "Surgeries/yr" }, { n: "95%", l: "Success Rate" }, { n: "10", l: "Onco Surgeons" }],
  treatments: ["Tumor Removal", "Organ Resection", "Lymph Node Dissection", "Reconstructive Surgery"],
  conditions: ["Breast Cancer", "Lung Cancer", "GI Cancer", "Head & Neck Cancer"],
},
{
  name: "Medical Oncology", featured: false, tag: "Cancer Care",
  img: "https://images.unsplash.com/photo-1580281657521-7b7c0c5a4d71?w=900&q=80",
  intro: "Comprehensive cancer treatment using chemotherapy, immunotherapy and targeted therapies.",
  stats: [{ n: "5K+", l: "Patients/yr" }, { n: "90%", l: "Response Rate" }, { n: "12", l: "Oncologists" }],
  treatments: ["Chemotherapy", "Immunotherapy", "Targeted Therapy", "Hormonal Therapy"],
  conditions: ["Breast Cancer", "Blood Cancer", "Lung Cancer", "Colon Cancer"],
},
{
  name: "Radiation Oncology", featured: false, tag: "Radiotherapy",
  img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80",
  intro: "Advanced radiation therapy techniques for precise and effective cancer treatment.",
  stats: [{ n: "4K+", l: "Cases/yr" }, { n: "92%", l: "Precision Rate" }, { n: "8", l: "Specialists" }],
  treatments: ["External Beam Radiation", "Brachytherapy", "IMRT", "IGRT"],
  conditions: ["Tumors", "Brain Cancer", "Prostate Cancer", "Cervical Cancer"],
},
{
  name: "Pediatrics", featured: false, tag: "Child Care",
  img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=80",
  intro: "Comprehensive healthcare services for infants, children and adolescents ensuring healthy growth and development.",
  stats: [{ n: "12K+", l: "Patients/yr" }, { n: "96%", l: "Care Quality" }, { n: "20", l: "Paediatricians" }],
  treatments: ["Vaccination", "Growth Monitoring", "Neonatal Care", "Pediatric Surgery"],
  conditions: ["Fever", "Infections", "Allergies", "Growth Disorders"],
},
{
  name: "Pathology", featured: false, tag: "Diagnostics",
  img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
  intro: "Accurate laboratory diagnosis of diseases through advanced pathological testing and analysis.",
  stats: [{ n: "1M+", l: "Tests/yr" }, { n: "99%", l: "Accuracy" }, { n: "25", l: "Pathologists" }],
  treatments: ["Blood Tests", "Biopsy", "Histopathology", "Cytology"],
  conditions: ["Infections", "Cancer Diagnosis", "Blood Disorders", "Metabolic Diseases"],
},
{
  name: "Physiotherapy", featured: false, tag: "Rehabilitation",
  img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
  intro: "Rehabilitation services focused on restoring mobility, strength and function after injury or surgery.",
  stats: [{ n: "600+", l: "Sessions/day" }, { n: "95%", l: "Recovery Rate" }, { n: "30", l: "Therapists" }],
  treatments: ["Manual Therapy", "Exercise Therapy", "Electrotherapy", "Sports Rehab"],
  conditions: ["Back Pain", "Post-surgery Rehab", "Sports Injuries", "Stroke Recovery"],
},
{
  name: "Rehabilitation Medicine", featured: false, tag: "Recovery",
  img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
  intro: "Holistic rehabilitation care for patients recovering from illness, injury or disability.",
  stats: [{ n: "3K+", l: "Patients/yr" }, { n: "94%", l: "Improvement Rate" }, { n: "12", l: "Specialists" }],
  treatments: ["Physical Rehab", "Occupational Therapy", "Speech Therapy", "Pain Management"],
  conditions: ["Stroke", "Spinal Injury", "Disability", "Chronic Pain"],
},
{
  name: "Liver Transplant", featured: false, tag: "Transplant",
  img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
  intro: "Advanced liver transplant procedures with high success rates and comprehensive post-operative care.",
  stats: [{ n: "300+", l: "Transplants/yr" }, { n: "92%", l: "Success Rate" }, { n: "10", l: "Surgeons" }],
  treatments: ["Living Donor Transplant", "Deceased Donor", "Post-transplant Care"],
  conditions: ["Liver Failure", "Cirrhosis", "Hepatitis", "Liver Cancer"],
},
{
  name: "Kidney Transplant", featured: false, tag: "Transplant",
  img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
  intro: "Comprehensive kidney transplant program offering both living and cadaver donor transplants.",
  stats: [{ n: "400+", l: "Transplants/yr" }, { n: "95%", l: "Success Rate" }, { n: "12", l: "Nephrologists" }],
  treatments: ["Kidney Transplant", "Dialysis", "Post-transplant Monitoring"],
  conditions: ["Kidney Failure", "Chronic Kidney Disease", "ESRD"],
},
{
  name: "Heart Transplant", featured: false, tag: "Cardiac",
  img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80",
  intro: "Life-saving heart transplant procedures supported by advanced cardiac care units.",
  stats: [{ n: "150+", l: "Transplants/yr" }, { n: "90%", l: "Survival Rate" }, { n: "8", l: "Cardiac Surgeons" }],
  treatments: ["Heart Transplant", "Pre/Post Care", "Cardiac Rehab"],
  conditions: ["Heart Failure", "Cardiomyopathy", "Congenital Heart Disease"],
},
{
  name: "Lung Transplant", featured: false, tag: "Transplant",
  img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80",
  intro: "Advanced lung transplant services for patients with end-stage lung diseases.",
  stats: [{ n: "120+", l: "Transplants/yr" }, { n: "88%", l: "Success Rate" }, { n: "6", l: "Specialists" }],
  treatments: ["Single Lung Transplant", "Double Lung Transplant", "Post Care"],
  conditions: ["COPD", "Pulmonary Fibrosis", "Lung Failure"],
},


];

// ─── Hero images ─────────────────────────────────────────────────────────────
const heroImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80",
];

// ─── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ─── SpecialityLink ───────────────────────────────────────────────────────────
function SpecialityLink({ spec, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onClick(spec)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-all duration-300 group border-l-2"
      style={{
        borderLeftColor: hovered ? "#567C8D" : "transparent",
        background: hovered ? "rgba(86,124,141,0.08)" : "transparent",
        paddingLeft: hovered ? "22px" : "16px",
        color: spec.featured ? "#567C8D" : "#2E4156",
        fontWeight: spec.featured ? 500 : 400,
        fontSize: "15px",
        cursor: "pointer",
        border: "none",
        borderLeft: `2px solid ${hovered ? "#567C8D" : "transparent"}`,
      }}
    >
      <span>{spec.name}</span>
      {spec.featured && (
        <span
          className="inline-block rounded-full ml-1"
          style={{ width: 6, height: 6, background: "#567C8D", opacity: 0.7, flexShrink: 0 }}
        />
      )}
      <span
        className="ml-auto text-xs transition-all duration-300"
        style={{
          color: "#567C8D",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
        }}
      >
        →
      </span>
    </button>
  );
}

// ─── DetailPage ───────────────────────────────────────────────────────────────
function DetailPage({ spec, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F5EFEB", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
        style={{
          background: "white",
          color: "#2E4156",
          boxShadow: "0 4px 20px rgba(46,65,86,0.18)",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 320 }}>
        <img
          src={spec.img}
          alt={spec.name}
          className="w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(46,65,86,0.92), rgba(86,124,141,0.25))" }}
        />
        <div className="absolute bottom-0 left-0 p-10" style={{ zIndex: 2 }}>
          <span
            className="inline-block text-white text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-3"
            style={{ background: "#567C8D", letterSpacing: "1.5px" }}
          >
            {spec.tag}
          </span>
          <h1
            className="text-white font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 48px)" }}
          >
            {spec.name}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Intro */}
        <p
          className="text-lg leading-relaxed mb-14"
          style={{
            color: "#2E4156",
            borderLeft: "3px solid #567C8D",
            paddingLeft: 24,
            fontWeight: 300,
            lineHeight: 1.8,
          }}
        >
          {spec.intro}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-14">
          {spec.stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 text-center"
              style={{ background: "#2E4156" }}
            >
              <div
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: "#CBD8E6" }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 6, fontWeight: 300 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Treatments + Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {[
            { icon: "✦", title: "Treatments Offered", items: spec.treatments },
            { icon: "◎", title: "Conditions Treated", items: spec.conditions },
          ].map((box, i) => (
            <div
              key={i}
              className="rounded-2xl p-7"
              style={{ background: "white", border: "1px solid #CBD8E6" }}
            >
              <h3
                className="flex items-center gap-3 mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#2E4156" }}
              >
                <span
                  className="flex items-center justify-center rounded-lg text-base"
                  style={{ width: 32, height: 32, background: "#CBD8E6", color: "#2E4156", flexShrink: 0 }}
                >
                  {box.icon}
                </span>
                {box.title}
              </h3>
              <ul className="space-y-0">
                {box.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 py-2 text-sm"
                    style={{
                      color: "#4a6275",
                      borderBottom: j < box.items.length - 1 ? "1px solid #EDE6DF" : "none",
                    }}
                  >
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{ width: 5, height: 5, background: "#567C8D" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-12 text-center"
          style={{ background: "linear-gradient(135deg, #2E4156, #567C8D)" }}
        >
          <h3
            className="text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 28 }}
          >
            Book a Consultation
          </h3>
          <p className="text-white mb-7" style={{ opacity: 0.85, fontWeight: 300 }}>
            Connect with our specialists for personalised care and expert guidance.
          </p>
          <button
            className="px-10 py-4 rounded-full font-medium text-base transition-all duration-200 hover:scale-105"
            style={{ background: "white", color: "#2E4156", border: "none", cursor: "pointer" }}
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function MainPage({ onSelectSpec }) {
  const [gridRef, gridVisible] = useFadeIn();
  const [labelRef, labelVisible] = useFadeIn();

  return (
    <div style={{ background: "#F5EFEB", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

      {/* Hero */}
      <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 420 }}>
        <div className="absolute inset-0 flex">
          {heroImages.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden flex-1 group"
              style={{
                clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
              }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(46,65,86,0.55), rgba(86,124,141,0.4))" }}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <div
            className="inline-flex items-center gap-2 text-white text-sm font-medium px-6 py-2 rounded-full mb-5"
            style={{
              background: "#567C8D",
              letterSpacing: "0.5px",
              animation: "fadeDown 0.7s ease both",
            }}
          >
            <span style={{ opacity: 0.75 }}>Home</span>
            <span>›</span>
            <span>Specialities</span>
          </div>
          <h1
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 8vw, 68px)",
              textShadow: "0 2px 24px rgba(0,0,0,0.3)",
              animation: "fadeUp 0.8s 0.2s ease both",
            }}
          >
            Our Specialities
          </h1>
          <p
            className="mt-3 font-light tracking-widest"
            style={{ fontSize: 15, opacity: 0.9, animation: "fadeUp 0.8s 0.35s ease both" }}
          >
            World-class care across 40+ medical disciplines
          </p>
        </div>
      </div>

      {/* Specialities Section */}
      <div className="max-w-7xl mx-auto px-10 py-20 relative">
        {/* Decorative circle */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ top: -30, right: 40, width: 120, height: 120, background: "#CBD8E6", opacity: 0.3 }}
        />

        {/* Section Label */}
        <div
          ref={labelRef}
          className="flex items-center gap-4 mb-14 transition-all duration-700"
          style={{ opacity: labelVisible ? 1 : 0, transform: labelVisible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: "#567C8D" }} />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 4vw, 34px)",
              color: "#2E4156",
              whiteSpace: "nowrap",
            }}
          >
            Medical Specialities
          </h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #567C8D, transparent)" }} />
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="transition-all duration-700"
          style={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? "translateY(0)" : "translateY(24px)",
            columns: "4 220px",
            columnGap: 0,
          }}
        >
          {specialities.map((spec) => (
            <div key={spec.name} style={{ breakInside: "avoid", padding: "4px 0" }}>
              <SpecialityLink spec={spec} onClick={onSelectSpec} />
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes injected */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px);  } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function HospitalSpecialities() {
    const { name } = useParams();
  const [selected, setSelected] = useState(null);
  const selectedSpec = specialities.find(
  (spec) => spec.name === decodeURIComponent(name)
);

  // 🔥 If URL has name → show that speciality
if (name && selectedSpec) {
  return <DetailPage spec={selectedSpec} onBack={() => window.history.back()} />;
}

// 🔥 Otherwise show full list
return (
  <MainPage onSelectSpec={setSelected} />
);
}