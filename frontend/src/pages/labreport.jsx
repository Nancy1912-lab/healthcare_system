import { useState, useRef } from "react";

const REPORTS = [
  {
    id: 1, name: "Complete Blood Count (CBC)", date: "Apr 18, 2026", days: "2 days ago",
    doctor: "Dr. Priya Sharma", dept: "Haematology", lab: "City Diagnostics",
    status: "review", bar: "#C84B00",
    iconBg: "from-pink-50 to-pink-100", iconColor: "text-pink-900",
    results: [
      { t: "Haemoglobin", v: "10.2 g/dL", r: "12–16 g/dL", s: "low" },
      { t: "WBC Count", v: "7,200 /μL", r: "4,500–11,000 /μL", s: "normal" },
      { t: "Platelet Count", v: "2.4 L /μL", r: "1.5–4.0 L /μL", s: "normal" },
      { t: "RBC Count", v: "3.8 M/μL", r: "4.2–5.4 M/μL", s: "low" },
    ],
    note: "Haemoglobin slightly below normal range. Recommending iron supplementation and dietary adjustments. Follow-up in 4 weeks to recheck levels.",
  },
  {
    id: 2, name: "Lipid Profile Panel", date: "Mar 05, 2026", days: "46 days ago",
    doctor: "Dr. Arjun Kapoor", dept: "Cardiology", lab: "Apollo Labs",
    status: "normal", bar: "#0F6E56",
    iconBg: "from-red-50 to-red-100", iconColor: "text-red-900",
    results: [
      { t: "Total Cholesterol", v: "178 mg/dL", r: "< 200 mg/dL", s: "normal" },
      { t: "LDL Cholesterol", v: "105 mg/dL", r: "< 130 mg/dL", s: "normal" },
      { t: "HDL Cholesterol", v: "52 mg/dL", r: "> 40 mg/dL", s: "normal" },
      { t: "Triglycerides", v: "130 mg/dL", r: "< 150 mg/dL", s: "normal" },
    ],
    note: "All lipid values within acceptable range. Continue current lifestyle. Annual monitoring recommended.",
  },
  {
    id: 3, name: "Thyroid Panel (TSH, T3, T4)", date: "Feb 12, 2026", days: "2 months ago",
    doctor: "Dr. Meera Joshi", dept: "Endocrinology", lab: "SRL Diagnostics",
    status: "critical", bar: "#9B1C1C",
    iconBg: "from-purple-50 to-purple-100", iconColor: "text-purple-900",
    results: [
      { t: "TSH", v: "9.8 mIU/L", r: "0.4–4.0 mIU/L", s: "high" },
      { t: "Free T4", v: "0.6 ng/dL", r: "0.8–1.8 ng/dL", s: "low" },
      { t: "Free T3", v: "2.1 pg/mL", r: "2.3–4.2 pg/mL", s: "low" },
    ],
    note: "TSH significantly elevated indicating hypothyroidism. Initiating Levothyroxine therapy. Strict monthly monitoring required.",
  },
  {
    id: 4, name: "Liver Function Test (LFT)", date: "Jan 28, 2026", days: "3 months ago",
    doctor: "Dr. Priya Sharma", dept: "Gastroenterology", lab: "Metropolis Labs",
    status: "normal", bar: "#0F6E56",
    iconBg: "from-cyan-50 to-cyan-100", iconColor: "text-cyan-900",
    results: [
      { t: "ALT (SGPT)", v: "28 U/L", r: "7–56 U/L", s: "normal" },
      { t: "AST (SGOT)", v: "24 U/L", r: "10–40 U/L", s: "normal" },
      { t: "Bilirubin Total", v: "0.9 mg/dL", r: "0.2–1.2 mg/dL", s: "normal" },
      { t: "Albumin", v: "4.1 g/dL", r: "3.5–5.0 g/dL", s: "normal" },
    ],
    note: "All hepatic enzymes within normal limits. No signs of hepatic stress. Retest in 6 months.",
  },
  {
    id: 5, name: "Blood Glucose (HbA1c + FBS)", date: "Dec 10, 2025", days: "4 months ago",
    doctor: "Dr. Arjun Kapoor", dept: "Diabetology", lab: "Lal PathLabs",
    status: "review", bar: "#8B5E08",
    iconBg: "from-amber-50 to-amber-100", iconColor: "text-amber-900",
    results: [
      { t: "HbA1c", v: "6.2 %", r: "< 5.7 % normal", s: "high" },
      { t: "Fasting Blood Sugar", v: "108 mg/dL", r: "70–99 mg/dL", s: "high" },
      { t: "Post-Prandial Sugar", v: "142 mg/dL", r: "< 140 mg/dL", s: "normal" },
    ],
    note: "HbA1c borderline at 6.2%. Pre-diabetic range. Recommend lifestyle modification. Recheck in 3 months.",
  },
];

// ✅ CHANGE 1: Full dropdown options list
const LAB_REPORT_OPTIONS = [
  "Blood Test",
  "Complete Blood Count (CBC)",
  "Blood Sugar Test",
  "Lipid Profile",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Thyroid Test (TSH)",
  "Urine Test",
  "ECG",
  "2D Echo",
  "X-Ray",
  "MRI Scan",
  "CT Scan",
  "Ultrasound",
  "Covid-19 Test",
  "Dengue Test",
  "Malaria Test",
  "Vitamin D Test",
  "Pregnancy Test",
  "Beta hCG Test",
];

const resultColor = { normal: "text-green-700", high: "text-red-700", low: "text-blue-700" };
const dotColor = { normal: "bg-green-600", high: "bg-red-600", low: "bg-blue-600" };

function ReportModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(13,43,69,0.45)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#FAF8F4]/97 border border-white/60 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between p-7 pb-0">
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-2xl font-bold text-[#0D2B45] leading-tight">{report.name}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-[#0D2B45]/10 flex items-center justify-center text-[#456070] hover:bg-[#f0ebe3] transition-colors ml-4 flex-shrink-0">✕</button>
        </div>
        <div className="px-7 pb-7 pt-4">
          <div className="flex flex-wrap gap-2 mb-5">
            {[report.doctor, report.date, report.lab, report.dept].map((m) => (
              <span key={m} className="inline-flex items-center gap-1 bg-white/70 border border-[#0D2B45]/[0.09] rounded-full px-3 py-1 text-xs text-[#456070]">{m}</span>
            ))}
          </div>
          <table className="w-full mb-5 text-sm">
            <thead>
              <tr className="border-b border-[#0D2B45]/[0.07]">
                <th className="text-left py-2 px-3 text-[0.68rem] uppercase tracking-widest text-[#7A99A8] font-medium">Test</th>
                <th className="text-left py-2 px-3 text-[0.68rem] uppercase tracking-widest text-[#7A99A8] font-medium">Result</th>
                <th className="text-left py-2 px-3 text-[0.68rem] uppercase tracking-widest text-[#7A99A8] font-medium">Reference</th>
              </tr>
            </thead>
            <tbody>
              {report.results.map((rv) => (
                <tr key={rv.t} className="border-b border-[#0D2B45]/[0.05] last:border-0">
                  <td className="py-2.5 px-3 text-[#0D2B45]">{rv.t}</td>
                  <td className={`py-2.5 px-3 font-medium ${resultColor[rv.s]}`}>
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${dotColor[rv.s]}`} />{rv.v}
                  </td>
                  <td className="py-2.5 px-3 text-[#7A99A8] text-xs">{rv.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-l-[3px] border-[#1D7A8A] rounded-r-xl bg-white/60 px-4 py-3 text-sm text-[#456070] italic leading-relaxed mb-5">
            "{report.note}"
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#0D2B45] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1A3F5C] transition-colors">
              Download PDF
            </button>
            <button onClick={onClose} className="text-[#1D7A8A] border border-[#1D7A8A]/30 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#E4F4F7] transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DrugRow({ num }) {
  return (
    <div className="flex items-center gap-3 bg-white/55 border border-[#0D2B45]/[0.07] rounded-2xl px-4 py-3 mb-2.5">
      <div className="w-6 h-6 rounded-full bg-[#E4F4F7] text-[#1D7A8A] text-xs font-medium flex items-center justify-center flex-shrink-0">{num}</div>
      <div className="grid grid-cols-3 gap-2 flex-1">
        <input className="border-0 border-b border-[#0D2B45]/[0.12] bg-transparent text-sm text-[#0D2B45] placeholder-[#7A99A8] outline-none py-1 focus:border-[#1D7A8A] transition-colors" placeholder="Medicine name" />
        <input className="border-0 border-b border-[#0D2B45]/[0.12] bg-transparent text-sm text-[#0D2B45] placeholder-[#7A99A8] outline-none py-1 focus:border-[#1D7A8A] transition-colors" placeholder="Dosage" />
        <input className="border-0 border-b border-[#0D2B45]/[0.12] bg-transparent text-sm text-[#0D2B45] placeholder-[#7A99A8] outline-none py-1 focus:border-[#1D7A8A] transition-colors" placeholder="Duration" />
      </div>
    </div>
  );
}

export default function LabReportsPage() {
  const [selected, setSelected] = useState(null);
  const [drugRows, setDrugRows] = useState([1, 2]);
  const [uploadedFile, setUploadedFile] = useState(null); // ✅ CHANGE 2: upload state

  // ✅ CHANGE 2: shared ref so both buttons trigger the same input
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] font-['DM_Sans'] pb-16">
      <div className="max-w-4xl mx-auto px-6 pt-10">

        {/* TOP BAR */}
        <span>.<p>.</p></span>
        <span></span>
        <div className="flex items-center justify-between mb-11">
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-[2rem] font-bold text-[#0D2B45] leading-tight">Lab Reports</h1>
            <p className="text-[#456070] text-sm mt-0.5 font-light">Your complete medical report history</p>
          </div>
          {/* ✅ CHANGE 2: Top bar upload button triggers file input */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[#0D2B45] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1A3F5C] transition-all hover:-translate-y-0.5"
          >
            ↑ Upload Report
          </button>
        </div>

        {/* PRESCRIPTION SECTION */}
        <SectionLabel>Enter Prescription</SectionLabel>
        <div className="relative bg-white/62 backdrop-blur-sm border border-white/45 rounded-[22px] p-7 mb-10 overflow-hidden">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-xl font-bold text-[#0D2B45]">New Prescription</h2>
              <p className="text-xs text-[#456070] font-light mt-0.5">Based on lab findings — fill details below</p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#E4F4F7] text-[#1D7A8A] text-[0.68rem] font-medium px-3 py-1.5 rounded-full border border-[#1D7A8A]/20">🛡 Verified</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {[["Patient Name","Rahul Mehta"],["Patient ID","KD-20240420"],["Date",""]].map(([lbl, ph]) => (
              <div key={lbl}>
                <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">{lbl}</div>
                <input type={lbl==="Date"?"date":"text"} defaultValue={lbl==="Date"?"2026-04-20":""} placeholder={ph}
                  className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors placeholder-[#7A99A8]" />
              </div>
            ))}

            {/* ✅ CHANGE 1: Linked Lab Report dropdown with all options */}
            <div className="col-span-2">
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">Linked Lab Report Name</div>
              <select className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors">
                <option value="" disabled>Select report type...</option>
                {LAB_REPORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">Clinical Notes</div>
              <textarea rows={2} placeholder="Haemoglobin low, advise iron supplementation..."
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors placeholder-[#7A99A8] resize-none" />
            </div>
          </div>

          <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-2.5">Medications</div>
          {drugRows.map((n) => <DrugRow key={n} num={n} />)}
          <button onClick={() => setDrugRows(p => [...p, p.length + 1])}
            className="flex items-center gap-1.5 text-[#1D7A8A] border border-dashed border-[#1D7A8A]/35 text-xs px-4 py-2 rounded-xl hover:bg-[#E4F4F7] transition-colors mb-5">
            + Add medication
          </button>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#0D2B45] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1A3F5C] transition-all hover:-translate-y-0.5">
              💾 Save Prescription
            </button>
            <button className="text-[#1D7A8A] border border-[#1D7A8A]/30 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#E4F4F7] transition-colors">
              Preview PDF
            </button>
          </div>
        </div>

        {/* UPLOAD ZONE */}
        <SectionLabel>Upload New Report</SectionLabel>

        {/* ✅ CHANGE 2: Shared hidden file input used by both buttons */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          onChange={handleFileChange}
        />

        <label
          className="block border-2 border-dashed border-[#1D7A8A]/28 rounded-[22px] p-10 text-center bg-white/45 backdrop-blur-sm hover:border-[#1D7A8A] hover:bg-white/60 transition-all cursor-pointer"
          onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
        >
          <div className="w-14 h-14 bg-[#E4F4F7] rounded-[18px] flex items-center justify-center mx-auto mb-4 text-2xl">↑</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif" }} className="text-xl font-bold text-[#0D2B45] mb-1.5">Drop your report here</h3>

          {/* ✅ CHANGE 2: Show uploaded filename or default text */}
          {uploadedFile ? (
            <p className="text-sm text-[#1D7A8A] font-medium">
              ✓ {uploadedFile.name}
              <span className="block text-xs text-[#456070] font-light mt-1">
                {(uploadedFile.size / 1024).toFixed(1)} KB — click to replace
              </span>
            </p>
          ) : (
            <p className="text-sm text-[#456070] font-light leading-relaxed">
              Drag & drop a file, or <span className="text-[#1D7A8A] font-medium">browse to upload</span><br />
              Supports scanned reports, lab PDFs, and images
            </p>
          )}

          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {["PDF","JPG","PNG","DOCX","DICOM"].map(f=>(
              <span key={f} className="bg-white/70 border border-[#0D2B45]/10 rounded-md px-2.5 py-0.5 text-xs text-[#456070]">{f}</span>
            ))}
          </div>
        </label>

      </div>

      {selected && <ReportModal report={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.12em] uppercase text-[#1D7A8A] mb-3.5">
      {children}
      <div className="flex-1 h-px bg-gradient-to-r from-[#1D7A8A]/25 to-transparent" />
    </div>
  );
}