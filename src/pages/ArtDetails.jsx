import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import ArtCard from "../components/ArtCard";

const ArtDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const [art, setArt] = useState({});
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true); const [relatedArts, setRelatedArts] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/artworks/${id}`).then((res) => {
      const data = res.data;
      const likesArray = Array.isArray(data.likedBy) ? data.likedBy : [];

      setArt(data);
      setLiked(user?.email ? likesArray.includes(user.email) : false);
      setFavorited(data.favorites?.includes(user?.email));
      setLikeCount(likesArray.length);

      // Fetch related arts in the same category
      if (data.category) {
        axiosInstance.get(`/artworks?category=${data.category}`).then(relRes => {
          const relData = relRes.data?.data || [];
          setRelatedArts(relData.filter(a => a._id !== id).slice(0, 4));
        });
      }

      setLoading(false);
    });
  }, [axiosInstance, id, user]);

  const handleLike = () => {
    if (!user) return toast.info("Please login to like this art");
    axiosInstance
      .patch(`/artworks/${id}/like`, { userEmail: user.email })
      .then((res) => {
        setLiked(res.data.liked);
        setLikeCount(res.data.likeCount);
      })
      .catch((err) => console.error(err));
  };

  const handleFavorite = () => {
    if (!user) return toast.info("Please login to add favorites");
    axiosInstance
      .patch(`/artworks/${id}/favorite`, { userEmail: user.email })
      .then(() => {
        setFavorited((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <Spinner />;

  return (
    <div className="pb-32">
      {/* Hero Section / Breadcrumbs */}
      <div className="w-11/12 mx-auto py-8">
        <div className="text-sm font-bold uppercase tracking-widest text-base-content/40 flex items-center gap-3 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/arts" className="hover:text-primary transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-primary">{art.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-200">
              <img
                src={art.image}
                alt={art.title}
                className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <button
                  onClick={handleLike}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md transition-all ${liked ? 'bg-pink-500 text-white' : 'bg-white/80 text-pink-500 hover:bg-pink-50'}`}
                >
                  {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                </button>
              </div>
            </div>

            {/* Secondary Images Mockup */}
            <div className="grid grid-cols-4 gap-4">
              {[art.image, art.image, art.image].map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer shadow-sm">
                  <img src={img} alt="alt" className="w-full aspect-square object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
              <div className="rounded-2xl bg-base-200 flex items-center justify-center text-base-content/30 font-bold text-xs uppercase cursor-not-allowed">
                +4 More
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                  {art.category}
                </span>
                <div className="flex text-amber-500 gap-1 ml-2">
                  <FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
                {art.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FaHeart />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-base-content/30">Artist</p>
                  <Link to={`/arts/art/artist/${art.artistEmail}`} className="font-black text-lg hover:text-primary transition-colors italic">
                    @{art.artistName}
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-8 bg-base-200/50 rounded-[2.5rem] border border-base-300">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-2">Current Bid / Price</p>
                  <h2 className="text-4xl font-black text-primary">${art.price} <span className="text-lg text-base-content/40 font-bold ml-1">USD</span></h2>
                </div>
                <button className="btn btn-primary rounded-2xl px-10 h-14 font-black shadow-xl shadow-primary/20">
                  Collect Now
                </button>
              </div>

              <button
                onClick={handleFavorite}
                className={`w-full h-14 rounded-2xl border-2 font-black flex items-center justify-center gap-3 transition-all ${favorited ? 'bg-amber-500 border-amber-500 text-white shadow-lg' : 'border-base-300 hover:border-primary hover:text-primary'}`}
              >
                <FaStar /> {favorited ? "Added to Favorites" : "Save for Later"}
              </button>
            </div>

            {/* Tabs / Accordions for Specs */}
            <div className="space-y-6">
              <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-[2rem]">
                <input type="radio" name="details-accordion" defaultChecked />
                <div className="collapse-title text-xl font-bold px-8">
                  Overview / Description
                </div>
                <div className="collapse-content px-8 pb-8 text-base-content/60 font-medium leading-relaxed">
                  {art.description}
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-[2rem]">
                <input type="radio" name="details-accordion" />
                <div className="collapse-title text-xl font-bold px-8">
                  Key Information & Specs
                </div>
                <div className="collapse-content px-8 pb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-base-200 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Medium</p>
                      <p className="font-bold">{art.medium}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Dimensions</p>
                      <p className="font-bold">{art.dimensions || "Digital Format"}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Creation Date</p>
                      <p className="font-bold">{new Date(art.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Visibility</p>
                      <p className="font-bold capitalize">{art.visibility}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Art Section */}
      {relatedArts.length > 0 && (
        <section className="mt-40 w-11/12 mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <span className="text-primary font-black uppercase tracking-widest text-xs">Based on Your Interest</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter">You Might Also <span className="text-primary">Love</span></h2>
            </div>
            <Link to="/arts" className="btn btn-ghost font-black uppercase tracking-widest text-xs">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedArts.map(relArt => (
              <ArtCard key={relArt._id} art={relArt} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArtDetails;
