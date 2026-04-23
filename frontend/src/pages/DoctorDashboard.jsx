/**
 * DoctorDashboard.jsx
 *
 * Setup:
 *   npm install lucide-react
 *
 * tailwind.config.js → content: ["./src/**\/*.{js,jsx,ts,tsx}"]
 *
 * Add to index.html <head>:
 *   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"/>
 */

import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Users, CalendarCheck, FileText, FlaskConical,
  MessageCircle, Clock, ChevronLeft, ChevronRight,
  CheckCheck, CircleCheck, Pill, Heart, CheckCircle,
  Phone, Mail, Star, ArrowRight, Zap, Target,
  TrendingUp, Trophy, BookOpen, Lightbulb, ClipboardList,
  AlertTriangle, Sparkles, PlusCircle, Download,
  Upload, RefreshCw, FileCheck, User, X, Plus,
} from "lucide-react";

/* ─── DESIGN TOKENS ─── */
const C = {
  primary: "#2E86C1",
  dark:    "#1A5C85",
  teal:    "#5B9DB8",
  light:   "#C4DAE8",
  bg:      "#EDE8E3",
};

/* ─── DATA ─── */
const INIT_APPOINTMENTS = [
  { id:1, name:"Priya Sharma",  age:34, gender:"Female", time:"09:00 AM", type:"General Checkup",       status:"confirmed", img:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face", done:false },
  { id:2, name:"Rahul Mehta",   age:45, gender:"Male",   time:"10:30 AM", type:"Cardiology Follow-up",  status:"waiting",   img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face", done:false },
  { id:3, name:"Anita Patel",   age:29, gender:"Female", time:"11:45 AM", type:"Consultation",          status:"confirmed", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", done:false },
  { id:4, name:"Vikram Singh",  age:52, gender:"Male",   time:"02:00 PM", type:"Lab Review",            status:"pending",   img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", done:false },
  { id:5, name:"Meera Joshi",   age:38, gender:"Female", time:"03:30 PM", type:"Prescription Renewal",  status:"confirmed", img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", done:false },
  { id:6, name:"Arjun Nair",    age:61, gender:"Male",   time:"05:00 PM", type:"Post-Surgery Review",   status:"waiting",   img:"https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face", done:false },
  { id:7, name:"Sneha Reddy",   age:27, gender:"Female", time:"05:45 PM", type:"First Visit",           status:"pending",   img:"https://images.unsplash.com/photo-1598346762291-aee88549193f?w=80&h=80&fit=crop&crop=face", done:false },
];

const INIT_LABS = [];

const STATUS_CFG = {
  confirmed: { label:"Confirmed", strip:"linear-gradient(90deg,#10b981,#059669)", chip:"bg-emerald-100 text-emerald-800 border border-emerald-200" },
  waiting:   { label:"Waiting",   strip:"linear-gradient(90deg,#f59e0b,#d97706)", chip:"bg-amber-100 text-amber-800 border border-amber-200" },
  pending:   { label:"Pending",   strip:"linear-gradient(90deg,#ef4444,#dc2626)", chip:"bg-rose-100 text-rose-800 border border-rose-200" },
  done:      { label:"Completed", strip:"linear-gradient(90deg,#6366f1,#4338ca)", chip:"bg-indigo-100 text-indigo-800 border border-indigo-200" },
};

const LAB_STATUS = {
  pending:    { cls:"bg-amber-50 text-amber-800 border border-amber-200",       label:"Pending" },
  processing: { cls:"bg-blue-50 text-blue-800 border border-blue-200",          label:"Processing" },
  completed:   { cls:"bg-emerald-50 text-emerald-800 border border-emerald-200", label:"Complete" },
  complete:   { cls:"bg-emerald-50 text-emerald-800 border border-emerald-200", label:"Complete" },
};

const urgencyColor = (u) => u === "urgent" ? "#ef4444" : u === "high" ? "#f59e0b" : C.teal;

/* ─── GLOBAL CSS ─── */
const GLOBAL_CSS = `
  @keyframes blob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:translate(0,0) scale(1)}33%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:translate(20px,-15px) scale(1.06)}66%{border-radius:20% 60% 80% 40%/70% 30% 50% 60%;transform:translate(-15px,10px) scale(0.96)}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes floatX{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(48px)}to{opacity:1;transform:translateX(0)}}

  .blob-1{animation:blob 9s ease-in-out infinite}
  .blob-2{animation:blob 11s ease-in-out infinite 2s}
  .blob-3{animation:blob 13s ease-in-out infinite 4s}
  .float-slow{animation:floatY 5s ease-in-out infinite}
  .float-fast{animation:floatY 3.5s ease-in-out infinite 1s}
  .float-x{animation:floatX 4s ease-in-out infinite}
  .fade-up  {animation:fadeUp .7s ease-out both}
  .fade-up-1{animation:fadeUp .7s ease-out .1s both}
  .fade-up-2{animation:fadeUp .7s ease-out .2s both}
  .fade-up-3{animation:fadeUp .7s ease-out .3s both}
  .fade-up-4{animation:fadeUp .7s ease-out .4s both}
  .slide-right{animation:slideRight .42s cubic-bezier(.34,1.56,.64,1) both}

  .glass     {background:rgba(255,255,255,.18);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.35)}
  .glass-dark{background:rgba(26,92,133,.25);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.2)}
  .glass-card{background:rgba(255,255,255,.84);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.72)}

  .snap-scroll{scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none}
  .snap-scroll::-webkit-scrollbar{display:none}
  .snap-item{scroll-snap-align:start}

  .hover-lift{transition:all .3s cubic-bezier(.34,1.56,.64,1)}
  .hover-lift:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 20px 40px rgba(46,134,193,.18)}

  .gradient-text{background:linear-gradient(135deg,#1A5C85,#2E86C1,#5B9DB8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .section-heading{font-weight:800;letter-spacing:-0.03em}
`;

/* ─── PRESCRIPTION PANEL ─── */
function PrescriptionPanel({ patient, existing, onClose, onSave }) {
  const [diagnosis, setDiagnosis] = useState(existing?.diagnosis || "");
  const [medicines, setMedicines] = useState(existing?.medicines || [{ name:"", dose:"", freq:"", dur:"" }]);
  const [notes, setNotes] = useState(existing?.notes || "");

  const addMed    = () => setMedicines([...medicines, { name:"", dose:"", freq:"", dur:"" }]);
  const removeMed = (i) => setMedicines(medicines.filter((_, j) => j !== i));
  const updateMed = (i, k, v) => setMedicines(medicines.map((m, j) => j === i ? { ...m, [k]:v } : m));
  const handleSave = () => { onSave({ diagnosis, medicines, notes, updatedAt: new Date().toLocaleDateString() }); onClose(); };

  const iCls = "w-full rounded-xl px-4 py-2.5 text-sm border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-[Poppins]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end" style={{ background:"rgba(0,0,0,.38)", backdropFilter:"blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="slide-right h-full overflow-y-auto bg-white shadow-2xl" style={{ width:440 }}>
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={patient.img} alt={patient.name} className="w-12 h-12 rounded-2xl object-cover" style={{ border:`2px solid ${C.light}` }} onError={(e)=>{e.target.style.display="none";}}/>
              <div>
                <div className="font-bold text-base" style={{ color:C.dark }}>{patient.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">Age {patient.age} · {patient.gender} · {patient.type}</div>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all cursor-pointer"><X size={15}/></button>
          </div>
          <div className="h-px bg-slate-100 mb-6"/>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ background:C.primary }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color:C.dark }}>Prescription Details</span>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Diagnosis</label>
            <input className={iCls} placeholder="Enter diagnosis..." value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)} disabled={!!existing}/>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Medications</label>
              {!existing && (
                <button onClick={addMed} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer border-none transition-all" style={{ background:`${C.light}60`, color:C.dark }}>
                  <Plus size={12}/> Add
                </button>
              )}
            </div>
            {medicines.map((med, i) => (
              <div key={i} className="relative rounded-2xl p-4 mb-3 border border-slate-100 bg-slate-50">
                {medicines.length > 1 && !existing && (
                  <button onClick={()=>removeMed(i)} className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center hover:bg-rose-200 transition-all cursor-pointer border-none"><X size={11}/></button>
                )}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><div className="text-xs font-semibold text-slate-400 mb-1.5">Medicine</div><input className={iCls} placeholder="e.g. Metoprolol" value={med.name || med.medicine} onChange={(e)=>updateMed(i,"name",e.target.value)} disabled={!!existing}/></div>
                  <div><div className="text-xs font-semibold text-slate-400 mb-1.5">Dosage</div><input className={iCls} placeholder="e.g. 50mg" value={med.dose || med.dosage} onChange={(e)=>updateMed(i,"dose",e.target.value)} disabled={!!existing}/></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1.5">Frequency</div>
                    <select className={iCls} value={med.freq || "Once daily"} onChange={(e)=>updateMed(i,"freq",e.target.value)} disabled={!!existing}>
                      <option value="">Select...</option>
                      <option>Once daily</option><option>Twice daily</option><option>Thrice daily</option><option>Every 8 hours</option><option>As needed</option>
                    </select>
                  </div>
                  <div><div className="text-xs font-semibold text-slate-400 mb-1.5">Duration</div><input className={iCls} placeholder="e.g. 30 days" value={med.dur || med.duration} onChange={(e)=>updateMed(i,"dur",e.target.value)} disabled={!!existing}/></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-7">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Doctor's Notes</label>
            <textarea className={iCls} rows={4} style={{ resize:"vertical", minHeight:88 }} placeholder="Additional notes, instructions, follow-up dates..." value={notes} onChange={(e)=>setNotes(e.target.value)} disabled={!!existing}/>
          </div>

          {!existing && (
            <button onClick={handleSave} className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer border-none"
              style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`, fontFamily:"'Poppins',sans-serif" }}>
              <Pill size={16}/> Save Prescription & Complete Appointment
            </button>
          )}
          {existing && (
            <div className="w-full py-4 rounded-2xl text-emerald-700 font-bold text-sm flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200">
              <CheckCircle size={16}/> Prescription Already Saved
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── ADD LAB MODAL ─── */
function AddLabModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ patient:"", test:"", urgency:"normal" });
  const [fileName, setFileName] = useState("");
  const fileRef = useRef();

  const handleAdd = () => {
    if (!form.patient || !form.test) return;
    onAdd({ ...form, id:Date.now(), status:"pending", img:"", file:fileName||null, date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"}) });
    onClose();
  };

  const iCls = "w-full rounded-xl px-4 py-2.5 text-sm border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-[Poppins]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end" style={{ background:"rgba(0,0,0,.38)", backdropFilter:"blur(4px)" }}
      onClick={(e)=>{ if(e.target===e.currentTarget)onClose(); }}>
      <div className="slide-right h-full overflow-y-auto bg-white shadow-2xl" style={{ width:440 }}>
        <div className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#0891b2,#0e7490)" }}>
                <FlaskConical size={20} color="white"/>
              </div>
              <div className="font-bold text-xl" style={{ color:C.dark }}>Add Lab Report</div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all cursor-pointer"><X size={15}/></button>
          </div>
          <div className="h-px bg-slate-100 mb-6"/>

          {[{label:"Patient Name",key:"patient",ph:"Enter patient name..."},{label:"Test / Report Name",key:"test",ph:"e.g. Complete Blood Count"}].map(({label,key,ph})=>(
            <div key={key} className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{label}</label>
              <input className={iCls} placeholder={ph} value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})}/>
            </div>
          ))}

          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Urgency Level</label>
            <select className={iCls} value={form.urgency} onChange={(e)=>setForm({...form,urgency:e.target.value})}>
              <option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="mb-7">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Upload Report</label>
            <div className="rounded-2xl p-6 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/20"
              style={{ border:`2px dashed ${C.light}`, background:"rgba(196,218,232,.1)" }} onClick={()=>fileRef.current.click()}>
              <div className="flex justify-center mb-3"><Upload size={28} color={C.teal}/></div>
              <div className="font-semibold text-sm" style={{ color:C.dark }}>Click to upload or drag &amp; drop</div>
              <div className="text-xs text-slate-400 mt-1">PDF, JPG, PNG supported</div>
              {fileName&&<div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold" style={{ color:C.primary }}><FileCheck size={13}/>{fileName}</div>}
              <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={(e)=>{ if(e.target.files[0])setFileName(e.target.files[0].name); }}/>
            </div>
          </div>

          <button onClick={handleAdd} className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer border-none"
            style={{ background:"linear-gradient(135deg,#0891b2,#0e7490)", fontFamily:"'Poppins',sans-serif" }}>
            <PlusCircle size={16}/> Add Lab Report
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN DASHBOARD ─── */
export default function DoctorDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const doctorId = user?.doctor_id;

  const [isOnline, setIsOnline]         = useState(true);
  const [appointments, setAppointments] = useState([]);
  
  const [historyPatients, setHistory]   = useState([]);
  const [labs, setLabs]                 = useState([]);
  const [rxPanel, setRxPanel]           = useState(null);
  const [showAddLab, setShowAddLab]     = useState(false);
  const [prescriptions, setRxData]      = useState({});
  const sliderRef = useRef(null);

  const scrollSlider = (dir) => { if(sliderRef.current) sliderRef.current.scrollBy({left:dir*300,behavior:"smooth"}); };

  const markDone = (id) => {
    axios.put("http://localhost:5000/api/appointment/status", { appointment_id: id, status: "completed" })
      .then(() => {
        setAppointments(prev => prev.filter(a => a.id !== id));
        fetchHistory();
      })
      .catch(err => console.log(err));
  };

  const saveRx = (appointmentId, data) => {
    console.log("Sending appointment_id:", appointmentId);
    console.log("Full data:", data);

    axios.post("http://localhost:5000/api/prescription", {
      appointment_id: appointmentId,
      diagnosis: data.diagnosis,
      notes: data.notes,
      medicines: data.medicines.map((m) => ({
        name: m.name,
        dosage: m.dose,
        duration: m.dur
      }))
    })
    .then(() => {
      // save locally
      setRxData(prev => ({
        ...prev,
        [appointmentId]: data
      }));
      // Automatically complete the appointment
      markDone(appointmentId);
    })
    .catch(err => console.log(err));
  };
  const addLab      = (lab) => setLabs(prev => [lab,...prev]);
  const cycleStatus = (id)  => setLabs(prev => prev.map(l => {
    if(l.id!==id) return l;
    const cy={pending:"processing",processing:"complete",complete:"pending"};
    return {...l,status:cy[l.status]};
  }));


  const fetchHistory = () => {
    if (!doctorId) return;
    axios.get(`http://localhost:5000/api/appointment/history/doctor/${doctorId}`)
      .then(res => {
        setHistory(res.data.map(a => ({
          id: a.appointment_id, name: a.patient_name, age: a.age, gender: a.gender,
          type: "Consultation", visitedAt: new Date(a.appointment_date).toLocaleDateString(),
          img: ""
        })));

        // Fetch existing prescriptions for history appointments too
        res.data.forEach(apt => {
            axios.get(`http://localhost:5000/api/prescription/appointment/${apt.appointment_id}`)
                .then(rxRes => {
                    if (rxRes.data && rxRes.data.length > 0) {
                        setRxData(prev => ({
                            ...prev,
                            [apt.appointment_id]: {
                                diagnosis: rxRes.data[0].diagnosis,
                                medicines: rxRes.data.map(m => ({
                                    name: m.medicine,
                                    dose: m.dosage,
                                    dur: m.duration
                                })),
                                notes: rxRes.data[0].notes
                            }
                        }));
                    }
                }).catch(e => console.log("Rx history fetch error", e));
        });
      }).catch(console.log);
  };

  const fetchAppointments = () => {
    if (!doctorId) return;
    axios
      .get(`http://localhost:5000/api/appointment/doctor/${doctorId}`)
      .then((res) => {
        const formatted = res.data.filter(a => a.status !== 'completed').map((a) => ({
          id: a.appointment_id,
          name: a.patient_name,
          age: a.age,
          gender: a.gender,
          time: formatTime(a.appointment_time),
          type: "Consultation",
          status: "confirmed",
          img: "",
          done: false,
        }));
        setAppointments(formatted);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!doctorId) return;

    fetchAppointments();
    const interval = setInterval(fetchAppointments, 5000);

    fetchHistory();

    Promise.all([
      axios.get(`http://localhost:5000/api/lab/pending/${doctorId}`),
      axios.get(`http://localhost:5000/api/lab/completed-doctor/${doctorId}`)
    ]).then(([pendingRes, completedRes]) => {
      let allLabs = [...pendingRes.data, ...completedRes.data];
      allLabs.sort((a,b) => new Date(b.report_date) - new Date(a.report_date));
      allLabs = allLabs.slice(0, 4);
      setLabs(allLabs.map(r => ({
        id: r.report_id, patient: r.patient_name, test: r.test_name || "Lab Report",
        status: r.status, date: new Date(r.report_date).toLocaleDateString(),
        urgency: r.urgency, file: r.file_url ? "View File" : null
      })));
    }).catch(console.log);

    // Fetch existing prescriptions for these appointments
    axios.get(`http://localhost:5000/api/appointment/doctor/${doctorId}`)
      .then(res => {
          res.data.forEach(apt => {
              axios.get(`http://localhost:5000/api/prescription/appointment/${apt.appointment_id}`)
                  .then(rxRes => {
                      if (rxRes.data && rxRes.data.length > 0) {
                          setRxData(prev => ({
                              ...prev,
                              [apt.appointment_id]: {
                                  diagnosis: rxRes.data[0].diagnosis,
                                  medicines: rxRes.data.map(m => ({
                                      name: m.medicine,
                                      dose: m.dosage,
                                      dur: m.duration
                                  })),
                                  notes: rxRes.data[0].notes
                              }
                          }));
                      }
                  }).catch(e => console.log("Rx fetch error", e));
          });
      });

    return () => clearInterval(interval);
  }, [doctorId]);

const formatTime = (time) => {
  if (!time) return "--:--";
  try {
    const parts = time.split(":");
    if (parts.length < 2) return time;
    const [h, m] = parts;
    let hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
  } catch(e) { return time; }
};

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor:C.bg, fontFamily:"'Poppins',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ══ NAVBAR SPACE — replace with your <Navbar /> ══ */}
      <div className="h-16 flex items-center px-14" style={{ background:`linear-gradient(135deg,${C.dark}f0 0%,${C.primary}cc 45%,${C.teal}99 100%)` }}>
          {/* Navbar space */}
      </div> 

      {/* ══ HERO ══════════════════════════════════════════ */}
      
      <section className=" relative flex flex-col overflow-hidden" style={{ minHeight:"calc(100vh - 64px)" }}>
        <div className="absolute inset-0">
          <img src="https://i.pinimg.com/1200x/ab/16/5a/ab165aab128f19ae9883e681dd0e3af0.jpg" alt="" className="w-full h-full object-cover object-top"/>
          <div className="absolute inset-0" style={{ background:`linear-gradient(135deg,${C.dark}f0 0%,${C.primary}cc 45%,${C.teal}99 100%)` }}/>
          
        </div>
        <div className="blob-1 absolute opacity-30 rounded-full" style={{ width:380,height:380,top:-120,left:-120,background:`radial-gradient(circle,${C.light},transparent)` }}/>
        <div className="blob-2 absolute opacity-20 rounded-full" style={{ width:280,height:280,top:80,right:"25%",background:"radial-gradient(circle,white,transparent)" }}/>
        <div className="blob-3 absolute opacity-25 rounded-full" style={{ width:320,height:320,bottom:0,right:0,background:`radial-gradient(circle,${C.teal},transparent)` }}/>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full px-14 py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* LEFT */}
              <div className="fade-up">
                <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                  <span className="text-white/80 text-sm font-medium">Saturday, April 19, 2026</span>
                </div>
                <h1 className="font-semibold text-white leading-tight mb-4" style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)" }}>
                  Welcome back,<br/><span style={{ color:C.light }}> {user?.name}</span>
                </h1>
                <p className="text-white/60 mb-10 max-w-md font-light leading-relaxed" style={{ fontSize:15 }}>
                  You have <strong className="text-white font-semibold">12 appointments</strong> and{" "}
                  <strong className="text-white font-semibold">6 pending reports</strong> today. Have a great shift!
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    {Ic:Users,         label:"Patients Today",  value:"24",delta:"+3"},
                    {Ic:CalendarCheck, label:"Appointments",    value:"12",delta:"4 left"},
                    {Ic:FileText,      label:"Pending Reports", value:"6", delta:"urgent"},
                  ].map((s,i)=>(
                    <div key={i} className={`glass hover-lift rounded-2xl p-5 fade-up-${i+1}`}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background:"rgba(255,255,255,.2)" }}>
                        <s.Ic size={18} color="white"/>
                      </div>
                      <div className="text-3xl font-extrabold text-white">{s.value}</div>
                      <div className="text-white/58 text-xs mt-1">{s.label}</div>
                      <div className="text-white/38 text-xs mt-1 font-medium">{s.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={()=>setIsOnline(!isOnline)} className="relative rounded-full border-none cursor-pointer transition-all duration-500"
                    style={{ width:56,height:28,background:isOnline?"#34d399":"rgba(255,255,255,.22)" }}>
                    <div className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500" style={{ left:isOnline?30:2 }}/>
                  </button>
                  <div>
                    <p className="font-semibold text-sm" style={{ color:isOnline?"#6ee7b7":"rgba(255,255,255,.38)" }}>
                      {isOnline?"● Accepting Patients":"○ Currently Unavailable"}
                    </p>
                    <p className="text-white/38 text-xs mt-0.5">Toggle to change status</p>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Quick Access */}
            <div className="mt-15 grid grid-cols-2 md:grid-cols-3 gap-4 fade-up-4">
              {[
                {Ic:CalendarCheck,label:"Appointments",sub:"12 today",   clr:"#2E86C1"},
                {Ic:FlaskConical, label:"Lab Reports", sub:"6 pending",  clr:"#0891b2"},
                {Ic:Users,        label:"My Patients", sub:"1,243 total",clr:"#059669"},
                // {Ic:MessageCircle,label:"Messages",    sub:"4 unread",   clr:"#7c3aed"},
              ].map((t,i)=>(
                <button key={i} className="glass hover-lift rounded-2xl p-5 flex items-center gap-4 border-none cursor-pointer text-left group"
                  style={{ fontFamily:"'Poppins',sans-serif" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background:`${t.clr}44` }}>
                    <t.Ic size={20} color="white"/>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.label}</div>
                    <div className="text-white/50 text-xs mt-0.5">{t.sub}</div>
                  </div>
                  <ArrowRight size={14} color="rgba(255,255,255,.35)" className="ml-auto"/>
                </button>
              ))}
            </div>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,50 C480,90 960,10 1440,55 L1440,80 L0,80 Z" fill={C.bg}/>
        </svg>
      </section>


      {/* ══ APPOINTMENTS SLIDER ═══════════════════════════ */}
      <section className="py-20 px-14 overflow-hidden">
        <div className="flex items-end justify-between mb-10">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center pt-1.5 flex-shrink-0 ">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background:C.primary }}/>
              <div className="w-0.5 mt-1.5 rounded-full" style={{ minHeight:56,background:`linear-gradient(to bottom,${C.primary},rgba(46,134,193,.07))` }}/>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3.5">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full" style={{ background:"rgba(46,134,193,.10)",border:"1px solid rgba(46,134,193,.2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background:C.primary }}/>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color:C.primary }}>Today's Schedule</span>
                </div>
                
              </div>
              <h2 className="font-semibold leading-tight" style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,2.8rem)",color:"#1B3A52" }}>Your Appointments</h2>
              <p className="font-light leading-relaxed mt-1.5" style={{ fontSize:13,color:"#7A8F9E" }}>Stay on top of every consultation — your full patient queue for today    . 
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white border border-slate-100 shadow-sm" style={{ color:"#567C8D" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>{appointments.length} today
                </div></p>
              
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={()=>scrollSlider(-1)} className="glass-card hover-lift w-11 h-11 rounded-xl border-none cursor-pointer flex items-center justify-center"><ChevronLeft size={20} color={C.primary}/></button>
            <button onClick={()=>scrollSlider(1)} className="hover-lift w-11 h-11 rounded-xl border-none cursor-pointer flex items-center justify-center" style={{ background:C.primary }}><ChevronRight size={20} color="white"/></button>
          </div>
        </div>
         {/* <Section style={{ background: "#F3EEE8" }} className="section-pad">
                <SectionLabel icon="leaf" color="#0F7B6C">Wellness</SectionLabel>
                <SectionHeading> Healthy Habits</SectionHeading>
                <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>Small consistent habits lead to extraordinary long-term outcomes.</p> */}


        <div ref={sliderRef} className="snap-scroll flex gap-5 overflow-x-auto pb-4">
          {appointments.map((apt)=>{
            const st = apt.done ? STATUS_CFG.done : STATUS_CFG[apt.status];
            const rx = prescriptions[apt.id];
            return(
              <div key={apt.id} className="snap-item glass-card hover-lift rounded-3xl overflow-hidden flex-shrink-0 min-h-[280px]" style={{ width:288 }}>
                <div className="h-1.5" style={{ background:st.strip }}/>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-5">
                    <img src={apt.img} alt={apt.name} className="rounded-2xl object-cover flex-shrink-0" style={{ width:52,height:64 }} onError={(e)=>{e.target.style.display="none";}}/>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color:C.dark }}>{apt.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5"><p>Age: {apt.age|| "-"}</p>
                          <p> {apt.gender|| "-"}</p></div>
                      <div className="text-xs text-slate-400 truncate">{apt.type}</div>
                    </div>
                   
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-2xl mb-4" style={{ background:`${C.light}50` }}>
                    <Clock size={15} color={C.primary}/>
                    <span className="font-bold text-sm" style={{ color:C.dark }}>{apt.time}</span>
                    <span className="ml-auto text-xs text-slate-400">Today</span>
                  </div>
                  {rx&&(
                    <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background:"#f0fdf4",border:"1px solid #bbf7d0" }}>
                      <CheckCircle size={13} color="#059669"/>
                      <span className="text-xs font-semibold text-emerald-700 truncate">{rx.diagnosis||"Prescription saved"}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {!apt.done?(
                      <button onClick={()=>markDone(apt.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-semibold border-none cursor-pointer transition-all hover:opacity-85"
                        style={{ background:"linear-gradient(135deg,#10b981,#059669)",fontFamily:"'Poppins',sans-serif" }}>
                        <CheckCheck size={13}/> Mark Complete
                      </button>
                    ):(
                      <div className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-500">
                        <CircleCheck size={14}/> Completed
                      </div>
                    )}
                    <button onClick={()=>setRxPanel(apt)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-semibold border-none cursor-pointer transition-all hover:opacity-85"
                      style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`,fontFamily:"'Poppins',sans-serif" }}>
                      <Pill size={13}/> Prescription
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       
      </section>


      {/* ══ PATIENT HISTORY ══════════════════════════════ */}
      <section className="px-14 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:C.teal }}><Users size={16} color="white"/></div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color:C.teal }}>Patient Records</span>
          </div>
          <h2 className="section-heading gradient-text" style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)" }}>Recent &amp; History Patients</h2>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 grid gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest"
            style={{ gridTemplateColumns:"220px 1fr 130px 180px" }}>
            <div>Patient</div><div>Condition / Type</div><div className="text-right">Visited</div><div className="text-right">Actions</div>
          </div>
          {historyPatients.length === 0 ? (
            <div className="px-6 py-16 text-center text-slate-400">
              <div className="flex justify-center mb-4"><ClipboardList size={44} color="#cbd5e1"/></div>
              <div className="font-semibold text-base text-slate-500 mb-2">No completed appointments yet</div>
              <div className="text-sm">Mark appointments as complete to see patient history here.</div>
            </div>
          ):historyPatients.map((p,i)=>(
            <div key={p.id} className="grid gap-4 items-center px-6 py-5 hover:bg-white/60 transition-all"
              style={{ gridTemplateColumns:"220px 1fr 130px 180px",borderBottom:i<historyPatients.length-1?"1px solid #f8fafc":"none" }}>
              <div className="flex items-center gap-3">
                <img src={p.img} alt={p.name} className="w-11 h-11 rounded-2xl object-cover flex-shrink-0" style={{ border:`2px solid ${C.light}` }} onError={(e)=>{e.target.style.display="none";}}/>
                <div>
                  <div className="font-bold text-sm" style={{ color:C.dark }}>{p.name}</div>
                  <div className="text-xs text-slate-400">Age {p.age} · {p.gender}</div>
                </div>
              </div>
              <div className="text-sm text-slate-500">{p.type}</div>
              <div className="text-right text-xs text-slate-400">Today {p.visitedAt}</div>
              <div className="flex justify-end">
                <button onClick={()=>setRxPanel(p)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold border-none cursor-pointer transition-all hover:opacity-85"
                  style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`,fontFamily:"'Poppins',sans-serif" }}>
                  <Pill size={13}/> Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ══ LAB REPORTS ══════════════════════════════════ */}
      <section className="pb-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background:`linear-gradient(135deg,${C.dark}08,${C.light}40,${C.bg})` }}/>
        <div className="relative px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"#0891b2" }}><FlaskConical size={16} color="white"/></div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color:"#0891b2" }}>Diagnostics</span>
              </div>
              <h2 className="section-heading gradient-text mb-3" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>Lab Reports</h2>
              <p className="text-slate-500 text-sm font-light max-w-md">Manage diagnostic results — import patient reports and track their status seamlessly.</p>
            </div>
            <div className="flex gap-3 justify-start lg:justify-end">
              <button onClick={() => navigate("/labreports")} className="hover-lift flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold text-sm border-none cursor-pointer"
                style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`,fontFamily:"'Poppins',sans-serif" }}>
                <PlusCircle size={16}/> Add Report
              </button>
              <button onClick={() => navigate("/doctor/lab-history")} className="glass-card hover-lift flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm border-none cursor-pointer"
                style={{ color:C.dark,fontFamily:"'Poppins',sans-serif" }}>
                <ClipboardList size={16} color={C.dark}/> View History
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {labs.map(r=>{
              const ls=LAB_STATUS[r.status] || LAB_STATUS.pending;
              const uc=urgencyColor(r.urgency);
              return(
                <div key={r.id} className="glass-card hover-lift rounded-3xl overflow-hidden">
                  <div className="h-1" style={{ background:uc }}/>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      {r.img?(
                        <img src={r.img} alt={r.patient} className="w-10 h-10 rounded-2xl object-cover flex-shrink-0" onError={(e)=>{e.target.style.display="none";}}/>
                      ):(
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:`${C.light}80` }}><User size={18} color={C.teal}/></div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm truncate" style={{ color:C.dark }}>{r.patient}</div>
                        <div className="text-xs text-slate-400">{r.date}</div>
                      </div>
                      {r.urgency==="urgent"&&<span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex-shrink-0">URGENT</span>}
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background:`${C.light}60` }}><FlaskConical size={22} color={C.primary}/></div>
                    <div className="font-bold text-sm mb-3" style={{ color:C.dark }}>{r.test}</div>
                    {r.file&&(
                      <div className="flex items-center gap-2 text-xs font-semibold mb-3 px-3 py-1.5 rounded-xl" style={{ background:`${C.light}40`,color:C.primary }}>
                        <FileCheck size={13} color={C.primary}/>{r.file}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${ls.cls}`}>{ls.label}</span>
                      <button onClick={()=>cycleStatus(r.id)} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border-none cursor-pointer transition-all hover:scale-105"
                        style={{ background:`${C.light}60`,color:C.dark,fontFamily:"'Poppins',sans-serif" }} title="Click to cycle status">
                        Change <RefreshCw size={11} color={C.dark}/>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══ PERFORMANCE + TIPS ═══════════════════════════ */}
      <section className="py-20 px-14 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background:`linear-gradient(135deg,${C.dark}f0 0%,${C.primary}cc 100%)` }}/>
        <div className="blob-1 absolute opacity-20 rounded-full" style={{ width:320,height:320,top:-80,right:-80,background:C.light }}/>
        <div className="blob-3 absolute opacity-14 rounded-full" style={{ width:240,height:240,bottom:0,left:0,background:"white" }}/>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="glass w-8 h-8 rounded-xl flex items-center justify-center"><Sparkles size={16} color="white"/></div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Smart Insights</span>
          </div>
          <h2 className="section-heading text-white mb-2" style={{ fontSize:"clamp(2rem,4vw,3rem)" }}>Doctor Performance</h2>
          <p className="text-white/50 mb-12 max-w-lg font-light" style={{ fontSize:13 }}>Your practice metrics at a glance — powered by real-time data.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              {Ic:Trophy,    title:"Top Rated",     sub:"In Cardiology dept.",   value:"#1",    badge:"This Month"},
              {Ic:Zap,       title:"Response Time", sub:"Average reply speed",   value:"< 2h",  badge:"Excellent"},
              {Ic:Target,    title:"Accuracy Rate", sub:"Diagnosis accuracy",    value:"99.1%", badge:"Verified"},
              {Ic:TrendingUp,title:"Referrals",     sub:"New patient referrals", value:"34",    badge:"+12% ↑"},
            ].map((card,i)=>(
              <div key={i} className="glass hover-lift rounded-3xl p-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background:"rgba(255,255,255,.18)" }}><card.Ic size={20} color="white"/></div>
                <div className="text-3xl font-extrabold text-white mb-1">{card.value}</div>
                <div className="text-white font-semibold text-sm">{card.title}</div>
                <div className="text-white/50 text-xs mt-0.5 font-light">{card.sub}</div>
                <div className="mt-3 inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white/80">{card.badge}</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-5"><BookOpen size={18} color="white"/><h3 className="font-bold text-white text-base">Practice Tips for Today</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {tip:"Your 2 PM slot has a complex cardiac case — allocate 30 min buffer.",Ic:Lightbulb},
                {tip:"3 patients need prescription renewals. Review before end of shift.",  Ic:ClipboardList},
                {tip:"Rahul Mehta's ECG results are ready — recommend immediate review.",   Ic:AlertTriangle},
              ].map((t,i)=>(
                <div key={i} className="bg-white/10 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:"rgba(255,255,255,.15)" }}><t.Ic size={16} color="white"/></div>
                  <p className="text-white/82 text-sm leading-relaxed font-light">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-12" style={{ backgroundColor:C.bg }}/>

      {/* Panels */}
      {rxPanel&&<PrescriptionPanel patient={rxPanel} existing={prescriptions[rxPanel.id]} onClose={()=>setRxPanel(null)} onSave={(d) => {
  console.log("rxPanel:", rxPanel);
  console.log("ID:", rxPanel?.id);
  saveRx(rxPanel.id, d);
}}/>}
      {showAddLab&&<AddLabModal onClose={()=>setShowAddLab(false)} onAdd={addLab}/>}
    </div>
  );
}