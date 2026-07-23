import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProfileMethod() {
  const navigate = useNavigate();

  // Translation hook
  const { t } = useTranslation();

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "80px",
      }}
    >
      <h1>{t("profile")}</h1>

      <br />

      <button onClick={() => navigate("/manual-form")}>
        📝 {t("manual")}
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/ocr-upload")}>
        📷 {t("ocr")}
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/voice-input")}>
        🎤 {t("voice")}
      </button>
    </div>
  );
}

export default ProfileMethod;