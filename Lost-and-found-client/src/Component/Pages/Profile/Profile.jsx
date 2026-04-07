import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./modal.css";
import {
  MapPin,
  Phone,
  Mail,
  Edit3,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle,
} from "lucide-react";

const endpoints = import.meta.env.VITE_backendUrl;

/* ── tiny spinner ── */
const Spinner = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-50 to-indigo-50">
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-12 h-12 border-4 border-buttonColor1 border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "0.7s" }}
      />
      <p className="text-gray-500 font-medium tracking-wide">Loading profile…</p>
    </div>
  </div>
);

/* ── stat badge ── */
const StatBadge = ({ label, count, color }) => (
  <div
    className={`flex flex-col items-center px-6 py-3 rounded-2xl ${color} shadow-sm`}
  >
    <span className="text-2xl font-extrabold">{count}</span>
    <span className="text-xs font-semibold uppercase tracking-wide mt-0.5 opacity-80">
      {label}
    </span>
  </div>
);

/* ── action menu ── */
const ActionMenu = ({ index, onShowMore, updateLink, onDelete, onDone }) => (
  <div className="dropdown dropdown-hover">
    <div
      tabIndex={index}
      role="button"
      className="btn btn-ghost btn-xs text-gray-500 hover:text-gray-800"
    >
      ⋮
    </div>
    <ul
      tabIndex={index}
      className="dropdown-content menu bg-white rounded-xl z-[10] w-44 p-1.5 shadow-lg border border-gray-100"
    >
      <li>
        <button
          onClick={onShowMore}
          className="flex items-center gap-2 hover:bg-cyan-50 rounded-lg px-3 py-2 text-sm font-medium"
        >
          <Eye size={14} /> Show Details
        </button>
      </li>
      <li>
        <NavLink
          to={updateLink}
          className="flex items-center gap-2 hover:bg-cyan-50 rounded-lg px-3 py-2 text-sm font-medium"
        >
          <Edit3 size={14} /> Update
        </NavLink>
      </li>
      <li>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 hover:bg-red-50 text-red-500 rounded-lg px-3 py-2 text-sm font-medium"
        >
          <Trash2 size={14} /> Delete
        </button>
      </li>
      <li>
        <button
          onClick={onDone}
          className="flex items-center gap-2 hover:bg-green-50 text-green-600 rounded-lg px-3 py-2 text-sm font-medium"
        >
          <CheckCircle size={14} /> Done
        </button>
      </li>
    </ul>
  </div>
);

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("found");
  const { getCurrentUser } = useContext(AuthContext);
  const [currentUserFoundPost, setCurrentUserFoundPost] = useState([]);
  const [currentUserLostPost, setCurrentUserLostPost] = useState([]);
  const user = getCurrentUser();
  const currentuser_id = user.uid;
  const navigate = useNavigate();

  const handleShowMore = (post) => navigate("/details", { state: { post } });

  useEffect(() => {
    const fetchFoundPosts = async () => {
      try {
        const res = await fetch(`${endpoints}/posts/found/${currentuser_id}`);
        if (res.ok) {
          const data = await res.json();
          setCurrentUserFoundPost(data.data || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (currentuser_id) fetchFoundPosts();
  }, [currentuser_id]);

  useEffect(() => {
    const fetchLostPosts = async () => {
      try {
        const res = await fetch(`${endpoints}/posts/lost/${currentuser_id}`);
        if (res.ok) {
          const data = await res.json();
          setCurrentUserLostPost(data.data || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (currentuser_id) fetchLostPosts();
  }, [currentuser_id]);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const res = await fetch(`${endpoints}/user/getInfo/${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setProfileInfo(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileInfo();
  }, []);

  const handleFoundPostDelete = (postId) => {
    Swal.fire({
      title: "Delete this post?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A97B0",
      cancelButtonColor: "#e53e3e",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${endpoints}/posts/found/${postId}`, { method: "DELETE" })
          .then((r) => r.json())
          .then((data) => {
            if (data.success && data.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Found post removed.", "success");
              setCurrentUserFoundPost((prev) =>
                prev.filter((p) => p._id !== postId)
              );
            } else {
              Swal.fire("Failed!", "Could not delete post.", "error");
            }
          });
      }
    });
  };

  const handleLostPostDelete = (postId) => {
    Swal.fire({
      title: "Delete this post?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A97B0",
      cancelButtonColor: "#e53e3e",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${endpoints}/posts/lost/${postId}`, { method: "DELETE" })
          .then((r) => r.json())
          .then((data) => {
            if (data.success && data.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Lost post removed.", "success");
              setCurrentUserLostPost((prev) =>
                prev.filter((p) => p._id !== postId)
              );
            } else {
              Swal.fire("Failed!", "Could not delete post.", "error");
            }
          });
      }
    });
  };

  if (loading) return <Spinner />;

  if (!profileInfo)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-xl text-gray-500">
          Error loading profile.{" "}
          <span className="text-red-500">Please wait…</span>
        </p>
      </div>
    );

  const info = profileInfo.data;
  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

  const activePosts =
    activeTab === "found" ? currentUserFoundPost : currentUserLostPost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Profile Card ── */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Cover banner */}
          <div
            className="h-32 w-full"
            style={{
              background:
                "linear-gradient(135deg, #0A97B0 0%, #007C8A 50%, #4e5d77 100%)",
            }}
          />

          {/* Avatar + info */}
          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              {/* Avatar */}
              <div className="relative w-28 h-28">
                {info.image ? (
                  <img
                    src={info.image}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      setSelectedImage(info.image);
                      setIsModalOpen(true);
                    }}
                  />
                ) : (
                  <div
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #0A97B0, #007C8A)",
                    }}
                  >
                    {getInitials(info.fullname)}
                  </div>
                )}
              </div>

              {/* Edit button */}
              <NavLink
                to="/profile/editProfile"
                state={{ userId: currentuser_id }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #0A97B0, #007C8A)",
                }}
              >
                <Edit3 size={15} />
                Edit Profile
              </NavLink>
            </div>

            {/* Name & username */}
            <div className="mt-4">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {info.fullname}
              </h2>
              <p className="text-buttonColor1 font-semibold text-sm mt-0.5">
                @{info.username || "username"}
              </p>
            </div>

            {/* Info pills */}
            <div className="mt-5 flex flex-wrap gap-3">
              {(info.division || info.zilla) && (
                <span className="flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <MapPin size={13} />
                  {[info.division, info.zilla, info.upzilla, info.village]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              )}
              {info.phone && (
                <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <Phone size={13} />
                  {info.phone}
                </span>
              )}
              {info.email && (
                <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <Mail size={13} />
                  {info.email}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <StatBadge
                label="Found"
                count={currentUserFoundPost.length}
                color="bg-green-50 text-green-700"
              />
              <StatBadge
                label="Lost"
                count={currentUserLostPost.length}
                color="bg-red-50 text-red-600"
              />
            </div>
          </div>
        </div>

        {/* ── Posts Card ── */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {["found", "lost"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "text-buttonColor1 border-b-2 border-buttonColor1 bg-cyan-50"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab === "found" ? "🟢" : "🔴"} {tab} Items{" "}
                <span className="ml-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {tab === "found"
                    ? currentUserFoundPost.length
                    : currentUserLostPost.length}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4">
            {activePosts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-3">
                  {activeTab === "found" ? "🔍" : "❓"}
                </div>
                <p className="font-medium">
                  No {activeTab} items posted yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
                      <th className="pb-3 pl-2">Item</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3 hidden sm:table-cell">Location</th>
                      <th className="pb-3 hidden md:table-cell">Date</th>
                      <th className="pb-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activePosts.map((post, index) => (
                      <tr
                        key={index}
                        className="hover:bg-cyan-50/40 transition-colors"
                      >
                        <td className="py-3 pl-2 font-semibold text-gray-800">
                          {post.productName}
                        </td>
                        <td className="py-3">
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500 hidden sm:table-cell">
                          {post.zilla}
                        </td>
                        <td className="py-3 text-gray-400 hidden md:table-cell">
                          {post.possibleDate}
                        </td>
                        <td className="py-3 text-center">
                          <ActionMenu
                            index={index}
                            onShowMore={() => handleShowMore(post)}
                            updateLink={
                              activeTab === "found"
                                ? `/foundPostUpdate/${post._id}`
                                : `/lostPostUpdate/${post._id}`
                            }
                            onDelete={() =>
                              activeTab === "found"
                                ? handleFoundPostDelete(post._id)
                                : handleLostPostDelete(post._id)
                            }
                            onDone={() => navigate("/done")}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <div
        className={`modal-overlay ${isModalOpen ? "active" : ""}`}
        onClick={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
      >
        <div className="modal-content">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setSelectedImage(null);
            }}
            className="modal-close-btn"
          >
            ×
          </button>
          <img src={selectedImage} alt="Full view" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
