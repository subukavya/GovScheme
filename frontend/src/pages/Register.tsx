import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-green-500 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🇮🇳</h1>

          <h2 className="text-2xl font-bold text-green-700">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Register for GovScheme AI
          </p>
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email / Mobile
          </label>

          <input
            type="text"
            placeholder="Enter Email or Mobile"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>


        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Create Password"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>


        <button
          onClick={() => navigate("/language")}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold"
        >
          CREATE ACCOUNT
        </button>


        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-green-700 font-bold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;