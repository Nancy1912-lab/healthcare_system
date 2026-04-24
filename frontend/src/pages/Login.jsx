import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
/*
  PALETTE
  --blue:      #2E86C1
  --blue-dark: #1A5C85
  --blue-mid:  #3D9BD4
  --teal:      #5B9DB8
  --sky:       #C4DAE8
  --beige:     #EDE8E3
  --white:     #FFFFFF
*/

const C = {
    blue: "#2E86C1",
    dark: "#1A5C85",
    mid: "#3D9BD4",
    teal: "#5B9DB8",
    sky: "#C4DAE8",
    beige: "#EDE8E3",
    white: "#FFFFFF",
};

/* ── Icons ── */
const I = {
    Eye: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    EyeOff: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
    Mail: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    Lock: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    User: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Phone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.6 4.35 2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    Steth: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></svg>,
    Cal: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Google: () => <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>,
    // ── icons for gender & blood group ──
    Gender: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M12 12v9" /><path d="M9 18h6" /><path d="M17 3l-5 5-5-5" /></svg>,
    Blood: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z" /></svg>,
    // ── icon for experience ──
    Award: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
};

/* ══════════════════════════════════════════
   BACKGROUND  — updated blue palette + proper spacing
══════════════════════════════════════════ */
function BG() {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
            {/* Base gradient — new blue palette */}
            <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(150deg, #0d3550 0%, ${C.dark} 25%, #236a99 50%, ${C.blue} 75%, ${C.teal} 100%)`
            }} />

            {/* Colour washes */}
            <div style={{
                position: "absolute", top: "-18%", left: "-12%", width: 680, height: 680, borderRadius: "50%",
                background: `radial-gradient(circle,rgba(196,218,232,0.22) 0%,transparent 60%)`, animation: "w1 16s ease-in-out infinite"
            }} />
            <div style={{
                position: "absolute", bottom: "-22%", right: "-8%", width: 780, height: 780, borderRadius: "50%",
                background: `radial-gradient(circle,rgba(61,155,212,0.25) 0%,transparent 60%)`, animation: "w2 20s ease-in-out infinite 3s"
            }} />
            <div style={{
                position: "absolute", top: "48%", left: "58%", width: 380, height: 380, borderRadius: "50%",
                background: `radial-gradient(circle,rgba(237,232,227,0.06) 0%,transparent 65%)`, animation: "w3 11s ease-in-out infinite 6s"
            }} />

            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}>
                <defs>
                    <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                        <polygon points="30,2 58,17 58,47 30,62 2,47 2,17"
                            fill="none" stroke="white" strokeWidth="0.8" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hex)" />
            </svg>

            {/* ══ DNA helix — top-left, well inside edge ══ */}
            <svg style={{ position: "absolute", top: "4%", left: "15%", opacity: 0.15, animation: "flt 9s ease-in-out infinite" }}
                width="140" height="290" viewBox="0 0 140 290">
                <path d="M70 10 Q125 55 70 100 Q15 145 70 190 Q125 235 70 280"
                    fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M70 10 Q15 55 70 100 Q125 145 70 190 Q15 235 70 280"
                    fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                {[0, 1, 2, 3, 4, 5, 6].map(i => {
                    const y = 20 + i * 40, phase = (i / 7) * Math.PI;
                    const lx = 70 - 48 * Math.sin(phase + 0.4), rx = 70 + 48 * Math.sin(phase + 0.4);
                    return <g key={i}>
                        <circle cx={lx} cy={y} r={6} fill="none" stroke="white" strokeWidth="1.8" />
                        <circle cx={rx} cy={y} r={6} fill="none" stroke="white" strokeWidth="1.8" />
                        <line x1={lx + 5} y1={y} x2={rx - 5} y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeDasharray="4 3" />
                    </g>;
                })}
            </svg>

            {/* ══ Stethoscope — bottom-left, well spaced from DNA ══ */}
            <svg style={{ position: "absolute", bottom: "8%", left: "3.5%", opacity: 0.12, animation: "flt 10s ease-in-out infinite 1.8s" }}
                width="105" height="130" viewBox="0 0 105 130">
                <path d="M20 14 Q20 52 20 62 Q20 98 52 98 Q84 98 84 62 L84 50"
                    fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <circle cx="84" cy="42" r="12" fill="none" stroke="white" strokeWidth="3.2" />
                <circle cx="84" cy="42" r="5" fill="white" opacity="0.65" />
                <circle cx="14" cy="14" r="6" fill="none" stroke="white" strokeWidth="2.8" />
                <circle cx="26" cy="14" r="6" fill="none" stroke="white" strokeWidth="2.8" />
                <line x1="14" y1="8" x2="14" y2="2" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="26" y1="8" x2="26" y2="2" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="52" y1="98" x2="52" y2="120" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="52" cy="125" r="5.5" fill="none" stroke="white" strokeWidth="2.2" />
            </svg>

            {/* ══ Atom — top-right, proper margin from edge ══ */}
            <svg style={{ position: "absolute", top: "5%", right: "4%", opacity: 0.12, animation: "spin 30s linear infinite" }}
                width="148" height="148" viewBox="0 0 148 148">
                <circle cx="74" cy="74" r="10" fill="none" stroke="white" strokeWidth="2.4" />
                <ellipse cx="74" cy="74" rx="60" ry="21" fill="none" stroke="white" strokeWidth="1.5" />
                <ellipse cx="74" cy="74" rx="60" ry="21" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1" transform="rotate(60 74 74)" />
                <ellipse cx="74" cy="74" rx="60" ry="21" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1" transform="rotate(120 74 74)" />
                {[0, 60, 120, 180, 240, 300].map(a => {
                    const r = a * Math.PI / 180;
                    return <circle key={a} cx={74 + 60 * Math.cos(r)} cy={74 + 21 * Math.sin(r)} r="4.5" fill="white" opacity="0.72" />;
                })}
            </svg>

            {/* ══ Capsule pills — mid-right, spaced below atom ══ */}
            <svg style={{ position: "absolute", top: "42%", right: "15.5%", opacity: 0.1, animation: "flt 12s ease-in-out infinite 4s" }}
                width="82" height="155" viewBox="0 0 82 155">
                {[0, 1, 2].map(i => {
                    const cy = 28 + i * 52, rot = i * 25 - 12;
                    return <g key={i} transform={`translate(41,${cy}) rotate(${rot})`}>
                        <rect x="-26" y="-10" width="52" height="20" rx="10" fill="none" stroke="white" strokeWidth="2.3" />
                        <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="1.2" opacity="0.5" />
                    </g>;
                })}
            </svg>

            {/* ══ Medical cross symbols — well-separated positions ══ */}
            {[
                { pos: { top: "7%", right: "20%" }, size: 42, delay: "0s" },
                { pos: { top: "52%", left: "2%" }, size: 28, delay: "2.5s" },
                { pos: { bottom: "22%", right: "6%" }, size: 35, delay: "1.2s" },
                { pos: { bottom: "6%", left: "24%" }, size: 22, delay: "3.8s" },
            ].map((c, i) => (
                <svg key={i}
                    style={{
                        position: "absolute", ...c.pos, opacity: 0.12,
                        animation: `flt ${8 + i * 1.5}s ease-in-out infinite`, animationDelay: c.delay
                    }}
                    width={c.size} height={c.size} viewBox="0 0 50 50">
                    <rect x="19" y="4" width="12" height="42" rx="5" fill="white" />
                    <rect x="4" y="19" width="42" height="12" rx="5" fill="white" />
                </svg>
            ))}

            {/* ══ Floating ring outlines ══ */}
            {[
                { s: 85, top: "26%", left: "1%", d: "0s" },
                { s: 55, top: "70%", left: "1.5%", d: "2s" },
                { s: 95, bottom: "4%", right: "1%", d: "1s" },
                { s: 40, top: "82%", right: "8%", d: "3.5s" },
            ].map((c, i) => (
                <div key={i} style={{
                    position: "absolute", top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                    width: c.s, height: c.s, borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.28)", opacity: 0.08,
                    animation: `flt ${9 + i * 2}s ease-in-out infinite`, animationDelay: c.d,
                }} />
            ))}

            {/* ECG bottom strip */}
            <svg style={{ position: "absolute", bottom: "5%", left: 0, width: "100%", opacity: 0.17 }}
                viewBox="0 0 1400 85" preserveAspectRatio="none">
                <polyline
                    points="0,42 115,42 148,16 172,68 196,42 305,42 338,8 362,76 386,42 495,42 528,20 552,64 576,42 685,42 718,11 744,73 770,42 880,42 913,18 937,66 961,42 1070,42 1103,13 1127,71 1151,42 1400,42"
                    fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Dot grid */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
                <defs>
                    <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
                        <circle cx="18" cy="18" r="1.2" fill="white" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
        </div>
    );
}

/* ══════════════════════════════════════════
   FORM COMPONENTS
══════════════════════════════════════════ */
function Field({ icon: Ic, label, type = "text", placeholder, value, onChange, right }) {
    const [focused, setFocused] = useState(false);
    const [hov, setHov] = useState(false);

    const borderCol = focused ? `${C.blue}cc` : hov ? `${C.sky}ff` : `${C.sky}bb`;
    const bgCol = focused ? "rgba(255,255,255,0.97)" : hov ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.68)";
    const iconCol = focused ? C.blue : hov ? C.teal : `${C.teal}88`;

    return (
        <div style={{ marginBottom: 13 }}>
            <label style={{
                display: "block", fontSize: 10, fontWeight: 600, marginBottom: 5,
                letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s",
                color: focused ? C.blue : `${C.dark}88`, fontFamily: "'Poppins',sans-serif"
            }}>
                {label}
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                {/* glow ring */}
                <div style={{
                    position: "absolute", inset: -1.5, borderRadius: 13.5, pointerEvents: "none", zIndex: 0, transition: "opacity 0.25s",
                    background: focused
                        ? `linear-gradient(135deg,${C.blue}88,${C.dark}88)`
                        : hov ? `linear-gradient(135deg,${C.sky}88,${C.teal}99)` : "transparent",
                    opacity: (focused || hov) ? 1 : 0
                }} />
                <span style={{
                    position: "absolute", left: 13, zIndex: 2, display: "flex", alignItems: "center",
                    pointerEvents: "none", transition: "color 0.22s", color: iconCol
                }}><Ic /></span>
                <input type={type} placeholder={placeholder} value={value} onChange={onChange}
                    onFocus={e => {
                        setFocused(true);
                        e.target.style.borderColor = borderCol; e.target.style.background = bgCol;
                        e.target.style.boxShadow = `0 0 0 3.5px ${C.blue}28, 0 5px 18px ${C.dark}22`;
                    }}
                    onBlur={e => {
                        setFocused(false);
                        e.target.style.borderColor = `${C.sky}bb`; e.target.style.background = "rgba(255,255,255,0.68)";
                        e.target.style.boxShadow = "none";
                    }}
                    style={{
                        width: "100%", padding: "10.5px 40px 10.5px 42px", fontSize: 13.5, borderRadius: 11,
                        color: C.dark, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
                        position: "relative", zIndex: 1, backdropFilter: "blur(6px)", transition: "all 0.22s ease",
                        background: bgCol, border: `1px solid ${borderCol}`,
                        transform: hov && !focused ? "translateY(-1px)" : "none"
                    }} />
                {right && <span style={{ position: "absolute", right: 13, zIndex: 3, display: "flex", alignItems: "center", cursor: "pointer" }}>{right}</span>}
            </div>
        </div>
    );
}

function PwdField({ label, value, onChange }) {
    const [show, setShow] = useState(false);
    return <Field icon={I.Lock} label={label} type={show ? "text" : "password"} placeholder="••••••••"
        value={value} onChange={onChange}
        right={<span onClick={() => setShow(s => !s)} style={{ color: show ? C.dark : C.teal, transition: "color 0.2s", display: "flex" }}>
            {show ? <I.Eye /> : <I.EyeOff />}</span>} />;
}

function SelField({ icon: Ic, label, options, value, onChange, placeholder }) {
    const [focused, setFocused] = useState(false);
    const [hov, setHov] = useState(false);
    const borderCol = focused ? `${C.blue}cc` : hov ? `${C.sky}ff` : `${C.sky}bb`;
    const bgCol = focused ? "rgba(255,255,255,0.97)" : hov ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.68)";

    return (
        <div style={{ marginBottom: 13 }}>
            <label style={{
                display: "block", fontSize: 10, fontWeight: 600, marginBottom: 5,
                letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s",
                color: focused ? C.blue : `${C.dark}88`, fontFamily: "'Poppins',sans-serif"
            }}>
                {label}
            </label>
            <div style={{ position: "relative" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
                <div style={{
                    position: "absolute", inset: -1, borderRadius: 13.5, pointerEvents: "none", zIndex: 0, transition: "opacity 0.25s",
                    background: focused ? `linear-gradient(135deg,${C.blue}88,${C.dark}66)` : hov ? `linear-gradient(135deg,${C.sky}88,${C.teal}44)` : "transparent",
                    opacity: (focused || hov) ? 1 : 0
                }} />
                <span style={{
                    position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", zIndex: 2, pointerEvents: "none",
                    display: "flex", transition: "color 0.22s",
                    color: focused ? C.blue : hov ? C.teal : `${C.teal}88`
                }}><Ic /></span>
                <select value={value} onChange={onChange}
                    onFocus={e => {
                        setFocused(true); e.target.style.borderColor = `${C.blue}cc`;
                        e.target.style.background = "rgba(255,255,255,0.97)";
                        e.target.style.boxShadow = `0 0 0 3.5px ${C.blue}28, 0 5px 18px ${C.dark}22`;
                    }}
                    onBlur={e => {
                        setFocused(false); e.target.style.borderColor = `${C.sky}bb`;
                        e.target.style.background = "rgba(255,255,255,0.68)"; e.target.style.boxShadow = "none";
                    }}
                    style={{
                        width: "100%", padding: "10.5px 16px 10.5px 42px", fontSize: 13.5, borderRadius: 11,
                        outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box",
                        fontFamily: "inherit", position: "relative", zIndex: 1, backdropFilter: "blur(6px)",
                        transition: "all 0.22s", background: bgCol, border: `1.5px solid ${borderCol}`,
                        color: value ? C.dark : `${C.dark}55`,
                        transform: hov && !focused ? "translateY(-1px)" : "none"
                    }}>
                    <option value="" style={{ background: "#fff", color: C.dark }} disabled>
                        {placeholder || "Select..."}
                    </option>
                    {options.map(o => <option key={o} value={o} style={{ background: "#fff", color: C.dark }}>{o}</option>)}
                </select>
            </div>
        </div>
    );
}

/* ── Role Toggle ── */
function RoleToggle({ role, setRole }) {
    return (
        <div style={{
            display: "flex", background: `${C.sky}44`, borderRadius: 13, padding: 4, marginBottom: 20,
            border: `1.5px solid ${C.sky}99`
        }}>
            {[{ k: "patient", l: "Patient", Ic: I.User }, { k: "doctor", l: "Doctor", Ic: I.Steth }].map(r => (
                <button key={r.k} onClick={() => setRole(r.k)} style={{
                    flex: 1, padding: "9px 10px", border: "none", cursor: "pointer", borderRadius: 10,
                    fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    fontFamily: "inherit", transition: "all 0.28s cubic-bezier(.23,1,.32,1)",
                    background: role === r.k ? `linear-gradient(135deg,${C.dark},${C.blue})` : "transparent",
                    color: role === r.k ? C.white : `${C.dark}77`,
                    boxShadow: role === r.k ? `0 4px 14px ${C.dark}55,inset 0 1px 0 rgba(255,255,255,0.18)` : "none",
                    transform: role === r.k ? "scale(1.02)" : "scale(1)",
                }}>
                    <span style={{ display: "flex", alignItems: "center" }}><r.Ic /></span>{r.l}
                </button>
            ))}
        </div>
    );
}

/* ── Password Strength ── */
function Strength({ pass }) {
    const s = !pass.length ? 0 : pass.length < 6 ? 1 : pass.length < 10 ? 2 : /[A-Z]/.test(pass) && /[0-9!@#$]/.test(pass) ? 4 : 3;
    const col = ["transparent", "#e07070", "#f0a868", C.blue, "#4aad7a"];
    const lbl = ["", "Weak", "Fair", "Good", "Strong"];
    if (!pass) return null;
    return (
        <div style={{ marginTop: -6, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                {[1, 2, 3, 4].map(i => <div key={i} style={{
                    flex: 1, height: 2.5, borderRadius: 4,
                    background: i <= s ? col[s] : `${C.sky}88`, transition: "background 0.3s"
                }} />)}
            </div>
            <p style={{ fontSize: 10, color: col[s], margin: 0, fontWeight: 600, letterSpacing: "0.06em" }}>{lbl[s]}</p>
        </div>
    );
}

/* ── Submit Button ── */
function SubmitBtn({ children, onClick }) {
    const [h, setH] = useState(false);
    return (
        <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
            width: "100%", padding: "12px", fontSize: 14, fontWeight: 600, border: "none", borderRadius: 12,
            cursor: "pointer", letterSpacing: "0.02em", fontFamily: "inherit",
            background: h ? `linear-gradient(135deg,${C.dark},${C.blue})` : `linear-gradient(135deg,${C.blue},${C.mid})`,
            color: C.white,
            boxShadow: h ? `0 12px 36px ${C.dark}88,inset 0 1px 0 rgba(255,255,255,0.18)` : `0 4px 18px ${C.blue}66,inset 0 1px 0 rgba(255,255,255,0.14)`,
            transform: h ? "translateY(-2px) scale(1.01)" : "translateY(0) scale(1)",
            transition: "all 0.25s cubic-bezier(.23,1,.32,1)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>{children}<I.Arrow /></button>
    );
}

/* ── Logo ── */
function Logo() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
            <div style={{
                width: 42, height: 42, borderRadius: 14,
                background: `linear-gradient(135deg,${C.dark},${C.blue})`,
                display: "flex", alignItems: "center", justifyContent: "center", color: C.white,
                boxShadow: `0 4px 18px ${C.blue}77,0 0 0 1px ${C.sky}88`
            }}>
                <I.Plus />
            </div>
            <div>
                <div style={{
                    color: C.dark, fontSize: 21, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1,
                    fontFamily: "'Poppins',sans-serif"
                }}>
                   <span style={{ color: C.blue }}>Nexora</span>
                </div>
                <div style={{ fontSize: 8.5, color: C.teal, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2, opacity: 0.75 }}>
                    Advanced Healthcare
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════
   FORM SCREENS
══════════════════════════════════════════ */
function Login({ role, setRole, onSwitch }) {
    const { login } = useAuth()
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const endpoint = role === "patient" ? "/patient/login" : "/doctor/login";
            const res = await API.post(endpoint, { email, password: pass });
            console.log(res.data);
            // ✅ STORE USER + TOKEN
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        login(res.data.user);
           
             // ✅ REDIRECT BASED ON ROLE
        if (res.data.user.role === "doctor") {
            navigate("/doctordashboard");
        } else {
            navigate("/dashboard");
        }

        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    
    return <>
    
        <Logo />
        <div style={{ textAlign: "center", marginBottom: 22 }}>
            <h3 style={{
                color: C.dark, fontSize: 22, fontWeight: 700, margin: "10px 0 5px",
                fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.3px"
            }}>
                Welcome Back
            </h3>
            <p style={{ color: `${C.teal}cc`, fontSize: 13, margin: 0 }}>Sign in to your Nexora HealthCare account</p>
        </div>
        <RoleToggle role={role} setRole={setRole} />
        <Field icon={I.Mail} label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <PwdField label="Password" value={pass} onChange={e => setPass(e.target.value)} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, marginTop: -5 }}>
            <span style={{ fontSize: 12, color: C.blue, cursor: "pointer", fontWeight: 600 }}>Forgot password?</span>
        </div>
        <SubmitBtn onClick={handleLogin}>
            Sign In as {role === "patient" ? "Patient" : "Doctor"}
        </SubmitBtn>
        <div style={{ textAlign: "center", marginTop: 18 }}>
  {role === "patient" && (
    <>
      <span style={{ fontSize: 13, color: `${C.teal}bb` }}>
        Don't have an account? 
      </span>
      <span
        onClick={onSwitch}
        style={{
          fontSize: 13,
          color: C.dark,
          fontWeight: 700,
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        Register now
      </span>
    </>
  )}
</div>
        
    </>;
    
}

function PatientReg({ onSwitch, role, setRole }) {
    const [f, setF] = useState({
        name: "", email: "", phone: "", dob: "",
        gender: "", blood_group: "", pass: ""
    });
    const u = k => e => setF(p => ({ ...p, [k]: e.target.value }));

    const handleRegister = async () => {
        try {
            const res = await API.post("/patient/register", {
                name: f.name,
                email: f.email,
                phone: f.phone,
                password: f.pass,
                dob: f.dob,
                gender: f.gender,
                blood_group: f.blood_group
            });
            alert("Registered Successfully ✅");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    const GENDERS = ["Male", "Female", "Other"];
    const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

    return <>
        <Logo />
        <div style={{ textAlign: "center", marginBottom: 18 }}>
            <h3 style={{
                color: C.dark, fontSize: 21, fontWeight: 700, margin: "10px 0 5px",
                fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.3px"
            }}>Create Account</h3>
            <p style={{ color: `${C.teal}cc`, fontSize: 13, margin: 0 }}>Join Nexora as a Patient</p>
        </div>
        <RoleToggle role={role} setRole={setRole} />

        {/* Row 1 — Name + Phone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <Field icon={I.User} label="Full Name" placeholder="Rahul Desai" value={f.name} onChange={u("name")} />
            <Field icon={I.Phone} label="Phone" type="tel" placeholder="+91 98765" value={f.phone} onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // only digits

                if (val.length <= 10) {
                    u("phone")({ target: { value: val } });
                }
            }} />
        </div>

        {/* Email */}
        <Field icon={I.Mail} label="Email" type="email" placeholder="you@example.com" value={f.email} onChange={u("email")} />

        {/* Date of Birth */}
        <Field
            icon={I.Cal}
            label="Date of Birth"
            type="date"
            value={f.dob}
            onChange={e => setF({ ...f, dob: e.target.value })}
        />

        {/* Row 2 — Gender + Blood Group */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <SelField
                icon={I.Gender}
                label="Gender"
                options={GENDERS}
                value={f.gender}
                onChange={u("gender")}
                placeholder="Select gender..."
            />
            <SelField
                icon={I.Blood}
                label="Blood Group"
                options={BLOOD_GROUPS}
                value={f.blood_group}
                onChange={u("blood_group")}
                placeholder="Select group..."
            />
        </div>

        {/* Password */}
        <PwdField label="Password" value={f.pass} onChange={u("pass")} />
        <Strength pass={f.pass} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
            <input type="checkbox" style={{ marginTop: 3, accentColor: C.blue, cursor: "pointer" }} />
            <span style={{ fontSize: 12, color: `${C.dark}88`, lineHeight: 1.7 }}>
                I agree to the <span style={{ color: C.blue, cursor: "pointer" }}>Terms of Service</span> &amp; <span style={{ color: C.blue, cursor: "pointer" }}>Privacy Policy</span>
            </span>
        </div>
        <SubmitBtn onClick={handleRegister}>Create Patient Account</SubmitBtn>
        <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={{ fontSize: 13, color: `${C.teal}bb` }}>Already registered? </span>
            <span onClick={onSwitch} style={{ fontSize: 13, color: C.dark, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Sign in</span>
        </div>
    </>;
}

function DoctorReg({ onSwitch, role, setRole }) {
    const specs = ["Cardiology",
        "Cardiothoracic & Vascular Surgery",
        "Neurology", "Neurosurgery",
        "Nephrology & Dialysis",
        "Urology",
        "Gastroenterology",
        "General Surgery",
        "Laparoscopic Surgery",
        "Bariatric Surgery",
        "Surgical Oncology",
        "Medical Oncology",
        "Radiation Oncology",
        "Orthopaedic & Joint Replacement",
        "Spine Surgery",
        "Plastic & Reconstructive Surgery",
        "Obstetrics",
        "Gynaecology",
        "Neonatology",
        "Paediatrics",
        "Ophthalmology",
        "ENT",
        "Dermatology",
        "Radiology",
        "Laboratory Medicine",
        "Pathology",
        "Physiotherapy",
        "Rehabilitation Medicine",
        "Liver Transplant",
        "Kidney Transplant",
        "Heart Transplant",
        "Lung Transplant"];

    // ── experience options ──
    // const EXPERIENCE = [
    //     "0–1 year", "1–3 years", "3–5 years",
    //     "5–10 years", "10–15 years", "15–20 years", "20+ years"
    // ];

    const [f, setF] = useState({ name: "", email: "", phone: "", spec: "", experience: "", pass: "" });
    const u = k => e => setF(p => ({ ...p, [k]: e.target.value }));

    const handleDoctorRegister = async () => {
       
        try {
            const res = await API.post("/doctor/register", {
                name: f.name,
                email: f.email,
                phone: f.phone,
                password: f.pass,
                specialization: f.spec,
                experience: f.experience,
            });
             // 🔥 AUTO LOGIN AFTER REGISTER
        const loginRes = await API.post("/doctor/login", {
            email: f.email,
            password: f.pass
        });

        // ✅ STORE USER
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        localStorage.setItem("token", loginRes.data.token);

        // ✅ REDIRECT
        navigate("/doctordashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return <>
        <Logo />
        <div style={{ textAlign: "center", marginBottom: 18 }}>
            <h3 style={{
                color: C.dark, fontSize: 21, fontWeight: 700, margin: "10px 0 5px",
                fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.3px"
            }}>Doctor Registration</h3>
            <p style={{ color: `${C.teal}cc`, fontSize: 13, margin: 0 }}>Join our verified specialist network</p>
        </div>
        <RoleToggle role={role} setRole={setRole} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>
            <Field icon={I.User} label="Full Name" placeholder="Dr. Arjun Shah" value={f.name} onChange={u("name")} />
            <Field icon={I.Phone} label="Phone" type="tel" placeholder="+91 98765" value={f.phone} onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // only digits

                if (val.length <= 10) {
                    u("phone")({ target: { value: val } });
                }
            }} />
        </div>
        <Field icon={I.Mail} label="Email" type="email" placeholder="doctor@hospital.com" value={f.email} onChange={u("email")} />
        <SelField icon={I.Steth} label="Specialization" options={specs} value={f.spec} onChange={u("spec")} placeholder="Select specialization..." />

        {/* ── Experience dropdown (NEW) ── */}
        <Field
            icon={I.Award}
            label="Experience"
            type="text"
            inputMode="numeric"
            placeholder="Years of experience..."
            value={f.experience}
            onChange={(e) => {
                const val = e.target.value;

                // allow only 0–99
                if (val.length <= 2) {
                    u("experience")(e);
                }
            }}
        />

        <PwdField label="Password" value={f.pass} onChange={u("pass")} />
        <div style={{ margin: "4px 0 16px", padding: "11px 14px", background: `${C.sky}33`, borderRadius: 10, border: `1px solid ${C.sky}88` }}>
            <p style={{ color: `${C.dark}88`, fontSize: 11.5, margin: 0, lineHeight: 1.7 }}>
                Credentials verified within <strong style={{ color: C.blue }}>24–48 hrs</strong>. You'll be notified by email upon approval.
            </p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
            <input type="checkbox" style={{ marginTop: 3, accentColor: C.blue, cursor: "pointer" }} />
            <span style={{ fontSize: 12, color: `${C.dark}88`, lineHeight: 1.7 }}>
                I confirm credentials are valid and agree to <span style={{ color: C.blue, cursor: "pointer" }}>Nexora Care's Code of Practice</span>
            </span>
        </div>
        <SubmitBtn onClick={handleDoctorRegister}>Submit Doctor Application</SubmitBtn>
        <div style={{ textAlign: "center", marginTop: 16 }}>
            <span style={{ fontSize: 13, color: `${C.teal}bb` }}>Already registered? </span>
            <span onClick={onSwitch} style={{ fontSize: 13, color: C.dark, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Sign in</span>
        </div>
    </>;
}

/* ══════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════ */
export default function App() {
    const [mode, setMode] = useState("login");
    const [role, setRole] = useState("patient");

    return (
        <div style={{
            minHeight: "100vh", fontFamily: "'DM Sans',sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", padding: "20px", boxSizing: "border-box", paddingTop:"80px"
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        input::placeholder{color:${C.teal}66!important;}
        input[type="date"]{color-scheme:light;}
        select option{background:#fff;color:${C.dark};}
        @keyframes w1{0%,100%{transform:translate(0,0) scale(1)}42%{transform:translate(32px,-22px) scale(1.05)}72%{transform:translate(-16px,26px) scale(0.95)}}
        @keyframes w2{0%,100%{transform:translate(0,0) scale(1)}38%{transform:translate(-26px,20px) scale(1.04)}66%{transform:translate(20px,-30px) scale(0.95)}}
        @keyframes w3{0%,100%{transform:translate(0,0)}55%{transform:translate(16px,-16px)}}
        @keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes card{from{opacity:0;transform:translateY(30px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${C.sky}66;border-radius:4px}
      `}</style>

            <BG />

            {/* Glassy card */}
            <div style={{
                position: "relative", zIndex: 10, width: "100%", maxWidth: 448,
                background: "rgba(237,232,227,0.79)",
                backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
                borderRadius: 26, border: "1.5px solid rgba(255,255,255,0.86)",
                boxShadow: `0 38px 95px ${C.dark}66, 0 8px 28px ${C.dark}33, inset 0 1px 0 rgba(255,255,255,0.95)`,
                animation: "card 0.55s cubic-bezier(.23,1,.32,1) both",
                maxHeight: "95vh", overflowY: "auto",
            }}>
                {/* top shimmer */}
                <div style={{
                    position: "absolute", top: 0, left: "12%", right: "12%", height: 1,
                    background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.96),transparent)", borderRadius: 999
                }} />

                <div style={{ padding: "32px 30px 28px" }}>
                    {mode === "register" && (
                        <button onClick={() => setMode("login")}
                            style={{
                                display: "flex", alignItems: "center", gap: 5, background: "transparent", border: "none",
                                color: `${C.teal}bb`, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 14,
                                transition: "color 0.2s", fontFamily: "inherit"
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = C.dark}
                            onMouseLeave={e => e.currentTarget.style.color = `${C.teal}bb`}>
                            ← Back to login
                        </button>
                    )}
                    {mode === "login"
                        ? <Login role={role} setRole={setRole} onSwitch={() => setMode("register")} />
                        : role === "doctor"
                            ? <DoctorReg onSwitch={() => setMode("login")} role={role} setRole={setRole} />
                            : <PatientReg onSwitch={() => setMode("login")} role={role} setRole={setRole} />
                    }
                </div>
            </div>
        </div>
    );
}