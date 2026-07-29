import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LanguageSelection() {

  const navigate = useNavigate();

  const [language, setLanguage] = useState("");

  const languages = [
    "English",
    "தமிழ்",
    "हिन्दी",
    "తెలుగు",
    "ಕನ್ನಡ",
    "മലയാളം"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-green-700">
          🌐 Choose Language
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Select your preferred language
        </p>


        <div className="space-y-4">

          {languages.map((lang)=>(
            <button
              key={lang}
              onClick={()=>setLanguage(lang)}
              className={`w-full py-3 rounded-xl border font-medium
              ${
                language === lang
                ? "bg-green-700 text-white"
                : "bg-gray-100"
              }`}
            >
              {lang}
            </button>
          ))}

        </div>


        <button
          disabled={!language}
          onClick={()=>navigate("/profile")}
          className="w-full mt-8 bg-green-700 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
        >
          Continue
        </button>


      </div>

    </div>
  );
}

export default LanguageSelection;