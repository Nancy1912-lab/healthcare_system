import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import HealthcareDashboard from "./pages/Dashboard";
import HospitalSpecialities from "./pages/Specialities";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/Dashboard";
import AppointmentsPage from "./pages/Appointment";
import LabReportsPage from "./pages/labreport";
import Patientlabreport from "./pages/patientlabreport";
import Packages from "./pages/Packages";
import PatientProfile from "./pages/PatientProfile";
import Footer from "./components/Footer";
import DoctorProfile from "./pages/DoctorProfile"; 
import DoctorLabReports from "./pages/DoctorLabReports";


function App() {
  return (
    <Router>
      <Navbar />


      <Routes>
        
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<HealthcareDashboard />} /> */}
        <Route path="/specialities" element={<HospitalSpecialities/>}/>
        <Route path="/specialities/:name" element={<HospitalSpecialities />} />
        <Route path="/doctordashboard" element={<DoctorDashboard/>}/>
        <Route path="/dashboard" element={<PatientDashboard/>}/>
       <Route path="/appointments" element={<AppointmentsPage />} />
       <Route path="/labreports" element={<LabReportsPage />} />
       <Route path="/packages" element={<Packages/>} />
       <Route path="/patientlabreport" element={<Patientlabreport />} />
       <Route path="/patient/profile" element={<PatientProfile />} />
       <Route path="/doctor/profile" element={<DoctorProfile />} />
       <Route path="/doctor/lab-history" element={<DoctorLabReports />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;