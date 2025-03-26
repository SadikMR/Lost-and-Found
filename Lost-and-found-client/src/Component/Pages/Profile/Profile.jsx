import React, { useContext, useEffect, useState } from "react";
import profile_img from "../../../assets/logo.jpg";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./modal.css";
import { Flag } from "lucide-react"; // Report icon
const endpoints = import.meta.env.VITE_backendUrl;

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Declare state for selected image
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getCurrentUser } = useContext(AuthContext);
  const [currentUserFoundPost, setCurrentUserFoundPost] = useState([]);
  const [currentUserLostPost, setCurrentUserLostPost] = useState([]);
  const user = getCurrentUser();
  const currentuser_id = user.uid;

  const navigate = useNavigate();
  const handleShowMore = (post) => {
    //alert(post.category);
    navigate("/details", { state: { post } });
  };

  //Fetch found post by specific user id
  useEffect(() => {
    const fetchFoundPosts = async () => {
      try {
        const response = await fetch(
          `${endpoints}/posts/found/${currentuser_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCurrentUserFoundPost(data.data || []);
        } else {
          console.error("Failed to fetch found posts.");
        }
      } catch (error) {
        console.error("Error fetching found posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentuser_id) fetchFoundPosts();
  }, [currentuser_id]);

  // Fetch lost post by specific user id
  useEffect(() => {
    const fetchLostPosts = async () => {
      try {
        const response = await fetch(
          `${endpoints}/posts/lost/${currentuser_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCurrentUserLostPost(data.data || []);
        } else {
          console.error("Failed to fetch lost posts.");
        }
      } catch (error) {
        console.error("Error fetching lost posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentuser_id) fetchLostPosts();
  }, [currentuser_id]);

  // console.log("Profile info current : ", user.uid);

  // Fetch user profile information
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(`${endpoints}/user/getInfo/${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setProfileInfo(data);
        } else {
          console.error("Failed to fetch profile info.");
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInfo();
  }, []);

  // Delete Found Posts
  const handleFoundPostDelete = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${endpoints}/posts/found/${postId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success && data.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your Found post has been deleted.",
                "success"
              );
              const remainingPosts = currentUserFoundPost.filter(
                (post) => post._id !== postId
              );
              setCurrentUserFoundPost(remainingPosts);
            } else {
              Swal.fire("Failed!", "Failed to delete Found post.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting found post:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the post.",
              "error"
            );
          });
      }
    });
  };

  // Delete Lost Posts
  const handleLostPostDelete = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${endpoints}/posts/lost/${postId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your Lost post has been deleted.",
                "success"
              );
              const remainingPosts = currentUserLostPost.filter(
                (post) => post._id !== postId
              );
              setCurrentUserLostPost(remainingPosts);
            } else {
              Swal.fire("Failed!", "Failed to delete Lost post.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting lost post:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the post.",
              "error"
            );
          });
      }
    });
  };

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (!profileInfo) {
    return (
      <p className="text-center text-xl mt-5">
        Error loading profile information...{" "}
        <span className="text-red-600">Please Wait</span>
      </p>
    );
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 m-5 bg-[#E5E1DA] shadow-md rounded-lg text-black">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* User Profile Picture */}
            <img
              src={profileInfo.data.image}
              alt="User"
              className="w-32 h-32 rounded-full border border-gray-300 cursor-pointer hover:opacity-80"
              onClick={() => handleImageClick(profileInfo.data.image)}
            />

            <div className="flex flex-col justify-center">
              {/* Full Name */}
              <h2 className="text-xl sm:text-3xl font-semibold text-black">
                {profileInfo.data.fullname}
              </h2>

              {/* Username */}
              <p className=" text-gray-600 mt-1 font-serif font-semibold text-xl">
                <span className="text-gray-500">@ </span>
                {profileInfo.data.username || "Nickname"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <p>
            <span className="text-lg font-semibold">Division:</span>{" "}
            {profileInfo.data.division || "N/A"}
          </p>
          <p>
            <span className="text-lg font-semibold">Zilla:</span>{" "}
            {profileInfo.data.zilla || "N/A"}
          </p>
          <p>
            <span className="text-lg font-semibold">Upzilla:</span>{" "}
            {profileInfo.data.upzilla || "N/A"}
          </p>
          <p>
            <span className="text-lg font-semibold">Village:</span>{" "}
            {profileInfo.data.village || "N/A"}
          </p>
          <p>
            <span className="text-lg font-semibold">Contact Number:</span>{" "}
            {profileInfo.data.phone || "N/A"}
          </p>
          <p>
            <span className="text-lg font-semibold">Email:</span>{" "}
            {profileInfo.data.email || "N/A"}
          </p>
        </div>
        <div className="card-actions justify-end">
          <NavLink
            to="/profile/editProfile"
            state={{ userId: currentuser_id }}
            className="btn btn-primary"
          >
            Edit Profile
          </NavLink>
        </div>
        {/* Modal for full image view */}
        <div
          className={`modal-overlay ${isModalOpen ? "active" : ""}`}
          onClick={handleCloseModal}
        >
          <div className="modal-content">
            <button onClick={handleCloseModal} className="modal-close-btn">
              ×
            </button>
            <img src={selectedImage} alt="Full view" />
          </div>
        </div>
      </div>
      <p className="border my-5 border-black"></p>

      {/* Current user posts section */}
      <div>
        {/* Found Items Section */}
        <div className="p-2 md:p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
            Found Items
          </h2>
          {currentUserFoundPost.length > 0 ? (
            <div className="overflow-x-auto">
              {/* Table for medium and larger screens */}
              <table className="hidden md:table table-auto w-full">
                <thead>
                  <tr className="bg-gray-500 text-white">
                    <th className="px-2 md:px-4 py-2">Category</th>
                    <th className="px-2 md:px-4 py-2">Product Name</th>
                    <th className="px-2 md:px-4 py-2">Location</th>
                    <th className="px-2 md:px-4 py-2">Date</th>
                    <th className="px-2 md:px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUserFoundPost.map((found, index) => (
                    <tr key={index} className="bg-white hover:bg-blue-100">
                      <td className="px-2 md:px-8 py-2">{found.category}</td>
                      <td className="px-2 md:pl-10 py-2">
                        {found.productName}
                      </td>
                      <td className="px-2 md:px-4 py-2">{found.zilla}</td>
                      <td className="px-2 md:px-4 py-2">
                        {found.possibleDate}
                      </td>
                      <td className="px-2 md:px-4 py-2 relative">
                        <div className="dropdown dropdown-hover">
                          <div
                            tabIndex={index}
                            role="button"
                            className="ml-2 md:ml-10 font-bold text-xl"
                          >
                            &#x22EE;
                          </div>
                          <ul
                            tabIndex={index}
                            className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-2 shadow"
                          >
                            <li>
                              <button
                                onClick={() => handleShowMore(found)}
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Show Details
                              </button>
                            </li>
                            <li>
                              <NavLink
                                to={`/foundPostUpdate/${found._id}`}
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Update
                              </NavLink>
                            </li>
                            <li>
                              <button
                                onClick={() => handleFoundPostDelete(found._id)}
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Delete
                              </button>
                            </li>
                            <li>
                              <button
                                to="/done"
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Done
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Card view for small screens */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {currentUserFoundPost.map((found, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded shadow hover:bg-blue-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold">{found.productName}</div>
                      <div className="dropdown dropdown-hover">
                        <div
                          tabIndex={index}
                          role="button"
                          className="font-bold text-xl"
                        >
                          &#x22EE;
                        </div>
                        <ul
                          tabIndex={index}
                          className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-2 shadow right-0"
                        >
                          <li>
                            <button
                              onClick={() => handleShowMore(found)}
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Show Details
                            </button>
                          </li>
                          <li>
                            <NavLink
                              to={`/foundPostUpdate/${found._id}`}
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Update
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={() => handleFoundPostDelete(found._id)}
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Delete
                            </button>
                          </li>
                          <li>
                            <button
                              to="/done"
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Done
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-semibold">Category:</div>
                      <div>{found.category}</div>
                      <div className="font-semibold">Location:</div>
                      <div>{found.zilla}</div>
                      <div className="font-semibold">Date:</div>
                      <div>{found.possibleDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-red-600">No found items found.</p>
          )}
        </div>

        {/* Lost Items Section */}
        <div className="p-2 md:p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
            Lost Items
          </h2>
          {currentUserLostPost.length > 0 ? (
            <div className="overflow-x-auto">
              {/* Table for medium and larger screens */}
              <table className="hidden md:table table-auto w-full">
                <thead>
                  <tr className="bg-gray-500 text-white">
                    <th className="px-2 md:px-4 py-2">Category</th>
                    <th className="px-2 md:px-4 py-2">Product Name</th>
                    <th className="px-2 md:px-4 py-2">Location</th>
                    <th className="px-2 md:px-4 py-2">Date</th>
                    <th className="px-2 md:px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUserLostPost.map((lost, index) => (
                    <tr key={index} className="bg-white hover:bg-blue-100">
                      <td className="px-2 md:px-8 py-2">{lost.category}</td>
                      <td className="px-2 md:pl-10 py-2">{lost.productName}</td>
                      <td className="px-2 md:px-4 py-2">{lost.zilla}</td>
                      <td className="px-2 md:px-4 py-2">{lost.possibleDate}</td>
                      <td className="px-2 md:px-4 py-2 relative">
                        <div className="dropdown dropdown-hover">
                          <div
                            tabIndex={index}
                            role="button"
                            className="ml-2 md:ml-10 font-bold text-xl"
                          >
                            &#x22EE;
                          </div>
                          <ul
                            tabIndex={index}
                            className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-2 shadow"
                          >
                            <li>
                              <button
                                onClick={() => handleShowMore(lost)}
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Show Details
                              </button>
                            </li>
                            <li>
                              <NavLink
                                to={`/lostPostUpdate/${lost._id}`}
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Update
                              </NavLink>
                            </li>
                            <li>
                              <button
                                onClick={() => handleLostPostDelete(lost._id)}
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Delete
                              </button>
                            </li>
                            <li>
                              <NavLink
                                to="/done"
                                className="hover:bg-gray-300 font-semibold"
                              >
                                Done
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Card view for small screens */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {currentUserLostPost.map((lost, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded shadow hover:bg-blue-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold">{lost.productName}</div>
                      <div className="dropdown dropdown-hover">
                        <div
                          tabIndex={index}
                          role="button"
                          className="font-bold text-xl"
                        >
                          &#x22EE;
                        </div>
                        <ul
                          tabIndex={index}
                          className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-2 shadow right-0"
                        >
                          <li>
                            <button
                              onClick={() => handleShowMore(lost)}
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Show Details
                            </button>
                          </li>
                          <li>
                            <NavLink
                              to={`/lostPostUpdate/${lost._id}`}
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Update
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={() => handleLostPostDelete(lost._id)}
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Delete
                            </button>
                          </li>
                          <li>
                            <NavLink
                              to="/done"
                              className="hover:bg-gray-300 font-semibold"
                            >
                              Done
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-semibold">Category:</div>
                      <div>{lost.category}</div>
                      <div className="font-semibold">Location:</div>
                      <div>{lost.zilla}</div>
                      <div className="font-semibold">Date:</div>
                      <div>{lost.possibleDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-red-600 text-center">No lost items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
