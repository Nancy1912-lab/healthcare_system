import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ─── Color palette from image ───────────────────────────────────────────────
// Navy: #2E4156 | Teal: #567C8D | Sky: #CBD8E6 | Beige: #F5EFEB | White: #FFFFFF

// ─── Data ───────────────────────────────────────────────────────────────────
const specialities = [

  {
    name: "Bariatric Surgery", featured: false, tag: "Surgical",
    img: "https://i.pinimg.com/1200x/27/7f/89/277f89c8acebda4c270a4affabc1267f.jpg",
    intro: "Bariatric surgery, also called metabolic surgery, is a medical procedure designed to alter the digestive system to assist in significant weight loss. It is considered when diet and exercise haven't worked or when overweight people have serious health problems. Bariatric surgery can limit how much one can eat, reduce the body's ability to absorb nutrients, or both. While offering many benefits, it is a significant procedure with potential risks and requires permanent lifestyle changes.",
    stats: [{ n: "5K+", l: "Surgeries Done" }, { n: "85%", l: "Weight Loss Success" }, { n: "12", l: "Expert Surgeons" }],
    treatments: ["Gastric Bypass", "Sleeve Gastrectomy", "Gastric Banding", "Mini Bypass", "Revisional Surgery"],
    conditions: ["Morbid Obesity", "Type 2 Diabetes", "Hypertension", "Sleep Apnea", "Joint Pain"],
  },

  {
    name: "Cardiothoracic & Vascular Surgery", featured: false, tag: "Cardiology",
    img: "https://i.pinimg.com/1200x/fe/7a/18/fe7a18fbf483968c8f9cbe9c99a26a84.jpg",
    intro: "Our cardiac surgery unit performs complex heart procedures with state-of-the-art technology, achieving outstanding outcomes for patients with even the most challenging conditions.",
    stats: [{ n: "2K+", l: "Surgeries/yr" }, { n: "97%", l: "Success Rate" }, { n: "30", l: "Cardiologists" }],
    treatments: ["Bypass Surgery", "Valve Replacement", "Heart Transplant", "Angioplasty", "Pacemaker"],
    conditions: ["Coronary Disease", "Valve Disease", "Aortic Aneurysm", "Arrhythmia", "Heart Failure"],
  },
  {
    name: "Cardiology", featured: false, tag: "Heart",
    img: "https://i.pinimg.com/736x/92/84/ec/9284ec0f0de00cd9649fc1b5450c8b1b.jpg",
    intro: "NEXORA Hospital stands out among the top hospitals in Gujarat, particularly recognised as a leading cardiology hospital in the region. Recognised as the best cardiac centre in Ahmedabad, the hospital is dedicated to providing exceptional heart and cardiovascular care through its comprehensive range of services, setting the standard for quality healthcare in the area. The cardiology department at Kusum Dhirajlal Hospital is staffed by top cardiac experts with extensive experience in managing a wide variety of cardiology cases. These specialists ensure accurate diagnoses and provide advanced treatments, including cutting-edge angiography. The hospital’s dedicated team of doctors and staff work seamlessly together to meet the healthcare needs of every patient. NEXORA Hospital offers an array of cardiac procedures, spanning invasive, non-invasive, and heart rhythm treatments, making it a benchmark for cardiac care in the region.",
    stats: [{ n: "10K+", l: "Patients/yr" }, { n: "96%", l: "Satisfaction" }, { n: "22", l: "Cardiologists" }],
    treatments: ["ECG & Echo", "Stress Testing", "Catheterisation", "Stenting", "Cardiac Rehab"],
    conditions: ["Chest Pain", "Heart Attack", "Hypertension", "Cholesterol", "Palpitations"],
  },

  {
    name: "Dermatology", featured: false, tag: "Skin",
    img: "https://www.oasisdermatology.com/wp-content/uploads/2022/12/What-is-Cosmetic-Dermatology-Oasis-Dermatology-1000x658.jpg",
    intro: "NEXORA Hospital is committed to providing exceptional care, ensuring that patients receive the highest level of treatment and expert guidance at every step. Our skin experts in Ahmedabad at Kusum Dhirajlal Hospital are skilled in treating all skin issues, including cosmetic skin solutions.Experienced dermatologists and support staff lead the dermatology department at NEXORA Hospital and have years of handhold experience.",
    stats: [{ n: "12K+", l: "Patients/yr" }, { n: "95%", l: "Satisfaction" }, { n: "18", l: "Dermatologists" }],
    treatments: ["Laser Therapy", "Botox", "Fillers", "Chemical Peel", "Microneedling"],
    conditions: ["Acne", "Eczema", "Psoriasis", "Hair Loss", "Skin Cancer"],
  },
  {
    name: "Emergency Medicine", featured: true, tag: "Emergency",
    img: "https://i.pinimg.com/1200x/9d/12/24/9d1224722faeca9e6b46573cb570a0c0.jpg",
    intro: "In critical medical situations, timely and expert intervention is paramount. Emergency & Trauma Centre, a NABH-Accredited level 1 trauma centre, provides world-class emergency and trauma care with a multidisciplinary team of specialists and cutting-edge medical technology.",
    stats: [{ n: "200+", l: "Daily Cases" }, { n: "<8min", l: "Triage Time" }, { n: "60", l: "ER Doctors" }],
    treatments: ["Trauma Care", "Resuscitation", "Emergency Surgery", "Toxicology", "Stroke Protocol"],
    conditions: ["Heart Attack", "Stroke", "Fractures", "Poisoning", "Severe Infections"],
  },

  {
    name: "ENT", featured: false, tag: "Head & Neck",
    img: "https://mradamshakir.co.uk/wp-content/uploads/2022/09/What-can-be-the-cause-of-Ear-Nose-and-Throat-Infection.jpg",
    intro: "At the ENT unit in NEXORA Hospital, we have the latest technologically advanced equipment and experienced surgeons who can carry out the most complex surgeries.",
    stats: [{ n: "9K+", l: "Patients/yr" }, { n: "94%", l: "Success Rate" }, { n: "14", l: "Surgeons" }],
    treatments: ["Tonsillectomy", "Sinus Surgery", "Hearing Aids", "Cochlear Implant", "Rhinoplasty"],
    conditions: ["Sinusitis", "Hearing Loss", "Tonsillitis", "Snoring", "Head & Neck Cancer"],
  },
  {
    name: "Neurology", featured: true, tag: "Neurology",
    img: "https://i.pinimg.com/736x/ca/ac/d2/caacd2b89a390688452b72fa8b575889.jpg",
    intro: "Adhering to its vision of ensuring ‘well-being’ as a human commitment, NEXORA Hospital has built a firm base of happy patients who trusted the medical experts and went ahead with neurological treatments. Kusum Dhirajlal Hospital is a stroke-ready hospital in Ahmedabad with an experienced team of interventional neurologists and surgeons.The neurology department of NEXORA Hospital comprises highly-trained, skilled, and experienced neurologists, neurosurgeons, interventional radiologists, neuro physiotherapists, and rehabilitation experts who ensure that patients receive the best quality treatments for curing their neurological problems.",
    stats: [{ n: "500+", l: "Surgeries/yr" }, { n: "75%", l: "Seizure Freedom" }, { n: "8", l: "Epileptologists" }],
    treatments: ["EEG Monitoring", "Resection Surgery", "VNS", "RNS Implant", "Ketogenic Diet"],
    conditions: ["Drug-resistant Epilepsy", "Focal Seizures", "Temporal Lobe Epilepsy", "Infantile Spasms", "Lennox-Gastaut"],
  },
  {
    name: "Obstetrics", featured: false, tag: "Reproductive",
    img: "https://i.pinimg.com/736x/2b/50/2f/2b502fd1f3cc1842dccfc13c421239c0.jpg",
    intro: "At NEXORA Blossom, we specialise in providing comprehensive care for women throughout pregnancy and childbirth. We understand that this journey is an unforgettable experience for women.NEXORA Hospital is the best maternity hospital in Ahmedabad, offering a comprehensive range of services catering to every pregnancy stage. From family planning advice to early pregnancy detection and personalised care throughout the journey, the hospital ensures a safe and secure experience for both mother and baby. Their team of experienced healthcare professionals is dedicated to providing exceptional care, making Kusum Dhirajlal Hospital the preferred choice for expecting families in Ahmedabad.At Kusum Dhirajlal Hospital, our doctors work closely with expectant mothers to create a personalised birth plan, ensuring their preferences are communicated and respected throughout the process. Our dedicated team of nurses and midwives provides continuous, compassionate care during pregnancy, labour, and delivery, ensuring mother and baby receive the best possible support. With a wealth of experience in managing pregnancy complications, addressing genetic concerns, and diagnosing disorders, our specialists are committed to providing comprehensive and expert care at every step.Our services include childbirth and prenatal education classes, activities, examinations, care, parenting classes after birth, and providing a nurturing environment with warm and soothing features that simulate a home-like atmosphere and are very comforting for new moms.All these services are available under one roof; NEXORA Hospital is the best maternity hospital in Ahmedabad.We examine challenges in general obstetrics, medical complications, foetal disease, labor and delivery at our maternity hospital in Ahmedabad.",
    stats: [{ n: "3K+", l: "IVF Cycles/yr" }, { n: "55%", l: "Success Rate" }, { n: "10", l: "Fertility Experts" }],
    treatments: ["IVF", "IUI", "Egg Freezing", "Sperm Banking", "Surrogacy Support"],
    conditions: ["Infertility", "PCOS", "Low Sperm Count", "Endometriosis", "Recurrent Miscarriage"],
  },

  {
    name: "Gastroenterology", featured: false, tag: "Digestive",
    img: "https://i.pinimg.com/1200x/02/b9/20/02b92096f18788f4682a62c0dadfc9d0.jpg",
    intro: "The gastroenterology department at NEXORA Hospital is regarded as one of the best gastroenterology centres in India. Our team of experienced gastrophysicians and skilled staff is dedicated towards the management of diseases of the digestive and hepatobiliary systems. The modern state-of-art equipments and the advanced intensive care units at Kusum Dhirajlal Hospital are handled by the best gastroenterologist in Ahmedabad. We offer the best endoscopy in Ahmedabad with two technologically advanced endoscopy suites.",
    stats: [{ n: "11K+", l: "Patients/yr" }, { n: "96%", l: "Endoscopy Accuracy" }, { n: "16", l: "Gastroenterologists" }],
    treatments: ["Colonoscopy", "ERCP", "Endoscopy", "Liver Biopsy", "Capsule Endoscopy"],
    conditions: ["IBS", "Crohn's Disease", "Liver Cirrhosis", "Colorectal Cancer", "GERD"],
  },

  {
    name: "General Surgery", featured: false, tag: "Surgical",
    img: "https://i.pinimg.com/736x/f9/67/08/f96708255fbfe89dd4c942b685384ad7.jpg",
    intro: "NEXORA Hospital, Ahmedabad, is home to a team of highly skilled and experienced general surgeons capable of performing even the most complex surgeries. Our surgeons are dedicated to providing comprehensive care at every stage—before, during, and after surgery—ensuring all patients' smooth and effective recovery. With extensive expertise and advanced resources, our general surgeons are fully equipped to handle a wide range of procedures.",
    stats: [{ n: "15K+", l: "Surgeries/yr" }, { n: "97%", l: "Success Rate" }, { n: "28", l: "Surgeons" }],
    treatments: ["Laparoscopic Surgery", "Appendectomy", "Cholecystectomy", "Thyroidectomy", "Hernia Repair"],
    conditions: ["Appendicitis", "Gallstones", "Thyroid Nodules", "Hernias", "Abdominal Masses"],
  },
  {
    name: "Gynaecology", featured: false, tag: "Women's Health",
    img: "https://i.pinimg.com/736x/77/86/7c/77867cdd01ad78f7ac2fbdd7f85cf8a9.jpg",
    intro: "At NEXORA Blossom, we understand that every stage in a woman’s life brings new developments and changes, often leading to questions and concerns about health management. We recognise the emotional and social aspects of gynaecological issues and offer a comprehensive range of services under one roof, from annual preventive check-ups to complex medical and surgical care for women of all ages.Our highly skilled, interdisciplinary team includes leading obstetricians and gynaecologists, urogynaecologists, breast surgeons, gynaec-oncologists, trained paramedics, and nurses. Together, we collaborate to deliver the highest standard of care. Whether supporting women during their reproductive years or addressing the challenges of post-reproductive health, our dedicated team ensures that every patient receives the best possible care at every stage of life.At NEXORA Hospital, we offer the best obstetrics and gynaecology services to women from all walks of life, particularly those from economically disadvantaged backgrounds who may lack access to quality healthcare. We care for young women dealing with irregular cycles, contraception, urogynaecological issues, and preventive gynaecological care, all aimed at providing the highest quality services throughout their life cycle.At NEXORA Blossom, we offer comprehensive care for adolescents, reproductive issues, menopause, urinary incontinence, pelvic prolapse, genetic concerns, and disorders, along with all necessary diagnostic services.",
    stats: [{ n: "14K+", l: "Patients/yr" }, { n: "96%", l: "Satisfaction" }, { n: "20", l: "Gynaecologists" }],
    treatments: ["Hysteroscopy", "Laparoscopy", "Hysterectomy", "Colposcopy", "Fibroid Removal"],
    conditions: ["Endometriosis", "PCOS", "Uterine Fibroids", "Cervical Cancer", "Menopause"],
  },
  {
    name: "Health Check-up Packages", featured: false, tag: "Preventive",
    img: "https://i.pinimg.com/1200x/31/c9/64/31c964897482cab69d75adb9e9002715.jpg",
    intro: "At NEXORA Hospital our vision to promote 'well-being' reflects our deep commitment to enhancing the lives of individuals and communities. In line with this, we offer affordable health check-up packages in Ahmedabad designed to empower patients with early diagnosis and prevention of various health conditions. These packages are part of our larger mission to instil community hope, health, and happiness. By providing accessible and comprehensive health screenings, we strive to help individuals lead healthier lives and fulfil the core values of Kusum Dhirajlal Hospital.You can find the details of our health check-up packages below : In line with our mission to deliver safe, effective, professional, ethical, and comprehensive healthcare, NEXORA Hospital offers discounted health check-up packages in Ahmedabad, backed by our state-of-the-art facilities. Our health check-up services are designed to detect existing or potential health issues early, enabling timely intervention to prevent complications. Choose the healthcare package that best suits your age and health condition, and take a proactive step toward maintaining your well-being with the highest quality care.",
    stats: [{ n: "20K+", l: "Checkups/yr" }, { n: "12", l: "Package Types" }, { n: "Same Day", l: "Reports" }],
    treatments: ["Blood Panel", "Cardiac Screening", "Cancer Markers", "Imaging", "Diet Consult"],
    conditions: ["Preventive Screening", "Pre-employment", "Executive Health", "Diabetes Risk", "Heart Risk"],
  },
  {
    name: "Health @ Home", featured: true, tag: "Home Care",
    img: "https://i.pinimg.com/1200x/b7/5e/f1/b75ef1e822b7e2e0a8ea18620117a81f.jpg",
    intro: "NEXORA Hospital believes that delivering medicines to your doorstep is a healthcare essential. It makes your life easier while bringing these benefits to you within the comfort of your home.At NEXORA Hospital, in addition to the in-house state-of-the-art laboratory, we offer home sample collection for you and your family through our home healthcare service.",
    stats: [{ n: "500+", l: "Daily Visits" }, { n: "50+", l: "Services" }, { n: "24/7", l: "Availability" }],
    treatments: ["Home Nursing", "IV Therapy", "Physiotherapy", "Sample Collection", "Wound Dressing"],
    conditions: ["Post-surgical Care", "Elderly Care", "Chronic Disease", "Palliative Care", "ICU@Home"],
  },

  {
    name: "General Medicine", featured: false, tag: "General Medicine",
    img: "https://i.pinimg.com/736x/00/3b/ea/003bea86c610a07d105c67bc68a2bb2f.jpg",
    intro: "Expert diagnosis and management of complex adult medical conditions, coordinating care across specialities to ensure comprehensive treatment for multi-system diseases.",
    stats: [{ n: "18K+", l: "Patients/yr" }, { n: "95%", l: "Satisfaction" }, { n: "35", l: "Internists" }],
    treatments: ["Diagnostic Workup", "Chronic Disease Mgmt", "Medication Review", "Referral Coordination", "Preventive Care"],
    conditions: ["Fever", "Hypertension", "Diabetes", "Infections", "Multi-system Disease"],
  },

  {
    name: "Laboratory Medicine", featured: false, tag: "Diagnostics",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
    intro: "NEXORA Hospital's laboratory medicine department offers accurate and timely diagnostics for Ahmedabad patients. Contact us for a wide range of laboratory services and reliable test results. The pathology laboratory at Kusum Dhirajlal Hospital offers 24x7 services to patients. Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skilful execution.The pathology laboratory at NEXORA Hospital provides high-quality reports even in emergency situations. Our unique, high-tech laboratory has world-class instruments and well-trained, efficient staff.",
    stats: [{ n: "1M+", l: "Tests/yr" }, { n: "Same Day", l: "Reports" }, { n: "99.9%", l: "Accuracy" }],
    treatments: ["Blood Tests", "Cultures", "Molecular Diagnostics", "Histopathology", "Cytology"],
    conditions: ["Infection Diagnosis", "Cancer Markers", "Metabolic Disorders", "Drug Monitoring", "Genetic Testing"],
  },
  {
    name: "Liver Transplant", featured: false, tag: "Transplant",
    img: "https://i.pinimg.com/1200x/5f/a3/a2/5fa3a2d962ceb08b339693a7b5f1e6c9.jpg",
    intro: "One of the country's leading liver transplant programmes, performing both deceased-donor and living-donor transplants with exceptional long-term survival outcomes.",
    stats: [{ n: "300+", l: "Transplants/yr" }, { n: "92%", l: "5yr Survival" }, { n: "20", l: "Transplant Surgeons" }],
    treatments: ["Living Donor Transplant", "Deceased Donor", "Split Liver", "Paediatric Transplant", "Post-transplant Care"],
    conditions: ["End-stage Liver Disease", "Acute Liver Failure", "Liver Cancer", "Biliary Atresia", "PSC"],
  },
  {
    name: "Neonatology & Paediatrics", featured: false, tag: "Child Health",
    img: "https://i.pinimg.com/736x/6a/3a/52/6a3a52040b75d83ca93ce3dbdbe22dd1.jpg",
    intro: "Your newborn's health is as crucial to the NEXORA Blossom as it is to you. Our team of neonatologists and paediatricians provides the best care for your baby!Neonatology focuses on preventing and treating issues that arise during the foetal, intrapartum, or neonatal periods. Our neonatologists at NEXORA Blossom offer expert medical care and provide information and support to newborn families. We offer a comprehensive range of services to address various health challenges that newborns may face. Our experienced team is available 24/7 to care for critically ill premature and full-term infants. We are committed to high-quality, family-centered care because we understand how important your baby's health is and the challenges and fears that come with your newborn's health issues. Common reasons for NICU (Neonatal Intensive Care Unit) care include premature birth, birth asphyxia, pulmonary hypoplasia, low birth weight, sepsis, and congenital malformations. NEXORA Hospital has a 'state-of-the-art' level III-B NICU set-up, with an attached perinatal centre that includes foetal medicine, high-risk obstetrics, and IVF under one roof.",
    stats: [{ n: "5K+", l: "NICU Babies/yr" }, { n: "96%", l: "Survival (<28wks)" }, { n: "25", l: "Paediatricians" }],
    treatments: ["NICU Care", "Surfactant Therapy", "Paediatric Surgery", "Vaccination", "Developmental Assessment"],
    conditions: ["Prematurity", "Neonatal Jaundice", "Congenital Anomalies", "Paediatric Infections", "Growth Disorders"],
  },
  {
    name: "Nephrology & Dialysis Centre", featured: false, tag: "Kidney",
    img: "https://www.nephrogroup.com/wp-content/uploads/2022/03/imus.jpg",
    intro: "NEXORA Hospital has built a strong reputation as one of Ahmedabad's premier healthcare destinations, particularly recognised for its outstanding nephrology and dialysis services. Our specialised nephrology department provides a full spectrum of services, addressing preventive and advanced care needs for patients with kidney-related issues. By combining the expertise of skilled nephrologists and kidney transplant specialists with the latest medical technologies, we have established ourselves as the leading dialysis centre in Ahmedabad.We understand every patient is unique, so we offer personalised care plans according to individual needs. From the initial consultation to ongoing care, our team is dedicated to providing consistent, compassionate treatment that ensures the best possible outcomes.",
    stats: [{ n: "200+", l: "Dialysis/day" }, { n: "3K+", l: "CNEXORA Patients" }, { n: "14", l: "Nephrologists" }],
    treatments: ["Haemodialysis", "Peritoneal Dialysis", "Kidney Biopsy", "CNEXORA Management", "Transplant Prep"],
    conditions: ["Chronic Kidney Disease", "ESRD", "Glomerulonephritis", "Polycystic Kidney", "Lupus Nephritis"],
  },

  {
    name: "Neurosurgery", featured: false, tag: "Brain Surgery",
    img: "https://i.pinimg.com/1200x/ae/2c/7f/ae2c7f1b61d34496f4dd8eb62330b265.jpg",
    intro: "The NEXORA Hospital's neurosurgery department is the epitome of excellence and innovation. We have secured a prominent place in Neurosurgery in Ahmedabad and India because of our accurate diagnosis and advanced treatment. Our hallmarks are cutting-edge technology, a unique patient-centric approach, and a commitment to rendering the best possible treatment to patients with care, empathy, and sensitivity.Our best neurosurgeons, neurologists, interventional neuroradiologists, and other associated specialists have extensive experience. We are available 24/7 with our advanced scientific equipment to offer highly prioritised and effective treatment for emergency cases.The NEXORA Hospital's neurosurgery department is among the best in the country; it provides specific treatment for stroke, epilepsy, head and spinal injuries, including brain tumours, and various neuro degenerative disorders. With a high success rate in critical cases, a team of experienced experts, and a dedication to serving patients, we have become one of the most sought-after hospitals for neurosurgery.",
    stats: [{ n: "1.5K+", l: "Surgeries/yr" }, { n: "97%", l: "Success Rate" }, { n: "12", l: "Neurosurgeons" }],
    treatments: ["Craniotomy", "Spinal Fusion", "Deep Brain Stimulation", "Gamma Knife", "Endoscopic Surgery"],
    conditions: ["Brain Tumour", "Aneurysm", "Hydrocephalus", "Spinal Disc Disease", "AVM"],
  },
  {
    name: "Obstetrics", featured: false, tag: "Maternity",
    img: "https://i.pinimg.com/736x/07/e2/15/07e215ad88a3bf211c0d76157061057f.jpg",
    intro: "At NEXORA Blossom, we specialise in providing comprehensive care for women throughout pregnancy and childbirth. We understand that this journey is an unforgettable experience for women.NEXORA Hospital is the best maternity hospital in Ahmedabad, offering a comprehensive range of services catering to every pregnancy stage. From family planning advice to early pregnancy detection and personalised care throughout the journey, the hospital ensures a safe and secure experience for both mother and baby. Their team of experienced healthcare professionals is dedicated to providing exceptional care, making Kusum Dhirajlal Hospital the preferred choice for expecting families in Ahmedabad.At Kusum Dhirajlal Hospital, our doctors work closely with expectant mothers to create a personalised birth plan, ensuring their preferences are communicated and respected throughout the process. Our dedicated team of nurses and midwives provides continuous, compassionate care during pregnancy, labour, and delivery, ensuring mother and baby receive the best possible support. With a wealth of experience in managing pregnancy complications, addressing genetic concerns, and diagnosing disorders, our specialists are committed to providing comprehensive and expert care at every step.Our services include childbirth and prenatal education classes, activities, examinations, care, parenting classes after birth, and providing a nurturing environment with warm and soothing features that simulate a home-like atmosphere and are very comforting for new moms.All these services are available under one roof; NEXORA Hospital is the best maternity hospital in Ahmedabad.We examine challenges in general obstetrics, medical complications, foetal disease, labor and delivery at our maternity hospital in Ahmedabad.",
    stats: [{ n: "6K+", l: "Deliveries/yr" }, { n: "99%", l: "Safe Deliveries" }, { n: "22", l: "Obstetricians" }],
    treatments: ["Antenatal Care", "Normal Delivery", "C-Section", "Epidural", "High-risk Management"],
    conditions: ["High-risk Pregnancy", "Pre-eclampsia", "Gestational Diabetes", "Multiple Pregnancy", "Preterm Labour"],
  },
  {
    name: "Oncology", featured: false, tag: "Cancer Care",
    img: "https://i.pinimg.com/1200x/25/93/9b/25939b3a3dc6fb8fef89a5d844fe9c03.jpg",
    intro: "At NEXORA Hospital, we understand that cancer is complex and that its treatment requires a mix of therapies like chemotherapy, radiotherapy, and surgery, along with lifestyle modifications.At NEXORA Hospital, all presenting cases, primary or metastatic, are diagnosed and investigated by surgical teams streamlined into and specializing in organ specific services.At NEXORA Cancer Centre, we understand how important it is for patients and families to receive clear answers and the right treatment, without unnecessary stress.At NEXORA Cancer Centre, Gujarat's beacon for precision radiation oncology, we offer an advanced, cutting-edge radiation therapy programme.",
    stats: [{ n: "8K+", l: "New Cases/yr" }, { n: "15+", l: "Cancer Types" }, { n: "30", l: "Oncologists" }],
    treatments: ["Chemotherapy", "Immunotherapy", "Targeted Therapy", "Radiation", "Bone Marrow Transplant"],
    conditions: ["Lung Cancer", "Breast Cancer", "Blood Cancer", "GI Cancer", "Head & Neck Cancer"],
  },
  {
    name: "Ophthalmology", featured: false, tag: "Eye Care",
    img: "https://grandgenesishealth.com/wp-content/uploads/2022/10/Ophthalmology-1536x856.jpg",
    intro: "At NEXORA Hospital, we are dedicated to providing comprehensive eye care services using cutting-edge technology and a team of experienced professionals. Our ophthalmology department offers a wide range of services tailored to meet the individual needs of our patients.",
    stats: [{ n: "15K+", l: "Patients/yr" }, { n: "99%", l: "Cataract Success" }, { n: "16", l: "Eye Specialists" }],
    treatments: ["LASIK", "Cataract Surgery", "Retina Surgery", "Glaucoma Management", "Corneal Transplant"],
    conditions: ["Cataract", "Glaucoma", "Retinal Detachment", "Diabetic Retinopathy", "Myopia"],
  },
  {
    name: "Orthopedics", featured: false, tag: "Bone & Joint",
    img: "https://i.pinimg.com/1200x/f0/7d/6c/f07d6c3299d53f64b121d4370d70a470.jpg",
    intro: "Orthopaedic and joint replacement department at NEXORA Hospital is a center of excellence in Ahmedabad. It offers cutting-edge technology and state-of-the-art equipment to deliver outstanding results in orthopaedic surgeries. Patients trust the expertise and quality of care provided by our trained experts.Besides being Ahmedabad's unbeatable joint replacement center, NEXORA Hospital also works towards orthopaedic surgeries.",
    stats: [{ n: "12K+", l: "Procedures/yr" }, { n: "96%", l: "Satisfaction" }, { n: "24", l: "Orthopaedic Surgeons" }],
    treatments: ["Joint Replacement", "Arthroscopy", "Fracture Fixation", "Spine Surgery", "Sports Injury Rehab"],
    conditions: ["Arthritis", "Fractures", "Sports Injuries", "Scoliosis", "Tendon Disorders"],
  },

  {
    name: "Plastic & Reconstructive Surgery", featured: false, tag: "Reconstructive",
    img: "https://i.pinimg.com/1200x/7f/73/c5/7f73c5f2f34fba418bfe9e532b21ea3e.jpg",
    intro: "At NEXORA Hospital, we believe that Every face tells a story, and we're here to help make yours a positive one. Kusum Dhirajlal Hospital offers the unique advantage of having both cosmetic and reconstructive surgeries under one roof. Our department is led by expert super-specialists renowned for achieving exceptional results, even in the most complex cases.Our expert team of clinicians has successfully helped hundreds of patients achieve their desired appearance through cosmetic procedures. Additionally, we have restored normalcy and significantly improved the quality of life for those recovering from severe accidents through advanced reconstructive surgeries. Whether you're seeking to enhance your appearance or regain functionality after a traumatic injury, we are dedicated to providing every patient with the highest standard of care.",
    stats: [{ n: "3K+", l: "Surgeries/yr" }, { n: "97%", l: "Satisfaction" }, { n: "10", l: "Plastic Surgeons" }],
    treatments: ["Rhinoplasty", "Breast Augmentation", "Tummy Tuck", "Cleft Repair", "Burns Reconstruction"],
    conditions: ["Burns", "Cleft Palate", "Breast Reconstruction", "Body Contouring", "Facial Trauma"],
  },

  {
    name: "Radiology", featured: false, tag: "Imaging",
    img: "https://i.pinimg.com/1200x/13/7b/d4/137bd47c5214a6ce53e9bc5a84062249.jpg",
    intro: "NEXORA Hospital has a state-of-the-art radiology department featuring the latest, high-quality equipment to ensure accurate diagnosis and effective treatment. Our highly qualified and experienced radiologists are dedicated to providing precise interpretations, enabling the appropriate interventions and treatments to be carried out promptly.At Kusum Dhirajlal Hospital, our radiology department offers exceptional diagnostic services, with a team of skilled technicians and radiologists available 24/7. We are committed to delivering patient care with the utmost professionalism and compassion.",
    stats: [{ n: "200K+", l: "Scans/yr" }, { n: "Same Day", l: "Reports" }, { n: "25", l: "Radiologists" }],
    treatments: ["MRI", "CT Scan", "PET-CT", "Ultrasound", "X-ray"],
    conditions: ["Cancer Staging", "Neurological Diagnosis", "Cardiac Imaging", "MSK Imaging", "Vascular Assessment"],
  },

  {
    name: "Spine Surgery", featured: false, tag: "Spine",
    img: "https://i.pinimg.com/1200x/0a/61/27/0a61276e18b1841f0b07ca51b68a8aa4.jpg",
    intro: "Our spine surgery centre in NEXORA Hospital aims to provide “Complete care from neck to back.” We treat all ailments related to the spine here. The NEXORA Hospital spine surgery centre provides advanced care for neck, back, and spine conditions. We know that diagnosing and coordinating care for spine conditions can be challenging for patients and their primary care providers.At our spine surgery centre, we streamline this process with an experienced multidisciplinary team diagnosing spine disorders and developing individual treatment plans. The concerted expertise of our spine surgery and pain management specialists, combined with physical and occupational therapy and a nurse navigator, is available to patients at the Spine Surgery Centre in NEXORA Hospital.We aim to ensure that the patient is provided care by the most appropriate specialist right from the start. We collaborate with each patient from the first visit to decide on the best treatment option, which is often not surgery.",
    stats: [{ n: "2K+", l: "Surgeries/yr" }, { n: "96%", l: "Pain Relief" }, { n: "14", l: "Spine Surgeons" }],
    treatments: ["Microdiscectomy", "Spinal Fusion", "Vertebroplasty", "Spinal Stimulation", "Endoscopic Spine"],
    conditions: ["Disc Herniation", "Spondylolisthesis", "Scoliosis", "Spinal Stenosis", "Compression Fracture"],
  },

  {
    name: "Urology", featured: true, tag: "Urological",
    img: "https://i.pinimg.com/736x/59/3f/a4/593fa4ab91ad74fd522079f904ccc1db.jpg",
    intro: "Urologists are specialised doctors who diagnose and treat problems related to these organs. Our urology department at NEXORA Hospital, Ahmedabad, offers comprehensive care for various urological issues, ensuring our patients receive the best possible treatment.",
    stats: [{ n: "10K+", l: "Patients/yr" }, { n: "97%", l: "Stone Clearance" }, { n: "16", l: "Urologists" }],
    treatments: ["Laser Stone Surgery", "TURP", "Urodynamics", "Cystoscopy", "Vasectomy"],
    conditions: ["Kidney Stones", "BPH", "Incontinence", "UTI", "Bladder Cancer"],
  },


{
  name: "Laparoscopic Surgery", featured: false, tag: "Surgical",
  img: "https://i.pinimg.com/736x/b0/7a/38/b07a38e8ede0601c9e6e538021d54d54.jpg",
  intro: "Minimally invasive surgical procedures performed using advanced laparoscopic techniques ensuring faster recovery and reduced complications.",
  stats: [{ n: "6K+", l: "Surgeries/yr" }, { n: "96%", l: "Success Rate" }, { n: "14", l: "Surgeons" }],
  treatments: ["Laparoscopic Cholecystectomy", "Hernia Repair", "Appendectomy", "Fundoplication", "Diagnostic Laparoscopy"],
  conditions: ["Gallstones", "Hernia", "Appendicitis", "Reflux Disease", "Abdominal Pain"],
},
{
  name: "Surgical Oncology", featured: false, tag: "Cancer Surgery",
  img: "https://i.pinimg.com/1200x/2a/96/e3/2a96e3ee49933798664c81c004f192c8.jpg",
  intro: "At NEXORA Hospital, all presenting cases, primary or metastatic, are diagnosed and investigated by surgical teams streamlined into and specializing in organ specific services.",
  stats: [{ n: "3K+", l: "Surgeries/yr" }, { n: "95%", l: "Success Rate" }, { n: "10", l: "Onco Surgeons" }],
  treatments: ["Tumor Removal", "Organ Resection", "Lymph Node Dissection", "Reconstructive Surgery"],
  conditions: ["Breast Cancer", "Lung Cancer", "GI Cancer", "Head & Neck Cancer"],
},
{
  name: "Medical Oncology", featured: false, tag: "Cancer Care",
  img: "https://i.pinimg.com/1200x/ef/1c/79/ef1c79d372fe348627e3465ed8c95299.jpg",
  intro: "At NEXORA Hospital, we understand that cancer is complex and that its treatment requires a mix of therapies like chemotherapy, radiotherapy, and surgery, along with lifestyle modifications",
  stats: [{ n: "5K+", l: "Patients/yr" }, { n: "90%", l: "Response Rate" }, { n: "12", l: "Oncologists" }],
  treatments: ["Chemotherapy", "Immunotherapy", "Targeted Therapy", "Hormonal Therapy"],
  conditions: ["Breast Cancer", "Blood Cancer", "Lung Cancer", "Colon Cancer"],
},
{
  name: "Radiation Oncology", featured: false, tag: "Radiotherapy",
  img: "https://i.pinimg.com/1200x/60/00/ff/6000ff34f6704a7ad966d43977ad5550.jpg",
  intro: "At NEXORA Cancer Centre, Gujarat's beacon for precision radiation oncology, we offer an advanced, cutting-edge radiation therapy programme.",
  stats: [{ n: "4K+", l: "Cases/yr" }, { n: "92%", l: "Precision Rate" }, { n: "8", l: "Specialists" }],
  treatments: ["External Beam Radiation", "Brachytherapy", "IMRT", "IGRT"],
  conditions: ["Tumors", "Brain Cancer", "Prostate Cancer", "Cervical Cancer"],
},
{
  name: "Pediatrics", featured: false, tag: "Child Care",
  img: "https://i.pinimg.com/1200x/05/0d/97/050d9700ba485384cc03330fcceceaa4.jpg",
  intro: "Comprehensive healthcare services for infants, children and adolescents ensuring healthy growth and development.",
  stats: [{ n: "12K+", l: "Patients/yr" }, { n: "96%", l: "Care Quality" }, { n: "20", l: "Paediatricians" }],
  treatments: ["Vaccination", "Growth Monitoring", "Neonatal Care", "Pediatric Surgery"],
  conditions: ["Fever", "Infections", "Allergies", "Growth Disorders"],
},
{
  name: "Pathology", featured: false, tag: "Diagnostics",
  img: "https://i.pinimg.com/736x/f2/a1/bb/f2a1bb1366db616ecfbcf8a01b37457b.jpg",
  intro: "Accurate laboratory diagnosis of diseases through advanced pathological testing and analysis.",
  stats: [{ n: "1M+", l: "Tests/yr" }, { n: "99%", l: "Accuracy" }, { n: "25", l: "Pathologists" }],
  treatments: ["Blood Tests", "Biopsy", "Histopathology", "Cytology"],
  conditions: ["Infections", "Cancer Diagnosis", "Blood Disorders", "Metabolic Diseases"],
},
{
  name: "Physiotherapy", featured: false, tag: "Rehabilitation",
  img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
  intro: "At NEXORA Hospital, comprehensive care extends beyond medical treatment. Our physiotherapy centre is designed to support your complete recovery journey. Whether you're recovering from an injury or surgery or managing a chronic condition, our dedicated physiotherapists utilise advanced techniques and a holistic approach to promote healing, reduce pain, and improve mobility.Our physiotherapy services cater to patients of all ages and backgrounds. With the latest equipment, skilled professionals, and personalised care, we ensure you receive the best therapeutic interventions tailored to your needs. From rehabilitation to prevention, we focus on restoring your quality of life.",
  stats: [{ n: "600+", l: "Sessions/day" }, { n: "95%", l: "Recovery Rate" }, { n: "30", l: "Therapists" }],
  treatments: ["Manual Therapy", "Exercise Therapy", "Electrotherapy", "Sports Rehab"],
  conditions: ["Back Pain", "Post-surgery Rehab", "Sports Injuries", "Stroke Recovery"],
},
{
  name: "Rehabilitation Medicine", featured: false, tag: "Recovery",
  img: "https://i.pinimg.com/736x/9d/73/23/9d7323c1a6d125d7bf44c3939795e54a.jpg",
  intro: "Holistic rehabilitation care for patients recovering from illness, injury or disability.",
  stats: [{ n: "3K+", l: "Patients/yr" }, { n: "94%", l: "Improvement Rate" }, { n: "12", l: "Specialists" }],
  treatments: ["Physical Rehab", "Occupational Therapy", "Speech Therapy", "Pain Management"],
  conditions: ["Stroke", "Spinal Injury", "Disability", "Chronic Pain"],
},
{
  name: "Liver Transplant", featured: false, tag: "Transplant",
  img: "https://www.indianhealthadviser.com/wp-content/uploads/2023/05/Liver-Transplantation.png",
  intro: "The procedure of removing a part/whole of a diseased liver and replacing it with a new functioning liver is called liver transplantation.",
  stats: [{ n: "300+", l: "Transplants/yr" }, { n: "92%", l: "Success Rate" }, { n: "10", l: "Surgeons" }],
  treatments: ["Living Donor Transplant", "Deceased Donor", "Post-transplant Care"],
  conditions: ["Liver Failure", "Cirrhosis", "Hepatitis", "Liver Cancer"],
},
{
  name: "Kidney Transplant", featured: false, tag: "Transplant",
  img: "https://img.freepik.com/premium-photo/kidney-transplant-illustration-depicting-process-anatomy-involved-successful-kidney-transplant-surgery_1057402-10226.jpg?w=1800",
  intro: "A kidney transplant, also known as a renal transplant, is a surgical procedure in which a healthy kidney is placed into a patient with end-stage kidney disease.",
  stats: [{ n: "400+", l: "Transplants/yr" }, { n: "95%", l: "Success Rate" }, { n: "12", l: "Nephrologists" }],
  treatments: ["Kidney Transplant", "Dialysis", "Post-transplant Monitoring"],
  conditions: ["Kidney Failure", "Chronic Kidney Disease", "ESRD"],
},
{
  name: "Heart Transplant", featured: false, tag: "Cardiac",
  img: "https://i.pinimg.com/736x/91/11/33/911133f6a4179ab61e62f53763096c9e.jpg",
  intro: "A heart transplant is a surgical procedure where a diseased or damaged heart is replaced with a healthy donor heart, typically performed when a patient has end-stage heart failure.",
  stats: [{ n: "150+", l: "Transplants/yr" }, { n: "90%", l: "Survival Rate" }, { n: "8", l: "Cardiac Surgeons" }],
  treatments: ["Heart Transplant", "Pre/Post Care", "Cardiac Rehab"],
  conditions: ["Heart Failure", "Cardiomyopathy", "Congenital Heart Disease"],
},
{
  name: "Lung Transplant", featured: false, tag: "Transplant",
  img: "https://i.pinimg.com/736x/a6/2a/5f/a62a5f4f6032112093550b0ad84f40cd.jpg",
  intro: "Introducing our revolutionary lung transplant services, designed to provide renewed hope and a breath of fresh air to individuals battling severe lung diseases.",
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
function SpecialityLink({ spec }) {
    const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  return (
    <button
   

      onClick={() => navigate(`/specialities/${encodeURIComponent(spec.name)}`)}
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
        className="fixed top-28 left-6 z-50 flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xl font-bold transition-all duration-200 hover:scale-105"
        style={{
          background: "",
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
          className="text-lg leading-relaxed mb-14 "
          style={{
            color: "#2E4156",
            borderLeft: "3px solid #567C8D",
            textAlign: "justify",
            paddingLeft: 20,
            fontWeight: 300,
            lineHeight: 1.6,
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

       

      

        
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function MainPage() {
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
              background: "linear-gradient(135deg,#0D3660 0%,#14447C 05%,#1B6B8A 80%)",
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
            World-class care across 30+ medical disciplines
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
    <SpecialityLink spec={spec} />
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

export default function HospitalSpecialities() {
  const { name } = useParams();
  const navigate = useNavigate();

  const selectedSpec = specialities.find(
    (spec) => spec.name === decodeURIComponent(name)
  );

  // 👉 Show detail page
  if (name && selectedSpec) {
    return (
      <DetailPage
        spec={selectedSpec}
        onBack={() => navigate(-1)}
      />
    );
  }

  // 👉 Show list
  return <MainPage />;
}