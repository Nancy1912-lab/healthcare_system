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


const Icon = ({ name, size = 16, className = "", style = {} }) => {
    const icons = {
        "heart-pulse": <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l1.5-3 2 4.5 1.5-3h5.28" /></>,
        "calendar": <><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></>,
        "calendar-clock": <><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h5" /><circle cx="17.5" cy="17.5" r="4.5" /><path d="M17.5 15.5v2l1 1" /></>,
        "calendar-check": <><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></>,
        "file-text": <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></>,
        "droplets": <><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" /><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" /></>,
        "scroll-text": <><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /><path d="M15 8h-5" /><path d="M15 12h-5" /></>,
        "pill": <><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></>,
        "stethoscope": <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></>,
        "activity": <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
        "star": <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
        "circle": <><circle cx="12" cy="12" r="10" /></>,
        "check-circle": <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
        "chevron-down": <><polyline points="6 9 12 15 18 9" /></>,
        "chevron-right": <><polyline points="9 18 15 12 9 6" /></>,
        "arrow-right": <><line x1="5" x2="19" y1="12" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
        "plus": <><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></>,
        "leaf": <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
        "moon": <><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></>,
        "wind": <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></>,
        "monitor-off": <><path d="M17 17H4a2 2 0 0 1-2-2V5c0-.53.19-1.04.51-1.43" /><path d="M22 15a2 2 0 0 1-2 2" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="m2 2 20 20" /></>,
        "footprints": <><path d="M4 16v-2.38C4 11.5 2.97 10.43 3 8c.03-2.44 1.36-4.04 2.5-4C6.97 4 8 5.7 8 8c0 2.3-1 4-2 4v4" /><path d="M4 20.5v.5" /><path d="M11 20v-2.38c0-2.12 1.03-3.19 1-5.62-.03-2.44-1.36-4.04-2.5-4C8.03 8 7 9.7 7 12c0 2.3 1 4 2 4v4" /><path d="M11 20.5v.5" /></>,
        "salad": <><path d="M7 21h10" /><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" /><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-3.19 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.5H11.38z" /><path d="M13 12a4 4 0 0 1-8.44 1.47 4 4 0 0 1 .18-2.97" /></>,
        "dumbbell": <><path d="m6.5 6.5 11 11" /><path d="m21 21-1-1" /><path d="m3 3 1 1" /><path d="m18 22 4-4" /><path d="m2 6 4-4" /><path d="m3 10 7-7" /><path d="m14 21 7-7" /></>,
        "utensils": <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></>,
        "user-check": <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></>,
        "shield": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
        "shield-heart": <><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><path d="M12 17s-4-2.5-4-6a4 4 0 0 1 8 0c0 3.5-4 6-4 6z" /></>,
        "ambulance": <><path d="M10 10H6" /><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" /><path d="M8 8v4" /><path d="M9 18h6" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></>,
        "flame": <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" /></>,
        "siren": <><path d="M7 18H3a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4" /><path d="M12 2v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="m19.07 4.93-2.83 2.83" /><rect width="10" height="5" x="7" y="13" rx="1" /></>,
        "phone-call": <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /><path d="M14.05 2a9 9 0 0 1 8 7.94" /><path d="M14.05 6A5 5 0 0 1 18 10" /></>,
        "triangle-alert": <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></>,
        "shield-check": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
        "clock": <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
        "scale": <><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></>,
        "heart": <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></>,
        "thermometer": <><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></>,
        "bone": <><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" /></>,
        "eye": <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
        "brain": <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></>,
        "smile": <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></>,
        "scan-face": <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></>,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className} style={style}>
            {icons[name] || null}
        </svg>
    );
};

/* ─── DESIGN TOKENS ─── */
const C = {
  primary: "#2E86C1",
  dark:    "#1A5C85",
  teal:    "#5B9DB8",
  light:   "#C4DAE8",
  bg:      "#EDE8E3",
};

const getReportIcon = (test) => {
  if (!test) return "file-text";

  const t = test.toLowerCase();

  if (t.includes("blood")) return "droplets";
  if (t.includes("scan") || t.includes("x-ray") || t.includes("mri")) return "scan-face";
  if (t.includes("heart")) return "heart";
  if (t.includes("brain")) return "brain";
  if (t.includes("urine")) return "droplets";

  return "file-text"; // default
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



function SectionLabel({ children, icon, color = "#1D5FA8" }) {
    return (
        <p className="flex items-center gap-1.5 mb-2 font-bold tracking-widest uppercase"
            style={{ fontSize: "10.5px", color }}>
            {icon && <Icon name={icon} size={12} />}
            {children}
        </p>
    );
}

function SectionHeading({ children }) {
    return (
        <h2 className="font-bold leading-tight mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem,3.5vw,2.6rem)", color: "#1A2B3C" }}>
            {children}
        </h2>
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
  const appointmentsRef = useRef(null);
const labReportsRef = useRef(null);
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

const totalAppointments = appointments.length;

const pendingReports = labs.filter(
  (l) => l.status === "pending" || l.status === "processing"
).length;

const patientsToday = appointments.length; // OR unique patients if needed
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor:C.bg, fontFamily:"'Poppins',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ══ NAVBAR SPACE — replace with your <Navbar /> ══ */}
      <div className="h-14 flex items-center px-14" style={{ background:`linear-gradient(135deg,${C.dark}f0 0%,${C.primary}cc 45%,${C.teal}99 100%)` }}>
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
                <h1 className="font-semibold text-white leading-tight mb-0" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.4rem,5vw,3.8rem)" }}>
                  WELCOME BACK,<br/>
                </h1>
                <span style={{fontSize: "clamp(3.2rem,2.0vw,1.5rem)", color:C.light }}> {user?.name}</span>
                <p className="text-white/60 mb-10 max-w-md font-light leading-relaxed" style={{ fontSize:15 }}>
                 You have <strong className="text-white font-semibold">{totalAppointments} appointments</strong> and{" "}
<strong className="text-white font-semibold">{pendingReports} pending reports</strong> today. Have a great shift!
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
  { Ic:Users, label:"Patients Today", value:patientsToday, delta:"+0" },
  { Ic:CalendarCheck, label:"Appointments", value:totalAppointments, delta:"Live" },
  { Ic:FileText, label:"Pending Reports", value:pendingReports, delta:"Updated" },
].map((s,i)=>(
                    <div
                      key={i}
                      role="button"
                      onClick={() => {
  if (
    s.label.toLowerCase().includes('patient') ||
    s.label.toLowerCase().includes('appointment')
  ) {
    appointmentsRef.current?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (
    s.label.toLowerCase().includes('pending') ||
    s.label.toLowerCase().includes('report')
  ) {
    labReportsRef.current?.scrollIntoView({ behavior: "smooth" });
    return;
  }
}}
                      className={`glass hover-lift rounded-2xl p-5 fade-up-${i+1}`}
                      style={{ cursor: 'pointer' }}
                    >
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

           
            
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,50 C480,90 960,10 1440,55 L1440,80 L0,80 Z" fill={C.bg}/>
        </svg>
      </section>


      {/* ══ APPOINTMENTS SLIDER ═══════════════════════════ */}
      <section ref={appointmentsRef} className="py-20 px-14 overflow-hidden">
        <SectionLabel icon="stethoscope">Today's schedule</SectionLabel>
         <SectionHeading>Your Appointments</SectionHeading>
               
        <div className="flex items-end justify-between mb-1">
           <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>Stay on top of every consultation — your full patient queue for today . <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white border border-slate-100 shadow-sm" style={{ color:"#567C8D" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>{appointments.length} today
                </div></p>
          <div className="flex items-start gap-6">
            
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={()=>scrollSlider(-1)} className="glass-card hover-lift w-11 h-11 rounded-xl border-none cursor-pointer flex items-center justify-center"><ChevronLeft size={20} color={C.primary}/></button>
            <button onClick={()=>scrollSlider(1)} className="hover-lift w-11 h-11 rounded-xl border-none cursor-pointer flex items-center justify-center" style={{ background:C.primary }}><ChevronRight size={20} color="white"/></button>
          </div>
        </div>
        

        <div ref={sliderRef} className="snap-scroll flex gap-5 overflow-x-auto pb-4">
          {appointments.map((apt)=>{
            const st = apt.done ? STATUS_CFG.done : STATUS_CFG[apt.status];
            const rx = prescriptions[apt.id];
            return(
              <div key={apt.id} className="snap-item glass-card hover-lift rounded-3xl overflow-hidden flex-shrink-0 min-h-[280px]" style={{ width:288 }}>
                <div className="h-1.5" style={{ background:"#2c6c96"}}/>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-5">
                    {/* <img src={apt.img} alt={apt.name} className="rounded-2xl object-cover flex-shrink-0" style={{ width:52,height:64 }} onError={(e)=>{e.target.style.display="none";}}/> */}
                    <div
  className="w-11 h-15 rounded-2xl flex items-center justify-center flex-shrink-0"
  style={{ background: `${C.light}80` }}
>
  <User size={18} color={C.teal} />
</div>
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
                      <CheckCircle size={13} color="#1e4c6b"/>
                      <span className="text-xs font-semibold text-emerald-700 truncate">{rx.diagnosis||"Prescription saved"}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {!apt.done?(
                      <button onClick={()=>markDone(apt.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-semibold border-none cursor-pointer transition-all hover:opacity-85"
                        style={{ background:"#337cac",fontFamily:"'Poppins',sans-serif" }}>
                        <CheckCheck size={13}/> Mark Complete
                      </button>
                    ):(
                      <div className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-500">
                        <CircleCheck size={14}/> Completed
                      </div>
                    )}
                    {/* <button onClick={()=>setRxPanel(apt)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-semibold border-none cursor-pointer transition-all hover:opacity-85"
                      style={{ background:`linear-gradient(135deg,${C.primary},${C.teal})`,fontFamily:"'Poppins',sans-serif" }}>
                      <Pill size={13}/> Prescription
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       
      </section>


      {/* ══ PATIENT HISTORY ══════════════════════════════ */}
      <section ref={labReportsRef} className="px-14 pt-10 pb-20">
        <SectionLabel icon="stethoscope">patient Record</SectionLabel>
                <SectionHeading>Recent &amp; History Patients</SectionHeading>
                <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>Select a symptom and we'll instantly match you with the right specialist — rated, experienced, and available.</p>

        <div className="mb-8">
         
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
                {/* <img src={p.img} alt={p.name} className="w-11 h-11 rounded-2xl object-cover flex-shrink-0" style={{ border:`2px solid ${C.light}` }} onError={(e)=>{e.target.style.display="none";}}/> */}
                <div
  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
  style={{ background: `${C.light}80` }}
>
  <User size={18} color={C.teal} />
</div>
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
      <section className="pt-10 pb-20 relative overflow-hidden">
       
               

        
        <div className="absolute inset-0" style={{ background:`linear-gradient(135deg,${C.dark}08,${C.light}40,${C.bg})` }}/>
        <div className="relative px-14">
           <SectionLabel icon="stethoscope">Diagnostics</SectionLabel>
                <SectionHeading>Lab Reports</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                
              </div>
             
               <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>Manage diagnostic results — import patient reports and track their status seamlessly.</p>
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

          {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {labs.map(r=>{
              const ls=LAB_STATUS[r.status] || LAB_STATUS.pending;
              const uc=urgencyColor(r.urgency);
              return(
                <div key={r.id} className="glass-card hover-lift rounded-3xl overflow-hidden">
                  <div className="h-1" style={{ background:uc }}/>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      {r.img?(

                        <div
  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
  style={{ background: `${C.light}80` }}
>
  <User size={18} color={C.teal} />
</div>
                      ):(
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:`${C.light}80` }}><User size={18} color={C.teal}/></div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm truncate" style={{ color:C.dark }}>{r.patient}</div>
                        <div className="text-xs text-slate-400">{r.date}</div>
                      </div>
                      {r.urgency==="urgent"&&<span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 flex-shrink-0">URGENT</span>}
                    </div>
                    
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
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {labs.map((r) => {
    const ls = LAB_STATUS[r.status] || LAB_STATUS.pending;
    const uc = urgencyColor(r.urgency);

    return (
      <div
        key={r.id}
        className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        {/* Top Accent Line */}
        <div
          className="h-1 w-full"
          style={{ background: uc }}
        />

        <div className="p-5 flex flex-col gap-4">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${C.light}70` }}
            >
              <User size={18} color={C.teal} />
            </div>

            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-sm truncate"
                style={{ color: C.dark }}
              >
                {r.patient}
              </div>
              <div className="text-xs text-slate-400">
                {r.date}
              </div>
            </div>

            {r.urgency === "urgent" && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                URGENT
              </span>
            )}
          </div>

          {/* Divider Line */}
          <div className="h-px bg-slate-100" />

          {/* Test Name */}
          {/* <div
            className="text-sm font-semibold"
            style={{ color: C.dark }}
          >
            {r.test}
          </div> */}
          {/* <div className="flex items-center gap-2">
  {(() => {
    const Icon = getReportIcon(r.test);
    return <Icon size={16} color={C.primary} />;
  })()}

  <span
    className="text-sm font-semibold"
    style={{ color: C.dark }}
  >
    {r.test}
  </span>
</div> */}
          
<div className="flex items-center gap-2">
  <Icon
    name={getReportIcon(r.test)}
    size={16}
    style={{ color: C.primary }}
  />

  <span
    className="text-sm font-semibold"
    style={{ color: C.dark }}
  >
    {r.test}
  </span>
</div>
          {/* File */}
          {r.file && (
            <div className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
              <FileCheck size={13} />
              {r.file}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${ls.cls}`}
            >
              {ls.label}
            </span>

            <button
              onClick={() => cycleStatus(r.id)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1"
            >
              Change
              <RefreshCw size={11} />
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
        
        <div className="absolute inset-0" style={{ background: "linear-gradient(150deg,#1C3447 0%,#14447C 60%,#2c1a1a 100%)" }}/>
        <div className="blob-1 absolute opacity-20 rounded-full" style={{ width:320,height:320,top:-80,right:-80,background:C.light }}/>
        <div className="blob-3 absolute opacity-14 rounded-full" style={{ width:240,height:240,bottom:0,left:0,background:"white" }}/>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="glass w-8 h-8 rounded-xl flex items-center justify-center"><Sparkles size={16} color="white"/></div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Smart Insights</span>
          </div>
          <h2 className="section-heading text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif", fontSize:"clamp(2rem,4vw,3rem)" }}>Doctor Performance</h2>
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