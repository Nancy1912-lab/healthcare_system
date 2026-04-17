import React, { useState } from "react";

function Navbar({ user, onLogin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoggedIn = !!user;

  return (
    <>
      {/* 🔥 FULL ORIGINAL CSS (MERGED) */}
      <style>{`
/* ===== ORIGINAL NAVBAR CSS (FULL MERGED) ===== */
.nav-wrapper { padding:16px 20px 0; }

.navbar {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border:1px solid rgba(255,255,255,0.15);
  border-radius:30px;
  padding:0 24px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  height:50px;
  position:relative;
  box-shadow:0 8px 32px rgba(0,0,0,0.25);
}

.nav-logo {
  display:flex;
  align-items:center;
  gap:12px;
  text-decoration:none;
}

.logo-box {
  width:30px;
  height:30px;
  background:linear-gradient(135deg,#00d4ff,#0099cc);
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.logo-name { color:#fff;font-weight:700;font-size:18px; }
.logo-name span { color:#00d4ff; }

.nav-links { display:flex; gap:4px; }

.nav-links a {
  color:rgba(255,255,255,0.7);
  text-decoration:none;
  padding:8px 14px;
}

.nav-links a.active { color:#00d4ff; }

.nav-buttons { display:flex; gap:10px; }

/* LOGIN BUTTONS */
.btn-login {
  background:transparent;
  color:#fff;
  border:1px solid rgba(255,255,255,0.3);
  padding:9px 20px;
  border-radius:20px;
  cursor:pointer;
}

.btn-signup {
  background:linear-gradient(135deg,#00d4ff,#0099e6);
  color:#003355;
  border:none;
  padding:9px 20px;
  border-radius:20px;
  cursor:pointer;
}

/* 🔔 NOTIFICATION */
.notif-btn {
  position:relative;
  width:40px;
  height:40px;
  background:rgba(255,255,255,0.08);
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
}

.notif-dot {
  position:absolute;
  top:8px;
  right:8px;
  width:7px;
  height:7px;
  background:#00d4ff;
  border-radius:50%;
}

/* 👤 PROFILE */
.avatar-wrap {
  display:flex;
  align-items:center;
  gap:6px;
  background:rgba(255,255,255,0.08);
  border-radius:12px;
  padding:6px 10px;
  cursor:pointer;
  position:relative;
}

.avatar-icon {
  width:30px;
  height:30px;
  background:linear-gradient(135deg,#00d4ff,#0055bb);
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
}

.chevron.rotated { transform:rotate(180deg); }

/* DROPDOWN */
.dropdown-menu {
  position:absolute;
  top:calc(100% + 12px);
  right:0;
  background:rgba(8,18,50,0.98);
  border-radius:14px;
  padding:8px;
  min-width:200px;
}

.dropdown-item {
  display:block;
  padding:10px;
  color:#fff;
  text-decoration:none;
}

.dropdown-logout {
  width:100%;
  background:none;
  color:red;
  border:none;
  padding:10px;
  cursor:pointer;
}

/* MOBILE */
.hamburger { display:none; }

.mobile-menu { display:none; }

@media (max-width:768px){
  .nav-links,.nav-buttons{display:none;}
  .hamburger{display:flex;}
  .mobile-menu{display:block;}
}
      `}</style>

      <div className="nav-wrapper">
        <nav className="navbar">

          {/* LOGO */}
          <a href={isLoggedIn ? "/dashboard" : "/"} className="nav-logo">
            <div className="logo-box">
              <svg viewBox="0 0 20 20" width="20">
                <path d="M10 2v16M2 10h16" stroke="#003355" strokeWidth="2.8"/>
              </svg>
            </div>
            <span className="logo-name">Health<span>Care</span></span>
          </a>

          {/* LINKS */}
          <div className="nav-links">
            {isLoggedIn ? (
              <>
                <a href="/dashboard">Dashboard</a>
                <a href="/my-appointments">My Appointments</a>
                <a href="/doctors">Doctors</a>
              </>
            ) : (
              <>
                <a href="/" className="active">Home</a>
                <a href="/appointments">Appointments</a>
                <a href="/contact">Contact</a>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="nav-buttons">

            {isLoggedIn ? (
              <>
                <div className="notif-btn">🔔<span className="notif-dot"/></div>

                <div
                  className="avatar-wrap"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="avatar-icon">👤</div>

                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <p>{user?.name}</p>
                      <p>{user?.email}</p>

                      <a href="/profile" className="dropdown-item">Profile</a>

                      <button className="dropdown-logout" onClick={onLogout}>
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="btn-login" onClick={onLogin}>Log In</button>
                <button className="btn-signup">Sign Up</button>
              </>
            )}

          </div>

        </nav>
      </div>
    </>
  );
}

export default Navbar;