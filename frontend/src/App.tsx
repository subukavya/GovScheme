import "./App.css";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";

function App() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>AI-Powered Government Scheme Eligibility Recommender</h1>

          <p>
            Find the right government schemes for your family in just a few
            clicks. Upload your details, check eligibility, and get AI-powered
            recommendations.
          </p>

          <div className="buttons">
            <button className="primary">Check Eligibility</button>
            <button className="secondary">Explore Schemes</button>
          </div>
        </div>
      </section>
      <section className="features">
  <h2>Our Features</h2>

  <div className="card-container">
    <FeatureCard
      title="OCR Document Upload"
      description="Upload Aadhaar or other documents to extract information automatically."
    />

    <FeatureCard
      title="AI Recommendation"
      description="Receive personalized government scheme recommendations using AI."
    />

    <FeatureCard
      title="Multilingual Support"
      description="Use the application in your preferred regional language."
    />
  </div>
</section>
    </>
  );
}

export default App;