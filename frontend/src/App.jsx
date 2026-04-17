import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PatientDashboard from "./pages/Dashboard";


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
        <Route path="/dashboard" element={<PatientDashboard />} />
      </Routes>

    </Router>
  );
}

export default App;