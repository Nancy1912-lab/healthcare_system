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
  { n: "Cardiology",    s: "Heart & Vascular", img: "https://i.pinimg.com/736x/f4/01/16/f40116a0f9791c413745df048d00bd6a.jpg" },
  { n: "Neurology",     s: "Brain & Nerves",   img: "https://i.pinimg.com/736x/66/97/47/6697472cb4b31e52f580095c5662d8b5.jpg" },
  { n: "Orthopedics",   s: "Bone & Joints",    img: "https://i.pinimg.com/1200x/76/64/49/766449a0016240421c95c63d89015946.jpg" },
  { n: "Pediatrics",    s: "Child Health",     img: "https://i.pinimg.com/1200x/21/f0/e0/21f0e0be76deb4239981066cae12780f.jpg" },
  { n: "Oncology",      s: "Cancer Care",      img: "https://i.pinimg.com/1200x/b6/2c/90/b62c906fb930c7c9ff178073300c14da.jpg" },
  { n: "Ophthalmology", s: "Eye Care",         img: "https://i.pinimg.com/1200x/ff/06/5d/ff065deb7a9ab0d932ff2f4a0ed99724.jpg" },
  { n: "Gynaecology",     s: "Women reproductive health",      img: "https://i.pinimg.com/1200x/33/26/4b/33264b881fea66390fd0a86eb2bf3c70.jpg" },
  { n: "Lung Transplant",   s: "Lung ",     img: "https://i.pinimg.com/736x/01/8b/e6/018be610093e798e4660eda1603b01a1.jpg" },
];

const DOCS = [
  {
    ini:"PM", name:"Dr. Nidhi Shah", sp:"Cardiologist",
   
    exp:"18 yrs", rat:"4.9", av:"Available Today", avSoon:false,
    img:"https://i.pinimg.com/736x/1b/52/fd/1b52fd81c2282b432b85dc6a8a01f13d.jpg",
    patients:"1.2k+", satisfaction:"98%", awards:"18",
  },
  {
    ini:"AS", name:"Dr. Aakash Joshi", sp:"Neurologist",
   
    exp:"14 yrs", rat:"4.8", av:"Available Tomorrow", avSoon:true,
    img:"https://i.pinimg.com/736x/9d/c7/01/9dc7016b0c700c0b307e00d2af763934.jpg",
    feat:true,
    patients:"980+", satisfaction:"96%", awards:"12",
  },
  {
    ini:"KN", name:"Dr. Rakesh Mehta", sp:"Ophthalmology",
    
    exp:"11 yrs", rat:"4.9", av:"Available Today", avSoon:false,
    img:"https://i.pinimg.com/1200x/ea/1a/73/ea1a73d3a525741093432da7d4391532.jpg",
    patients:"850+", satisfaction:"99%", awards:"9",
  },
  
  

  
];
const TESTS = [
  { n:"Rahul Desai",  c:"Ahmedabad", t:"Found the perfect cardiologist in under 2 minutes. The booking experience was seamless and completely stress-free." },
  { n:"Meena Joshi",  c:"Surat",     t:"Having all my reports in one place is a game changer. No more carrying physical files to every appointment!" },
  { n:"Ankit Shah",   c:"Vadodara",  t:"Highly experienced doctors and the platform is so elegant. Booked my child's appointment in 3 clicks!" },
];

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
// function Navbar() {
//   const [sc, setSc] = useState(false);
//   useEffect(() => {
//     const h = () => setSc(window.scrollY > 48);
//     window.addEventListener("scroll", h);
//     return () => window.removeEventListener("scroll", h);
//   }, []);

//   return (
//     <nav style={{
//       position:"fixed",top:0,left:0,right:0,zIndex:200,
//       height:64,display:"flex",alignItems:"center",justifyContent:"space-between",
//       padding:"0 5vw",
//       background: sc ? "rgba(26,92,133,0.92)" : "rgba(26,92,133,0.3)",
//       backdropFilter: "blur(20px)",
//       borderBottom: sc ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.08)",
//       transition:"background .4s,backdrop-filter .4s",
//     }}>
      
//     </nav>
//   );
// }

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section id="home" style={{
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
          From booking to diagnosis to digital prescriptions — Nexora HealthCare covers your entire healthcare journey.
        </p>
      </div>

      <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
        {SERVICES.map(s=>(
         
          <div
  key={s.title}
  className="wcard rev"
  style={{
    padding: "2rem",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ffffff 0%, #f4f8fb 60%, #e6eff5 100%)",
border: "1px solid rgba(86,124,141,0.15)",
boxShadow: "0 10px 30px rgba(46,134,193,0.08)",
    
    borderRadius: "20px",
    display: "flex",          
    alignItems: "flex-start", 
    gap: "1.2rem",            
  }}
>

  {/* ICON */}
  <div style={{
    width: 70,
    height: 70,
    borderRadius: "18px",
    background: "rgba(46,134,193,0.11)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}>
    {s.icon}
  </div>

  {/* TEXT CONTENT */}
  <div>

    <h3 style={{
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "1.6rem",
      fontWeight: 700,
      color: "var(--text-dark)",
      marginBottom: ".4rem"
    }}>
      {s.title}
    </h3>

    <p style={{
      color: "var(--text-mid)",
      fontSize: ".9rem",
      lineHeight: 1.7
    }}>
      {s.desc}
    </p>

  </div>

</div>
        ))}
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
const BACKGROUNDS = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  "https://i.pinimg.com/1200x/a4/02/b0/a402b016289466ff0953a81fc82a6db3.jpg",
  
  "https://i.pinimg.com/736x/d1/09/14/d10914cd89cf455e6229427211868094.jpg",
  "https://i.pinimg.com/1200x/5c/83/3d/5c833d5888f1ff276880d119a636a02e.jpg",
]

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

   useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="how-it-works" className="relative min-h-[600px] overflow-hidden py-28 px-[5vw] flex items-center justify-center">

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
        <div className="mb-20 flex flex-col items-center px-6 py-8 gap-4">
       
          
          <div style={{
          display:"inline-flex",alignItems:"center",gap:8,
          background:"rgba(255,255,255,0.15)",backdropFilter:"blur(12px)",
          border:"1px solid rgba(255,255,255,0.28)",
          borderRadius:"100px",padding:"6px 16px",
          fontSize:".76rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",
          color:"rgba(255,255,255,0.92)",marginBottom:"1.6rem",
        }}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",display:"inline-block"}}/>
            How It Works     
        </div>

          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-white leading-tight max-w-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>  
            Healthcare in 4{" "}
            <em className="text-[#C4DAE8] not-italic">Simple Steps</em>
          </h2>

          <p className="text-white/70 text-sm mt-4 max-w-md">
            Powered by AI, designed for humans.
            <br />
            .
          </p>
        </div>

        {/* STEPS */}
        <div className="flex items-center justify-center gap-8 mt-10"
         onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}>

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;

            return (
              <div key={step.num} className="flex items-center flex-1 ">

                {/* STEP */}
                <div className="flex flex-col items-center flex-6 text-center gap-3 ">

                  {/* ICON */}
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`
                      w-[64px] h-[64px] rounded-full flex items-center justify-center
                      transition-all duration-300 mb-3 
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
                  <div className="text-xs font-semibold text-white/60 mb-2">
                    {step.num}
                  </div>

                  {/* TITLE */}
                  <div className="text-sm font-bold text-white mb-2">
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

const THEMES = [
  { slash: "from-[#2F4156]/90 to-[#1e3048]/97",   corner: "bg-[#2F4156]/50", btn: "bg-[#2F4156]/55" },
  { slash: "from-[#567C8D]/90 to-[#385c6e]/97",   corner: "bg-[#567C8D]/48", btn: "bg-[#567C8D]/55" },
  { slash: "from-[#98b2d2]/90 to-[#6487af]/97",   corner: "bg-[#CBD8E6]/55", btn: "bg-[#98b2d2]/60" },
  { slash: "from-[#1e3048]/95 to-[#2F4156]/90",   corner: "bg-[#1e3048]/50", btn: "bg-[#1e3048]/60" },
  { slash: "from-[#385c6e]/94 to-[#567C8D]/90",   corner: "bg-[#385c6e]/48", btn: "bg-[#385c6e]/60" },
  { slash: "from-[#789ec4]/90 to-[#a5c3dc]/88",   corner: "bg-[#789ec4]/50", btn: "bg-[#789ec4]/60" },
  { slash: "from-[#2F4156]/90 to-[#567C8D]/92",   corner: "bg-[#2F4156]/44", btn: "bg-[#435e72]/60" },
  { slash: "from-[#567C8D]/90 to-[#b4cee1]/88",   corner: "bg-[#567C8D]/44", btn: "bg-[#567C8D]/60" },
];

function SpecCard({ s, index }) {
  const t = THEMES[index % THEMES.length];
  const num = String((index % SPECS.length) + 1).padStart(2, "0");
  const navigate = useNavigate();

  return (
    <div 
  className="group relative w-[340px] h-[480px] rounded-[20px] overflow-hidden flex-shrink-0 cursor-pointer shadow-[0_4px_22px_rgba(47,65,86,0.13)] hover:-translate-y-2.5 hover:scale-[1.03] hover:shadow-[0_24px_50px_rgba(47,65,86,0.22)] transition-all duration-300 ease-out"
  onClick={() => navigate(`/specialities/${encodeURIComponent(s.n)}`)}
>

      {/* Photo */}
      <img src={s.img} alt={s.n}
        className="absolute inset-0 w-full h-[340px] object-cover group-hover:scale-[1.08] transition-transform duration-500" />

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F4156]/10 to-[#2F4156]/68 z-[1]" />

      {/* Diagonal slash */}
      <div className={`absolute -bottom-0.5 -left-0.5 -right-0.5 h-[195px] z-[2] bg-gradient-to-br ${t.slash}`}
        style={{ clipPath: "polygon(0 55px, 100% 0, 100% 100%, 0 100%)" }} />

      {/* Corner triangle */}
      <div className={`absolute top-0 right-0 w-[75px] h-[75px] z-[2] ${t.corner}`}
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

      {/* Frosted pill */}
      <div className="absolute top-3.5 left-3.5 z-[4] bg-white/20 backdrop-blur border border-white/35 rounded-full px-3 py-[3px] text-[0.58rem] font-bold tracking-[0.1em] text-white uppercase">
        {s.s}
      </div>

      {/* Text */}
      <div className="absolute bottom-12 left-4 right-0 z-[4] p-5">
        <div className="text-[0.58rem] font-bold tracking-[0.13em] text-white/50 mb-1 uppercase">
          {num} / 30+
        </div>
        <div className="text-[1.6rem] font-bold text-white leading-tight drop-shadow-md mb-0.5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {s.n}
        </div>
        <div className="text-[0.68rem] text-white/72 font-medium tracking-[0.07em] uppercase">
          {s.s}
        </div>
      </div>

      {/* Arrow */}
      <div className={`absolute bottom-4 right-4 z-[5] w-8 h-8 rounded-full flex items-center justify-center border border-white/55 ${t.btn} opacity-0 scale-50 rotate-[-45deg] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-300`}>
        <svg className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
          <line x1="3" y1="13" x2="13" y2="3"/><polyline points="6,3 13,3 13,10"/>
        </svg>
      </div>
    </div>
  );
}
import { useRef } from "react";

function Specialties() {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  return (
    <section id="specialties" style={{ background: "var(--beige)", padding: "7rem 0" }}>
      <div className="rev" style={{ textAlign: "center", marginBottom: "3.5rem", padding: "0 5vw" }}>
        <span 
  className="badge"
  onClick={() => navigate("/specialities")}
  style={{ cursor: "pointer", position: "relative", zIndex: 10 }}
>
  Specialties
</span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.2rem, 4vw, 3.3rem)",
          fontWeight: 700,
          color: "var(--text-dark)",
          margin: "0 0 0.6rem",
        }}>
          30+ <em style={{ color: "var(--teal)", fontStyle: "italic" }}>Medical</em> Specialties
        </h2>
        <p style={{ color: "var(--text-mid)", fontSize: ".91rem", marginTop: ".8rem" }}>
          World-class care across every discipline of modern medicine.
        </p>
      </div>

      <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 80, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, var(--beige), transparent)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 80, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to left, var(--beige), transparent)" }} />

        <div
          ref={trackRef}
          className="flex gap-[1.3rem] w-max py-6 px-4"
          style={{ animation: "specScroll 34s linear infinite" }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
        >
          {[...SPECS, ...SPECS].map((s, i) => (
            <SpecCard key={i} s={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes specScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
/* ─────────────────────────────────────────────
   DOCTORS
───────────────────────────────────────────── */

function DoctorCard({ d }) {
  const [imgFailed, setImgFailed] = useState(!d.img);

  return (
    <div className={`w-[420px] h-[500px] rounded-[22px] overflow-hidden bg-white border transition-all duration-300 cursor-pointer flex flex-col
      hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(47,65,86,0.13)]
      ${d.feat
        ? "-translate-y-3 shadow-[0_28px_64px_rgba(86,124,141,0.22)] border-[#567C8D]/40"
        : "border-[#567C8D]/15"
      }`}
    >
      {/* ── Photo ── */}
      <div className="relative h-[350px] overflow-hidden flex-shrink-0 group">
        {!imgFailed ? (
          <img
            src={d.img} alt={d.name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-[#CBD9E6]"
            style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontWeight:700, color:"#2F4156" }}
          >{d.ini}</div>
        )}

        {/* gradient */}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(20,38,54,.72) 0%,transparent 55%)" }} />

        {/* specialty — centred at bottom */}
        <span className="absolute bottom-3 left-15.5 -translate-x-1/2 text-[10px] font-bold tracking-[.14em] uppercase text-white/90 whitespace-nowrap">
          {d.sp}
        </span>

        {d.feat && (
          <span className="absolute top-3.5 right-3.5 bg-[#2F4156] text-white text-[9px] font-bold tracking-[.1em] uppercase px-3 py-1.5 rounded-full">
            ★ Top Rated
          </span>
        )}
      </div>

      {/* ── Body — fully centred ── */}
      <div className="flex flex-col items-center text-center px-6 pt-7 pb-7 flex-1 gap-1.5 ">

        <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }}
          className="text-[1.9rem] font-bold text-[#1A2E3D] leading-tight mb-1">
          {d.name}
        </h3>
        <p className="text-[11.5px] text-[#9AB0BC] tracking-wide mb-4 leading-relaxed max-w-[260px]">{d.tagline}</p>

        {/* pills */}
        <div className="flex gap-2 justify-center flex-wrap mt-2">
          <span className=" text-[12px] font-medium bg-[#EEF4F7] text-[#3E7A92] px-3 py-3 rounded-full">
            {d.exp} experience
          </span>
          {/* <span className="text-[12px] font-medium bg-[#FFF8EC] text-[#A86C0A] px-3 py-3 rounded-full">
            ★ {d.rat}
          </span> */}
        </div>

        {/* availability */}
        {/* <div className={`flex items-center justify-center gap-2 text-[11px] font-semibold mb-4
          ${d.avSoon ? "text-amber-700" : "text-green-700"}`}>
          <span className={`w-2 h-2 rounded-full ${d.avSoon ? "bg-amber-400" : "bg-green-500"}`} />
          {d.av}
        </div> */}

        <div className="w-full h-px bg-[#567C8D]/10 mb-4" />
        {/*
  Book Appointment
</button> */}
{/* <button className="btn-white" style={{width:"80%",padding:"8px",fontSize:".83rem",borderRadius:"12px",border: "none",
    background: "linear-gradient(135deg,#2F4156,#567C8D)",
    color: "#fff"}}>
              Book Appointment
             </button> */}

        {/* stats */}
        <div className="flex w-full mt-6 pt-6 border-t border-[#567C8D]/10">

  {[
    { val: d.patients, lbl: "Patients" },
    { val: d.satisfaction, lbl: "Satisfaction" },
    { val: d.awards, lbl: "Awards" },
  ].map((s, i) => (
    <>
      {i > 0 && <div className="w-px bg-[#567C8D]/15 mx-3" />}

      <div className="flex-1 flex flex-col items-center gap-1">

        <span
          style={{ fontFamily:"'Cormorant Garamond',serif" }}
          className="text-[1.4rem] font-bold text-[#1A2E3D]"
        >
          {s.val}
        </span>

        <span className="text-[10px] uppercase tracking-[0.12em] text-[#8FA5B2]">
          {s.lbl}
        </span>

      </div>
    </>
  ))}

</div>
      </div>
    </div>
  );
}
function Doctors() {
  return (
    <section id="doctors" style={{ background:"#F8F4F0", padding:"7rem 5vw" }}>
      
      <div className="rev" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
        <span className="badge">Our Specialists</span>

        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(2.2rem,4vw,3.3rem)",
          fontWeight:700,
          color:"var(--text-dark)"
        }}>
          Meet Our <em style={{color:"var(--teal)"}}>Expert Doctors</em>
        </h2>

        <p style={{
          color:"var(--text-mid)",
          fontSize:".91rem",
          marginTop:".8rem"
        }}>
          Board-certified specialists with decades of combined experience.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 justify-center justify-items-center">
        {DOCS.map(d => (
          <DoctorCard key={d.name} d={d} />
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
          <span className="badge">About Nexora HealthCare</span>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.5vw,2.9rem)",fontWeight:700,color:"var(--text-dark)",lineHeight:1.15,marginBottom:"1.2rem"}}>
            Multi-Specialty Care with a <em style={{color:"var(--teal)"}}>Human Touch</em>
          </h2>
          <p style={{color:"var(--text-mid)",fontSize:".9rem",lineHeight:1.82,marginBottom:"1.8rem"}}>
            Founded in 2005, Nexora HealthCare Hospital has grown into one of Gujarat&apos;s most trusted healthcare institutions, combining cutting-edge technology with compassionate, patient-first care.
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
    <section id="reviews" style={{background:"#F8F4F0",padding:"7rem 5vw"}}>
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
      {/* <Footer /> */}
    </div>
    </>
  );
}