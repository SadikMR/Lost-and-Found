import React from "react";
import lostItemImage from "../../assets/item.jpg"; // Adjust the path based on your directory structure

const Post = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-5">
      {/* Lost Item Card */}
      <div className="card card-compact bg-base-100 shadow-xl p-4">
        <figure>
          <img src={lostItemImage} alt="Lost Item" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold">
            <span className="text-red-600">Lost</span>{" "}
            <span className="text-buttonColor1">Wallet</span>
          </h2>
          <p className="text-gray-300 font-semibold">
            Brown leather wallet lost in Central Park.
          </p>
          <ul className="text-sm text-gray-400">
            <li>
              <strong>Category:</strong> Accessories
            </li>
            <li>
              <strong>Location:</strong> Central Park
            </li>
            <li>
              <strong>Date:</strong> 2024-12-01
            </li>
            <li>
              <strong>Color:</strong> Brown
            </li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300">
              Show more
            </button>
          </div>
        </div>
      </div>

      {/* Found Item Card */}
      <div className="card card-compact bg-base-100 shadow-xl p-4">
        <figure>
          <img src={lostItemImage} alt="Found Item" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold">
            <span className="text-green-600">Found</span>{" "}
            <span className="text-buttonColor1">Mobile</span>
          </h2>
          <p className="text-gray-300 font-semibold">
            Black smartphone found at Train Station.
          </p>
          <ul className="text-sm text-gray-400">
            <li>
              <strong>Category:</strong> Electronics
            </li>
            <li>
              <strong>Location:</strong> Train Station
            </li>
            <li>
              <strong>Date:</strong> 2024-12-02
            </li>
            <li>
              <strong>Color:</strong> Black
            </li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300">
              Show more
            </button>
          </div>
        </div>
      </div>

      {/* Another Lost Item Card */}
      <div className="card card-compact bg-base-100 shadow-xl p-4">
        <figure>
          <img src={lostItemImage} alt="Lost Item" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold">
            <span className="text-red-600">Lost</span>{" "}
            <span className="text-buttonColor1">Backpack</span>
          </h2>
          <p className="text-gray-300 font-semibold">
            Blue backpack left in Market Street.
          </p>
          <ul className="text-sm text-gray-400">
            <li>
              <strong>Category:</strong> Bags
            </li>
            <li>
              <strong>Location:</strong> Market Street
            </li>
            <li>
              <strong>Date:</strong> 2024-12-05
            </li>
            <li>
              <strong>Color:</strong> Blue
            </li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300">
              Show more
            </button>
          </div>
        </div>
      </div>

      {/* Another Found Item Card */}
      <div className="card card-compact bg-base-100 shadow-xl p-4">
        <figure>
          <img src={lostItemImage} alt="Found Item" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold">
            <span className="text-green-600">Found</span>{" "}
            <span className="text-buttonColor1">Ring</span>
          </h2>
          <p className="text-gray-300 font-semibold">
            Gold ring found near Downtown Plaza.
          </p>
          <ul className="text-sm text-gray-400">
            <li>
              <strong>Category:</strong> Jewelry
            </li>
            <li>
              <strong>Location:</strong> Downtown Plaza
            </li>
            <li>
              <strong>Date:</strong> 2024-12-03
            </li>
            <li>
              <strong>Color:</strong> Gold
            </li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300">
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
