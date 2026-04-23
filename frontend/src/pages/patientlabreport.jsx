import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

// ─── DATA ───────────────────────────────────────────────────────────────────
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
function HistoryPage({ onView, reports = [] }) {
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
            { 
              icon: "clipboard", 
              label: "Total Reports", 
              val: reports.length.toString(), 
              color: "bg-teal-50 text-teal-600" 
            },
            { 
              icon: "user", 
              label: "Doctors Consulted", 
              val: [...new Set(reports.map(r => r.doctor))].length.toString(), 
              color: "bg-slate-100 text-slate-600" 
            },
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

        {reports.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Latest Report</span>
              <div className="flex-1 h-px bg-gradient-to-r from-teal-200/60 to-transparent" />
            </div>
            <div className="mb-8">
              <div
                onClick={() => onView(reports[0])}
                className="group bg-white border-2 border-teal-100 shadow-md rounded-2xl px-5 py-5 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:translate-x-1.5 hover:shadow-xl hover:border-teal-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-widest uppercase">
                  Latest
                </div>
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-r-full bg-teal-500`} />
                <ReportIcon type={reports[0].icon} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-slate-800 leading-snug">
                    {reports[0].name}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                      <svg className="w-3.5 h-3.5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      {reports[0].doctor}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                      <svg className="w-3.5 h-3.5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {reports[0].lab}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 mr-4">
                  <div className="text-sm font-bold text-slate-800">{reports[0].date}</div>
                  <div className="text-xs text-teal-600 font-medium mt-0.5">{reports[0].days}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0 transition-all duration-150 group-hover:bg-teal-600 group-hover:text-white">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </div>
              </div>
            </div>
          </>
        )}

        {reports.length > 1 && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Previous Reports</span>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
            </div>
            <div className="flex flex-col gap-2.5">
              {reports.slice(1).map((r) => (
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
          </>
        )}
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────────────────────
function DetailPage({ report, onBack }) {
  const reportRef = useRef(null);
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    if (report.appointment_id) {
      axios.get(`http://localhost:5000/api/prescription/appointment/${report.appointment_id}`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            setPrescription(res.data);
          }
        })
        .catch(err => console.error("Error fetching prescription:", err));
    }
  }, [report.appointment_id]);

  const handleDownload = async () => {
    if (report.file_url) {
      window.open(`http://localhost:5000${report.file_url}`, '_blank');
      return;
    }
    
    if (!reportRef.current) return;
    try {
      const node = reportRef.current;
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (node.offsetHeight * pdfWidth) / node.offsetWidth;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${report.name.replace(/\s+/g, "_")}_Report.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-3xl mx-auto px-5 py-10">
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
        </div>

        <div ref={reportRef} className="bg-[#F5F0E8] pb-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden mb-4">
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

          <div className="bg-white">
            <div className="px-7 py-8 border-b border-slate-50">
              <div className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Doctor's Findings & Results
              </div>
              <div className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap bg-stone-50/50 p-6 rounded-2xl border border-stone-100 shadow-inner">
                {report.note || "No specific findings recorded."}
              </div>
            </div>

            {report.file_url && (
              <div className="px-7 py-8 border-b border-slate-50 bg-stone-50/20">
                <div className="text-xs uppercase tracking-widest text-teal-600 font-semibold mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Original Lab Document
                </div>
                {report.file_url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md max-w-full group relative">
                    <img 
                      src={`http://localhost:5000${report.file_url}`} 
                      alt="Lab Report" 
                      className="w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                      onClick={() => window.open(`http://localhost:5000${report.file_url}`, '_blank')}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none flex items-center justify-center">
                       <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Click to Enlarge</span>
                    </div>
                  </div>
                ) : (
                  <a 
                    href={`http://localhost:5000${report.file_url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 text-teal-700 hover:text-teal-900 font-semibold transition-all hover:shadow-md hover:border-teal-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <span>Download Original Report Document</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {prescription && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden mb-6">
            <div className="px-7 py-5 bg-teal-50 border-b border-teal-100 flex items-center justify-between">
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-slate-800">
                Associated Prescription
              </div>
              <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest px-3 py-1 bg-white border border-teal-200 rounded-full">
                Diagnosis: {prescription[0].diagnosis}
              </div>
            </div>
            
            <div className="px-7 py-5">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-3">Medications</div>
              <div className="flex flex-col gap-3">
                {prescription.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{p.medicine}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{p.dosage} · {p.duration}</div>
                    </div>
                  </div>
                ))}
              </div>

              {prescription[0].notes && (
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-2">Doctor's Clinical Notes</div>
                  <div className="text-sm text-slate-600 italic leading-relaxed border-l-2 border-teal-200 pl-4">
                    "{prescription[0].notes}"
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        </div>

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
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.patient_id) {
      axios.get(`http://localhost:5000/api/lab/completed/${user.patient_id}`)
        .then(res => {
          const formatted = res.data.map(r => {
            const testName = r.test_name?.toLowerCase() || "";
            let icon = "blood";
            if (testName.includes("heart") || testName.includes("lipid") || testName.includes("cardio")) icon = "heart";
            if (testName.includes("thyroid")) icon = "thyroid";
            if (testName.includes("liver") || testName.includes("lft")) icon = "liver";
            if (testName.includes("sugar") || testName.includes("glucose") || testName.includes("diabetes")) icon = "glucose";

            const rDate = new Date(r.report_date);
            const now = new Date();
            const diffTime = Math.abs(now - rDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            let daysLabel = diffDays === 0 ? "Today" : diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
            if (diffDays > 30) daysLabel = `${Math.floor(diffDays / 30)} months ago`;

            return {
              id: r.report_id,
              appointment_id: r.appointment_id,
              name: r.test_name || "General Lab Report",
              short: "LAB",
              date: rDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              days: daysLabel,
              doctor: r.doctor_name || "Assigned Doctor",
              dept: r.specialization || "Laboratory",
              lab: r.lab_name || "General Lab",
              status: r.urgency === 'high' ? 'critical' : 'normal',
              badgeTxt: r.urgency === 'high' ? 'Critical' : 'Normal',
              icon: icon,
              note: r.result || "No specific findings recorded.",
              file_url: r.file_url,
              results: [],
              drugs: []
            };
          });
          setReports(formatted);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return selected
    ? <DetailPage report={selected} onBack={() => setSelected(null)} />
    : <HistoryPage onView={setSelected} reports={reports} />;
}