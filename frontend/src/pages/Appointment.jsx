// AppointmentsPage.jsx
// Drop in src/pages/ — handles both the list and the prescription detail view

import { useState, useEffect, useRef } from "react";

import axios from "axios";
// ─── data ────────────────────────────────────────────────────────────────────

// const appointments = [
//   {
//     id: "apt-1",
//     date: { day: "12", month: "Apr", year: "2026" },
//     fullDate: "12 April 2026",
//     time: "10:30 AM",
//     duration: "25 min",
//     doctor: "Dr. Meera Nair",
//     initials: "MN",
//     specialization: "General Medicine",
//     tags: ["Hypertension", "Cholesterol"],
//     prescription: {
//       next: "10 May 2026",
//       diagnosis: { primary: "Hypertension Stage 1", secondary: "Borderline Hypercholesterolemia", dept: "General Medicine", severity: "Mild — Controlled" },
//       summary: { meds: "3 prescribed", labs: "5 ordered" },
//       medicines: [
//         { n: "1", name: "Amlodipine 5mg", detail: "1 tablet · Once daily · Morning before breakfast", badge: "Blood Pressure · CCB", dur: "30 days" },
//         { n: "2", name: "Atorvastatin 10mg", detail: "1 tablet · Once daily · Evening after dinner", badge: "Cholesterol · Statin", dur: "30 days" },
//         { n: "3", name: "Pantoprazole 40mg", detail: "1 tablet · Before meals · As needed", badge: "Acidity · PPI", dur: "14 days" },
//       ],
//       notes: [
//         { src: "Dr. Meera Nair · General Medicine", text: "Reduce sodium intake significantly. Daily 30-min brisk walk recommended. Monitor BP twice daily and maintain log for next visit." },
//         { src: "Lifestyle advisory", text: "Avoid alcohol and smoking. Increase leafy greens and omega-3 foods. Ensure 7–8 hours of sleep nightly." },
//       ],
//       labs: [
//         { name: "Complete Blood Count (CBC)", date: "12 Apr 2026", done: true },
//         { name: "Lipid Profile", date: "28 Mar 2026", done: true },
//         { name: "HbA1c — Diabetes Screening", date: "10 Mar 2026", done: true },
//         { name: "Echocardiogram", date: "Due in 2 weeks", done: false },
//         { name: "Urine Routine & Microscopy", date: "Due in 1 week", done: false },
//       ],
//       allergies: [{ name: "Penicillin", note: "Severe reaction" }, { name: "Aspirin (high dose)", note: "GI sensitivity" }],
//       sig: { name: "Dr. Meera Nair", reg: "MBBS, MD · Reg. No. MH-24816", rxnum: "RX-2026-04811", valid: "Valid until 10 May 2026" },
//     },
//   },
//   {
//     id: "apt-2",
//     date: { day: "01", month: "Mar", year: "2026" },
//     fullDate: "01 March 2026",
//     time: "09:00 AM",
//     duration: "20 min",
//     doctor: "Dr. Rajan Iyer",
//     initials: "RI",
//     specialization: "Cardiology",
//     tags: ["BP Review", "ECG"],
//     prescription: {
//       next: "15 Apr 2026",
//       diagnosis: { primary: "Hypertension — BP Review", secondary: "Sinus Bradycardia (mild)", dept: "Cardiology", severity: "Stable" },
//       summary: { meds: "2 prescribed", labs: "3 ordered" },
//       medicines: [
//         { n: "1", name: "Metoprolol 25mg", detail: "1 tablet · Twice daily · With meals", badge: "Heart Rate · Beta Blocker", dur: "30 days" },
//         { n: "2", name: "Aspirin 75mg", detail: "1 tablet · Once daily · After breakfast", badge: "Blood Thinner", dur: "60 days" },
//       ],
//       notes: [{ src: "Dr. Rajan Iyer · Cardiology", text: "ECG reviewed — mild bradycardia noted, no intervention required. Continue BP medications. Avoid strenuous exercise until next review." }],
//       labs: [
//         { name: "12-lead ECG", date: "01 Mar 2026", done: true },
//         { name: "Echocardiogram", date: "Due in 3 weeks", done: false },
//         { name: "Troponin I Test", date: "01 Mar 2026", done: true },
//       ],
//       allergies: [{ name: "Penicillin", note: "Severe reaction" }],
//       sig: { name: "Dr. Rajan Iyer", reg: "MBBS, MD (Cardiology) · Reg. No. MH-31244", rxnum: "RX-2026-03101", valid: "Valid until 15 Apr 2026" },
//     },
//   },
//   {
//     id: "apt-3",
//     date: { day: "18", month: "Jan", year: "2026" },
//     fullDate: "18 January 2026",
//     time: "11:15 AM",
//     duration: "30 min",
//     doctor: "Dr. Priya Menon",
//     initials: "PM",
//     specialization: "Endocrinology",
//     tags: ["Diabetes Screen", "HbA1c"],
//     prescription: {
//       next: "20 Mar 2026",
//       diagnosis: { primary: "Pre-diabetic (IFG)", secondary: "Vitamin D Deficiency", dept: "Endocrinology", severity: "Borderline" },
//       summary: { meds: "2 prescribed", labs: "3 ordered" },
//       medicines: [
//         { n: "1", name: "Metformin 500mg", detail: "1 tablet · Once daily · With dinner", badge: "Blood Sugar · Biguanide", dur: "90 days" },
//         { n: "2", name: "Vitamin D3 60,000 IU", detail: "1 sachet weekly · With milk", badge: "Supplement", dur: "8 weeks" },
//       ],
//       notes: [{ src: "Dr. Priya Menon · Endocrinology", text: "Fasting glucose borderline at 108 mg/dL. Starting low-dose Metformin as preventive. HbA1c to be repeated in 3 months. Reduce refined carbs and sugars." }],
//       labs: [
//         { name: "HbA1c", date: "18 Jan 2026", done: true },
//         { name: "Fasting Glucose", date: "18 Jan 2026", done: true },
//         { name: "Vitamin D (25-OH)", date: "18 Jan 2026", done: true },
//       ],
//       allergies: [{ name: "Penicillin", note: "Severe reaction" }],
//       sig: { name: "Dr. Priya Menon", reg: "MBBS, MD (Endocrinology) · Reg. No. MH-18900", rxnum: "RX-2026-01182", valid: "Valid until 20 Mar 2026" },
//     },
//   },
// ];

// ─── helpers ──────────────────────────────────────────────────────────────────

function SectionRule({ num, label }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-4">
      <span className="text-[11px] text-[#567C8D] italic flex-shrink-0" style={{ fontFamily: "Playfair Display, serif" }}>{num}</span>
      <div className="flex-1 h-px bg-[#DDD8CF]" />
      <span className="text-[13px] text-[#2E4156] flex-shrink-0" style={{ fontFamily: "Playfair Display, serif" }}>{label}</span>
    </div>
  );
}

function FadeUp({ delay = 0, children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity .45s ease, transform .45s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

// ─── Prescription Detail ──────────────────────────────────────────────────────

function PrescriptionDetail({ apt, onBack }) {
    
  const rx = apt.prescription || {};
  console.log("APT:", apt);
console.log("RX:", rx);
  return (
    <div className="bg-[#F5EFE8] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* topbar */}
      <div className="bg-[#2E4156] flex items-center justify-between px-6 py-3.5">
        <button onClick={onBack} className="flex items-center gap-2 text-[#CBD9E6] text-[13px] bg-transparent border-none cursor-pointer">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="#CBD9E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to appointments
        </button>
        <span className="text-[10px] text-[#8A9AAA] tracking-widest uppercase">Prescription</span>
      </div>

      {/* hero */}
      <div className="bg-[#2E4156] px-6 pt-7 pb-14 relative overflow-hidden">
        <div className="absolute rounded-full border border-[#CBD9E6]/10 pointer-events-none" style={{ width: 200, height: 200, top: -50, right: -50 }} />
        <p className="text-[10px] text-[#8A9AAA] tracking-[2px] uppercase mb-2">Prescription · {apt.fullDate}</p>
        <h1 className="text-[24px] text-[#F5EFE8] mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}>Arjun Sharma</h1>
        <p className="text-[12px] text-[#8A9AAA] mb-4">Patient ID: #P-20481 · Age 34 · Blood Group B+</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#567C8D] flex items-center justify-center text-[12px] text-[#CBD9E6] font-medium flex-shrink-0">{apt.initials}</div>
          <div>
            <div className="text-[13px] text-[#F5EFE8] font-medium">{apt.doctor}</div>
            <div className="text-[11px] text-[#8A9AAA]">{apt.specialization}</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-[#567C8D] text-[#F5EFE8] text-[10px] px-3 py-1.5 rounded-sm">{apt.time} · {apt.duration}</span>
          <span className="border border-[#CBD9E6]/20 text-[#CBD9E6] text-[10px] px-3 py-1.5 rounded-sm">{apt.specialization}</span>
          <span className="border border-[#CBD9E6]/20 text-[#CBD9E6] text-[10px] px-3 py-1.5 rounded-sm">Next: {rx.next || "N/A"}</span>
        </div>
      </div>

      {/* body */}
      <div className="px-5 -mt-7 relative z-10 pb-10">

        {/* summary strip */}
        <FadeUp delay={60}>
          <div className="flex gap-px bg-[#DDD8CF] mb-7">
            {[
  ["Diagnosis", rx.diagnosis?.primary || "N/A"],
  ["Medicines", rx.summary?.meds || "N/A"],
  ["Lab reports", rx.summary?.labs || "N/A"]
].map(([lbl, val], i) => (
              <div key={i} className="bg-white flex-1 px-4 py-3.5">
                <div className="text-[9px] text-[#8A9AAA] uppercase tracking-[.7px] mb-1">{lbl}</div>
                <div className="text-[13px] text-[#2E4156] font-medium">{val}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* 01 diagnosis */}
        <FadeUp delay={130}>
          <SectionRule num="01" label="Diagnosis" />
          <div className="grid grid-cols-2 gap-px bg-[#DDD8CF]">
            {[
  { lbl: "Condition", val: rx.diagnosis?.primary || "N/A", pill: "Under monitoring", pillCls: "bg-[#FAEEDA] text-[#854F0B]" }
].map((d) => (
              <div key={d.lbl || Math.random()} className="bg-[#F5EFE8] px-4 py-3.5">
                <div className="text-[9px] text-[#8A9AAA] uppercase tracking-[.7px] mb-1.5">{d.lbl}</div>
                <div className="text-[13px] text-[#2E4156] font-medium leading-snug mb-1.5">{d.val}</div>
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-sm font-medium ${d.pillCls}`}>{d.pill}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* 02 medicines */}
        <FadeUp delay={200}>
          <SectionRule num="02" label="Medicines prescribed" />
          <div className="divide-y divide-[#DDD8CF] border-t border-[#DDD8CF]">
            {rx.medicines?.map((m) => (
              <div key={m.n} className="grid gap-2.5 py-3.5" style={{ gridTemplateColumns: "28px 1fr auto" }}>
                <span className="text-[18px] text-[#DDD8CF] leading-none mt-1" style={{ fontFamily: "Playfair Display, serif" }}>{m.n}</span>
                <div>
                  <div className="text-[13px] text-[#2E4156] font-medium mb-0.5">{m.name}</div>
                  <div className="text-[11px] text-[#567C8D] leading-relaxed mb-1.5">{m.detail}</div>
                  <span className="text-[10px] px-2 py-0.5 bg-[#EDE7DE] text-[#2E4156] rounded-sm">{m.badge}</span>
                </div>
                <div className="text-[11px] text-[#8A9AAA] text-right pt-1 whitespace-nowrap">{m.dur}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* 03 notes */}
        <FadeUp delay={270}>
          <SectionRule num="03" label="Doctor notes" />
          <div className="bg-[#2E4156] px-5 py-5 space-y-4">
            {rx.notes?.map((n, i) => (
              <div key={i} className={`flex gap-3.5 ${i > 0 ? "border-t border-[#CBD9E6]/10 pt-4" : ""}`}>
                <div className="w-0.5 bg-[#567C8D] rounded-sm flex-shrink-0 self-stretch mt-1" />
                <div>
                  <div className="text-[10px] text-[#567C8D] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">{n.src}</div>
                  <div className="text-[12px] text-[#CBD9E6] leading-[1.7]">{n.text}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* 04 labs */}
        <FadeUp delay={340}>
          <SectionRule num="04" label="Lab reports" />
          <div className="divide-y divide-[#DDD8CF] border-t border-[#DDD8CF]">
            {rx.labs?.map((l) => (
              <div key={l.name} className="flex items-center gap-2.5 py-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: l.done ? "#085041" : "#854F0B" }} />
                <span className="flex-1 text-[13px] text-[#2E4156] font-medium">{l.name}</span>
                <span className="flex-1 text-[11px] text-[#8A9AAA] text-right mr-3">{l.date}</span>
                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-sm flex-shrink-0 ${l.done ? "bg-[#E1F5EE] text-[#085041]" : "bg-[#FAEEDA] text-[#854F0B]"}`}>
                  {l.done ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
          {/* allergies */}
          {/* <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-[#DDD8CF]" />
              <span className="text-[10px] text-[#A32D2D] uppercase tracking-[.8px] whitespace-nowrap">Allergies on record</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {rx.allergies.map((a) => (
                <div key={a.name} className="flex items-center gap-2 bg-white border border-[#F0C8C8] px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A32D2D] flex-shrink-0" />
                  <span className="text-[11px] text-[#791F1F] font-medium">{a.name}</span>
                  <span className="text-[10px] text-[#A32D2D] ml-1">{a.note}</span>
                </div>
              ))}
            </div>
          </div> */}
        </FadeUp>

        {/* signature */}
        <FadeUp delay={410}>
          <div className="flex items-end justify-between border-t border-[#DDD8CF] pt-5 mt-6">
            <div>
              <div className="text-[9px] text-[#8A9AAA] uppercase tracking-[.7px] mb-1.5">Issued &amp; signed by</div>
              <div className="text-[20px] text-[#2E4156] italic" style={{ fontFamily: "Playfair Display, serif" }}>{rx.sig?.name || "N/A"}</div>
              <div className="text-[10px] text-[#567C8D] mt-1">{rx.sig?.reg || "N/A"}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-[#8A9AAA] uppercase tracking-[.7px] mb-1">Prescription no.</div>
              <div className="text-[13px] text-[#2E4156]" style={{ fontFamily: "Playfair Display, serif" }}>{rx.sig?.rxnum || "N/A"}</div>
              <div className="text-[10px] text-[#8A9AAA] mt-0.5">{rx.sig?.valid || "N/A"}</div>
            </div>
          </div>
        </FadeUp>
      </div>

      <p className="text-center text-[10px] text-[#A0998D] tracking-wide pb-6">
        Healthcare Pro · Confidential Medical Record · Not valid without doctor's seal
      </p>
    </div>
  );
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({ apt, delay, onView }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    const t = setTimeout(() => {
      el.style.transition = "opacity .45s ease, transform .45s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div ref={ref} className="relative pl-6 pb-7 last:pb-0">
      {/* dot */}
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#567C8D] flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-[#567C8D]" />
      </div>
      {/* row */}
      <div className="flex items-start gap-3 border-b border-[#DDD8CF] pb-6 last:border-b-0">
        {/* date */}
        <div className="flex-shrink-0 text-center min-w-[48px]">
          <div className="text-[9px] text-[#8A9AAA] uppercase tracking-[.8px]">{apt.date.month}</div>
          <div className="text-[22px] text-[#2E4156] leading-none" style={{ fontFamily: "Playfair Display, serif" }}>{apt.date.day}</div>
          <div className="text-[10px] text-[#8A9AAA]">{apt.date.year}</div>
        </div>
        {/* vline */}
        <div className="w-px self-stretch bg-[#DDD8CF] mx-1.5" />
        {/* info */}
        <div className="flex-1">
          <div className="text-[10px] text-[#567C8D] uppercase tracking-[.5px] mb-1.5">{apt.time} &nbsp;·&nbsp; {apt.duration}</div>
          <div className="text-[14px] text-[#2E4156] font-medium mb-0.5">{apt.doctor}</div>
          <div className="text-[12px] text-[#8A9AAA]">{apt.specialization}</div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {Array.isArray(apt.tags) && apt.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 bg-[#EDE7DE] text-[#567C8D] rounded-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
        {/* button */}
        <button
          onClick={() => {
  if (!apt.prescription) {
    alert("No prescription available yet");
    return;
  }
  onView(apt);
}}
          className="flex-shrink-0 bg-[#2E4156] hover:bg-[#567C8D] text-[#CBD9E6] text-[11px] font-medium px-3.5 py-2 rounded-sm border-none cursor-pointer transition-colors duration-200"
        >
          Prescription
        </button>
      </div>
    </div>
  );
}

// ─── Year group ───────────────────────────────────────────────────────────────

function YearGroup({ year, items, baseDelay, onView }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] text-[#8A9AAA] tracking-[1.5px] uppercase">{year}</span>
        <div className="flex-1 h-px bg-[#DDD8CF]" />
      </div>
      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#DDD8CF]" />
        {Array.isArray(items) && items.map((apt, i) => (
          <TimelineItem key={apt.id || i} apt={apt} delay={baseDelay + i * 80} onView={onView} />
        ))}
      </div>
    </div>
  );
}

// ─── Appointments List ────────────────────────────────────────────────────────

function AppointmentsList({ onView, appointments }) {
  const grouped = {
  "2026": Array.isArray(appointments) ? appointments : [],
};

  return (
    <div className="bg-[#F5EFE8] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* topbar */}
      <div className="bg-[#2E4156] flex items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-full border border-[#567C8D] flex items-center justify-center text-[13px] text-[#CBD9E6] italic" style={{ fontFamily: "Playfair Display, serif" }}>Rx</div>
          <span className="text-[14px] text-[#CBD9E6]" style={{ fontFamily: "Playfair Display, serif" }}>Healthcare Pro</span>
        </div>
        <span className="text-[10px] text-[#8A9AAA] tracking-widest uppercase">Patient Portal</span>
      </div>

      {/* header */}
      <div className="bg-[#2E4156] px-6 pt-8 pb-6">
        <p className="text-[10px] text-[#8A9AAA] tracking-[2px] uppercase mb-2">Arjun Sharma · #P-20481</p>
        <h1 className="text-[26px] text-[#F5EFE8] mb-1" style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}>Appointment History</h1>
        <p className="text-[12px] text-[#8A9AAA]">All completed consultations</p>
      </div>

      <div className="px-5 pt-5 pb-10">
        {/* stats */}
        <FadeUp delay={60}>
          <div className="flex gap-px bg-[#DDD8CF] mb-7">
            {[["Total visits", "6"], ["Doctors seen", "4"], ["Departments", "3"]].map(([l, v], i) => (
              <div key={i} className="bg-white flex-1 px-4 py-3.5">
                <div className="text-[9px] text-[#8A9AAA] uppercase tracking-[.7px] mb-1">{l}</div>
                <div className="text-[18px] text-[#2E4156]" style={{ fontFamily: "Playfair Display, serif" }}>{v}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {Object.entries(grouped).map(([year, apts], gi) => (
          <YearGroup key={year} year={year} items={apts} baseDelay={120 + gi * 40} onView={onView} />
        ))}
      </div>

      <p className="text-center text-[10px] text-[#A0998D] tracking-wide pb-6">
        Healthcare Pro · Patient Portal · All records are confidential
      </p>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [selected, setSelected] = useState(null);
  const [appointments, setAppointments] = useState([]);
   useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.patient_id) {
    console.log("No patient found");
    return;
  }

  axios
    .get(`http://localhost:5000/api/appointment/patient/${user.patient_id}`)
    .then((res) => {
      console.log("API DATA:", res.data); // 🔥 DEBUG

      if (!Array.isArray(res.data)) {
        setAppointments([]);
        return;
      }

      const formatted = res.data.map((a) => ({
        id: a.appointment_id,
        date: {
          day: new Date(a.appointment_date).getDate(),
          month: new Date(a.appointment_date).toLocaleString("default", { month: "short" }),
          year: new Date(a.appointment_date).getFullYear(),
        },
        fullDate: new Date(a.appointment_date).toDateString(),
        time: a.appointment_time,
        duration: "20 min",
        doctor: a.doctor_name,
        initials: a.doctor_name?.[0] || "D",
        specialization: a.specialization || "General",
        tags: ["Consultation"],

        // 🔥 IMPORTANT
        prescription: a.prescription || null,
      }));

      setAppointments(formatted);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      setAppointments([]);
    });
}, []);

  if (selected) {
    return <PrescriptionDetail apt={selected} onBack={() => setSelected(null)} />;
  }
 return (
  <AppointmentsList
    appointments={appointments}
    onView={(apt) => setSelected(apt)}
  />
);
}