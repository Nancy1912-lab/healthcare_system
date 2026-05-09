import React, { useState } from "react";

const styles = `
:root {
  --dp-navy:  #1a3a5c;
  --dp-blue:  #2d6ea8;
  --dp-mid:   #4a8fc2;
  --dp-light: #b8d4e8;
  --dp-pale:  #e8f2f8;
  --dp-cream: #f0ede8;
  --dp-border:#d0dde8;
  --dp-bg:    #f5f8fa;
}

.dp-wrapper {
  font-family: 'Poppins', sans-serif;
  background-color: var(--dp-bg);
  min-height: 100vh;
}

.dp-dashboard { display: block; min-height: 100vh; }

.dp-main {
  background: var(--dp-bg);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: #fff;
  border-bottom: 1px solid var(--dp-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.dp-breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6a8aaa;
  font-weight: 500;
}

.dp-breadcrumb a { color: var(--dp-blue); text-decoration: none; transition: color 0.2s; }
.dp-breadcrumb a:hover { color: var(--dp-navy); }

.dp-separator { margin: 0 12px; font-size: 12px; color: #a0b8cc; }
.dp-current { color: var(--dp-navy); font-weight: 600; }

.dp-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid var(--dp-border);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  color: var(--dp-navy);
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: all 0.2s ease;
}

.dp-action-btn:hover { background: var(--dp-pale); border-color: var(--dp-mid); }

.dp-action-btn.primary {
  background: #213d57;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 500;
  transition: 0.3s ease;
}

.dp-action-btn.primary:hover { transform: translateY(-2px); opacity: 0.9; }

.dp-hero-banner {
  min-height: 220px;
  background:
    linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
    url("https://i.pinimg.com/1200x/2d/1e/a4/2d1ea44a81ea1ade6f8aae3c72e5da5f.jpg");
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

.dp-hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
}

.dp-avatar-large {
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

.dp-hero-text { color: #fff; }

.dp-hero-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.dp-hero-edit { display: flex; flex-direction: column; gap: 12px; align-items: center; }

.dp-hero-input {
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

.dp-hero-input::placeholder { color: rgba(255,255,255,0.6); }
.dp-hero-input:focus { border-color: #fff; background: rgba(255,255,255,0.25); }
.dp-hero-input.name { font-size: 24px; font-weight: 600; width: 300px; }

.dp-info-cards-container {
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

.dp-info-card {
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid var(--dp-border);
  border-top: 4px solid var(--dp-blue);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
}

.dp-info-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.12); }

.dp-card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dp-navy);
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  position: relative;
}

.dp-card-title::after {
  content: "";
  width: 40px;
  height: 3px;
  background: #3b82f6;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 2px;
}

.dp-card-content { display: flex; flex-direction: column; gap: 20px; }
.dp-detail-row { display: flex; align-items: center; gap: 16px; }

.dp-detail-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  padding-left: 14px;
  border-left: 3px solid var(--dp-border);
  transition: border-color 0.2s;
}

.dp-detail-row:hover .dp-detail-text { border-left-color: var(--dp-blue); }

.dp-detail-label {
  font-size: 12px;
  color: #6a8aaa;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dp-detail-value { font-size: 15px; color: var(--dp-navy); font-weight: 600; }

.dp-detail-input {
  border: 1px solid var(--dp-border);
  border-radius: 6px;
  padding: 6px 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--dp-navy);
  outline: none;
  background: #fdfdfd;
  width: 100%;
  transition: border-color 0.2s;
}

.dp-detail-input:focus { border-color: var(--dp-blue); box-shadow: 0 0 0 2px rgba(45,110,168,0.1); }

.dp-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  width: max-content;
}

.dp-badge.exp  { background: #e8f4ee; color: #0f6e56; border: 1px solid #a7d8c4; }
.dp-badge.spec { background: var(--dp-pale); color: var(--dp-navy); border: 1px solid var(--dp-border); }

@media (max-width: 768px) {
  .dp-info-cards-container { grid-template-columns: 1fr; padding: 24px; }
  .dp-topbar { padding: 16px 24px; }
}
`;

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [doctor, setDoctor] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    return {
      name: stored.name || "",
      email: stored.email || "",
      phone: stored.phone || "",
      experience: stored.experience
        ? `${stored.experience} years`
        : "",
      specialization: stored.specialization || stored.specialization_name || "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{styles}</style>
      <div className="dp-wrapper">
        <div className="dp-dashboard">
          <main className="dp-main">

            <div className="dp-topbar">
              <div className="dp-breadcrumb">
                <a href="#">Doctors List</a>
                <span className="dp-separator">&gt;</span>
                <span className="dp-current">{doctor.name}</span>
              </div>
              <div className="dp-topbar-actions">
                
              </div>
            </div>

            <div className="dp-hero-banner">
              <div className="dp-hero-content">
                <div className="dp-avatar-large">
                  <svg width="80" height="80" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="22" r="14" fill="currentColor" />
                    <path d="M6 60c0-13.3 10.7-24 24-24s24 10.7 24 24" fill="currentColor" />
                  </svg>
                </div>
                {isEditing ? (
                  <div className="dp-hero-edit">
                    <input className="dp-hero-input name" name="name" value={doctor.name} onChange={handleChange} placeholder="Name" />
                  </div>
                ) : (
                  <div className="dp-hero-text">
                    <h1 className="dp-hero-name">{doctor.name}</h1>
                    <button className="dp-action-btn primary" onClick={() => setIsEditing(!isEditing)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </button>
                  </div>
                )}
              </div>
            </div>

            <div className="dp-info-cards-container">

              <div className="dp-info-card">
                <h3 className="dp-card-title">Contact Info</h3>
                <div className="dp-card-content">
                  <div className="dp-detail-row">
                    <div className="dp-detail-text">
                      <span className="dp-detail-label">Phone Number</span>
                      {isEditing ? (
                        <input className="dp-detail-input" name="phone" value={doctor.phone} onChange={handleChange} />
                      ) : (
                        <span className="dp-detail-value">{doctor.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="dp-detail-row">
                    <div className="dp-detail-text">
                      <span className="dp-detail-label">Email Address</span>
                      {isEditing ? (
                        <input className="dp-detail-input" name="email" value={doctor.email} onChange={handleChange} />
                      ) : (
                        <span className="dp-detail-value">{doctor.email}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="dp-info-card">
                <h3 className="dp-card-title">Professional Info</h3>
                <div className="dp-card-content">
                  <div className="dp-detail-row">
                    <div className="dp-detail-text">
                      <span className="dp-detail-label">Experience</span>
                      {isEditing ? (
                        <input className="dp-detail-input" name="experience" value={doctor.experience} onChange={handleChange} />
                      ) : (
                        <span className="dp-badge exp">{doctor.experience}</span>
                      )}
                    </div>
                  </div>
                  <div className="dp-detail-row">
                    <div className="dp-detail-text">
                      <span className="dp-detail-label">Specialization</span>
                      {isEditing ? (
                        <input className="dp-detail-input" name="specialization" value={doctor.specialization} onChange={handleChange} />
                      ) : (
                        <span className="dp-badge spec">{doctor.specialization}</span>
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

export default DoctorProfile;
