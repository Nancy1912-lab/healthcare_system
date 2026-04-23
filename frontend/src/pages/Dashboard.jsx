import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ─── LUCIDE ICONS (inline SVG for zero-dependency) ─────────────────────────
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

// ─── DATA ──────────────────────────────────────────────────────────────────
const SYMPTOM_MAP = {
    "Chest Pain / Heart Issues": {
        specialty: "Cardiologist", icon: "heart-pulse", doctors: [
            { name: "Dr. Ananya Sharma", exp: "14 yrs", rating: 4.9, available: "Today, 3:00 PM", av: "AS" },
            { name: "Dr. Rohan Mehta", exp: "10 yrs", rating: 4.7, available: "Tomorrow, 10:00 AM", av: "RM" },
            { name: "Dr. Priya Kapoor", exp: "18 yrs", rating: 4.8, available: "Today, 5:30 PM", av: "PK" },
        ]
    },
    "Skin Rash / Acne": {
        specialty: "Dermatologist", icon: "scan-face", doctors: [
            { name: "Dr. Sneha Iyer", exp: "9 yrs", rating: 4.6, available: "Today, 4:00 PM", av: "SI" },
            { name: "Dr. Karan Joshi", exp: "12 yrs", rating: 4.8, available: "Tomorrow, 9:00 AM", av: "KJ" },
        ]
    },
    "Fever / Cold / Flu": {
        specialty: "General Physician", icon: "thermometer", doctors: [
            { name: "Dr. Amit Patel", exp: "8 yrs", rating: 4.5, available: "Today, 2:00 PM", av: "AP" },
            { name: "Dr. Riya Shah", exp: "11 yrs", rating: 4.7, available: "Today, 6:00 PM", av: "RS" },
            { name: "Dr. Vikram Nair", exp: "15 yrs", rating: 4.9, available: "Tomorrow, 11:00 AM", av: "VN" },
        ]
    },
    "Joint Pain / Arthritis": {
        specialty: "Orthopedist", icon: "bone", doctors: [
            { name: "Dr. Deepak Rao", exp: "16 yrs", rating: 4.8, available: "Tomorrow, 1:00 PM", av: "DR" },
            { name: "Dr. Meena Gupta", exp: "13 yrs", rating: 4.6, available: "Today, 7:00 PM", av: "MG" },
        ]
    },
    "Eye Irritation / Vision": {
        specialty: "Ophthalmologist", icon: "eye", doctors: [
            { name: "Dr. Suresh Kumar", exp: "20 yrs", rating: 4.9, available: "Tomorrow, 8:00 AM", av: "SK" },
            { name: "Dr. Nalini Verma", exp: "7 yrs", rating: 4.5, available: "Today, 3:30 PM", av: "NV" },
        ]
    },
    "Anxiety / Depression": {
        specialty: "Psychiatrist", icon: "brain", doctors: [
            { name: "Dr. Kavya Menon", exp: "10 yrs", rating: 4.9, available: "Today, 5:00 PM", av: "KM" },
            { name: "Dr. Arjun Singh", exp: "14 yrs", rating: 4.7, available: "Tomorrow, 2:00 PM", av: "AR" },
        ]
    },
    "Toothache / Gum Issues": {
        specialty: "Dentist", icon: "smile", doctors: [
            { name: "Dr. Pooja Bhat", exp: "8 yrs", rating: 4.6, available: "Today, 1:00 PM", av: "PB" },
            { name: "Dr. Nikhil Das", exp: "12 yrs", rating: 4.8, available: "Tomorrow, 4:00 PM", av: "ND" },
        ]
    },
};

const APPOINTMENTS = [
    { doctor: "Dr. Ananya Sharma", specialty: "Cardiologist", date: "Apr 20", time: "3:00 PM", icon: "heart-pulse" },
    { doctor: "Dr. Sneha Iyer", specialty: "Dermatologist", date: "Apr 23", time: "4:00 PM", icon: "scan-face" },
    { doctor: "Dr. Vikram Nair", specialty: "Gen. Physician", date: "Apr 27", time: "11:00 AM", icon: "stethoscope" },
];

const TIPS = [
    { tip: "Drink 8 glasses of water daily", icon: "droplets" },
    { tip: "Walk 30 minutes every morning", icon: "footprints" },
    { tip: "Sleep 7–8 hours each night", icon: "moon" },
    { tip: "Avoid processed foods", icon: "salad" },
    { tip: "Practice deep breathing for 5 min", icon: "wind" },
    { tip: "Limit screen time before bed", icon: "monitor-off" },
];

// const TICKER_TIPS = [
//   { tip: "Drink 8 glasses of water daily",     icon: "droplets" },
//   { tip: "Walk 30 minutes every morning",      icon: "footprints" },
//   { tip: "Sleep 7–8 hours each night",         icon: "moon" },
//   { tip: "Avoid processed foods",              icon: "leaf" },
//   { tip: "Practice deep breathing",            icon: "wind" },
//   { tip: "Limit screen time before bed",       icon: "monitor-off" },
// ];

const GOALS = [
    { label: "Hydration", value: 65, note: "1.6 / 2.5 L", icon: "droplets", color: "#1D5FA8" },
    { label: "Sleep", value: 80, note: "6.4 / 8 hrs", icon: "moon", color: "#14447C" },
    { label: "Activity", value: 48, note: "2,880 / 6k steps", icon: "footprints", color: "#1B6B8A" },
    { label: "Nutrition", value: 70, note: "1,540 / 2,200 cal", icon: "salad", color: "#0F7B6C" },
];

const WELLNESS_STATS = [
    { label: "Active Days", value: "18", sub: "this month", icon: "dumbbell", color: "#1D5FA8" },
    { label: "Avg. Sleep", value: "7.2h", sub: "per night", icon: "moon", color: "#0F7B6C" },
    //   { label: "Hydration Avg.", value: "1.8L", sub: "per day",    icon: "droplets",  color: "#14447C" },
    //   { label: "Meals Logged",   value: "52",   sub: "this month", icon: "utensils",  color: "#3B6D11" },
];

const EMERGENCIES = [
    { name: "Ambulance", number: "108", icon: "ambulance", from: "#C0392B", to: "#922B21" },
    { name: "Police", number: "100", icon: "shield", from: "#1D5FA8", to: "#14447C" },
    { name: "Fire Brigade", number: "101", icon: "flame", from: "#E67E22", to: "#CA6F1E" },
    { name: "Women Helpline", number: "1091", icon: "shield-heart", from: "#8E44AD", to: "#6C3483" },
];

const BAR_VALS = [62, 45, 78, 55, 90, 40, 68];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const C = {
  primary: "#2E86C1",
  dark: "#1A5C85",
  teal: "#5B9DB8",
  light: "#C4DAE8",
  bg: "#F5F1EC",
};
// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────
function useCounter(target, suffix = "", delay = 400) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => {
            let v = 0;
            const step = Math.max(1, Math.ceil(target / 55));
            const timer = setInterval(() => {
                v += step;
                if (v >= target) { setCount(target); clearInterval(timer); }
                else setCount(v);
            }, 18);
        }, delay);
        return () => clearTimeout(t);
    }, [target, delay]);
    return count + suffix;
}

// ─── PROGRESS BAR ──────────────────────────────────────────────────────────
function ProgressBar({ value, color, delay = 0 }) {
    const [w, setW] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setW(value), 700 + delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return (
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#EDE8E2" }}>
            <div className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${w}%`, background: color, transitionDelay: `${delay}ms` }} />
        </div>
    );
}

// ─── DONUT CHART ───────────────────────────────────────────────────────────
function DonutChart({ value = 87 }) {
    const [animated, setAnimated] = useState(false);
    useEffect(() => { const t = setTimeout(() => setAnimated(true), 600); return () => clearTimeout(t); }, []);
    const r = 50, circ = 2 * Math.PI * r, dash = (value / 100) * circ;
    return (
        <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r={r} fill="none" stroke="#EDE8E2" strokeWidth="12" />
            <circle cx="65" cy="65" r={r} fill="none" stroke="#1D5FA8" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${animated ? dash : 0} ${circ}`} transform="rotate(-90 65 65)"
                style={{ transition: "stroke-dasharray 1.5s cubic-bezier(.4,0,.2,1)" }} />
            <text x="65" y="61" textAnchor="middle" fill="#14447C" fontSize="22" fontWeight="700" fontFamily="Playfair Display, serif">{value}</text>
            <text x="65" y="77" textAnchor="middle" fill="#6B7F90" fontSize="10" fontFamily="Inter, sans-serif">/ 100</text>
            <text x="65" y="92" textAnchor="middle" fill="#0F7B6C" fontSize="9" fontFamily="Inter, sans-serif">Health Score</text>
        </svg>
    );
}

// ─── MINI BAR CHART ────────────────────────────────────────────────────────
function MiniBarChart() {
    const [animated, setAnimated] = useState(false);
    useEffect(() => { const t = setTimeout(() => setAnimated(true), 500); return () => clearTimeout(t); }, []);
    const max = Math.max(...BAR_VALS);
    return (
        <div className="flex items-end gap-2 h-24 w-full">
            {BAR_VALS.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-24 justify-end">
                    <div className="w-full rounded-t-md transition-all duration-700 ease-out"
                        style={{
                            height: animated ? `${(v / max) * 72}px` : "0px",
                            background: v === max ? "linear-gradient(180deg,#1D5FA8,#14447C)" : "rgba(29,95,168,.2)",
                            transitionDelay: `${i * 70}ms`,
                        }} />
                    <span className="text-xs" style={{ fontSize: "9px", color: "#6B7F90" }}>{DAYS[i]}</span>
                </div>
            ))}
        </div>
    );
}

// ─── LINE CHART (BP) ───────────────────────────────────────────────────────
function BPLineChart() {
    const bpData = [52, 56, 40, 48, 32, 44, 44, 36]; // y positions
    const W = 320, H = 80;
    const pts = bpData.map((y, i) => `${i * (W / (bpData.length - 1))},${y}`).join(" ");
    const polyFill = `0,${H} ${pts} ${W},${H}`;
    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H + 24}`} style={{ overflow: "visible" }}>
            <defs>
                <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D5FA8" stopOpacity=".18" />
                    <stop offset="100%" stopColor="#1D5FA8" stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={polyFill} fill="url(#bpGrad)" />
            <polyline points={pts} fill="none" stroke="#1D5FA8" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {bpData.map((y, i) => (
                <g key={i}>
                    <circle cx={i * (W / (bpData.length - 1))} cy={y} r="4" fill="white" stroke="#1D5FA8" strokeWidth="2" />
                    <text x={i * (W / (bpData.length - 1))} y={H + 18} textAnchor="middle" fontSize="9" fill="#6B7F90" fontFamily="Inter">
                        {DAYS[i % 7]}
                    </text>
                </g>
            ))}
        </svg>
    );
}

// ─── TICKER ────────────────────────────────────────────────────────────────
function Ticker() {
    const doubled = [];
    return (
        <div className="overflow-hidden flex-1">
            <div className="flex" style={{ animation: "marquee 32s linear infinite", width: "max-content" }}>
                {doubled.map((t, i) => (
                    <span key={i} className="flex items-center gap-2 pr-14 text-xs whitespace-nowrap"
                        style={{ color: "rgba(196,218,232,.8)" }}>
                        <Icon name={t.icon} size={13} />
                        {t.tip}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ─── GLASS CARD ────────────────────────────────────────────────────────────
function GlassCard({ children, className = "", style = {}, onClick }) {
    return (
        <div onClick={onClick}
            className={`rounded-2xl border shadow-sm transition-all duration-300 ${className}`}
            style={{ background: "rgba(255,255,255,.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(180,200,218,.35)", ...style }}>
            {children}
        </div>
    );
}

// ─── SECTION WRAPPER ───────────────────────────────────────────────────────
function Section({ children, className = "", style = {} }) {
    return (
        <section className={`px-14 py-20 relative overflow-hidden ${className}`} style={style}>
            {children}
        </section>
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

// ─── DOCTOR CARD ───────────────────────────────────────────────────────────
 import { FiUser } from "react-icons/fi";

function DoctorCard({ doc, specialty, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`min-w-[265    px] rounded-2xl p-5 cursor-pointer border-2 transition-all duration-300 hover:-translate-y-1 ${
        selected ? "shadow-xl" : ""
      }`}
      style={
        selected
          ? {
              background: "linear-gradient(145deg,#14447C,#1D5FA8)",
              borderColor: "rgba(255,255,255,.22)",
              boxShadow: "0 14px 42px rgba(29,95,168,.32)",
            }
          : {
              background: "rgba(255,255,255,.72)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(180,200,218,.35)",
              boxShadow: "0 2px 12px rgba(20,68,124,.06)",
            }
      }
    >
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Icon instead of avatar */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: selected ? "rgba(255,255,255,.2)" : "#E8F1FA",
            color: selected ? "#fff" : "#14447C",
          }}
        >
          <FiUser size={20} />
        </div>

        <div>
          <p
            className="font-bold text-sm"
            style={{ color: selected ? "#fff" : "#1A2B3C" }}
          >
            {doc.name}
          </p>
          <p
            className="text-xs"
            style={{
              color: selected
                ? "rgba(196,218,232,.8)"
                : "#0F7B6C",
            }}
          >
            {specialty}
          </p>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <p
          className="text-[10px]"
          style={{
            color: selected
              ? "rgba(196,218,232,.6)"
              : "#6B7F90",
          }}
        >
          Experience
        </p>
        <p
          className="text-sm font-semibold"
          style={{ color: selected ? "#fff" : "#1A2B3C" }}
        >
          {doc.exp}
        </p>
      </div>

      {/* Divider */}
      <div
        className="border-t pt-3"
        style={{
          borderColor: selected
            ? "rgba(255,255,255,.15)"
            : "rgba(180,200,218,.35)",
        }}
      >
        <p
          className="text-[10px] mb-1"
          style={{
            color: selected
              ? "rgba(196,218,232,.6)"
              : "#6B7F90",
          }}
        >
          Next Available
        </p>

        <p
          className="text-xs font-semibold flex items-center gap-2"
          style={{
            color: selected ? "#86efac" : "#0F7B6C",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: selected ? "#86efac" : "#0F7B6C",
            }}
          />
          {doc.available}
        </p>
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function PatientDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const c1 = 12;
    const c2 = 24;
    const c3 = 87;

    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptom, setSelectedSymptom] = useState("");
    const [doctors, setDoctors] = useState([]);

    const [appointments, setAppointments] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [factIndex, setFactIndex] = useState(0);

    const facts = [
        "Chronic dehydration is one of the most underdiagnosed contributors to fatigue, headaches, and poor focus.",
        "Sleeping less than 6 hours weakens your immune system.",
        "Walking 30 minutes daily improves heart health."
    ];
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.patient_id) {
            console.log("No patient logged in");
            return;
        }

        axios.get(`http://localhost:5000/api/appointment/patient/${user.patient_id}`)
            .then(res => {
                console.log("APPOINTMENTS:", res.data);

                if (Array.isArray(res.data)) {
                    setAppointments(res.data);
                } else {
                    setAppointments([]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/symptom")
            .then(res => {
                console.log("SYMPTOMS:", res.data);

                // ✅ FIX: ensure array
                if (Array.isArray(res.data)) {
                    setSymptoms(res.data);
                } else {
                    setSymptoms([]);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleConfirm = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("USER:", user);


        if (!user || user.role !== "patient") {
            alert("Please login as patient");
            return;
        }

        if (!user.patient_id) {
            alert("Patient ID missing");
            return;
        }
        console.log("Selected Doctor:", selectedDoctor);
        console.log("Selected Symptom:", selectedSymptom);

        if (!selectedDoctor) return;
        console.log("FINAL BOOK DATA:", {
            patient_id: user.patient_id,
            doctor_id: selectedDoctor?.doctor_id
        });

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        const currentTime = now.toTimeString().split(' ')[0];

        axios.post("http://localhost:5000/api/appointment/book", {
            patient_id: user?.patient_id,
            doctor_id: selectedDoctor.doctor_id,
            appointment_date: todayDate,
            appointment_time: currentTime,
            symptoms: []
        })
            .then(res => {
                console.log(res.data);
                setConfirmed(true);
                axios.get(`http://localhost:5000/api/appointment/patient/${user?.patient_id}`)
                    .then(res => {
                        if (Array.isArray(res.data)) {
                            setAppointments(res.data);
                        }
                    });
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", background: "#F5F1EC", width: "100%", overflowX: "hidden" }}>
            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet" />

            <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(29,95,168,.3) } 70% { box-shadow: 0 0 0 14px rgba(29,95,168,0) } }
        @keyframes popIn { from { opacity: 0; transform: scale(.85) } to { opacity: 1; transform: scale(1) } }
        .fade-up { animation: fadeUp .65s ease both }
        .float-anim { animation: float 5s ease-in-out infinite }
        .pop-in { animation: popIn .4s cubic-bezier(.34,1.56,.64,1) both }
        .pulse-btn { animation: pulse 2.2s infinite }
        @media (max-width: 768px) {
          .hero-cols { flex-direction: column !important }
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr !important }
          .section-pad { padding: 40px 16px !important }
        }
        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: 1fr 1fr !important }
          .grid-3 { grid-template-columns: 1fr 1fr !important }
        }
      `}</style>

            {/* ═══ §1 HERO ═══════════════════════════════════════════════════════ */}
                       

<section className="relative flex flex-col overflow-hidden" style={{ minHeight:"calc(100vh - 64px)" }}>
        <div className="absolute inset-0">
          <img src="https://i.pinimg.com/1200x/21/7a/7a/217a7a60cc05cc990b8586fdec8076af.jpg" alt="" className="w-full h-full object-cover object-top"/>
          <div className="absolute inset-0" style={{ background:`linear-gradient(135deg,${C.dark}f0 0%,${C.primary}cc 45%,${C.teal}99 100%)` }}/>
        </div>


                {/* Blobs */}
                <div className="blob-1 absolute opacity-30 rounded-full" style={{ width:380,height:380,top:-120,left:-120,background:`radial-gradient(circle,${C.light},transparent)` }}/>
        <div className="blob-2 absolute opacity-20 rounded-full" style={{ width:280,height:280,top:80,right:"25%",background:"radial-gradient(circle,white,transparent)" }}/>
        <div className="blob-3 absolute opacity-25 rounded-full" style={{ width:320,height:320,bottom:0,right:0,background:`radial-gradient(circle,${C.teal},transparent)` }}/>
               

                {/* Hero top */}
                <div className="hero-cols flex-1 flex items-center gap-12" style={{ padding: "90px 56px 36px", position: "relative", zIndex: 2 }}>
                    {/* Left */}
                    <div style={{ flex: 1, minWidth: 0 
    }}>
                        <p className="fade-up" style={{ color: "rgba(196,218,232,.7)", fontSize: "10.5px", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                            Patient Portal · 2025
                        </p>
                        <h1 className="fade-up" style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(2.5rem,5.5vw,3.4rem)", fontWeight: 700, lineHeight: 1.12, marginBottom: 16, animationDelay: ".08s" }}>
                            Good Morning,<br /> <span style={{fontStyle: "",  color: "#C4DAE8" }}>{user?.name}</span>
                        </h1>
                        <p className="fade-up" style={{ color: "rgba(196,218,232,.78)", fontSize: 14, lineHeight: 1.8, maxWidth: 500, marginBottom: 36, animationDelay: ".16s" }}>
                            Your personal health hub — schedule visits, track vitals, and connect with top specialists all in one place.
                        </p>
                        
                        
                        {/* CTAs */}
                        <div className="fade-up flex flex-wrap gap-3" style={{ animationDelay: ".32s" }}>
                            <button className="pulse-btn flex items-center gap-2 font-semibold"
                                onClick={() => document.getElementById("finder")?.scrollIntoView({ behavior: "smooth" })}
                                style={{ padding: "12px 26px", borderRadius: 10, border: "none", background: "rgba(255,255,255,.95)", color: "#14447C", fontSize: 13.5, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 4px 18px rgba(0,0,0,.2)" }}>
                                <Icon name="calendar" size={15} /> Book Appointment
                            </button>
                           
                        </div>
                    </div>
                </div>

                {/* ── Hero Bottom — Quick Access ── */}
                <div style={{ position: "relative", zIndex: 2, padding: "0 56px 60px" }}>
                    <div style={{  width: "50%",background: "rgba(245,241,236,.1)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,.15)", borderRadius: "24px 24px 0 0", padding: "32px 36px 40px" }}>
                        <p style={{ color: "rgba(196,218,232,.5)", fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 20 }}>Quick Access</p>
                        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                            {[
                                { label: "View Reports", icon: "file-text", desc: "Access your health records" },

                                { label: "Doctor Prescription", icon: "scroll-text", desc: "View active prescriptions" },
                               
                            ].map((a, i) => (
                                <div key={i}
                                    onClick={() => {
                                        if (a.label === "Doctor Prescription") {
                                            navigate("/appointments");
                                        }
                                    }}
                                    className="cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                    style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: 20, transitionProperty: "transform,background" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.16)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}>
                                    <div style={{ width: 46, height: 46, borderRadius: 10, background: "rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                                        <Icon name={a.icon} size={22} style={{ color: "#C4DAE8" }} />
                                    </div>
                                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{a.label}</p>
                                    <p style={{ color: "rgba(196,218,232,.6)", fontSize: 12 }}>{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,50 C480,90 960,10 1440,55 L1440,80 L0,80 Z" fill={C.bg}/>
        </svg>

            </section>

          

            <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(180,200,218,.35),transparent)" }} />

            {/* ═══ §5 DOCTOR FINDER ══════════════════════════════════════════════ */}
            <Section style={{ background: "#F5F1EC" }} className="section-pad" id="finder">
                
                <SectionLabel icon="stethoscope">Smart Booking</SectionLabel>
                <SectionHeading>Find Your Perfect Doctor</SectionHeading>
                <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>Select a symptom and we'll instantly match you with the right specialist — rated, experienced, and available.</p>

                <div style={{ maxWidth: 640, marginBottom: 24 }}>
                    <GlassCard style={{ padding: "22px 26px", borderRadius: 24 }}>
                        <label style={{ display: "block", fontSize: "10.5px", fontWeight: 700, color: "#1D5FA8", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10 }}>
                            What are you experiencing?
                        </label>
                       
                            <div style={{ position: "relative" }}>
  <select
    value={selectedSymptom}
    onChange={(e) => {
      const id = e.target.value;
      console.log("Selected:", id);

      setSelectedSymptom(id);
      setSelectedDoctor(null);
      setConfirmed(false);

      if (!id) return;

      axios.get(`http://localhost:5000/api/appointment/doctors-by-symptom/${id}`)
        .then(res => {
          console.log("DOCTORS:", res.data);

          if (Array.isArray(res.data)) {
            setDoctors(res.data);
          } else {
            setDoctors([]);
          }
        })
        .catch(err => console.log(err));
    }}
    style={{
      width: "100%",
      padding: "14px 18px",
      borderRadius: "14px",
      border: "1.5px solid #C9D7E3",
      background: "#FFFFFF",
      fontSize: "14px",
      color: selectedSymptom ? "#2C3E50" : "#6B7F90",
      fontWeight: "500",
      cursor: "pointer",
      appearance: "none",
      outline: "none",
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      transition: "all 0.25s ease"
    }}
    onFocus={(e) => {
      e.target.style.border = "1.5px solid #1D5FA8";
      e.target.style.boxShadow = "0 0 0 3px rgba(29,95,168,0.1)";
    }}
    onBlur={(e) => {
      e.target.style.border = "1.5px solid #C9D7E3";
      e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.04)";
    }}
  >
    {/* ✅ Correct placeholder */}
    <option value="" disabled hidden>
      Select Symptom
    </option>

    {Array.isArray(symptoms) &&
      symptoms.map((s, index) => (
        <option
          key={s.symptom_id || s.id || index}
          value={s.symptom_id || s.id}
        >
          {s.description}
        </option>
      ))}
  </select>
  

  {/* Arrow */}
  <div
    style={{
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#1D5FA8",
      fontSize: "12px"
    }}
  >
    ▼
  </div>
</div>


   
    

                        {selectedSymptom && (
                            <div className="pop-in flex items-center gap-3 mt-3 p-3 rounded-xl" style={{ background: "#E8F1FA", border: "1px solid rgba(29,95,168,.15)" }}>
                                <Icon name="user-check" size={22} style={{ color: "#1D5FA8" }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "10px", color: "#6B7F90", textTransform: "uppercase", letterSpacing: ".12em" }}>Matched Specialty</p>
                                    <p className="font-bold" style={{ fontSize: 15, color: "#14447C" }}>
                                        Showing Doctors
                                    </p>
                                </div>
                                <span className="font-semibold">
                                    {doctors.length} doctors
                                </span>
                            </div>
                        )}
                    </GlassCard>
                </div>

                {selectedSymptom && (
                    <div className="pop-in">
                        <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0F7B6C", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 16 }}>Available Specialists</p>
                       

<div className="flex gap-4 overflow-x-auto flex-nowrap pb-2 scrollbar-hide">
  {doctors.map((doc, i) => (
    <div
      key={i}
      className={`flex-shrink-0 ${
        doctors.length <= 3
          ? "flex-1 min-w-[280px]"
          : doctors.length === 4
          ? "flex-1 min-w-[220px]"
          : "w-[265px]"
      }`}
    >
      <DoctorCard
        doc={{
          name: doc.name,
          exp: doc.experience,
          available: doc.available_time,
          av: doc.name?.[0] || "DR"
        }}
        specialty="Doctor"
        selected={selectedDoctor?.doctor_id === doc.doctor_id}
        onClick={() => {
          setSelectedDoctor(doc);
          setConfirmed(false);
        }}
      />
    </div>
  ))}
</div>
           

                        {selectedDoctor && !confirmed && (
                            <div className="pop-in text-center mt-5">
                                <button onClick={handleConfirm} className=" inline-flex items-center gap-2 font-bold"
                                    style={{ padding: "12px 40px", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#14447C,#1D5FA8)", color: "#fff", fontSize: 14, fontFamily: "inherit", boxShadow: "0 10px 32px rgba(29,95,168,.32)" }}>
                                    <Icon name="check-circle" size={16} /> Confirm with {selectedDoctor.name}
                                </button>
                            </div>
                        )}

                        {confirmed && (
                            <div className="pop-in rounded-3xl p-8 text-center mt-5" style={{ background: "rgba(255,255,255,.75)", backdropFilter: "blur(20px)", border: "2px solid rgba(15,123,108,.2)" }}>
                                <div className="flex justify-center mb-3">
                                    <Icon name="check-circle" size={44} style={{ color: "#0F7B6C" }} />
                                </div>
                                <h3 style={{ color: "#0F7B6C", fontWeight: 700, fontSize: 19, fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>Appointment Confirmed!</h3>
                                <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.7 }}>
                                    Booked with <strong>{selectedDoctor?.name}</strong> ({selectedDoctor?.specialization})<br />
                                    <strong>{selectedDoctor?.available}</strong>
                                </p>
                                <p style={{ color: "#6B7F90", fontSize: 12, marginTop: 8 }}>A confirmation has been sent to your registered contact.</p>
                            </div>
                        )}
                    </div>
                )}
            </Section>

            <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(180,200,218,.35),transparent)" }} />



            {/* ═══ §2 APPOINTMENTS ═══════════════════════════════════════════════ */}
            <Section style={{ background: "#F3EEE8" }} className="section-pad">
                <SectionLabel icon="calendar-clock">Your Schedule</SectionLabel>
                <SectionHeading>Upcoming Appointments</SectionHeading>
                <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>Stay on top of your care — your next visits at a glance.</p>

                {/* <div className="flex gap-5 overflow-x-auto pb-3 no-scrollbar bg-transparent"> */}
                <div
  className="flex gap-5 pb-3"
  style={{
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  }}
>
                    {appointments.map((a, i) => (
                        <GlassCard key={i} className="transition-all duration-300 hover:-translate-y-1" style={{ minWidth: 268, borderRadius: 24, flexShrink: 0, overflow: "hidden" }}>
                            <div style={{ height: 5, background: "linear-gradient(90deg,#1D5FA8,#0F7B6C)" }} />
                            <div style={{ padding: "22px 20px" }}>
                                {/* <div style={{ width: 44, height: 44, borderRadius: 12, background: "#E8F1FA", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                                    <Icon name={a.icon} size={20} style={{ color: "#1D5FA8" }} />
                                </div> */}
                                <div
  className="flex items-center justify-center text-xs font-semibold"
  style={{
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#E8F1FA",
    color: "#0F7B6C",
    marginBottom: 12
  }}
>
  ✔
</div>
                                <p style={{ fontWeight: 700, color: "#1A2B3C", fontSize: 15, fontFamily: "'Playfair Display',serif", marginBottom: 3 }}>{a.doctor_name}</p>
                                <p style={{ fontSize: 12, color: "#0F7B6C", fontWeight: 500, marginBottom: 16 }}> {a.specialization}</p>
                                <div className="flex gap-2 flex-wrap mb-4">
                                    {[{
                                        icon: "calendar", val: new Date(a.appointment_date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    }, { icon: "clock", val: a.appointment_time }].map((tag, j) => (
                                        <span key={j} className="flex items-center gap-1" style={{ background: "#F5F1EC", color: "#14447C", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 500 }}>
                                            <Icon name={tag.icon} size={11} /> {tag.val}
                                        </span>
                                    ))}
                                </div>
                               
                            </div>
                        </GlassCard>
                    ))}
                    {/* Add new */}
                    <div className="flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                        style={{ minWidth: 180, borderRadius: 24, flexShrink: 0, border: "1.5px dashed rgba(180,200,218,.5)", padding: 24 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#E8F1FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon name="plus" size={20} style={{ color: "#1D5FA8" }} />
                        </div>
                        <p style={{ fontSize: 12.5, color: "#0F7B6C", fontWeight: 600, textAlign: "center" }}>Schedule New<br />Appointment</p>
                    </div>
                </div>
            </Section>

            <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(180,200,218,.35),transparent)" }} />


            {/* ═══ §4 WELLNESS TIPS ══════════════════════════════════════════════ */}
            <Section style={{ background: "#F3EEE8" }} className="section-pad">
                <SectionLabel icon="leaf" color="#0F7B6C">Wellness</SectionLabel>
                <SectionHeading> Healthy Habits</SectionHeading>
                <p style={{ color: "#6B7F90", fontSize: 13.5, lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>Small consistent habits lead to extraordinary long-term outcomes.</p>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                    <div className="flex flex-col gap-3">
                        {TIPS.map((t, i) => (
                            <div key={i} className="flex items-center gap-4 cursor-default transition-transform duration-200 hover:translate-x-1.5"
                                style={{ padding: "15px 18px", borderRadius: 12, background: "rgba(255,255,255,.72)", backdropFilter: "blur(20px)", border: "1px solid rgba(180,200,218,.35)" }}>
                                <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F1EC", border: "1px solid rgba(180,200,218,.35)" }}>
                                    <Icon name={t.icon} size={18} style={{ color: "#1D5FA8" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p className="font-semibold" style={{ fontSize: 13.5, color: "#1A2B3C" }}>{t.tip}</p>
                                    <p style={{ fontSize: 11, color: "#6B7F90", marginTop: 2 }}>Daily recommendation</p>
                                </div>
                                <Icon name="chevron-right" size={15} style={{ color: "rgba(180,200,218,.8)" }} />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <GlassCard style={{ borderRadius: 24, overflow: "hidden" }}>
                            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=75&auto=format&fit=crop" alt="Wellness" style={{ width: "100%", height: 210, objectFit: "cover" }} />
                            <div style={{ padding: "18px 20px" }}>
                                <p className="font-bold mb-1.5" style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#1A2B3C" }}>Your Wellness Journey</p>
                                <p style={{ fontSize: 13, color: "#6B7F90", lineHeight: 1.75 }}>“Small daily habits create big health changes.”</p>
                            </div>
                        </GlassCard>

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start">

                            {/* FACT CARD */}
                            <div className="rounded-3xl border border-[#E6D3B3] bg-[#F3E6D6] p-6 flex flex-col justify-between min-h-[140px]">

                                <span className="bg-[#B7791F] text-white text-xs px-3 py-1 rounded-full w-fit">
                                    Daily Inspiration
                                </span>

                                <p className="text-[#3B2A1A] text-sm leading-relaxed mt-4 font-medium">
                                    Those who think they have no time for healthy eating will sooner or later have to find time for illness.
                                </p>

                                <button
                                    onClick={() => setFactIndex((prev) => (prev + 1) % facts.length)}
                                    className="text-[#B7791F] text-sm mt-4 flex items-center gap-1 hover:translate-x-1 transition"
                                >
                                    — Edward Stanley
                                </button>
                            </div>



                            <div className="rounded-3xl border border-[#9fb0c0] bg-[#C8D9E6] p-6 flex flex-col justify-between min-h-[190px] shadow-sm hover:shadow-md transition">

                                <span className="bg-[#29586d] text-white text-xs px-3 py-1 rounded-full w-fit">
                                    Did you know?
                                </span>

                                <p className="text-[#2F4156] text-sm leading-relaxed mt-4 font-medium">
                                    {facts[factIndex]}
                                </p>

                                <button
                                    onClick={() => setFactIndex((prev) => (prev + 1) % facts.length)}
                                    className="text-[#3c6577] text-sm mt-4 flex items-center gap-1 hover:translate-x-1 transition font-medium"
                                >
                                    › Next fact
                                </button>

                            </div>



                        </div>
                    </div>
                </div>
            </Section>

            <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(180,200,218,.35),transparent)" }} />

            {/* ═══ §6 EMERGENCY ══════════════════════════════════════════════════ */}
            <section className="px-14 py-20 section-pad relative overflow-hidden"
                style={{ background: "linear-gradient(150deg,#1C3447 0%,#14447C 60%,#2c1a1a 100%)" }}>
                <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=70&auto=format&fit=crop" alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .07, pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <SectionLabel icon="siren" color="#f87171">Emergency Services</SectionLabel>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(1.7rem,3.5vw,2.5rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: 10 }}>
                        Quick Emergency <em style={{ color: "#fca5a5" }}>Contacts</em>
                    </h2>
                    <p style={{ color: "rgba(196,218,232,.72)", fontSize: 13.5, marginBottom: 44, maxWidth: 460, lineHeight: 1.75 }}>One tap to connect instantly. In any emergency, these numbers can save lives.</p>

                    <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
                        {EMERGENCIES.map((e, i) => (
                            <div key={i} className="text-center transition-transform duration-200 hover:-translate-y-1.5 cursor-pointer"
                                style={{ borderRadius: 20, padding: "32px 18px", background: `linear-gradient(145deg,${e.from},${e.to})`, boxShadow: "0 8px 28px rgba(0,0,0,.22)", border: "1px solid rgba(255,255,255,.12)" }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                                    <Icon name={e.icon} size={24} style={{ color: "#fff" }} />
                                </div>
                                <p style={{ color: "#fff", fontWeight: 800, fontSize: "2.2rem", fontFamily: "'Playfair Display',serif", letterSpacing: "-.02em", lineHeight: 1, marginBottom: 7 }}>{e.number}</p>
                                <p style={{ color: "rgba(255,255,255,.75)", fontSize: 12.5, fontWeight: 500, marginBottom: 14 }}>{e.name}</p>
                                <div className="flex items-center justify-center gap-1.5 font-semibold"
                                    style={{ padding: 8, borderRadius: 10, background: "rgba(255,255,255,.15)", color: "#fff", fontSize: 12, cursor: "pointer" }}>
                                    <Icon name="phone-call" size={12} /> Call Now
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-10 rounded-xl"
                        style={{ padding: "18px 24px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
                        <Icon name="triangle-alert" size={22} style={{ color: "#fca5a5", flexShrink: 0 }} />
                        <p style={{ color: "rgba(196,218,232,.72)", fontSize: 13, lineHeight: 1.6 }}>
                            <strong style={{ color: "#fca5a5" }}>Important:</strong> For life-threatening emergencies, always call 108 (Ambulance) immediately. Do not delay.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER ════════════════════════════════════════════════════════ */}
            {/* <footer style={{ background: "#EDE8E2", borderTop: "1px solid rgba(180,200,218,.35)", padding: "24px 56px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Icon name="shield-check" size={14} style={{ color: "#6B7F90" }} />
                <p style={{ fontSize: 12, color: "#6B7F90" }}>HealthCare Portal &nbsp;·&nbsp; All data is encrypted and confidential &nbsp;·&nbsp; For emergencies, always call 108</p>
            </footer> */}
        </div>
    );
}