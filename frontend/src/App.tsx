import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { UserProfileProvider } from "./context/UserProfileContext";

import Landing from "./pages/Landing";
import MobileLogin from "./pages/MobileLogin";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Schemes from "./pages/Schemes";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <UserProfileProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Landing */}
              <Route path="/" element={<Landing />} />

              {/* Mobile Phone Authentication */}
              <Route path="/login" element={<MobileLogin />} />
              <Route path="/verify-otp" element={<OTPVerification />} />
              <Route path="/register" element={<Navigate to="/login" replace />} />

              {/* Main Application Pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schemes" element={<Schemes />} />

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </UserProfileProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;