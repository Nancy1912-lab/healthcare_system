import React, { useState } from "react";

const styles = `
:root {
  --pp-navy:  #1a3a5c;
  --pp-blue:  #2d6ea8;
  --pp-mid:   #4a8fc2;
  --pp-light: #b8d4e8;
  --pp-pale:  #e8f2f8;
  --pp-cream: #f0ede8;
  --pp-border:#d0dde8;
  --pp-bg:    #f5f8fa;
}

.pp-wrapper {
  font-family: 'Poppins', sans-serif;
  background-color: var(--pp-bg);
  min-height: 100vh;
}

.pp-dashboard { display: block; min-height: 100vh; }

.pp-main {
  background: var(--pp-bg);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.pp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: #fff;
  border-bottom: 1px solid var(--pp-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.pp-breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6a8aaa;
  font-weight: 500;
}

.pp-breadcrumb a { color: var(--pp-blue); text-decoration: none; transition: color 0.2s; }
.pp-breadcrumb a:hover { color: var(--pp-navy); }

.pp-separator { margin: 0 12px; font-size: 12px; color: #a0b8cc; }
.pp-current { color: var(--pp-navy); font-weight: 600; }

.pp-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid var(--pp-border);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  color: var(--pp-navy);
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pp-action-btn:hover { background: var(--pp-pale); border-color: var(--pp-mid); }

.pp-action-btn.primary {
  background: #213d57;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 500;
  transition: 0.3s ease;
}

.pp-action-btn.primary:hover { transform: translateY(-2px); opacity: 0.9; }

.pp-hero-banner {
  min-height: 220px;
  background:
    linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
    url("https://i.pinimg.com/736x/3a/5e/7e/3a5e7eb6131592301ce27f4dfcd65798.jpg");
  background-size: cover;
  background-position: center 40%;
  background-repeat: no-repeat;
  padding: 30px 40px 60px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;
}

.pp-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
}

.pp-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 4px solid rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
}

.pp-hero-text { color: #fff;
 }

.pp-hero-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.pp-hero-edit { display: flex; flex-direction: column; gap: 12px; align-items: center; }

.pp-hero-input {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  padding: 10px 16px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  outline: none;
  backdrop-filter: blur(4px);
  transition: border-color 0.2s;
}

.pp-hero-input::placeholder { color: rgba(255,255,255,0.6); }
.pp-hero-input:focus { border-color: #fff; background: rgba(255,255,255,0.25); }
.pp-hero-input.name { font-size: 24px; font-weight: 600; width: 300px; }

.pp-info-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 40px 40px 40px;
  max-width: 1200px;
  margin: -40px auto 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

.pp-info-card {
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid var(--pp-border);
  border-top: 4px solid var(--pp-blue);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
}

.pp-info-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.12); }

.pp-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--pp-navy);
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  position: relative;
}

.pp-card-title::after {
  content: "";
  width: 40px;
  height: 3px;
  background: #3b82f6;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 2px;
}

.pp-card-content { display: flex; flex-direction: column; gap: 20px; }
.pp-detail-row { display: flex; align-items: center; gap: 16px; }

.pp-detail-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  padding-left: 14px;
  border-left: 3px solid var(--pp-border);
  transition: border-color 0.2s;
}

.pp-detail-row:hover .pp-detail-text { border-left-color: var(--pp-blue); }

.pp-detail-label {
  font-size: 12px;
  color: #6a8aaa;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pp-detail-value { font-size: 15px; color: var(--pp-navy); font-weight: 600; }

.pp-detail-input {
  border: 1px solid var(--pp-border);
  border-radius: 6px;
  padding: 6px 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--pp-navy);
  outline: none;
  background: #fdfdfd;
  width: 100%;
  transition: border-color 0.2s;
}

.pp-detail-input:focus { border-color: var(--pp-blue); box-shadow: 0 0 0 2px rgba(45,110,168,0.1); }

.pp-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  width: max-content;
}

.pp-badge.blood { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

@media (max-width: 768px) {
  .pp-info-cards-container { grid-template-columns: 1fr; padding: 24px; }
  .pp-topbar { padding: 16px 24px; }
}
`;

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [patient, setPatient] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");

    // Calculate age from dob if available
    let age = "";
    if (stored.dob || stored.date_of_birth) {
      const dobValue = stored.dob || stored.date_of_birth;
      const birthDate = new Date(dobValue);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        age = String(calculatedAge);
      }
    } else if (stored.age) {
      age = String(stored.age);
    }

    return {
      name: stored.name || "",
      email: stored.email || "",
      phone: stored.phone || "",
      age,
      gender: stored.gender || "",
      bloodGroup: stored.blood_group || stored.bloodGroup || "",
    };
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{styles}</style>
      <div className="pp-wrapper">
        <div className="pp-dashboard">
          <main className="pp-main">

            <div className="pp-topbar">
              <div className="pp-breadcrumb">
                <a href="#">Patients</a>
                <span className="pp-separator">&gt;</span>
                <span className="pp-current">{patient.name}</span>
              </div>
              <div className="pp-topbar-actions">
               
              </div>
            </div>

            <div className="pp-hero-banner">
              <div className="pp-hero-content">
                <div className="pp-avatar-large">
                  <svg width="80" height="80" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="22" r="14" fill="currentColor" />
                    <path d="M6 60c0-13.3 10.7-24 24-24s24 10.7 24 24" fill="currentColor" />
                  </svg>
                </div>
                {isEditing ? (
                  <div className="pp-hero-edit">
                    <input className="pp-hero-input name" name="name" value={patient.name} onChange={handleChange} placeholder="Name" />
                  </div>
                ) : (
                  <div className="pp-hero-text">
                    <h1 className="pp-hero-name">{patient.name}</h1>
                     <button className="pp-action-btn primary" onClick={() => setIsEditing(!isEditing)}>
                  <svg width="30" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pp-info-cards-container">

              <div className="pp-info-card">
                <h3 className="pp-card-title">Personal Info</h3>
                <div className="pp-card-content">
                  <div className="pp-detail-row">
                    <div className="pp-detail-text">
                      <span className="pp-detail-label">Age</span>
                      {isEditing ? (
                        <input className="pp-detail-input" name="age" value={patient.age} onChange={handleChange} />
                      ) : (
                        <span className="pp-detail-value">{patient.age} Years</span>
                      )}
                    </div>
                  </div>
                  <div className="pp-detail-row">
                    <div className="pp-detail-text">
                      <span className="pp-detail-label">Gender</span>
                      {isEditing ? (
                        <input className="pp-detail-input" name="gender" value={patient.gender} onChange={handleChange} />
                      ) : (
                        <span className="pp-detail-value">{patient.gender}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pp-info-card">
                <h3 className="pp-card-title">Contact Info</h3>
                <div className="pp-card-content">
                  <div className="pp-detail-row">
                    <div className="pp-detail-text">
                      <span className="pp-detail-label">Phone Number</span>
                      {isEditing ? (
                        <input className="pp-detail-input" name="phone" value={patient.phone} onChange={handleChange} />
                      ) : (
                        <span className="pp-detail-value">{patient.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="pp-detail-row">
                    <div className="pp-detail-text">
                      <span className="pp-detail-label">Email Address</span>
                      {isEditing ? (
                        <input className="pp-detail-input" name="email" value={patient.email} onChange={handleChange} />
                      ) : (
                        <span className="pp-detail-value">{patient.email}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pp-info-card">
                <h3 className="pp-card-title">Health Info</h3>
                <div className="pp-card-content">
                  <div className="pp-detail-row">
                    <div className="pp-detail-text">
                      <span className="pp-detail-label">Blood Group</span>
                      {isEditing ? (
                        <input className="pp-detail-input" name="bloodGroup" value={patient.bloodGroup} onChange={handleChange} />
                      ) : (
                        <span className="pp-badge blood">{patient.bloodGroup}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
