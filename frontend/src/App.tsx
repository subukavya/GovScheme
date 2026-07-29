import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LanguageSelection from "./pages/LanguageSelection";
import ProfileMethod from "./pages/Profile";
import ManualForm from "./pages/ManualForm";
import OCRUpload from "./pages/OCRUpload";
import VoiceInput from "./pages/VoiceInput";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/profile-method" element={<ProfileMethod />} />
        <Route path="/manual-form" element={<ManualForm />} />
        <Route path="/ocr-upload" element={<OCRUpload />} />
        <Route path="/voice-input" element={<VoiceInput />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;