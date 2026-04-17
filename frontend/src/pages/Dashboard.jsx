import React, { useState } from 'react';
import { 
  Heart, Activity, Calendar, Phone, Clock, AlertCircle, 
  CheckCircle2, ChevronRight, User, Stethoscope,
  Thermometer, Brain, Bone, Search, ArrowRight, ArrowLeft
} from 'lucide-react';

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const SYMPTOMS = [
  { id: 'chest_pain', label: 'Chest Pain', icon: Heart, spec: 'Cardiology' },
  { id: 'fever', label: 'High Fever', icon: Thermometer, spec: 'General Medicine' },
  { id: 'headache', label: 'Severe Headache', icon: Brain, spec: 'Neurology' },
  { id: 'joint_pain', label: 'Joint Pain', icon: Bone, spec: 'Orthopedics' },
  { id: 'stomach', label: 'Stomach Ache', icon: Activity, spec: 'Gastroenterology' },
];

const DOCTORS = {
  'Cardiology': [
    { id: 'd1', name: 'Dr. Krunal Tamakuwala', exp: '15 Yrs', rating: 4.9, img: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?auto=format&fit=crop&q=80&w=200' },
    { id: 'd2', name: 'Dr. Sanjeev Bhatia', exp: '12 Yrs', rating: 4.8, img: 'https://images.unsplash.com/photo-1537368910025-7028dd906d3e?auto=format&fit=crop&q=80&w=200' },
  ],
  'General Medicine': [
    { id: 'd3', name: 'Dr. Ramesh Patel', exp: '20 Yrs', rating: 4.7, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' },
  ],
  'Neurology': [
    { id: 'd4', name: 'Dr. Arjun Shah', exp: '14 Yrs', rating: 4.9, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200' },
  ],
  'Orthopedics': [
    { id: 'd5', name: 'Dr. Sanjay Desai', exp: '18 Yrs', rating: 4.8, img: 'https://images.unsplash.com/photo-1594824436998-ddedce228965?auto=format&fit=crop&q=80&w=200' }
  ],
  'Gastroenterology': [
    { id: 'd6', name: 'Dr. Neha Sharma', exp: '10 Yrs', rating: 4.9, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' }
  ]
};

// ─────────────────────────────────────────────
// MAIN DASHBOARD COMPONENT
// ─────────────────────────────────────────────
export default function PatientDashboard() {
  // Booking Flow State
  const [step, setStep] = useState(1);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Handle Symptom Selection
  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom);
    setStep(2);
  };

  // Handle Doctor Selection
  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
    setStep(3);
  };

  // Handle Confirmation
  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setStep(4);
      setIsConfirming(false);
    }, 1500); // Simulate API call
  };

  // Reset Flow
  const handleReset = () => {
    setStep(1);
    setSelectedSymptom(null);
    setSelectedDoctor(null);
  };

  return (
    // Background uses the requested Beige color
    <div className="min-h-screen bg-[#EDE8E3] font-['Poppins',sans-serif] p-6 md:p-10 text-[#1C3447]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ── 1. WELCOME HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-[fadeIn_0.8s_ease-out]">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Good Morning, <span className="text-[#2E86C1]">Rahul!</span> 👋
            </h1>
            <p className="text-[#4A6572] text-lg font-light">
              How are you feeling today? Let's get you the care you need.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 bg-[#C4DAE8] rounded-full flex items-center justify-center text-[#1A5C85] font-bold text-xl">
               R
             </div>
             <div>
               <div className="font-semibold text-[#1C3447]">Rahul Desai</div>
               <div className="text-xs text-[#7B96A5]">ID: PAT-88392</div>
             </div>
          </div>
        </div>

        {/* ── 2. BOOKING WIDGET (GLASSY UI) ── */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(46,134,193,0.08)] p-8 md:p-12 overflow-hidden transition-all duration-500">
          
          {/* Decorative Background Blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C4DAE8]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#5B9DB8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Step Indicators */}
            <div className="flex items-center gap-3 mb-10">
               {[1, 2, 3].map(i => (
                 <React.Fragment key={i}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-500 ${step >= i ? 'bg-[#1A5C85] text-white shadow-md' : 'bg-white/50 text-[#7B96A5]'}`}>
                     {step > i && step !== 4 ? <CheckCircle2 size={16} /> : i}
                   </div>
                   {i < 3 && <div className={`w-12 h-1 rounded-full transition-colors duration-500 ${step > i ? 'bg-[#1A5C85]' : 'bg-white/50'}`} />}
                 </React.Fragment>
               ))}
               <span className="ml-4 font-serif text-2xl md:text-3xl font-bold text-[#1A5C85] italic tracking-wide">
                 {step === 1 && "What's bothering you?"}
                 {step === 2 && "Recommended Specialists"}
                 {step === 3 && "Confirm Details"}
                 {step === 4 && "Appointment Booked!"}
               </span>
            </div>

            {/* --- STEP 1: Select Symptom --- */}
            {step === 1 && (
              <div className="animate-[slideIn_0.5s_ease-out]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {SYMPTOMS.map((symp) => {
                    const Icon = symp.icon;
                    return (
                      <button 
                        key={symp.id}
                        onClick={() => handleSymptomSelect(symp)}
                        className="group bg-white/60 hover:bg-white border border-white/80 hover:border-[#5B9DB8] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(91,157,184,0.15)]"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#EDE8E3] group-hover:bg-[#5B9DB8] flex items-center justify-center transition-colors duration-300">
                          <Icon className="text-[#2E86C1] group-hover:text-white transition-colors duration-300" size={28} />
                        </div>
                        <span className="font-semibold text-[#1C3447] text-center">{symp.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 flex items-center justify-between bg-white/40 p-4 rounded-xl border border-white/50">
                  <div className="flex items-center gap-3 text-[#4A6572]">
                    <Search size={20} className="text-[#5B9DB8]" />
                    <input type="text" placeholder="Or type your symptom here..." className="bg-transparent border-none outline-none w-full placeholder:text-[#7B96A5]" />
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: Select Doctor --- */}
            {step === 2 && (
              <div className="animate-[slideIn_0.5s_ease-out]">
                <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-[#5B9DB8] hover:text-[#1A5C85] font-medium transition-colors text-sm">
                  <ArrowLeft size={16} /> Back to symptoms
                </button>
                <div className="mb-6 bg-[#C4DAE8]/30 inline-block px-4 py-2 rounded-full text-[#1A5C85] font-medium text-sm">
                  Based on <strong className="font-bold">{selectedSymptom.label}</strong>, showing <strong className="font-bold">{selectedSymptom.spec}</strong> experts:
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DOCTORS[selectedSymptom.spec]?.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => handleDoctorSelect(doc)}
                      className="group bg-white/70 hover:bg-white border border-white shadow-sm hover:shadow-xl rounded-3xl p-5 flex items-center gap-5 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A5C85]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#1C3447] group-hover:text-[#2E86C1] transition-colors">{doc.name}</h3>
                        <p className="text-xs text-[#7B96A5] font-semibold tracking-wider uppercase mt-1">{selectedSymptom.spec}</p>
                        <div className="flex items-center gap-3 mt-3 text-xs font-medium text-[#4A6572]">
                           <span className="bg-[#EDE8E3] px-2 py-1 rounded-md">{doc.exp}</span>
                           <span className="flex items-center gap-1 bg-[#FFF8EC] text-[#D97706] px-2 py-1 rounded-md">★ {doc.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- STEP 3: Confirm --- */}
            {step === 3 && (
              <div className="animate-[slideIn_0.5s_ease-out] flex flex-col md:flex-row gap-10 items-center justify-center py-8">
                <div className="bg-white rounded-3xl p-8 border border-[#E3EDF4] shadow-lg max-w-sm w-full text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-[#5B9DB8]" />
                   <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#EDE8E3]">
                     <img src={selectedDoctor.img} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                   </div>
                   <h3 className="font-serif text-2xl font-bold text-[#1C3447] mb-1">{selectedDoctor.name}</h3>
                   <p className="text-[#5B9DB8] font-medium text-sm mb-6">{selectedSymptom.spec}</p>
                   
                   <div className="space-y-3 text-sm text-left bg-[#F9FBFC] p-4 rounded-xl border border-[#E3EDF4]">
                     <div className="flex items-center gap-3 text-[#4A6572]"><Calendar size={16} className="text-[#2E86C1]" /> Today, 14th Aug</div>
                     <div className="flex items-center gap-3 text-[#4A6572]"><Clock size={16} className="text-[#2E86C1]" /> 04:30 PM (Nearest Slot)</div>
                     <div className="flex items-center gap-3 text-[#4A6572]"><Activity size={16} className="text-[#2E86C1]" /> Reason: {selectedSymptom.label}</div>
                   </div>
                </div>

                <div className="max-w-md w-full">
                  <h3 className="text-2xl font-semibold mb-6">Ready to confirm?</h3>
                  <p className="text-[#4A6572] mb-8 leading-relaxed">
                    By confirming, you are booking a consultation slot. Our desk will contact you shortly if there are any delays.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep(2)} 
                      className="px-6 py-4 rounded-xl font-bold text-[#4A6572] bg-white border border-[#E3EDF4] hover:bg-[#EDE8E3] transition-colors"
                      disabled={isConfirming}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleConfirm} 
                      className="flex-1 bg-gradient-to-r from-[#1A5C85] to-[#2E86C1] text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(46,134,193,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(46,134,193,0.4)] transition-all flex justify-center items-center gap-2"
                      disabled={isConfirming}
                    >
                      {isConfirming ? (
                        <span className="animate-pulse">Processing...</span>
                      ) : (
                        <>Confirm Appointment <ArrowRight size={18} /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 4: Success --- */}
            {step === 4 && (
              <div className="animate-[scaleIn_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)] py-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={50} />
                </div>
                <h2 className="font-serif text-4xl font-bold text-[#1C3447] mb-4">Appointment Confirmed!</h2>
                <p className="text-[#4A6572] max-w-md mb-8">
                  Your consultation with <strong className="text-[#1A5C85]">{selectedDoctor.name}</strong> is scheduled for today at 04:30 PM.
                </p>
                <button onClick={handleReset} className="bg-white border border-[#E3EDF4] text-[#1A5C85] font-bold px-8 py-3 rounded-xl hover:bg-[#C4DAE8] transition-colors">
                  Book Another
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ── 3. BOTTOM INFO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upcoming Appointment */}
          <div className="bg-white rounded-[2rem] p-8 border border-[#E3EDF4] shadow-sm hover:shadow-md transition-shadow group">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#1C3447]">Upcoming</h3>
                <span className="bg-[#E3EDF4] text-[#2E86C1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Tomorrow</span>
             </div>
             <div className="flex gap-5">
                <div className="w-16 h-16 bg-[#EDE8E3] rounded-2xl flex flex-col items-center justify-center text-[#1A5C85]">
                   <span className="text-xs font-bold uppercase">Aug</span>
                   <span className="text-xl font-bold font-serif leading-none mt-1">15</span>
                </div>
                <div>
                   <h4 className="font-bold text-[#1C3447] text-lg">Dr. Kavya Nair</h4>
                   <p className="text-sm text-[#7B96A5]">Pediatrics • 10:00 AM</p>
                   <button className="mt-3 text-sm font-semibold text-[#5B9DB8] group-hover:text-[#2E86C1] flex items-center gap-1 transition-colors">
                     View Details <ChevronRight size={16} />
                   </button>
                </div>
             </div>
          </div>

          {/* Basic Health Overview */}
          <div className="bg-white rounded-[2rem] p-8 border border-[#E3EDF4] shadow-sm hover:shadow-md transition-shadow">
             <h3 className="font-serif text-2xl font-bold text-[#1C3447] mb-6">Health Overview</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F9FBFC] p-4 rounded-2xl border border-[#E3EDF4]">
                   <div className="flex items-center gap-2 text-[#7B96A5] mb-2">
                     <Droplets size={16} className="text-[#5B9DB8]" /> <span className="text-xs font-semibold uppercase">Blood</span>
                   </div>
                   <div className="text-xl font-bold text-[#1C3447]">O+</div>
                </div>
                <div className="bg-[#F9FBFC] p-4 rounded-2xl border border-[#E3EDF4]">
                   <div className="flex items-center gap-2 text-[#7B96A5] mb-2">
                     <Activity size={16} className="text-[#5B9DB8]" /> <span className="text-xs font-semibold uppercase">Vitals</span>
                   </div>
                   <div className="text-xl font-bold text-[#1C3447]">Normal</div>
                </div>
             </div>
          </div>

          {/* Emergency Contact (Accent Color) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A5C85] to-[#2E86C1] rounded-[2rem] p-8 text-white shadow-[0_15px_30px_rgba(26,92,133,0.3)] hover:-translate-y-1 transition-transform">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl" />
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5B9DB8]/40 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl" />
             
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                 <div className="flex items-center gap-2 mb-3 opacity-90">
                    <AlertCircle size={20} />
                    <span className="font-bold tracking-widest text-xs uppercase">Emergency Help</span>
                 </div>
                 <h3 className="font-serif text-3xl font-bold mb-2">Need Immediate Care?</h3>
                 <p className="text-sm opacity-80">Our trauma team is on standby 24/7.</p>
               </div>
               
               <button className="mt-6 w-full bg-white text-[#1A5C85] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#EDE8E3] hover:shadow-lg transition-all">
                  <Phone size={18} /> Call 1066 Now
               </button>
             </div>
          </div>

        </div>

      </div>

      {/* Global Animations (you can move these to your index.css) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
