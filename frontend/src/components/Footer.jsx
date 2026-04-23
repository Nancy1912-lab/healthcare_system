import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconPlus = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2v16M2 10h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.55 5.55l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconIG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);
const IconLI = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconTW = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavLink({ href = "#", children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <li style={{ marginBottom: "2px" }}>
      <a
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "block",
          color: hov ? "#7dd3f0" : "#7a99ad",
          fontSize: "0.875rem",
          textDecoration: "none",
          padding: "5px 0",
          transition: "color 0.16s ease",
          cursor: "pointer",
        }}
      >
        {children}
      </a>
    </li>
  );
}

function SocialBtn({ icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "34px", height: "34px", borderRadius: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${hov ? "rgba(31,180,212,0.6)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(31,180,212,0.12)" : "rgba(255,255,255,0.03)",
        color: hov ? "#7dd3f0" : "#4a6a7e",
        textDecoration: "none",
        transition: "all 0.18s ease",
      }}
    >
      {icon}
    </a>
  );
}

function LegalLink({ href = "#", children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        color: hov ? "#7dd3f0" : "#2e4e60",
        fontSize: "0.8rem", textDecoration: "none",
        transition: "color 0.16s",
      }}
    >
      {children}
    </a>
  );
}

const colHeadStyle = {
  fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.13em",
  textTransform: "uppercase", color: "#ffffff", marginBottom: "22px",
};

const subHeadStyle = {
  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.13em",
  textTransform: "uppercase", color: "#ffffff",
  marginTop: "22px", marginBottom: "12px",
  paddingTop: "18px",
  borderTop: "1px solid rgba(255,255,255,0.07)",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NexoraFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to a section on the landing page
  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      // Already on landing page — just scroll
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On another page — navigate to landing page, then scroll
      navigate("/");
      setTimeout(() => {
        if (sectionId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  // Quick Links mapping
  const quickLinkMap = {
    "Home": "home",
    "Services": "services",
    "Specialities": "/specialities",
    "Doctors": "doctors",
    "About": "about",
    "Contact": "contact",
  };

  return (
    <footer style={{
      background: "#0d1e2d",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: "#cbd5e1",
      padding: "64px 48px 0",
    }}>

      {/* ── Main grid: brand (wide) + 4 link cols ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
        gap: "0 40px",
        paddingBottom: "52px",
      }}>

        {/* Brand */}
        <div>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "18px" }}>
            <div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#f0f9ff", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Nexora
                </div>
                <div style={{
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                color: "#1fb4d4",
                textTransform: "uppercase",
                fontWeight: 600
                }}>
                Healthcare
                </div>
            </div>
        </div>

          {/* Tagline */}
          <p style={{ color: "#5a7a8e", fontSize: "0.855rem", lineHeight: 1.78, margin: "0 0 28px", maxWidth: "250px" }}>
            Smart healthcare platform for booking, reports &amp; prescriptions.
          </p>

          {/* Contact */}
          <div style={{ marginBottom: "28px" }}>
            {[
              { icon: <IconPin />, text: "Ahmedabad, Gujarat, India" },
              { icon: <IconMail />, text: "support@nexorahealthcare.com" },
              { icon: <IconPhone />, text: "+91 98765 43210" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                <span style={{ color: "#1fb4d4", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
                <span style={{ color: "#5a7a8e", fontSize: "0.835rem", lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Social */}
          <p style={{ fontSize: "0.67rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2e4e60", marginBottom: "10px" }}>
            Follow us
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <SocialBtn icon={<IconIG />} label="Instagram" />
            <SocialBtn icon={<IconLI />} label="LinkedIn" />
            <SocialBtn icon={<IconTW />} label="Twitter / X" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div style={colHeadStyle}>Quick Links</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {["Home","Services","Specialities","Doctors","About","Contact"].map(l => (
              <NavLink key={l} onClick={() => scrollToSection(quickLinkMap[l])}>
                {l}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Patient + Doctor */}
        <div>
          <div style={colHeadStyle}>Patient</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <NavLink onClick={() => navigate("/login")}>Book Appointment</NavLink>
            {["View Reports","Prescriptions","Health Packages"].map(l => <NavLink key={l}>{l}</NavLink>)}
          </ul>
          <div style={subHeadStyle}>Doctor</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {["Dashboard","Appointments","Reports"].map(l => <NavLink key={l}>{l}</NavLink>)}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div style={colHeadStyle}>Company</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <NavLink onClick={() => scrollToSection("about")}>About Us</NavLink>
            {["Careers","Blog","Press"].map(l => <NavLink key={l}>{l}</NavLink>)}
          </ul>
        </div>

        {/* Support */}
        <div>
          <div style={colHeadStyle}>Support</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {["Help Centre"].map(l => <NavLink key={l}>{l}</NavLink>)}
            <NavLink onClick={() => scrollToSection("testimonials")}>Contact</NavLink>
            {["Privacy","Terms"].map(l => <NavLink key={l}>{l}</NavLink>)}
          </ul>
        </div>
      </div>

      {/* ── Divider ── */}
      <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: 0 }} />

      {/* ── Bottom bar ── */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center",
        justifyContent: "space-between", gap: "12px",
        padding: "18px 0",
      }}>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#2e4e60" }}>
          © 2026 Nexora Healthcare. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          <LegalLink>Privacy Policy</LegalLink>
          <LegalLink>Terms &amp; Conditions</LegalLink>
        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 960px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
          footer > div:first-child > div:first-child {
            grid-column: span 3;
          }
        }
        @media (max-width: 600px) {
          footer {
            padding: 36px 20px 0 !important;
          }
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 24px !important;
          }
          footer > div:first-child > div:first-child {
            grid-column: span 2;
          }
        }
        @media (max-width: 400px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div:first-child > div:first-child {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  );
}
