import React from "react";

// Sample data for the items
const items = [
  {
    id: 1,
    type: "Lost",
    name: "Wallet",
    description: "Brown leather wallet lost in Central Park.",
    category: "Accessories",
    location: "Central Park",
    date: "2024-12-01",
    color: "Brown",
    image: require("../../assets/item.jpg"), // Adjust the image path accordingly
    buttonText: "Show more",
  },
  {
    id: 2,
    type: "Found",
    name: "Mobile",
    description: "Black smartphone found at Train Station.",
    category: "Electronics",
    location: "Train Station",
    date: "2024-12-02",
    color: "Black",
    image: require("../../assets/item.jpg"), // Adjust the image path accordingly
    buttonText: "Show more",
  },
  {
    id: 3,
    type: "Lost",
    name: "Backpack",
    description: "Blue backpack left in Market Street.",
    category: "Bags",
    location: "Market Street",
    date: "2024-12-05",
    color: "Blue",
    image: require("../../assets/item.jpg"), // Adjust the image path accordingly
    buttonText: "Show more",
  },
  {
    id: 4,
    type: "Found",
    name: "Ring",
    description: "Gold ring found near Downtown Plaza.",
    category: "Jewelry",
    location: "Downtown Plaza",
    date: "2024-12-03",
    color: "Gold",
    image: require("../../assets/item.jpg"), // Adjust the image path accordingly
    buttonText: "Show more",
  },
];

const Post = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-5">
      {/* Dynamic rendering of items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="card card-compact bg-base-100 shadow-xl p-4"
        >
          <figure>
            <img src={item.image} alt={item.name} />
          </figure>
          <div className="card-body">
            <h2 className="text-xl font-semibold">
              <span
                className={
                  item.type === "Lost" ? "text-red-600" : "text-green-600"
                }
              >
                {item.type}
              </span>{" "}
              <span className="text-buttonColor1">{item.name}</span>
            </h2>
            <p className="text-gray-300 font-semibold">{item.description}</p>
            <ul className="text-sm text-gray-400">
              <li>
                <strong>Category:</strong> {item.category}
              </li>
              <li>
                <strong>Location:</strong> {item.location}
              </li>
              <li>
                <strong>Date:</strong> {item.date}
              </li>
              <li>
                <strong>Color:</strong> {item.color}
              </li>
            </ul>
            <div className="card-actions justify-end">
              <button className="btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300">
                {item.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
