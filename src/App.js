// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import Projects from './pages/Projects';
import Forms from './pages/Forms';
import Logs from './pages/Logs';
import SubmittedForms from './pages/SubmittedForms';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import VendorLoginPage from './pages/VendorLogin';
import { VendorProvider } from './context/vendor_context'; // Import VendorProvider
import ProjectDetailsPage from './pages/ProjectDetails';
import LogDetailsPage from './pages/LogDetails';
import CreateLog from './pages/CreateLog.jsx';
// import './styles.css'; // Ensure global styles are imported

import PPEChecklist from './pages/forms/daily_checklists/PPEChecklist.jsx';
import ToolBoxTalk from './pages/forms/daily_checklists/ToolBoxTalk.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <VendorProvider initialVendorId={null}> {/* Wrap your Routes with VendorProvider */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/vendor-login" element={<VendorLoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/logs/:logId" element={<LogDetailsPage />} />
            <Route path="/create-log" element={<CreateLog />} />
            <Route path="/create-log/forms/daily_checklists/PPEChecklist" element={<PPEChecklist />} />
            <Route path="/create-log/forms/daily_checklists/ToolBoxTalk" element={<ToolBoxTalk />} />

            {/*<Route path="/create-log/first-aid" element={<FIrsAid />} />
            <Route path="/create-log/FIM-req" element={<FIMRequirement />} /> */}




            <Route path="/submitted-forms" element={<SubmittedForms />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </VendorProvider>
      </div>
    </Router>
  );
}

export default App;
