import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import LanguageSelection from "./pages/LanguageSelection";
import ProfileMethod from "./pages/ProfileMethod";
import ManualForm from "./pages/ManualForm";
import OCRUpload from "./pages/OCRUpload";
import VoiceInput from "./pages/VoiceInput";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/profile-method" element={<ProfileMethod />} />
        <Route path="/manual-form" element={<ManualForm />} />
        <Route path="/ocr-upload" element={<OCRUpload />} />
        <Route path="/voice-input" element={<VoiceInput />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;