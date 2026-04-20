import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const REPORTS = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    short: "CBC",
    date: "Apr 15, 2026",
    days: "5 days ago",
    doctor: "Dr. Priya Sharma",
    dept: "Haematology",
    lab: "Lal PathLabs",
    status: "review",
    badgeTxt: "Needs Review",
    icon: "blood",
    note:
      "Haemoglobin found low at 10.2 g/dL indicating mild anaemia. Iron supplementation recommended along with dietary changes. Recheck in 4 weeks.",
    results: [
      { t: "Haemoglobin", v: "10.2 g/dL", r: "13.5–17.5 g/dL", s: "low" },
      { t: "RBC Count", v: "4.1 M/uL", r: "4.5–5.9 M/uL", s: "low" },
      { t: "WBC Count", v: "7200 /uL", r: "4500–11000 /uL", s: "normal" },
      { t: "Platelets", v: "210000 /uL", r: "150000–400000 /uL", s: "normal" },
    ],
    drugs: [
      { name: "Ferrous Sulphate 200mg", dose: "1 tab twice daily", dur: "8 weeks" },
      { name: "Vitamin C 500mg", dose: "1 tab daily", dur: "8 weeks" },
    ],
  },
  {
    id: 2,
    name: "Lipid Profile Panel",
    short: "LPP",
    date: "Mar 05, 2026",
    days: "46 days ago",
    doctor: "Dr. Arjun Kapoor",
    dept: "Cardiology",
    lab: "Apollo Labs",
    status: "normal",
    badgeTxt: "Normal",
    icon: "heart",
    note:
      "All lipid values within acceptable range. Continue current lifestyle. Annual monitoring recommended. Patient advised to maintain low-saturated-fat diet.",
    results: [
      { t: "Total Cholesterol", v: "178 mg/dL", r: "< 200 mg/dL", s: "normal" },
      { t: "LDL Cholesterol", v: "105 mg/dL", r: "< 130 mg/dL", s: "normal" },
      { t: "HDL Cholesterol", v: "52 mg/dL", r: "> 40 mg/dL", s: "normal" },
      { t: "Triglycerides", v: "130 mg/dL", r: "< 150 mg/dL", s: "normal" },
    ],
    drugs: [
      { name: "Rosuvastatin 5mg", dose: "1 tab at night", dur: "3 months" },
    ],
  },
  {
    id: 3,
    name: "Thyroid Panel (TSH, T3, T4)",
    short: "TFT",
    date: "Feb 12, 2026",
    days: "2 months ago",
    doctor: "Dr. Meera Joshi",
    dept: "Endocrinology",
    lab: "SRL Diagnostics",
    status: "critical",
    badgeTxt: "Critical",
    icon: "thyroid",
    note:
      "TSH significantly elevated indicating hypothyroidism. Initiating Levothyroxine therapy. Strict monthly monitoring required. Avoid soy and calcium near dose time.",
    results: [
      { t: "TSH", v: "9.8 mIU/L", r: "0.4–4.0 mIU/L", s: "high" },
      { t: "Free T4", v: "0.6 ng/dL", r: "0.8–1.8 ng/dL", s: "low" },
      { t: "Free T3", v: "2.1 pg/mL", r: "2.3–4.2 pg/mL", s: "low" },
    ],
    drugs: [
      { name: "Levothyroxine 50mcg", dose: "1 tab empty stomach", dur: "Ongoing" },
      { name: "Calcium + Vit D3", dose: "1 tab after lunch", dur: "3 months" },
    ],
  },
  {
    id: 4,
    name: "Liver Function Test (LFT)",
    short: "LFT",
    date: "Jan 28, 2026",
    days: "3 months ago",
    doctor: "Dr. Priya Sharma",
    dept: "Gastroenterology",
    lab: "Metropolis Labs",
    status: "normal",
    badgeTxt: "Normal",
    icon: "liver",
    note:
      "All hepatic enzymes within normal limits. No signs of hepatic stress. Continue avoiding alcohol. Retest in 6 months as routine check-up.",
    results: [
      { t: "ALT (SGPT)", v: "28 U/L", r: "7–56 U/L", s: "normal" },
      { t: "AST (SGOT)", v: "24 U/L", r: "10–40 U/L", s: "normal" },
      { t: "Bilirubin Total", v: "0.9 mg/dL", r: "0.2–1.2 mg/dL", s: "normal" },
      { t: "Albumin", v: "4.1 g/dL", r: "3.5–5.0 g/dL", s: "normal" },
    ],
    drugs: [
      { name: "Silymarin 140mg", dose: "1 tab thrice daily", dur: "6 weeks" },
    ],
  },
  {
    id: 5,
    name: "Blood Glucose (HbA1c + FBS)",
    short: "BG",
    date: "Dec 10, 2025",
    days: "4 months ago",
    doctor: "Dr. Arjun Kapoor",
    dept: "Diabetology",
    lab: "Lal PathLabs",
    status: "review",
    badgeTxt: "Needs Review",
    icon: "glucose",
    note:
      "HbA1c borderline at 6.2%. Pre-diabetic range. Recommend lifestyle modification — low GI diet and 150 min/week exercise. Recheck in 3 months.",
    results: [
      { t: "HbA1c", v: "6.2 %", r: "< 5.7 % normal", s: "high" },
      { t: "Fasting Blood Sugar", v: "108 mg/dL", r: "70–99 mg/dL", s: "high" },
      { t: "Post-Prandial Sugar", v: "142 mg/dL", r: "< 140 mg/dL", s: "high" },
    ],
    drugs: [
      { name: "Metformin 500mg", dose: "1 tab after breakfast", dur: "3 months" },
      { name: "Multivitamin B-Complex", dose: "1 tab daily", dur: "3 months" },
    ],
  },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────
// const iconStyles = {
//   blood: { bg: "from-pink-100 to-pink-200", text: "text-pink-800" },
//   heart: { bg: "from-red-100 to-red-200", text: "text-red-800" },
//   thyroid: { bg: "from-purple-100 to-purple-200", text: "text-purple-800" },
//   liver: { bg: "from-cyan-100 to-cyan-200", text: "text-cyan-900" },
//   glucose: { bg: "from-amber-100 to-amber-200", text: "text-amber-900" },
// };

const iconStyles = {
  blood: {
    bg: "from-[#C8D9E6] to-[#E8F1F5]",
    text: "text-[#2F4156]"
  },
  heart: {
    bg: "from-[#567C8D] to-[#C8D9E6]",
    text: "text-white"
  },
  thyroid: {
    bg: "from-[#E8F1F5] to-[#C8D9E6]",
    text: "text-[#567C8D]"
  },
  liver: {
    bg: "from-[#2F4156] to-[#567C8D]",
    text: "text-white"
  },
  glucose: {
    bg: "from-[#C8D9E6] to-[#FFFFFF]",
    text: "text-[#567C8D]"
  },
};
function ReportIcon({ type, size = "md" }) {
  const s = iconStyles[type] || iconStyles.blood;
  const sz = size === "lg" ? "w-14 h-14 rounded-2xl" : "w-11 h-11 rounded-xl";
  const icSz = size === "lg" ? "w-6 h-6" : "w-5 h-5";
  return (
    <div className={`${sz} bg-gradient-to-br ${s.bg} ${s.text} flex items-center justify-center flex-shrink-0`}>
      {type === "blood" && (
        <svg className={icSz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {type === "heart" && (
        <svg className={icSz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
      {type === "thyroid" && (
        <svg className={icSz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      )}
      {type === "liver" && (
        <svg className={icSz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="12" cy="12" rx="9" ry="7" /><line x1="12" y1="5" x2="12" y2="19" /><line x1="3" y1="12" x2="21" y2="12" />
        </svg>
      )}
      {type === "glucose" && (
        <svg className={icSz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" />
        </svg>
      )}
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
// function StatusBadge({ status, text }) {
//   const cls = {
//     normal: "bg-emerald-50 text-emerald-700 border border-emerald-200",
//     review: "bg-amber-50 text-amber-700 border border-amber-200",
//     critical: "bg-red-50 text-red-700 border border-red-200",
//   };
//   return (
//     <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${cls[status]}`}>
//       {text}
//     </span>
//   );
// }

// ─── RESULT VALUE ─────────────────────────────────────────────────────────────
function ResultValue({ s, v }) {
  const dotCls = { normal: "bg-emerald-500", high: "bg-red-500", low: "bg-amber-500" };
  const textCls = { normal: "text-emerald-700", high: "text-red-700", low: "text-amber-600" };
  return (
    <span className={`font-semibold ${textCls[s]} flex items-center gap-1.5`}>
      <span className={`inline-block w-2 h-2 rounded-full ${dotCls[s]}`} />
      {v}
    </span>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────
function HistoryPage({ onView }) {
  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Header */}
         <span></span>
        <span> . <p>.</p></span>
        <div className="flex items-start justify-between mb-9">
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl font-bold text-slate-900 leading-tight">
              Lab Reports
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 font-light">
              Complete diagnostic history &amp; prescriptions
            </p>
          </div>
          {/* Patient chip */}
          {/* <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm"> */}
          <div className="flex items-center gap-2.5 bg-white/40 backdrop-blur-sm border border-[#C8D9E6] rounded-full px-4 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-slate-700 flex items-center justify-center text-white text-xs font-semibold tracking-wide">
              RM
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 leading-tight">Rahul Mehta</div>
              <div className="text-xs text-slate-400 mt-0.5">KD-20240420</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: "clipboard", label: "Total Reports", val: "5", color: "bg-slate-100 text-slate-600" },
            { icon: "user", label: "Doctors Consulted", val: "4", color: "bg-slate-100 text-slate-600" },
            // { icon: "shield", label: "Need Attention", val: "2", color: "bg-amber-50 text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 px-4 py-4 flex items-center gap-3 shadow-sm">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                {s.icon === "clipboard" && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" />
                  </svg>
                )}
                {s.icon === "user" && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                )}
                {s.icon === "shield" && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-slate-800">{s.val}</div>
                <div className="text-xs text-slate-500 font-light mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Report History</span>
          <div className="flex-1 h-px bg-gradient-to-r from-teal-200/60 to-transparent" />
        </div>

        {/* Report rows */}
        <div className="flex flex-col gap-2.5">
          {REPORTS.map((r) => (
            <div
              key={r.id}
              onClick={() => onView(r)}
              className="group bg-white/75 border border-white/60 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:translate-x-1.5 hover:shadow-xl hover:shadow-slate-200/70 hover:border-teal-500/50 relative overflow-hidden"
            >
              {/* accent bar */}
              {/* <div className={`absolute left-0 top-[12%] bottom-[12%] w-[3px] rounded-r-full transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
                r.status === "critical" ? "bg-red-500" : r.status === "review" ? "bg-amber-500" : "bg-teal-500"
              }`} /> */}
              <div className={`absolute left-0 top-[12%] bottom-[12%] w-[3px] rounded-r-full transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
  r.status === "critical"
    ? "bg-[#2F4156]"     // Navy (strong)
    : r.status === "review"
    ? "bg-[#567C8D]"     // Teal (medium)
    : "bg-[#C8D9E6]"     // Sky blue (soft)
}`} />

              <ReportIcon type={r.icon} />

              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold text-slate-800 leading-snug">
                  {r.name}
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    {r.doctor}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {r.lab}
                  </span>
                  {/* <StatusBadge status={r.status} text={r.badgeTxt} /> */}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium text-slate-700">{r.date}</div>
                <div className="text-xs text-slate-400 mt-0.5">{r.days}</div>
              </div>

              <div className="w-8 h-8 rounded-full border border-teal-200 flex items-center justify-center text-teal-600 flex-shrink-0 transition-all duration-150 group-hover:bg-teal-600 group-hover:text-white group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function DetailPage({ report, onBack }) {
  const handleDownload = () => {
    alert(`Downloading: ${report.name}\n\n(In production, this triggers a PDF export.)`);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Top bar */}
        <span></span>
        <span> . <p>.</p></span>
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-stone-100 transition-all duration-150 hover:scale-95 flex-shrink-0 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex-1">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-slate-900 leading-tight">
              {report.name}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">{report.dept} · {report.date}</p>
          </div>
          {/* <StatusBadge status={report.status} text={report.badgeTxt} /> */}
        </div>

        {/* Main info card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden mb-4">

          {/* Navy header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-7 py-5 flex items-start justify-between">
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white leading-snug">
                {report.name}
              </div>
              <div className="text-sm text-white/50 mt-1">Patient: Rahul Mehta · ID: KD-20240420</div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/90 text-xs px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Verified
            </div>
          </div>

          {/* Meta strip */}
          <div className="bg-stone-50 px-7 py-4 border-b border-slate-100 flex gap-8 flex-wrap">
            {[
              { label: "Doctor", val: report.doctor },
              { label: "Department", val: report.dept },
              { label: "Laboratory", val: report.lab },
              { label: "Date", val: report.date },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-0.5">{m.label}</div>
                <div className="text-sm font-semibold text-slate-800">{m.val}</div>
              </div>
            ))}
          </div>

          {/* Results table */}
          <div className="px-7 py-6">
            <div className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-4">Test Results</div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                    <tr>hii</tr>
                    <tr>hii</tr>
                    <tr>hii</tr>
                    <tr>hii</tr>
                    <tr>hii</tr>
                    
                  {/* <th className="text-left text-xs uppercase tracking-wider text-slate-400 font-medium pb-3 w-2/5">Parameter</th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-400 font-medium pb-3 w-1/4">Value</th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-400 font-medium pb-3">Reference Range</th> */}
                </tr>
              </thead>
              <tbody>
                {/* {report.results.map((rv, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 text-sm text-slate-700">{rv.t}</td>
                    <td className="py-3"><ResultValue s={rv.s} v={rv.v} /></td>
                    <td className="py-3 text-xs text-slate-400">{rv.r}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>

          {/* Clinical notes */}
          <div className="px-7 py-5 border-t border-slate-100">
            <div className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-3">Clinical Notes</div>
            <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-teal-200 pl-4">
              "{report.note}"
            </p>
          </div>
        </div>

        {/* Prescription card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden mb-6">
          <div className="px-7 py-4 border-b border-slate-100 flex items-center justify-between">
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-slate-800">
              Prescription
            </div>
            <div className="flex items-center gap-1.5 bg-teal-50 text-teal-600 border border-teal-200 text-xs px-3 py-1.5 rounded-full font-medium">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Issued
            </div>
          </div>
          <div className="px-7 py-2">
            {report.drugs.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5 border-b border-slate-50 last:border-0">
                <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 text-sm font-semibold text-slate-800">{d.name}</div>
                <div className="text-xs text-slate-500 mr-2">{d.dose}</div>
                <div className="text-xs text-slate-500 bg-stone-100 px-3 py-1 rounded-full">{d.dur}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 shadow-md"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Report
          </button>
          {/* <button className="flex items-center gap-2 border border-teal-300 text-teal-600 hover:bg-teal-50 px-6 py-3 rounded-full text-sm font-medium transition-all duration-150">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button> */}
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function Patientlabreport() {
  const [selected, setSelected] = useState(null);
  return selected
    ? <DetailPage report={selected} onBack={() => setSelected(null)} />
    : <HistoryPage onView={setSelected} />;
}