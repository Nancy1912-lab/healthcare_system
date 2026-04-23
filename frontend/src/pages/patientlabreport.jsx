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
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#567C8D] to-[#2F4156] flex items-center justify-center text-white text-xs font-semibold tracking-wide uppercase">
              {JSON.parse(localStorage.getItem("user"))?.name?.substring(0, 2) || "PT"}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 leading-tight capitalize">
                {JSON.parse(localStorage.getItem("user"))?.name || "Patient"}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 uppercase">
                P-{JSON.parse(localStorage.getItem("user"))?.patient_id || "ID"}
              </div>
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
  const [prescription, setPrescription] = useState([]);

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

  const downloadOriginal = async (url) => {
    try {
      const response = await fetch(`http://localhost:5000${url}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = url.split("/").pop() || "report-file";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download failed", err);
      window.open(`http://localhost:5000${url}`, "_blank");
    }
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;
    try {
      const node = reportRef.current;
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (node.offsetHeight * pdfWidth) / node.offsetWidth;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`LR-${report.id}_Report.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF: " + (err.message || JSON.stringify(err)));
    }
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const patientName = user.name || "Unknown Patient";
  const patientIdStr = user.patient_id ? `P-${user.patient_id}` : "Unknown ID";

  return (
    <div className="min-h-screen font-sans bg-[#F5F0E8] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-[816px] mb-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
        <div className="flex gap-3">
           {report.file_url && (
              <button
                onClick={() => downloadOriginal(report.file_url)}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Original File
              </button>
           )}
           <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
        </div>
      </div>

      {/* PAPER SHEET */}
      <div ref={reportRef} className="bg-white p-14 shadow-lg mx-auto" style={{ minHeight: "1056px", width: "816px" }}>
        
        {/* HEADER ROW */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-3">
              HEALTHCARE SYSTEM — LAB REPORT
            </div>
            <h1 className="text-4xl font-bold text-slate-600 font-serif mb-2">
              Lab Report
            </h1>
            <div className="text-xs text-slate-400 font-medium tracking-wide">
              Report ID: #LR-{report.id} • Date: {report.date}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-300 tracking-[0.1em] uppercase mb-1">
              STATUS
            </div>
            <div className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1">
              ✓ Completed
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 my-6" />

        {/* 3 COLUMNS */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <div className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase mb-2">PATIENT INFORMATION</div>
            <div className="text-lg font-bold text-slate-800 capitalize">{patientName}</div>
            <div className="text-xs font-semibold text-slate-700 mt-1 uppercase">Patient ID: {patientIdStr}</div>
          </div>
          <div className="border-l border-slate-100 pl-6">
            <div className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase mb-2">DOCTOR</div>
            <div className="text-lg font-bold text-slate-800">{report.doctor}</div>
            <div className="text-xs font-semibold text-slate-700 mt-1">{report.dept}</div>
          </div>
          <div className="border-l border-slate-100 pl-6">
            <div className="text-[10px] font-bold text-slate-500 tracking-[0.15em] uppercase mb-2">LABORATORY</div>
            <div className="text-lg font-bold text-slate-800">{report.lab}</div>
            <div className="text-xs font-semibold text-slate-700 mt-1">Date: {report.date}</div>
          </div>
        </div>

        <div className="border-t border-slate-100 my-6" />

        {/* RESULTS */}
        <div className="mb-10">
          <div className="text-[10px] font-bold text-slate-800 tracking-[0.15em] uppercase mb-3">TEST RESULTS / FINDINGS</div>
          <div className="border border-slate-200 rounded-2xl p-5 min-h-[100px]">
            <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">{report.note || "No specific findings recorded."}</p>
          </div>
        </div>

        {/* PRESCRIPTION */}
        <div className="mb-16">
          <div className="text-[10px] font-bold text-slate-800 tracking-[0.15em] uppercase mb-4">PRESCRIPTION</div>
          <table className="w-full text-left text-xs text-slate-600">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 font-bold uppercase tracking-widest text-slate-500 w-12 text-center">#</th>
                <th className="pb-3 font-bold uppercase tracking-widest text-slate-500">Medicine</th>
                <th className="pb-3 font-bold uppercase tracking-widest text-slate-500">Dosage</th>
                <th className="pb-3 font-bold uppercase tracking-widest text-slate-500">Duration</th>
              </tr>
            </thead>
            <tbody>
              {prescription && prescription.length > 0 ? (
                prescription.map((p, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0">
                    <td className="py-5 text-center font-semibold text-slate-400">{idx + 1}</td>
                    <td className="py-5 font-bold text-slate-700 uppercase tracking-wide">{p.medicine}</td>
                    <td className="py-5 font-medium">{p.dosage}</td>
                    <td className="py-5 font-medium">{p.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-sm font-medium italic text-slate-400">
                    No medications prescribed
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 my-10" />

        {/* FOOTER ROW */}
        <div className="flex justify-between items-end mt-auto">
          <div>
             <div className="text-[9px] font-bold text-slate-400 tracking-[0.1em] uppercase mb-1">ISSUED BY</div>
             <div className="font-serif text-2xl italic font-bold text-slate-700 tracking-tight">{report.doctor}</div>
             <div className="text-[10px] text-slate-600 font-medium">{report.dept}</div>
          </div>
          <div className="text-right">
             <div className="text-[9px] font-bold text-slate-400 tracking-[0.1em] uppercase mb-1">REPORT REFERENCE</div>
             <div className="font-bold text-lg text-slate-700 font-serif">LR-{report.id}</div>
             <div className="text-[9px] text-slate-500 mt-1">Healthcare System · Confidential Medical Record</div>
          </div>
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