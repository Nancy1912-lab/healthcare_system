import { useState, useEffect } from "react";
import axios from "axios";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const iconBoxStyle = {
 
 
};

const statusColor = {
  critical: "text-red-600", review: "text-amber-600", normal: "text-emerald-600"
};
const statusLabel = { critical: "Critical", review: "Needs Review", normal: "Normal" };
const accentBar = {
  critical: "bg-[#0D2B45]", review: "bg-[#1D7A8A]", normal: "bg-[#C8D9E6]"
};

function ReportIcon({ type }) {
  const icons = {
    blood: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    heart: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    thyroid: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    liver: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="12" rx="9" ry="7"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="3" y1="12" x2="21" y2="12"/></svg>,
    glucose: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>,
  };
  return (
    <div className={`w-11 h-11 rounded-[14px] bg-gradient-to-br flex items-center justify-center flex-shrink-0 ${iconBoxStyle[type] || ""}`}>
      {icons[type] || icons.blood}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.13em] uppercase text-[#1D7A8A] mb-4">
      {children}
      <div className="flex-1 h-px bg-gradient-to-r from-[#1D7A8A]/30 to-transparent" />
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────
function HistoryPage({ onView, reports, doctor }) {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Header */}
        <span>.<p>.</p></span>
        <div className="flex items-start justify-between mb-9">
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif" }}
              className="text-[2rem] font-bold text-[#0D2B45] leading-tight">
              Lab Reports
            </h1>
            <p className="text-sm text-[#456070] mt-1.5 font-light">
              Doctor's completed reports — all patients
            </p>
          </div>
          {/* Doctor chip */}
          <div className="flex items-center gap-2.5 bg-white/45 backdrop-blur-sm border border-[#C8D9E6] rounded-full px-4 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1D7A8A] to-[#0D2B45] flex items-center justify-center text-white text-xs font-semibold">
              {doctor?.name ? doctor.name.substring(0, 2).toUpperCase() : "DR"}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#0D2B45] leading-tight">{doctor?.name || "Doctor"}</div>
              <div className="text-xs text-[#7A99A8] mt-0.5">{doctor?.specialization_name || "Specialist"}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: "file", label: "Total Reports", val: reports.length, bg: "bg-[#E4F4F7] text-[#1D7A8A]" },
            { icon: "users", label: "Patients", val: new Set(reports.map(r => r.patient)).size, bg: "bg-[#E8EEF4] text-[#0D2B45]" },
           
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#0D2B45]/[0.07] rounded-[18px] px-4 py-4 flex items-center gap-3 shadow-sm">
              <div className={`w-11 h-11 rounded-[13px] flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                {s.icon === "file" && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                {s.icon === "users" && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif" }} className="text-2xl font-bold text-[#0D2B45]">{s.val}</div>
                <div className="text-xs text-[#456070] font-light mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <SectionLabel>Report History</SectionLabel>

        {/* Report rows */}
        <div className="flex flex-col gap-2.5">
          {reports.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#456070]">No completed reports found.</div>
          ) : reports.map((r) => (
            <div
              key={r.id}
              onClick={() => onView(r)}
              className="group relative bg-white/78 backdrop-blur-sm border border-white/60 rounded-[20px] px-5 py-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:translate-x-1.5 hover:shadow-xl hover:shadow-[#0D2B45]/10 hover:border-[#1D7A8A]/22 overflow-hidden"
            >
              {/* accent bar */}
              <div className={`absolute left-0 top-[12%] bottom-[12%] w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${accentBar[r.status]}`} />

              {/* Patient avatar */}
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.pavaGrad} flex items-center justify-center text-white text-[0.7rem] font-semibold flex-shrink-0`}>
                {r.pava}
              </div>

              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "'Playfair Display',serif" }} className="text-base font-bold text-[#0D2B45] leading-snug">
                  {r.name}
                </div>
                <div className="text-[0.8rem] font-medium text-[#1D7A8A] mt-0.5">{r.patient} · {r.pid}</div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-[#456070]">
                    <svg className="w-3 h-3 opacity-55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {r.lab}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium text-[#1A3F5C]">{r.date}</div>
                <div className="text-xs text-[#7A99A8] mt-0.5">{r.days}</div>
              </div>

              <div className="w-8 h-8 rounded-full border border-[#1D7A8A]/22 flex items-center justify-center text-[#1D7A8A] flex-shrink-0 transition-all duration-150 group-hover:bg-[#1D7A8A] group-hover:text-white group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

  const handleDownload = () => {
    if (report.file_url) {
      window.open(`http://localhost:5000${report.file_url}`, '_blank');
    } else {
      alert("No original file uploaded for this report.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Back bar */}
        <span>.<p>.</p></span>
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-[#0D2B45]/10 flex items-center justify-center hover:bg-[#f0ebe3] transition-all hover:scale-95 shadow-sm flex-shrink-0">
            <svg className="w-4 h-4 text-[#0D2B45]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex-1">
            <h2 style={{ fontFamily: "'Playfair Display',serif" }} className="text-2xl font-bold text-[#0D2B45] leading-tight">
              {report.name}
            </h2>
            <p className="text-sm text-[#7A99A8] mt-0.5">{report.dept} · {report.date}</p>
          </div>
        </div>

        {/* Patient strip */}
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-[#C8D9E6]/50 rounded-2xl px-5 py-3.5 mb-4">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${report.pavaGrad} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
            {report.pava}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#0D2B45]">{report.patient}</div>
            <div className="text-xs text-[#7A99A8] mt-0.5">Patient ID: {report.pid}</div>
          </div>
          <div className="text-right">
            <div className="text-[0.65rem] font-medium text-[#1D7A8A] uppercase tracking-widest">Status</div>
            {/* <div className={`text-sm font-semibold mt-0.5 ${statusColor[report.status]}`}>{statusLabel[report.status]}</div> */}
          </div>
        </div>

        {/* Main info card */}
        <div className="bg-white border border-[#0D2B45]/[0.07] rounded-3xl shadow-md overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-[#0D2B45] to-[#1A3F5C] px-7 py-5 flex items-start justify-between">
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-white leading-snug">{report.name}</div>
              <div className="text-sm text-white/50 mt-1">Patient: {report.patient} · ID: {report.pid}</div>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/90 text-xs px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Verified
            </div>
          </div>

          <div className="bg-[#F9F7F4] border-b border-[#0D2B45]/[0.06] px-7 py-4 flex gap-8 flex-wrap">
            {[ { label: "Department", val: report.dept }, { label: "Laboratory", val: report.lab }, { label: "Date", val: report.date }].map((m) => (
              <div key={m.label}>
                <div className="text-[0.65rem] uppercase tracking-widest text-[#7A99A8] font-medium mb-0.5">{m.label}</div>
                <div className="text-sm font-semibold text-[#0D2B45]">{m.val}</div>
              </div>
            ))}
          </div>

          <div className="px-7 py-5 border-t border-[#0D2B45]/[0.05]">
            <div className="text-[0.68rem] uppercase tracking-widest text-[#1D7A8A] font-semibold mb-3">Clinical Notes</div>
            <p className="text-sm text-[#456070] leading-relaxed italic border-l-[3px] border-[#1D7A8A] rounded-r-xl bg-[#1D7A8A]/[0.04] pl-4 py-3 pr-3 whitespace-pre-wrap">
              {report.note}
            </p>
          </div>
        </div>

        {/* Prescription card */}
        {prescription.length > 0 && (
          <div className="bg-white border border-[#0D2B45]/[0.07] rounded-3xl shadow-md overflow-hidden mb-6">
            <div className="px-7 py-4 border-b border-[#0D2B45]/[0.06] flex items-center justify-between">
              <div style={{ fontFamily: "'Playfair Display',serif" }} className="text-lg font-semibold text-[#0D2B45]">Prescription</div>
              <div className="inline-flex items-center gap-1.5 bg-[#E4F4F7] text-[#1D7A8A] border border-[#1D7A8A]/20 text-xs px-3 py-1.5 rounded-full font-medium">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Issued
              </div>
            </div>
            <div className="px-7 py-2">
              {prescription.map((d, i) => (
                <div key={i} className="flex items-center gap-3 py-3.5 border-b border-[#0D2B45]/[0.05] last:border-0">
                  <div className="w-7 h-7 rounded-full bg-[#E4F4F7] text-[#1D7A8A] flex items-center justify-center text-xs font-semibold flex-shrink-0">{i + 1}</div>
                  <div className="flex-1 text-sm font-semibold text-[#0D2B45]">{d.medicine}</div>
                  <div className="text-xs text-[#456070] mr-2">{d.dosage}</div>
                  <div className="text-xs text-[#456070] bg-[#F1EDE6] rounded-full px-3 py-1">{d.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#0D2B45] hover:bg-[#1A3F5C] text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 shadow-md shadow-[#0D2B45]/20"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Report
        </button>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function DoctorLabReports() {
  const [selected, setSelected] = useState(null);
  const [reports, setReports] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.doctor_id) {
      setDoctor(user);
      axios.get(`http://localhost:5000/api/lab/completed-doctor/${user.doctor_id}`)
        .then(res => {
          const formatted = res.data.map((r, i) => {
            const rDate = new Date(r.report_date);
            const diffTime = Math.abs(new Date() - rDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            let daysLabel = diffDays === 0 ? "Today" : diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
            if (diffDays > 30) daysLabel = `${Math.floor(diffDays / 30)} months ago`;
            
            const initials = r.patient_name ? r.patient_name.substring(0, 2).toUpperCase() : "PT";
            const grads = [
              "from-[#2F4156] to-[#567C8D]",
              "from-[#567C8D] to-[#C8D9E6]",
              "from-[#2F4156] to-[#C8D9E6]"
            ];

            return {
              id: r.report_id,
              appointment_id: r.appointment_id,
              name: r.test_name || "Lab Report",
              dept: "Laboratory",
              date: rDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              days: daysLabel,
              lab: r.lab_name || "General Lab",
              patient: r.patient_name || "Unknown Patient",
              pid: `P-${r.p_id || r.patient_id}`,
              pava: initials,
              pavaGrad: grads[i % grads.length],
              status: r.urgency === 'high' ? 'critical' : r.urgency === 'urgent' ? 'critical' : 'normal',
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
    : <HistoryPage onView={setSelected} reports={reports} doctor={doctor} />;
}
