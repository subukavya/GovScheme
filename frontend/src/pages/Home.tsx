import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>AI-Powered Government Scheme Eligibility Recommender</h1>

          <p>
            Find the right government schemes for your family using AI.
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={() => navigate("/login")}
            >
              Check Eligibility
            </button>

            <button className="secondary">
              Explore Schemes
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>

        <div className="card-container">
          <FeatureCard
            title="OCR Upload"
            description="Upload Aadhaar and other documents."
          />

          <FeatureCard
            title="AI Recommendation"
            description="Receive personalized government scheme recommendations."
          />

          <FeatureCard
            title="Multilingual"
            description="Use the application in your preferred language."
          />
        </div>
      </section>
    </>
  );
}

export default Home;