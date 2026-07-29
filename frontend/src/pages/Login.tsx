import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-700 to-emerald-500 flex items-center justify-center px-5">

      <div className="w-full max-w-lg">

        {/* Branding */}
        <div className="text-center text-white mb-8">

          <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <span className="text-5xl">🇮🇳</span>
          </div>

<h1 className="text-3xl md:text-4xl font-bold mt-4">            GovScheme AI
          </h1>

          <p className="text-green-100 mt-2">
            AI-Powered Government Scheme Eligibility Recommender
          </p>

        </div>


        {/* Login Card */}

<div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 w-full">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome Back 👋
          </h2>


          {/* Email */}

          <div className="mb-5">

            <label className="text-sm font-semibold text-gray-700">
              Email / Mobile
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <span className="text-gray-400">
                📱
              </span>

              <input
                type="text"
                placeholder="Enter Email or Mobile"
                className="w-full px-4 py-4 outline-none text-base"
              />

            </div>

          </div>



          {/* Password */}

          <div className="mb-5">

            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <span className="text-gray-400">
                🔒
              </span>


              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full px-3 py-3 outline-none"
              />


              <button
                onClick={()=>setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "🙈" : "👁"}
              </button>


            </div>

          </div>



          {/* Options */}

          <div className="flex justify-between items-center text-sm mb-6">


            <label className="flex gap-2 items-center">

              <input type="checkbox"/>

              Remember Me

            </label>


            <button className="text-green-700 font-semibold">
              Forgot Password?
            </button>


          </div>




          {/* Login */}

          <button

            onClick={()=>navigate("/language")}

            className="w-full bg-gradient-to-r from-green-700 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition"

          >

            LOGIN

          </button>



          <div className="flex items-center my-6">

            <div className="flex-1 border-t"></div>

            <span className="px-3 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t"></div>

          </div>



          <p className="text-center text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-green-700 font-bold ml-2"
            >
              Create Account
            </Link>

          </p>


        </div>


        <p className="text-center text-green-100 text-sm mt-6">
          Secure • AI Assisted • Government Services
        </p>


      </div>


    </div>

  );
}


export default Login;