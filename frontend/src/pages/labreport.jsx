import { useState, useRef, useEffect } from "react";
import axios from "axios";

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

function DrugRow({ num, med, onUpdate }) {
  return (
    <div className="flex items-center gap-3 bg-white/55 border border-[#0D2B45]/[0.07] rounded-2xl px-4 py-3 mb-2.5">
      <div className="w-6 h-6 rounded-full bg-[#E4F4F7] text-[#1D7A8A] text-xs font-medium flex items-center justify-center flex-shrink-0">{num}</div>
      <div className="grid grid-cols-3 gap-2 flex-1">
        <input
          className="border-0 border-b border-[#0D2B45]/[0.12] bg-transparent text-sm text-[#0D2B45] placeholder-[#7A99A8] outline-none py-1 focus:border-[#1D7A8A] transition-colors"
          placeholder="Medicine name"
          value={med.name}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
        <input
          className="border-0 border-b border-[#0D2B45]/[0.12] bg-transparent text-sm text-[#0D2B45] placeholder-[#7A99A8] outline-none py-1 focus:border-[#1D7A8A] transition-colors"
          placeholder="Dosage"
          value={med.dosage}
          onChange={(e) => onUpdate("dosage", e.target.value)}
        />
        <input
          className="border-0 border-b border-[#0D2B45]/[0.12] bg-transparent text-sm text-[#0D2B45] placeholder-[#7A99A8] outline-none py-1 focus:border-[#1D7A8A] transition-colors"
          placeholder="Duration"
          value={med.duration}
          onChange={(e) => onUpdate("duration", e.target.value)}
        />
      </div>
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

export default function LabReportsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const doctorId = user?.doctor_id;

  // Form state
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [reportDate, setReportDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedReport, setSelectedReport] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
    { name: "", dosage: "", duration: "" },
  ]);
  const [result, setResult] = useState("");
  const [urgency, setUrgency] = useState("normal");

  // Lookup state
  const [lookupAppointment, setLookupAppointment] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);

  // Success state
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saveError, setSaveError] = useState("");

  // Completed reports
  const [completedReports, setCompletedReports] = useState([]);

  // File upload
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  // Look up patient's appointment with this doctor
  const lookupPatient = () => {
    if (!patientName.trim()) {
      setLookupError("Please enter patient name");
      return;
    }
    setLookupLoading(true);
    setLookupError("");
    setLookupAppointment(null);

    // Search for appointment by patient name + doctor id
    axios
      .get(`http://localhost:5000/api/appointment/doctor/${doctorId}`)
      .then((res) => {
        const match = res.data.find(
          (a) => a.patient_name?.toLowerCase() === patientName.trim().toLowerCase()
        );
        if (match) {
          setLookupAppointment(match);
          setPatientId(`P-${match.patient_id}`);
          setLookupError("");
        } else {
          // Also search in all appointments (not just today)
          axios
            .get(`http://localhost:5000/api/lab/patient-appointments/${doctorId}/${encodeURIComponent(patientName.trim())}`)
            .then((res2) => {
              if (res2.data && res2.data.appointment_id) {
                setLookupAppointment(res2.data);
                setPatientId(`P-${res2.data.patient_id}`);
              } else {
                setLookupError("No appointment found for this patient with you.");
              }
            })
            .catch(() => {
              setLookupError("No appointment found for this patient with you.");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        setLookupError("Error looking up patient.");
      })
      .finally(() => setLookupLoading(false));
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const updateMedicine = (index, field, value) => {
    setMedicines(
      medicines.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  // Save prescription + lab report to DB
  const handleSave = () => {
    setSaveSuccess("");
    setSaveError("");

    const appointmentId = lookupAppointment?.appointment_id;
    if (!appointmentId) {
      setSaveError("Please look up a valid patient first (must have an appointment with you).");
      return;
    }

    const validMeds = medicines.filter((m) => m.name.trim());

    // 1. Save prescription if there are medicines
    const prescriptionPromise =
      validMeds.length > 0 && diagnosis.trim()
        ? axios.post("http://localhost:5000/api/prescription", {
            appointment_id: appointmentId,
            diagnosis: diagnosis,
            notes: clinicalNotes,
            medicines: validMeds,
          })
        : Promise.resolve(null);

    // 2. Create lab report entry and immediately complete it
    const labPromise = selectedReport
      ? axios
          .post("http://localhost:5000/api/lab/upload", {
            appointment_id: appointmentId,
            report_date: reportDate,
          })
          .then((uploadRes) => {
            // Immediately fill in the results (doctor reviewing)
            const formData = new FormData();
            formData.append("result", result || `${selectedReport} - ${clinicalNotes || "Results recorded"}`);
            formData.append("urgency", urgency);
            if (uploadedFile) {
              formData.append("reportFile", uploadedFile);
            }

            return axios.put(
              `http://localhost:5000/api/lab/review/${uploadRes.data.reportId}`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
          })
      : Promise.resolve(null);

    Promise.all([prescriptionPromise, labPromise])
      .then(() => {
        setSaveSuccess("✅ Prescription & Lab Report saved successfully! Patient can now view them.");
        // Reset form
        setPatientName("");
        setPatientId("");
        setDiagnosis("");
        setClinicalNotes("");
        setResult("");
        setSelectedReport("");
        setMedicines([
          { name: "", dosage: "", duration: "" },
          { name: "", dosage: "", duration: "" },
        ]);
        setLookupAppointment(null);
        setUploadedFile(null);
        setUrgency("normal");
      })
      .catch((err) => {
        console.error("SAVE ERROR:", err);
        setSaveError("❌ Error saving data. Check console for details.");
      });
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] font-['DM_Sans'] pb-16">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        {/* TOP BAR */}
        <span>
          <p>.</p>
        </span>
        <span></span>
        <div className="flex items-center justify-between mb-11">
          <div>
            <h1
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
              className="text-[2rem] font-bold text-[#0D2B45] leading-tight"
            >
              Lab Reports & Prescriptions
            </h1>
            <p className="text-[#456070] text-sm mt-0.5 font-light">
              Upload reports and save prescriptions for your patients
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[#0D2B45] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1A3F5C] transition-all hover:-translate-y-0.5"
          >
            ↑ Upload Report
          </button>
        </div>

        {/* SUCCESS / ERROR MESSAGES */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-medium">
            {saveSuccess}
          </div>
        )}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm font-medium">
            {saveError}
          </div>
        )}

        {/* PRESCRIPTION SECTION */}
        <SectionLabel>Enter Prescription & Lab Report</SectionLabel>
        <div className="relative bg-white/62 backdrop-blur-sm border border-white/45 rounded-[22px] p-7 mb-10 overflow-hidden">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
                className="text-xl font-bold text-[#0D2B45]"
              >
                New Prescription
              </h2>
              <p className="text-xs text-[#456070] font-light mt-0.5">
                Based on lab findings — fill details below
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#E4F4F7] text-[#1D7A8A] text-[0.68rem] font-medium px-3 py-1.5 rounded-full border border-[#1D7A8A]/20">
              🛡 Verified
            </span>
          </div>

          {/* Patient Lookup */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Patient Name
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter patient name..."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="flex-1 bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors placeholder-[#7A99A8]"
                />
                <button
                  onClick={lookupPatient}
                  disabled={lookupLoading}
                  className="bg-[#1D7A8A] text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-[#15616D] transition-colors disabled:opacity-50"
                >
                  {lookupLoading ? "..." : "🔍 Lookup"}
                </button>
              </div>
              {lookupError && (
                <p className="text-xs text-red-500 mt-1">{lookupError}</p>
              )}
              {lookupAppointment && (
                <p className="text-xs text-emerald-600 mt-1 font-medium">
                  ✅ Found — Appointment #{lookupAppointment.appointment_id} (
                  {lookupAppointment.patient_name})
                </p>
              )}
            </div>
            <div>
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Patient ID
              </div>
              <input
                type="text"
                value={patientId}
                readOnly
                placeholder="Auto-filled on lookup"
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none placeholder-[#7A99A8] cursor-not-allowed opacity-70"
              />
            </div>
            <div>
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Date
              </div>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors"
              />
            </div>
            <div>
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Diagnosis
              </div>
              <input
                type="text"
                placeholder="e.g. Mild Anaemia"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors placeholder-[#7A99A8]"
              />
            </div>

            {/* Linked Lab Report dropdown */}
            <div className="col-span-2">
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Linked Lab Report Name
              </div>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors"
              >
                <option value="">Select report type...</option>
                {LAB_REPORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Result / Findings */}
            <div className="col-span-2">
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Lab Results / Findings
              </div>
              <textarea
                rows={2}
                placeholder="e.g. Haemoglobin: 10.2 g/dL (low), WBC: 7200 /μL (normal)..."
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors placeholder-[#7A99A8] resize-none"
              />
            </div>

            {/* Urgency */}
            <div>
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Urgency Level
              </div>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="col-span-2">
              <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-1">
                Clinical Notes
              </div>
              <textarea
                rows={2}
                placeholder="Additional notes for the patient..."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full bg-white/70 border border-[#0D2B45]/10 rounded-xl px-3.5 py-2.5 text-sm text-[#0D2B45] outline-none focus:border-[#1D7A8A] transition-colors placeholder-[#7A99A8] resize-none"
              />
            </div>
          </div>

          <div className="text-[0.7rem] font-medium text-[#7A99A8] uppercase tracking-wider mb-2.5">
            Medications
          </div>
          {medicines.map((med, i) => (
            <DrugRow
              key={i}
              num={i + 1}
              med={med}
              onUpdate={(field, value) => updateMedicine(i, field, value)}
            />
          ))}
          <button
            onClick={addMedicine}
            className="flex items-center gap-1.5 text-[#1D7A8A] border border-dashed border-[#1D7A8A]/35 text-xs px-4 py-2 rounded-xl hover:bg-[#E4F4F7] transition-colors mb-5"
          >
            + Add medication
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#0D2B45] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1A3F5C] transition-all hover:-translate-y-0.5"
            >
              💾 Save Prescription & Lab Report
            </button>
            <button className="text-[#1D7A8A] border border-[#1D7A8A]/30 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#E4F4F7] transition-colors">
              Preview PDF
            </button>
          </div>
        </div>

        {/* UPLOAD ZONE */}
        <SectionLabel>Upload New Report</SectionLabel>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          onChange={handleFileChange}
        />
        <label
          className="block border-2 border-dashed border-[#1D7A8A]/28 rounded-[22px] p-10 text-center bg-white/45 backdrop-blur-sm hover:border-[#1D7A8A] hover:bg-white/60 transition-all cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current?.click();
          }}
        >
          <div className="w-14 h-14 bg-[#E4F4F7] rounded-[18px] flex items-center justify-center mx-auto mb-4 text-2xl">
            ↑
          </div>
          <h3
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
            className="text-xl font-bold text-[#0D2B45] mb-1.5"
          >
            Drop your report here
          </h3>
          {uploadedFile ? (
            <p className="text-sm text-[#1D7A8A] font-medium">
              ✓ {uploadedFile.name}
              <span className="block text-xs text-[#456070] font-light mt-1">
                {(uploadedFile.size / 1024).toFixed(1)} KB — click to replace
              </span>
            </p>
          ) : (
            <p className="text-sm text-[#456070] font-light leading-relaxed">
              Drag & drop a file, or{" "}
              <span className="text-[#1D7A8A] font-medium">browse to upload</span>
              <br />
              Supports scanned reports, lab PDFs, and images
            </p>
          )}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {["PDF", "JPG", "PNG", "DOCX", "DICOM"].map((f) => (
              <span
                key={f}
                className="bg-white/70 border border-[#0D2B45]/10 rounded-md px-2.5 py-0.5 text-xs text-[#456070]"
              >
                {f}
              </span>
            ))}
          </div>
        </label>
      </div>
    </div>
  );
}