import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProviders/AuthProvider";

const endpoints = import.meta.env.VITE_backendUrl;

const FoundPost = () => {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();

  const handleFoundPost = (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const productName = form.productName.value;
    const color = form.color.value;
    const brand = form.brand.value;
    const description = form.description.value;
    const possibleLocation = form.possibleLocation.value;
    const possibleDate = form.possibleDate.value;
    const image = form.image.value;
    const firebase_uid = user.uid;
    const foundInfo = {
      firebase_uid,
      category,
      productName,
      color,
      brand,
      description,
      possibleLocation,
      possibleDate,
      image,
    };
    console.log(
      firebase_uid,
      category,
      productName,
      color,
      brand,
      description,
      possibleLocation,
      possibleDate,
      image
    );

    fetch(`${endpoints}/posts/found`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(foundInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Found Post added successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            form.reset();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add the Found Post. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen mb-5">
      <div className=" max-w-3xl bg-[#EADBC8] rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Found Form
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Fill out the form to submit a new post
        </p>

        {/* Form */}
        <form
          onSubmit={handleFoundPost}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-black"
            >
              Category *
            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              required
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-black"
            >
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              required
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Color */}
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-black"
            >
              Color
            </label>
            <input
              type="text"
              id="color"
              placeholder="Enter color"
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Brand */}
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-black"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              placeholder="Enter brand"
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Possible Location */}
          <div>
            <label
              htmlFor="possibleLocation"
              className="block text-sm font-medium text-black"
            >
              Possible Location *
            </label>
            <input
              type="text"
              id="possibleLocation"
              placeholder="Enter possible location"
              required
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Possible Date */}
          <div>
            <label
              htmlFor="possibleDate"
              className="block text-sm font-medium text-black"
            >
              Possible Date *
            </label>
            <input
              type="date"
              id="possibleDate"
              required
              className="bg-blue-500 text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black"
            >
              Short Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a short description"
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            ></textarea>
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
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundPost;
