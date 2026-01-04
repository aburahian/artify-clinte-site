import React from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

import { useForm } from "react-hook-form";

const AddArtwork = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const addArt = {
      ...data,
      artistName: user?.displayName || "Unknown Artist",
      artistEmail: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await axiosInstance.post("/artworks", addArt);
      if (res.data.insertedId) {
        toast.success("Artwork added successfully! ✨");
        reset();
      } else {
        toast.error("Failed to add artwork. Try again!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while publishing.");
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Artwork Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required", minLength: { value: 3, message: "Too short" } })}
                placeholder="e.g. Celestial Harmony"
                className={`input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6 ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-xs font-bold ml-1">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className={`select select-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6 ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select Category</option>
                <option>Digital Art</option>
                <option>Illustration</option>
                <option>Photography</option>
                <option>Painting</option>
                <option>3D Model</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs font-bold ml-1">{errors.category.message}</p>}
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Artwork Image URL</label>
              <input
                type="url"
                {...register("image", { required: "Image URL is required" })}
                placeholder="https://example.com/image.jpg"
                className={`input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6 ${errors.image ? 'border-red-500' : ''}`}
              />
              {errors.image && <p className="text-red-500 text-xs font-bold ml-1">{errors.image.message}</p>}
            </div>

            {/* Medium */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Medium / Tools</label>
              <input
                type="text"
                {...register("medium", { required: "Medium is required" })}
                placeholder="e.g. Photoshop, Oil, Acrylic"
                className={`input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6 ${errors.medium ? 'border-red-500' : ''}`}
              />
              {errors.medium && <p className="text-red-500 text-xs font-bold ml-1">{errors.medium.message}</p>}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Price (USD)</label>
              <input
                type="number"
                {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
                placeholder="0.00"
                className={`input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6 ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <p className="text-red-500 text-xs font-bold ml-1">{errors.price.message}</p>}
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Dimensions (Optional)</label>
              <input
                type="text"
                {...register("dimensions")}
                placeholder="e.g. 24x36 inches"
                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              />
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-base-content/80 ml-1">Visibility</label>
              <select
                {...register("visibility")}
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
                {...register("description", { required: "Description is required", minLength: { value: 20, message: "Please provide a bit more detail" } })}
                placeholder="Tell the story behind your artwork..."
                rows={4}
                className={`textarea textarea-bordered w-full rounded-2xl focus:outline-primary transition-all p-6 ${errors.description ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs font-bold ml-1">{errors.description.message}</p>}
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
              disabled={isSubmitting}
              className="btn btn-primary h-16 rounded-2xl px-12 font-black text-lg shadow-2xl shadow-primary/32 transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto flex items-center gap-3"
            >
              {isSubmitting ? <span className="loading loading-spinner"></span> : null}
              {isSubmitting ? "Publishing..." : "Confirm & Publish Artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtwork;
