import React, { useEffect, useState } from "react";
import { FaPlus, FaImage } from "react-icons/fa6";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyGallery = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    medium: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axiosInstance
      .get(`/my-artworks?artistEmail=${user.email}`)
      .then((res) => {
        setArts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, axiosInstance]);

  const handleDelete = (id) => {
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
        axiosInstance.delete(`/artworks/${id}`).then(() => {
          setArts((prev) => prev.filter((art) => art._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your artwork has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  const openUpdateModal = (art) => {
    setSelectedArt(art);
    setUpdatedData({
      title: art.title,
      medium: art.medium,
      image: art.image,
      description: art.description,
    });
    document.getElementById("update_modal").showModal();
  };

  const handleUpdate = () => {
    axiosInstance.put(`/artworks/${selectedArt._id}`, updatedData).then(() => {
      setArts((prev) =>
        prev.map((art) =>
          art._id === selectedArt._id ? { ...art, ...updatedData } : art
        )
      );
      setSelectedArt(null);
      setUpdatedData({ title: "", medium: "", image: "", description: "" });
      document.getElementById("update_modal").close();
      Swal.fire({
        title: "Updated!",
        text: "Your artwork has been updated.",
        icon: "success",
      });
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-base-content tracking-tight">My Collection</h2>
          <p className="text-base-content/60 font-medium">Manage and showcase your personal masterpieces</p>
        </div>
        <Link
          to="/dashboard/add-artwork"
          className="btn btn-primary h-14 rounded-2xl px-8 font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <FaPlus /> Add New Work
        </Link>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : arts.length === 0 ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300 text-center p-12">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
            <FaImage size={40} />
          </div>
          <h2 className="text-2xl font-black mb-4">Your gallery is empty</h2>
          <p className="text-base-content/60 max-w-sm mb-10 italic">Start sharing your creativity with the world by adding your first artwork today.</p>
          <Link
            to="/dashboard/add-artwork"
            className="btn btn-primary h-14 rounded-2xl px-10 font-bold shadow-xl shadow-primary/20"
          >
            Create First Artwork
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {arts.map((art) => (
            <div
              key={art._id}
              className="group bg-base-100 rounded-3xl overflow-hidden border border-base-200 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-black text-primary shadow-sm">
                  {art.category}
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{art.title}</h2>
                <p className="text-sm text-base-content/50 mb-6 italic">{art.medium}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => openUpdateModal(art)}
                    className="flex-1 h-12 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-xl transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(art._id)}
                    className="flex-1 h-12 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white font-bold rounded-xl transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <dialog id="update_modal" className="modal backdrop-blur-sm">
        <div className="modal-box max-w-2xl rounded-[3rem] p-12 bg-base-100 border border-base-200 shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black mb-2">Update Artwork</h3>
            <p className="text-base-content/60 font-medium">Refine your masterpiece details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Title</label>
              <input
                type="text"
                value={updatedData.title}
                onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Medium</label>
              <input
                type="text"
                value={updatedData.medium}
                onChange={(e) => setUpdatedData({ ...updatedData, medium: e.target.value })}
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Image URL</label>
              <input
                type="text"
                value={updatedData.image}
                onChange={(e) => setUpdatedData({ ...updatedData, image: e.target.value })}
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Description</label>
              <textarea
                value={updatedData.description}
                rows={4}
                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                className="textarea textarea-bordered w-full rounded-2xl focus:outline-primary transition-all p-6"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button
              className="btn h-14 rounded-2xl flex-1 font-bold"
              onClick={() => {
                document.getElementById("update_modal").close();
                setSelectedArt(null);
              }}
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-primary h-14 rounded-2xl flex-1 font-bold shadow-lg shadow-primary/20"
            >
              Save Updates
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyGallery;
