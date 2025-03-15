import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import productCategories from "../../../productsCategory.json";
import bdLocations from "../../../bdLocation.json";


const endpoints = import.meta.env.VITE_backendUrl;

const LostPost = () => {
  const { getCurrentUser } = useContext(AuthContext);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectBrand, setSelectBrand] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedZilla, setSelectedZilla] = useState("");
  const [zillas, setZillas] = useState([]);
  const [upzillas, setUpzillas] = useState([]);

  const user = getCurrentUser();
  const lostpostInfo = useLoaderData();

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectCategory(selected);

    // Find brands based on selected category
    const category = productCategories.find((cat) => cat.categories === selected);
    setSelectBrand(category ? category.brands : []);
  };

  const handleDivisionChange = (event) => {
    const division = event.target.value;
    setSelectedDivision(division);
    setSelectedZilla("");
    setUpzillas([]);

    // Find the selected division's zillas
    const selectedDivisionData = bdLocations.find((d) => d.division === division);
    setZillas(selectedDivisionData ? selectedDivisionData.zillas : []);
  };

  const handleZillaChange = (event) => {
    const zilla = event.target.value;
    setSelectedZilla(zilla);

    // Find the selected zilla's upzillas
    const selectedZillaData = zillas.find((z) => z.name === zilla);
    setUpzillas(selectedZillaData ? selectedZillaData.upzillas : []);
  };

  const handleLostpost = (e) => {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const productName = form.productName.value;
    const color = form.color.value;
    const brand = form.brand.value;
    const description = form.description.value;
    const division = form.division.value;
    const zilla = form.zilla.value;
    const upzilla = form.upzilla.value;
    const possibleDate = form.possibleDate.value;
    const image = form.image.value;
    const firebase_uid = user.uid;
    const lostInfo = {
      firebase_uid,
      category,
      productName,
      color,
      brand,
      description,
      division,
      zilla,
      upzilla,
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
      division,
      zilla,
      upzilla,
      possibleDate,
      image
    );

    fetch(`${endpoints}/posts/lost`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(lostInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Lost Post added successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            form.reset();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add the Lost Post. Please try again.",
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
          Lost Form
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Fill out the form to submit a new post
        </p>

        {/* Form */}
        <form
          onSubmit={handleLostpost}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-black">Category *</label>
            <select
              value={selectCategory}
              onChange={handleCategoryChange}
              id="category"
              required
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {productCategories.map((category) => (
                <option key={category.categories} value={category.categories}>
                  {category.categories}
                </option>
              ))}
            </select>
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
            <label htmlFor="color" className="block text-sm font-medium text-black">
              Color
            </label>
            <select
              id="color"
              className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Yellow">Yellow</option>
              <option value="Purple">Purple</option>
            </select>
          </div>


          {/* Brand */}
          {selectBrand.length > 0 && (
            <div >
              <label className="block text-sm font-medium text-black">Brand</label>
              <select
                id="brand"
                className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Brand</option>
                {selectBrand.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Division dropdown */}
          <div>
            <label className="block text-sm font-medium text-black">Division</label>
            <select
              value={selectedDivision}
              id="division"
              onChange={handleDivisionChange}
              className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              required
            >
              <option value="">Select Division</option>
              {bdLocations.map((division) => (
                <option key={division.division} value={division.division}>
                  {division.division}
                </option>
              ))}
            </select>
          </div>

          {/* Zilla Dropdown */}
          <div>
            <label className="block text-sm font-medium text-black">Zilla</label>
            <select
              value={selectedZilla}
              id="zilla"
              onChange={handleZillaChange}
              className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              required
              disabled={!selectedDivision}
            >
              <option value="">Select Zilla</option>
              {zillas.map((zilla) => (
                <option key={zilla.name} value={zilla.name}>
                  {zilla.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upzilla Dropdown */}
          <div>
            <label className="block text-sm font-medium text-black">Upzilla</label>
            <select
              className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
              required
              id="upzilla"
              disabled={!selectedZilla}
            >
              <option value="">Select Upzilla</option>
              {upzillas.map((upzilla) => (
                <option key={upzilla} value={upzilla}>
                  {upzilla}
                </option>
              ))}
            </select>
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

export default LostPost;
