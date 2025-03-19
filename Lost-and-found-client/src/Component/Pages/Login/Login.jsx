import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import img from "../../../assets/logo.jpg";

const endpoints = import.meta.env.VITE_backendUrl;

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // const [profileInfo, setProfileInfo] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";


  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await logIn(email, password);
      const user = result.user;

      // Refresh user data to get updated email verification status
      await user.reload();
      const updatedUser = user; // Get the latest user info


      //  Fetch user data from API
      const response = await fetch(`${endpoints}/user/getUserInfo/${email}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();

      if (!data.data.isVerified) {
        Swal.fire({
          title: "Email Not Verified",
          text: "Please check your inbox and verify your email before logging in.",
          icon: "warning",
        });
        return;
      }

      setErrorMessage(""); // Clear error on successful login
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        draggable: true,
      });

      navigate(from, { replace: true });

    } catch (error) {
      setErrorMessage(error.message); // Show error message
      alert("Invalid email or password");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#FAF7F0]">
      <NavLink to="/" className="text-black mt-5 mx-5 text-2xl">
        <div className="flex items-center">
          <img className="w-8 h-8 ml-5 mr-2" src={img} alt="" />
          <p>Lost&Found</p>
        </div>
      </NavLink>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-[#EADBC8] rounded-lg shadow-lg p-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          <p className="text-center text-gray-600 mt-1">
            Welcome back! Please login to your account.
          </p>

          {/* Email Input */}
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Password Input */}
            <div className="relative mt-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <NavLink to="/login/forgotPassword"><p className="text-sm text-blue-700 mt-2 cursor-pointer text-right ">Forgot password?</p></NavLink>

            {/* Login Button */}
            <button className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            {/* <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 rounded">
                Or continue with
              </span>
            </div> */}
          </div>

          {/* Third-Party Login */}
          {/* <div className="grid grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 transition">
              <img
                src="https://img.icons8.com/color/24/google-logo.png"
                alt="Google"
              />
            </button>
            <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 transition">
              <img
                src="https://img.icons8.com/?size=35&id=E2KVOMc77Geo&format=png&color=000000"
                alt="Facebook"
              />
            </button>
            <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 transition">
              <img
                src="https://img.icons8.com/color/24/linkedin.png"
                alt="LinkedIn"
              />
            </button>
          </div> */}

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
