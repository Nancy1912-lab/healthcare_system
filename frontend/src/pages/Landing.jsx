"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  Building2,
  Siren,
  Users,
  Star,
  CalendarCheck,
  Stethoscope,
  FileText,
  FlaskConical,
  Video,
  Search,
  MessageCircle
} from "lucide-react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES  (injected once via <style>)
───────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue:       #2E86C1;
      --blue-dark:  #1A5C85;
      --blue-mid:   #3D9BD4;
      --teal:       #5B9DB8;
      --sky:        #C4DAE8;
      --beige:      #EDE8E3;
      --white:      #FFFFFF;
      --text-dark:  #1C3447;
      --text-mid:   #4A6572;
      --text-light: #7B96A5;
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--beige);
      color: var(--text-dark);
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--beige); }
    ::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 3px; }

    /* ── blobs ── */
    @keyframes blob {
      0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
      33%      { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; }
      66%      { border-radius:50% 60% 30% 40%/40% 30% 60% 50%; }
    }
    .blob  { animation: blob  9s ease-in-out infinite; }
    .blob2 { animation: blob 13s ease-in-out 3s infinite; }

    /* ── shimmer ── */
    @keyframes shimX {
      from { transform: translateX(-100%); }
      to   { transform: translateX(400%); }
    }
    .shim::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent);
      animation: shimX 3.6s ease-in-out infinite;
    }

    /* ── float ── */
    @keyframes floatY {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-14px); }
    }
    .float { animation: floatY 6s ease-in-out infinite; }

    /* ── pulse ── */
    @keyframes pulseRing {
      0%,100% { box-shadow:0 0 0 0 rgba(46,134,193,0.40); }
      50%      { box-shadow:0 0 0 10px rgba(46,134,193,0.00); }
    }
    .pulse { animation: pulseRing 2.8s ease-out infinite; }

    /* ── scroll reveal ── */
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(30px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .rev { opacity:0; }
    .rev.vis { animation: fadeUp .65s cubic-bezier(.22,1,.36,1) forwards; }

    /* stagger */
    .sg>.rev:nth-child(1){animation-delay:.05s}
    .sg>.rev:nth-child(2){animation-delay:.14s}
    .sg>.rev:nth-child(3){animation-delay:.23s}
    .sg>.rev:nth-child(4){animation-delay:.32s}
    .sg>.rev:nth-child(5){animation-delay:.41s}
    .sg>.rev:nth-child(6){animation-delay:.50s}

    /* ── cards ── */
    .wcard {
      background:#fff; border:1px solid #E3EDF4; border-radius:20px;
      transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
    }
    .wcard:hover { transform:translateY(-6px); box-shadow:0 18px 40px rgba(46,134,193,0.12); border-color:var(--sky); }

    .gcard {
      background:rgba(255,255,255,0.12);
      backdrop-filter:blur(28px); -webkit-backdrop-filter:blur(28px);
      border:1px solid rgba(255,255,255,0.25); border-radius:24px;
      transition:background .3s, transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    }
    .gcard:hover { background:rgba(255,255,255,0.18); transform:translateY(-5px); box-shadow:0 20px 40px rgba(26,82,118,0.3); }

    /* ── buttons ── */
    .btn-white {
      background:#fff; color:var(--text-dark);
      border:1px solid #D6E5EE; border-radius:12px; cursor:pointer;
      font-family:'DM Sans',sans-serif; font-weight:600;
      display:inline-flex; align-items:center; justify-content:center; gap:7px;
      transition: box-shadow .25s, transform .25s;
    }
    .btn-white:hover { box-shadow:0 8px 20px rgba(0,0,0,0.10); transform:translateY(-2px); }

    .btn-ghost {
      background:rgba(255,255,255,0.15); backdrop-filter:blur(10px);
      border:1px solid rgba(255,255,255,0.30); color:#fff; border-radius:12px; cursor:pointer;
      font-family:'DM Sans',sans-serif; font-weight:500;
      display:inline-flex; align-items:center; justify-content:center; gap:7px;
      transition: background .3s, transform .25s;
    }
    .btn-ghost:hover { background:rgba(255,255,255,0.25); transform:translateY(-2px); }

    .btn-blue {
      background:linear-gradient(135deg,var(--blue),var(--blue-dark));
      color:#fff; border:none; border-radius:12px; cursor:pointer;
      font-family:'DM Sans',sans-serif; font-weight:600;
      display:inline-flex; align-items:center; justify-content:center; gap:7px;
      transition: filter .25s, transform .25s, box-shadow .25s;
    }
    .btn-blue:hover { filter:brightness(1.1); transform:translateY(-2px); box-shadow:0 10px 24px rgba(46,134,193,0.4); }

    /* ── nav links ── */
    .nl { position:relative; color:rgba(255,255,255,0.85); text-decoration:none; font-size:.875rem; font-weight:500; transition:color .2s; }
    .nl::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:var(--sky); border-radius:2px; transition:width .3s cubic-bezier(.22,1,.36,1); }
    .nl:hover { color:#fff; }
    .nl:hover::after { width:100%; }

    /* ── symptom chip ── */
    .chip {
      background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.30);
      color:rgba(255,255,255,0.92); border-radius:100px;
      padding:5px 15px; font-size:.8rem; cursor:pointer;
      transition:background .2s;
    }
    .chip:hover { background:rgba(255,255,255,0.28); }

    /* ── section badge ── */
    .badge {
      display:inline-block; background:#fff;
      border:1px solid #D5E5EE; border-radius:100px;
      padding:6px 20px; font-size:.72rem; font-weight:700;
      letter-spacing:.12em; text-transform:uppercase; color:var(--text-mid);
      margin-bottom:1.4rem;
    }

    /* ── specialty card ── */
    .spec {
      background:#fff; border:1px solid #E3EDF4; border-radius:18px;
      padding:1.8rem 1.2rem; text-align:center; cursor:pointer;
      transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
    }
    .spec:hover { transform:translateY(-6px) scale(1.03); box-shadow:0 16px 32px rgba(46,134,193,0.12); border-color:var(--sky); }

    /* ── doctor card ── */
    .doccard {
      background:#fff; border:1px solid #E3EDF4; border-radius:20px;
      padding:2rem 1.5rem; text-align:center; cursor:pointer;
      transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
    }
    .doccard:hover { transform:translateY(-8px); box-shadow:0 20px 40px rgba(46,134,193,0.14); }

    /* ── check row ── */
    .chk {
      display:flex; align-items:center; gap:13px;
      background:#fff; border:1px solid #E3EDF4; border-radius:12px;
      padding:14px 20px; margin-bottom:10px;
      transition:border-color .25s, box-shadow .25s;
    }
    .chk:hover { border-color:var(--sky); box-shadow:0 4px 12px rgba(46,134,193,0.08); }

    /* ── testimonial ── */
    .tcard {
      background:#fff; border:1px solid #E3EDF4; border-radius:20px;
      padding:2rem; cursor:default;
      transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
    }
    .tcard:hover { transform:translateY(-6px); box-shadow:0 16px 32px rgba(46,134,193,0.11); }

    /* ── footer link ── */
    .fl { font-size:.85rem; margin-bottom:.55rem; cursor:pointer; transition:color .2s; color:rgba(255,255,255,0.60); }
    .fl:hover { color:#C4DAE8; }

    /* ── search input focus ── */
    .srch:focus { outline:none; border-color:rgba(255,255,255,0.55) !important; }

    /* ── glass login btn ── */
    .loginbtn {
      padding:11px; background:rgba(255,255,255,0.12);
      border:1px solid rgba(255,255,255,0.22); border-radius:12px;
      color:rgba(255,255,255,0.90); font-size:.83rem; font-weight:500;
      cursor:pointer; font-family:'DM Sans',sans-serif;
      transition:background .2s;
    }
    .loginbtn:hover { background:rgba(255,255,255,0.22); }

    /* ── stat tiles ── */
    .tile-a { background:linear-gradient(135deg,#1A5C85,var(--blue)); border-radius:20px; }
    .tile-b { background:linear-gradient(135deg,var(--teal),var(--blue-mid)); border-radius:20px; }
    .tile-c { background:#fff; border:1px solid #E3EDF4; border-radius:20px; }
    .tile-d { background:var(--sky); border-radius:20px; }

    /* ── CTA banner inside testimonials section ── */
    .ctabanner {
      background:linear-gradient(135deg,#1A5C85 0%,var(--teal) 100%);
      border-radius:24px; overflow:hidden; position:relative;
    }
    .ctabanner::before {
      content:''; position:absolute; top:-40%; right:-5%;
      width:340px; height:340px;
      background:rgba(255,255,255,0.07); border-radius:50%;
    }

    /* ── hero glass overlay ── */
    .hero-glass-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(26, 82, 118, 0.75) 0%, rgba(46, 134, 193, 0.65) 45%, rgba(91, 157, 184, 0.60) 100%);
      backdrop-filter: blur(2px);
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rev");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.10 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */



const SERVICES = [
  {
    icon: <CalendarCheck size={20} />,
    title: "Appointment Booking",
    desc: "Schedule visits with top specialists in real time. Pick your preferred slot online or via phone."
  },
  {
    icon: <Stethoscope size={20} />,
    title: "Health Checkup",
    desc: "Describe your symptoms and get instant AI-powered specialist recommendations."
  },
  {
    icon: <FileText size={20} />,
    title: "Digital Health Records",
    desc: "Access reports, prescriptions, and complete medical history from a single secure dashboard."
  },
  {
    icon: <FlaskConical size={20} />,
    title: "Lab Reports Online",
    desc: "Receive and track your lab results digitally with expert annotations."
  },
  {
    icon: <Siren size={20} />,
    title: "24/7 Emergency Care",
    desc: "Round-the-clock emergency response with rapid triage and specialist access."
  },
  {
    icon: <Video size={20} />,
    title: "Video Teleconsult",
    desc: "Connect with any specialist via secure HD video from the comfort of your home."
  }
];



// const STEPS = [
//   {
//     num: "01",
//     icon: <Search size={20} />,
//     title: "Search",
//     sub: "Enter doctor or symptoms"
//   },
//   {
//     num: "02",
//     icon: <CalendarCheck size={20} />,
//     title: "Book Slot",
//     sub: "Pick your time"
//   },
//   {
//     num: "03",
//     icon: <MessageCircle size={20} />,
//     title: "Consult",
//     sub: "In-person or video"
//   },
//   {
//     num: "04",
//     icon: <FileText size={20} />,
//     title: "Get Records",
//     sub: "Reports online"
//   }
// ];


const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Search",
    sub: "Enter doctor or symptoms"
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Book Slot",
    sub: "Pick your time"
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "Consult",
    sub: "In-person or video"
  },
  {
    num: "04",
    icon: FileText,
    title: "Get Records",
    sub: "Reports online"
  }
];
const SPECS = [
  { e:"❤️", n:"Cardiology",       s:"Heart & Vascular" },
  { e:"🧠", n:"Neurology",        s:"Brain & Nerves" },
  { e:"🦴", n:"Orthopedics",      s:"Bone & Joints", feat:true },
  { e:"👶", n:"Pediatrics",       s:"Child Health" },
  { e:"🔬", n:"Oncology",         s:"Cancer Care" },
  { e:"👁️", n:"Ophthalmology",    s:"Eye Care" },
  { e:"🦷", n:"Dentistry",        s:"Oral Health" },
  { e:"🫁", n:"Pulmonology",      s:"Lung & Chest" },
  { e:"🩺", n:"General Medicine", s:"Primary Care" },
  { e:"🧬", n:"Genetics",         s:"Hereditary" },
];

const DOCS = [
  { ini:"PM", name:"Dr. Priya Mehta",  sp:"Cardiologist", exp:"18 yrs", rat:"4.9", av:"Available Today",    bg:"#B4CDD9" },
  { ini:"AS", name:"Dr. Arjun Shah",   sp:"Neurologist",  exp:"14 yrs", rat:"4.8", av:"Available Tomorrow", bg:"#9DC0D2", feat:true },
  { ini:"KN", name:"Dr. Kavya Nair",   sp:"Pediatrician", exp:"11 yrs", rat:"4.9", av:"Available Today",    bg:"#B4CDD9" },
  { ini:"RP", name:"Dr. Rohan Patel",  sp:"Orthopedist",  exp:"16 yrs", rat:"4.7", av:"Available Wed",      bg:"#C4D9E4" },
];

const TESTS = [
  { n:"Rahul Desai",  c:"Ahmedabad", t:"Found the perfect cardiologist in under 2 minutes. The booking experience was seamless and completely stress-free." },
  { n:"Meena Joshi",  c:"Surat",     t:"Having all my reports in one place is a game changer. No more carrying physical files to every appointment!" },
  { n:"Ankit Shah",   c:"Vadodara",  t:"Highly experienced doctors and the platform is so elegant. Booked my child's appointment in 3 clicks!" },
];

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 48);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:200,
      height:64,display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"0 5vw",
      background: sc ? "rgba(26,92,133,0.92)" : "rgba(26,92,133,0.3)",
      backdropFilter: "blur(20px)",
      borderBottom: sc ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.08)",
      transition:"background .4s,backdrop-filter .4s",
    }}>
      
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section style={{
      minHeight:"100vh",
      position:"relative",overflow:"hidden",
      display:"flex",alignItems:"center",
      padding:"140px 5vw 140px",gap:"4vw",
    }}>
      {/* Background Image */}
      <div style={{
        position:"absolute",
        inset:0,
        backgroundImage:"url('/hero-bg.jpg')",
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
      }}/>
      
      {/* Glass Overlay */}
      <div className="hero-glass-overlay"/>

      {/* Blobs */}
      <div className="blob"  style={{position:"absolute",top:"-12%",right:"12%",width:420,height:420,background:"rgba(196,218,232,0.11)",borderRadius:"50%",pointerEvents:"none",zIndex:1}}/>
      <div className="blob2" style={{position:"absolute",bottom:"-10%",left:"-6%", width:350,height:350,background:"rgba(196,218,232,0.08)",borderRadius:"50%",pointerEvents:"none",zIndex:1}}/>
      {/* shimmer line */}
      <div className="shim" style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,transparent,#C4DAE8,transparent)",overflow:"hidden",zIndex:2}}/>

      {/* LEFT */}
      {/* <div style={{flex:1,zIndex:3,maxWidth:710}}> */}
      <div style={{
  flex:1,
  zIndex:3,
  maxWidth:650,
  margin:"0 auto",
  textAlign:"center",
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
}}>
        {/* pill */}
        <div style={{
          display:"inline-flex",alignItems:"center",gap:8,
          background:"rgba(255,255,255,0.15)",backdropFilter:"blur(12px)",
          border:"1px solid rgba(255,255,255,0.28)",
          borderRadius:"100px",padding:"6px 16px",
          fontSize:".76rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",
          color:"rgba(255,255,255,0.92)",marginBottom:"1.6rem",
        }}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}/>
          Advanced Healthcare · Ahmedabad
        </div>

       
        <h1 style={{
  fontFamily:"'Poppins, sans-serif",
  fontSize:"clamp(3rem,5.5vw,4.8rem)",
  fontWeight:700,
  color:"#fff",
  lineHeight:1.04,
  marginBottom:"1.3rem",
  textShadow:"0 2px 20px rgba(0,0,0,0.2)"
}}>
  YOUR HEALTH,
  <em style={{
    display:"block",
    fontStyle:"italic",
    color:"rgba(255,255,255,0.88)"
  }}>
    Our Priority
  </em>
</h1>

        <p style={{color:"rgba(255,255,255,0.78)",fontSize:".98rem",lineHeight:1.82,maxWidth:650,marginBottom:"2.2rem"}}>
          Book consultations effortlessly with trusted professionals, <br/> supported by organized records and seamless management. Designed for simple, reliable access to modern healthcare.
        </p>

        <div style={{display:"flex",gap:"1rem",marginBottom:"2.2rem",flexWrap:"wrap"}}>
          <button className="btn-white" style={{padding:"13px 26px",fontSize:".94rem"} } onClick={() => navigate("/login")}  >Book Appointment</button>
         
        </div>

       
        

{/* trust pills */}
<div style={{display:"flex",gap:".75rem",flexWrap:"wrap"}}>
  {[
    { icon: <Building2 size={14} />, text: "NABH Accredited" },
    { icon: <Siren size={14} />, text: "24/7 Emergency" },
    { icon: <Users size={14} />, text: "50K+ Patients" },
    { icon: <Star size={14} />, text: "20+ Years" },
  ].map((b) => (
    
    <span key={b.text} style={{
      display:"flex",
      alignItems:"center",
      gap:"6px",
      background:"rgba(255,255,255,0.15)",
      backdropFilter:"blur(10px)",
      border:"1px solid rgba(255,255,255,0.25)",
      borderRadius:"100px",
      padding:"5px 13px",
      fontSize:".76rem",
      fontWeight:500,
      color:"rgba(255,255,255,0.92)",
    }}>
      
      {/* Icon */}
      <span style={{display:"flex",alignItems:"center"}}>
        {b.icon}
      </span>

      {/* Text */}
      {b.text}

    </span>
  ))}
</div>
      </div>

      

      {/* Bottom stat bar */}
<div style={{
  position: "absolute",
  bottom: 0,
  left: "0",
  right: "0",
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  padding: "1.2rem 20vw",
}}>

  {[
    { v: "200+", l: "Specialists" },
    { v: "15+", l: "Departments" },
    { v: "24/7", l: "Emergency" },
    { v: "50K+", l: "Patients" },
  ].map((s, i) => (
    
    <div key={s.l} style={{
      textAlign: "center",
      borderRight: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none",
      padding: "0.8rem 0 1.5rem",
    }}>
      
      {/* Number */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.8rem",
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.2
      }}>
        {s.v}
      </div>

      {/* Label */}
      <div style={{
        marginTop: "4px",
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.75)"
      }}>
        {s.l}
      </div>

    </div>

  ))}

</div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{background:"var(--beige)",padding:"7rem 5vw"}}>
      <div className="rev" style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <span className="badge">Our Services</span>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4vw,3.3rem)",fontWeight:700,color:"var(--text-dark)",lineHeight:1.1}}>
          Everything You Need,<br/>
          <em style={{color:"var(--teal)"}}>In One Platform</em>
        </h2>
        <p style={{color:"var(--text-mid)",fontSize:".93rem",marginTop:"1rem",maxWidth:510,margin:"1rem auto 0"}}>
          From booking to diagnosis to digital prescriptions — KD Care covers your entire healthcare journey.
        </p>
      </div>

      <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
        {SERVICES.map(s=>(
          <div key={s.title} className={`wcard rev`} style={{
            padding:"2rem",cursor:"pointer",
            background: s.hi ? "linear-gradient(145deg,#EAF4FB,#D4ECF7)" : "#fff",
            border: s.hi ? "1px solid #A9D4EC" : "1px solid #E3EDF4",
          }}>
            <div style={{
              width:52,height:52,borderRadius:"14px",
              background: s.hi ? "rgba(46,134,193,0.11)" : "#F2F8FB",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"1.45rem",marginBottom:"1.2rem",
            }}>{s.icon}</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.22rem",fontWeight:700,color:"var(--text-dark)",marginBottom:".55rem"}}>{s.title}</h3>
            <p style={{color:"var(--text-mid)",fontSize:".87rem",lineHeight:1.78}}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
// function HowItWorks() {
//   return (
//     <section id="how-it-works" style={{
//       backgroundImage:"url('/public/search-bg.jpg')",
//       background:"linear-gradient(135deg,#1A5276 0%,#2E86C1 50%,#5B9DB8 100%)",
//       padding:"6.5rem 5vw",position:"relative",overflow:"hidden",
//     }}>
//        {/* Glass Overlay */}
//       <div className="hero-glass-overlay"/>
//       <div className="blob" style={{position:"absolute",top:"-14%",right:"-4%",width:300,height:300,background:"rgba(196,218,232,0.08)",borderRadius:"50%",pointerEvents:"none"}}/>

     

//       <div className="rev" style={{textAlign:"center",marginBottom:"3.5rem",position:"relative",zIndex:2}}>
//         <span style={{
//           display:"inline-block",background:"rgba(255,255,255,0.14)",backdropFilter:"blur(8px)",
//           border:"1px solid rgba(255,255,255,0.24)",borderRadius:"100px",
//           padding:"6px 20px",fontSize:".72rem",fontWeight:700,letterSpacing:".12em",
//           textTransform:"uppercase",color:"rgba(255,255,255,0.85)",marginBottom:"1.4rem",
//         }}>How It Works</span>
//         <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4vw,3.2rem)",fontWeight:700,color:"#fff",lineHeight:1.1}}>
//           Healthcare in 4 <em style={{color:"#C4DAE8"}}>Simple Steps</em>
//         </h2>
//         <p style={{color:"rgba(255,255,255,0.63)",fontSize:".91rem",marginTop:".8rem"}}>Powered by AI, designed for humans.</p>
//       </div>

//       {/* Timeline */}
//       <div className="rev" style={{
//         display:"flex",alignItems:"flex-start",justifyContent:"center",
//         maxWidth:860,margin:"0 auto",position:"relative",zIndex:2,
//       }}>
//         {STEPS.map((s,i)=>(
//           <div key={s.num} style={{display:"flex",alignItems:"flex-start",flex:1,minWidth:0}}>
//             <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
//               <div className="pulse" style={{
//                 width:60,height:60,borderRadius:"50%",
//                 background: i===0 ? "#fff" : "rgba(255,255,255,0.16)",
//                 backdropFilter:"blur(8px)",
//                 border:"1px solid rgba(255,255,255,0.28)",
//                 display:"flex",alignItems:"center",justifyContent:"center",
//                 fontSize:"1.35rem",marginBottom:".9rem",flexShrink:0,
//               }}>{s.icon}</div>
//               <div style={{color:"rgba(255,255,255,0.50)",fontSize:".7rem",fontWeight:600,marginBottom:".25rem"}}>{s.num}</div>
//               <div style={{color:"#fff",fontSize:".92rem",fontWeight:700,marginBottom:".25rem"}}>{s.title}</div>
//               <div style={{color:"rgba(255,255,255,0.58)",fontSize:".76rem",textAlign:"center"}}>{s.sub}</div>
//             </div>
//             {i<STEPS.length-1 && (
//               <div style={{alignSelf:"flex-start",marginTop:30,height:"1px",background:"rgba(255,255,255,0.22)",flex:"0 0 1px",width:"100%",minWidth:20}}/>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }





const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  "https://i.pinimg.com/1200x/a4/02/b0/a402b016289466ff0953a81fc82a6db3.jpg",
  
  "https://i.pinimg.com/736x/d1/09/14/d10914cd89cf455e6229427211868094.jpg",
  "https://i.pinimg.com/1200x/5c/83/3d/5c833d5888f1ff276880d119a636a02e.jpg",
]


function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative min-h-[600px] overflow-hidden py-28 px-[5vw] flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0">
        {BACKGROUNDS.map((bg, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${bg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: activeStep === index ? 1 : 0,
              transform: `translateX(${(index - activeStep) * 100}%)`,
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A5276]/80 via-[#2E86C1]/70 to-[#5B9DB8]/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">

        {/* HEADER */}
        <div className="mb-16 flex flex-col items-center">
          
          <span className="inline-block bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-8 py-3 text-xs font-semibold tracking-widest uppercase text-white/85 mb-8">
            How It Works
          </span>

          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-white leading-tight max-w-2xl">
            Healthcare in 4{" "}
            <em className="text-[#C4DAE8] not-italic">Simple Steps</em>
          </h2>

          <p className="text-white/70 text-sm mt-4 max-w-md">
            Powered by AI, designed for humans.
          </p>
        </div>

        {/* STEPS */}
        <div className="flex items-start justify-center gap-4">

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <div key={step.num} className="flex items-center flex-1">

                {/* STEP */}
                <div className="flex flex-col items-center flex-1 text-center">

                  {/* ICON */}
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`
                      w-[64px] h-[64px] rounded-full flex items-center justify-center
                      transition-all duration-300 mb-4
                      ${isActive
                        ? "bg-white scale-110 shadow-xl"
                        : "bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        w-6 h-6
                        ${isActive ? "text-[#1A5276]" : "text-white/80"}
                      `}
                    />
                  </button>

                  {/* NUMBER */}
                  <div className="text-xs font-semibold text-white/60 mb-1">
                    {step.num}
                  </div>

                  {/* TITLE */}
                  <div className="text-sm font-bold text-white mb-1">
                    {step.title}
                  </div>

                  {/* SUBTEXT */}
                  <div className="text-xs text-white/60 max-w-[120px]">
                    {step.sub}
                  </div>
                </div>

                {/* CONNECTOR */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-[1px] bg-white/20 mx-2 relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-white transition-all duration-500"
                      style={{
                        width: activeStep > index ? "100%" : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        

      </div>
    </section>
  );
}
/* ─────────────────────────────────────────────
   SPECIALTIES
───────────────────────────────────────────── */
function Specialties() {
  return (
    <section id="specialties" style={{background:"var(--beige)",padding:"7rem 5vw"}}>
      <div className="rev" style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <span className="badge">Specialties</span>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4vw,3.3rem)",fontWeight:700,color:"var(--text-dark)"}}>
          30+ <em style={{color:"var(--teal)"}}>Medical</em> Specialties
        </h2>
        <p style={{color:"var(--text-mid)",fontSize:".91rem",marginTop:".8rem"}}>World-class care across every discipline of modern medicine.</p>
      </div>

      <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"1rem"}}>
        {SPECS.map(s=>(
          <div key={s.n} className="spec rev" style={{
            transform: s.feat?"translateY(-8px)":undefined,
            boxShadow: s.feat?"0 16px 36px rgba(46,134,193,0.13)":undefined,
            border: s.feat?"1px solid var(--sky)":undefined,
          }}>
            <div style={{fontSize:"2rem",marginBottom:".85rem"}}>{s.e}</div>
            <div style={{fontWeight:700,fontSize:".92rem",color:"var(--text-dark)",marginBottom:".22rem"}}>{s.n}</div>
            <div style={{color:"var(--text-light)",fontSize:".76rem"}}>{s.s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DOCTORS
───────────────────────────────────────────── */
function Doctors() {
  return (
    <section id="doctors" style={{background:"#F8F4F0",padding:"7rem 5vw"}}>
      <div className="rev" style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <span className="badge">Our Specialists</span>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4vw,3.3rem)",fontWeight:700,color:"var(--text-dark)"}}>
          Meet Our <em style={{color:"var(--teal)"}}>Expert Doctors</em>
        </h2>
        <p style={{color:"var(--text-mid)",fontSize:".91rem",marginTop:".8rem"}}>Board-certified specialists with decades of combined experience.</p>
      </div>

      <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.2rem"}}>
        {DOCS.map(d=>(
          <div key={d.name} className="doccard rev" style={{
            transform: d.feat?"translateY(-8px)":undefined,
            boxShadow: d.feat?"0 20px 42px rgba(46,134,193,0.14)":undefined,
          }}>
            {/* Avatar */}
            <div className="pulse" style={{
              width:70,height:70,borderRadius:"50%",
              background:d.bg,
              display:"flex",alignItems:"center",justifyContent:"center",
              margin:"0 auto 1.2rem",
              fontFamily:"'DM Sans',sans-serif",fontSize:"1.05rem",fontWeight:700,
              color:"#1A3A52",
            }}>{d.ini}</div>

            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.12rem",fontWeight:700,color:"var(--text-dark)",marginBottom:".2rem"}}>{d.name}</h3>
            <p style={{color:"var(--text-light)",fontSize:".8rem",marginBottom:"1rem"}}>{d.sp}</p>

            <div style={{display:"flex",gap:".55rem",justifyContent:"center",marginBottom:".9rem"}}>
              <span style={{background:"#F0F4F8",color:"var(--text-mid)",padding:"4px 11px",borderRadius:"100px",fontSize:".73rem",fontWeight:500}}>💬 {d.exp}</span>
              <span style={{background:"#FFF7E6",color:"#d97706",padding:"4px 11px",borderRadius:"100px",fontSize:".73rem",fontWeight:500}}>⭐ {d.rat}</span>
            </div>

            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:"1.2rem",color:"#16a34a",fontSize:".78rem",fontWeight:600}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>
              {d.av}
            </div>

            <button className="btn-white" style={{width:"100%",padding:"11px",fontSize:".83rem",borderRadius:"12px",border:"1px solid #DCE8F0"}}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT + STATS
───────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{background:"var(--beige)",padding:"7rem 5vw"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5vw",alignItems:"center"}}>
        <div className="rev">
          <span className="badge">About KD Care</span>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,2.9rem)",fontWeight:700,color:"var(--text-dark)",lineHeight:1.15,marginBottom:"1.2rem"}}>
            Multi-Specialty Care with a <em style={{color:"var(--teal)"}}>Human Touch</em>
          </h2>
          <p style={{color:"var(--text-mid)",fontSize:".9rem",lineHeight:1.82,marginBottom:"1.8rem"}}>
            Founded in 2005, KD Care Hospital has grown into one of Gujarat&apos;s most trusted healthcare institutions, combining cutting-edge technology with compassionate, patient-first care.
          </p>
          {["24/7 Emergency Services","NABH Accredited Facility","Advanced Diagnostic Labs"].map(item=>(
            <div key={item} className="chk">
              <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,var(--blue),var(--teal))",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:".8rem",flexShrink:0}}>✓</div>
              <span style={{fontWeight:600,fontSize:".9rem",color:"var(--text-dark)"}}>{item}</span>
            </div>
          ))}
        </div>

        <div className="rev sg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          {[
            {v:"200+",l:"Expert Doctors",   cls:"tile-a",tc:"#fff",sc:"rgba(255,255,255,0.70)"},
            {v:"50K+",l:"Happy Patients",   cls:"tile-b",tc:"#fff",sc:"rgba(255,255,255,0.70)"},
            {v:"20+", l:"Years of Service", cls:"tile-c",tc:"var(--text-dark)",sc:"var(--text-mid)"},
            {v:"15+", l:"Departments",      cls:"tile-d",tc:"var(--text-dark)",sc:"var(--text-mid)"},
          ].map(s=>(
            <div key={s.l} className={`${s.cls} rev`} style={{padding:"2.2rem 1.8rem"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.6rem",fontWeight:700,color:s.tc,lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:".81rem",color:s.sc,marginTop:".5rem"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS + CTA
───────────────────────────────────────────── */
function Testimonials() {
  const navigate = useNavigate();
  return (
    <section id="testimonials" style={{background:"#F8F4F0",padding:"7rem 5vw"}}>
      <div className="rev" style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4vw,3.3rem)",fontWeight:700,color:"var(--text-dark)"}}>
          What Our <em style={{color:"var(--teal)"}}>Patients Say</em>
        </h2>
      </div>

      <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem",marginBottom:"2.5rem"}}>
        {TESTS.map(t=>(
          <div key={t.n} className="tcard rev">
            <div style={{color:"#f59e0b",fontSize:"1rem",marginBottom:".9rem"}}>★★★★★</div>
            <p style={{color:"var(--text-mid)",fontSize:".88rem",lineHeight:1.82,fontStyle:"italic",marginBottom:"1.4rem"}}>&quot;{t.t}&quot;</p>
            <div style={{display:"flex",alignItems:"center",gap:"0.85rem"}}>
              <div style={{
                width:42,height:42,borderRadius:"50%",flexShrink:0,
                background:"linear-gradient(135deg,var(--sky),#A8C6D8)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontWeight:700,fontSize:".93rem",color:"#1A3A52",
              }}>{t.n[0]}</div>
              <div>
                <div style={{fontWeight:700,fontSize:".88rem",color:"var(--text-dark)"}}>{t.n}</div>
                <div style={{fontSize:".76rem",color:"var(--text-light)"}}>{t.c}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="rev ctabanner" style={{padding:"3rem 3.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2rem",flexWrap:"wrap"}}>
        <div style={{position:"relative",zIndex:1}}>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:700,color:"#fff",marginBottom:".5rem"}}>
            Ready to prioritize your health?
          </h3>
          <p style={{color:"rgba(255,255,255,0.68)",fontSize:".88rem"}}>Book your appointment in under 2 minutes. No paperwork, no waiting.</p>
        </div>
        <div style={{display:"flex",gap:"1rem",flexShrink:0,position:"relative",zIndex:1}}>
          <button className="btn-white" style={{padding:"14px 26px",fontSize:".91rem",whiteSpace:"nowrap"}} onClick={() => navigate("/login")}>📅 Book Appointment</button>
          <button className="btn-ghost" style={{padding:"14px 22px",fontSize:".91rem",whiteSpace:"nowrap"}}>📞 +91 79 2600 1234</button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────���──────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{background:"#152D3E",padding:"4rem 5vw 2rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"3rem",paddingBottom:"2.5rem",borderBottom:"1px solid rgba(255,255,255,0.09)"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#fff",marginBottom:"1rem"}}>
            KD <span style={{color:"#C4DAE8"}}>Care</span>
          </div>
          <p style={{fontSize:".84rem",lineHeight:1.8,color:"rgba(255,255,255,0.58)",maxWidth:260}}>Gujarat&apos;s most trusted multi-specialty hospital network — compassionate care, world-class expertise.</p>
        </div>
        {[
          {h:"Services", items:["Appointment Booking","AI Symptom Check","Lab Reports","Teleconsult"]},
          {h:"Company",  items:["About Us","Careers","Blog","Press"]},
          {h:"Support",  items:["Help Centre","Contact","Privacy","Terms"]},
        ].map(col=>(
          <div key={col.h}>
            <h4 style={{color:"#fff",fontSize:".8rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"1rem"}}>{col.h}</h4>
            {col.items.map(item=><div key={item} className="fl">{item}</div>)}
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"1.6rem",fontSize:".79rem",flexWrap:"wrap",gap:".5rem"}}>
        <span style={{color:"rgba(255,255,255,0.50)"}}>© 2026 KD Care Hospital. All rights reserved.</span>
        <span style={{color:"#C4DAE8"}}>Made with ❤️ in Ahmedabad</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function KDCareLanding() {
  useReveal();
  return (
    <>
    <div className="pt-32">

    
      <G />
     
      <Hero />
      <Services />
      <HowItWorks />
      <Specialties />
      <Doctors />
      <About />
      <Testimonials />
      <Footer />
    </div>
    </>
  );
}