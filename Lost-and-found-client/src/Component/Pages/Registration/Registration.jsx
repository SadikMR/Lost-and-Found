import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../../assets/logo.jpg"

const endpoints = import.meta.env.VITE_backendUrl;

const Registration = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullname = form.fullname.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const phone = form.phone.value;
    const division = form.division.value;
    const zilla = form.zilla.value;
    const upzilla = form.upzilla.value;
    const village = form.village.value;
    const image = form.image.value;
    const person =
      (fullname,
        username,
        email,
        password,
        confirmPassword,
        phone,
        division,
        zilla,
        upzilla,
        village);

    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }

    if (
      !fullname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !division ||
      !zilla ||
      !upzilla ||
      !village
    ) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    console.log(person);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(username) // Update user profile in Firebase
          .then(() => {
            console.log("User profile updated");

            // Now, store additional data in MongoDB
            const userData = {
              firebase_uid: user.uid, // Firebase UID (comes from the front-end or Firebase authentication)
              fullname,
              username,
              email,
              phone,
              division,
              zilla,
              upzilla,
              village,
              image,
              password,
              confirmPassword,
            };

            // Make API call to store user data in MongoDB
            fetch(`${endpoints}/user/saveInfo`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  Swal.fire({
                    title: "User Registered Successfully",
                    text: "Email Verification link has been sent to your email address.",
                    icon: "success",
                    draggable: true,
                  });
                  navigate("/login");
                } else {
                  Swal.fire({
                    title: "Registration Failed",
                    text: data.message,
                    icon: "error",
                    draggable: true,
                  });
                }
              })
              .catch((error) => {
                console.log("Error while calling API:", error);
                Swal.fire({
                  title: "Error",
                  text: "Something went wrong while saving your data.",
                  icon: "error",
                  draggable: true,
                });
              });
          })
          .catch((error) => {
            console.log("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        alert("An error occurred during registration: " + error.message);
      });


  };
  return (
    <div className="bg-[#FAF7F0]">
      <NavLink to="/" className="text-black mt-5 mx-5 text-2xl">
        <div className="flex items-center">
          <img className="w-8 h-8 ml-5 mr-2" src={img} alt="" />
          <p>Lost&Found</p>
        </div>
      </NavLink>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-[#EADBC8] rounded-lg shadow-lg p-8">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Registration
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Fill up the form to create your account
          </p>

          {/* Form */}
          <form
            onSubmit={handleSignUp}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-black"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter your full name"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
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

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Division */}
            <div>
              <label
                htmlFor="division"
                className="block text-sm font-medium text-black"
              >
                Division
              </label>
              <input
                type="text"
                id="division"
                placeholder="Enter your division"
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Zilla */}
            <div>
              <label
                htmlFor="zilla"
                className="block text-sm font-medium text-black"
              >
                Zilla
              </label>
              <input
                type="text"
                id="zilla"
                placeholder="Enter your zilla"
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Upzilla */}
            <div>
              <label
                htmlFor="upzilla"
                className="block text-sm font-medium text-black"
              >
                Upzilla
              </label>
              <input
                type="text"
                id="upzilla"
                placeholder="Enter your upzilla"
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Village */}
            <div>
              <label
                htmlFor="village"
                className="block text-sm font-medium text-black"
              >
                Village
              </label>
              <input
                type="text"
                id="village"
                placeholder="Enter your village"
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-black"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              />
            </div>
            {/* Register Button */}
            <div className="md:col-span-2">
              <button className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Register
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-black mt-6">
            Already have an account? Please{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
