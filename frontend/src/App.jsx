import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import HealthcareDashboard from "./pages/Dashboard";
import HospitalSpecialities from "./pages/Specialities";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/Dashboard";
import AppointmentsPage from "./pages/Appointment";

function App() {
  return (
    <Router>
      <Navbar
  user={null}
  onLogin={() => window.location.href = "/login"}
  onLogout={() => {}}
/>


      <Routes>
        
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<HealthcareDashboard />} /> */}
        <Route path="/specialities" element={<HospitalSpecialities/>}/>
        <Route path="/specialities/:name" element={<HospitalSpecialities />} />
        <Route path="/doctordashboard" element={<DoctorDashboard/>}/>
        <Route path="/dashboard" element={<PatientDashboard/>}/>
       <Route path="/appointments" element={<AppointmentsPage />} />
      </Routes>

    </Router>
  );
}

export default App;