import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Favorites = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/favorites/${user.email}`)
      .then((res) => {
        setArts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user, axiosInstance]);

  const handleUnfavorite = (id) => {
    axiosInstance
      .patch(`/artworks/${id}/favorite`, { userEmail: user.email })
      .then(() => {
        setArts((prev) => prev.filter((art) => art._id !== id));
        toast.success("Removed from favorites!");
      })
      .catch(() => toast.error("Failed to remove favorite"));
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-base-content tracking-tight">Saved Inspiration</h2>
          <p className="text-base-content/60 font-medium">Your curated collection of favorite masterpieces</p>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : arts.length === 0 ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300 text-center p-12">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
            <FaStar size={40} />
          </div>
          <h2 className="text-2xl font-black mb-4">No favorites yet</h2>
          <p className="text-base-content/60 max-w-sm mb-10 italic">Explore the gallery and save artworks that inspire you to see them here.</p>
          <a
            href="/explore"
            className="btn btn-primary h-14 rounded-2xl px-10 font-bold shadow-xl shadow-primary/20"
          >
            Explore Artworks
          </a>
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
                <button
                  onClick={() => handleUnfavorite(art._id)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md text-primary rounded-2xl flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                  title="Remove from Favorites"
                >
                  <FaStar />
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{art.title}</h2>
                <p className="text-sm text-base-content/50 mb-6 italic">{art.medium}</p>
                <div className="flex gap-3">
                  <a
                    href={`/art-details/${art._id}`}
                    className="flex-1 h-12 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-xl transition-all flex items-center justify-center"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
