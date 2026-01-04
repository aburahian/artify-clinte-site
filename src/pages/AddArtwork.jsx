import React from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

const AddArtwork = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const medium = e.target.medium.value || null;
    const dimensions = e.target.dimensions.value || null;
    const price = e.target.price.value || null;
    const visibility = e.target.visibility.value;

    const addArt = {
      title,
      image,
      category,
      description,
      medium,
      dimensions,
      price,
      visibility,
      artistName: user?.displayName || "Unknown Artist",
      artistEmail: user?.email,
      createdAt: new Date(),
    };
    axiosInstance.post("/artWorks", addArt).then((res) => {
      if (res.data.insertedId) {
        toast.success("Artwork added successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add artwork. Try again!");
      }
    });
  };
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-base-content tracking-tight mb-4">
          <Typewriter
            words={["Publish Your Art", "Share Your Vision", "Connect with Creators"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
        <p className="text-base-content/60 font-medium">Your masterpiece deserves the best showcase. Fill in the details below.</p>
      </div>

      <div className="bg-base-100 p-8 md:p-16 rounded-[3rem] shadow-2xl border border-base-200">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Artwork Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Celestial Harmony"
                required
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Category</label>
              <select
                name="category"
                required
                className="select select-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              >
                <option value="">Select Category</option>
                <option>Digital Art</option>
                <option>Illustration</option>
                <option>Photography</option>
                <option>Painting</option>
                <option>3D Model</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Artwork Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                required
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            {/* Medium */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Medium / Tools</label>
              <input
                type="text"
                name="medium"
                placeholder="e.g. Photoshop, Oil, Acrylic"
                required
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Price (USD)</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Dimensions (Optional)</label>
              <input
                type="text"
                name="dimensions"
                placeholder="e.g. 24x36 inches"
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Visibility</label>
              <select
                name="visibility"
                className="select select-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              >
                <option value="public">Public (Visible to everyone)</option>
                <option value="private">Private (Only you can see)</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Description</label>
              <textarea
                name="description"
                placeholder="Tell the story behind your artwork..."
                rows={4}
                required
                className="textarea textarea-bordered w-full rounded-2xl focus:outline-primary transition-all p-6"
              ></textarea>
            </div>

            {/* Artist Info (Read Only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2 p-6 bg-base-200 rounded-3xl border border-base-300 opacity-70">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Posting As</p>
                <p className="font-bold">{user?.displayName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Contact Email</p>
                <p className="font-bold">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="btn btn-primary h-16 rounded-2xl px-12 font-black text-lg shadow-2xl shadow-primary/32 transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto"
            >
              Confirm & Publish Artwork
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtwork;
