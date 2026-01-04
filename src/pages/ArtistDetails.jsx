import { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import { FaUser, FaEnvelope, FaGlobe, FaPaintBrush, FaPen } from "react-icons/fa";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ArtistDetails = () => {
  const { email } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const containerRef = useRef();

  const isOwnProfile = user?.email === email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: artistData } = await axiosInstance.get(`/artists/${email}`);
        const { data: artsData } = await axiosInstance.get(`/artworks?artist=${email}`);
        setArtist(artistData);
        setArtworks(artsData);
      } catch (error) {
        // Fallback for demo if artist endpoint not yet fully implemented
        if (isOwnProfile) {
          setArtist({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            bio: "Passionate artist and creator exploring the world of visual expression.",
            website: "https://artify.com/artist"
          });
        }
      }
    };
    fetchData();
  }, [email, axiosInstance, isOwnProfile, user]);

  useGSAP(() => {
    if (artist) {
      gsap.from(".profile-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".art-grid > div", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [artist]);

  if (!artist)
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Spinner />
        <p className="mt-4 text-base-content/60 font-medium">Loading artist portfolio...</p>
      </div>
    );

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto p-6 pb-24">
      <div className="profile-header flex flex-col md:flex-row items-center gap-10 bg-base-100 shadow-2xl rounded-[3rem] p-10 border border-base-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

        <img
          src={artist.photoURL || "https://i.ibb.co/5vFdhSM/default-avatar.png"}
          alt={artist.displayName}
          className="w-48 h-48 rounded-[2.5rem] object-cover border-4 border-primary/20 shadow-xl"
        />

        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <FaUser className="text-primary text-2xl" /> {artist.displayName}
            </h2>
            {isOwnProfile ? (
              <Link to="/dashboard/profile" className="btn btn-primary rounded-2xl px-6 font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
                <FaPen /> Manage Profile
              </Link>
            ) : (
              <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white rounded-2xl px-8 font-bold">Follow Artist</button>
            )}
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-base-content/60 flex items-center justify-center md:justify-start gap-2 font-medium">
              <FaEnvelope className="text-primary" /> {artist.email}
            </p>
            {artist.website && (
              <p className="text-base-content/60 flex items-center justify-center md:justify-start gap-2 font-medium">
                <FaGlobe className="text-primary" />
                <a href={artist.website} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {artist.website}
                </a>
              </p>
            )}
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <p className="text-base-content/70 leading-relaxed font-medium">
              {artist.bio || "This artist hasn't added a bio yet, but their work speaks for itself."}
            </p>
          </div>
        </div>
      </div>

      <div className="my-20">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-black flex items-center gap-4">
            <FaPaintBrush className="text-primary" />
            <span className="tracking-tight">Portfolio Collection</span>
            <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full">{artworks.length} Works</span>
          </h3>
          <div className="h-1 bg-base-200 flex-grow mx-8 hidden sm:block"></div>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-20 bg-base-200/50 rounded-[3rem] border border-dashed border-base-300">
            <p className="text-xl font-bold text-base-content/40">No artworks published yet.</p>
          </div>
        ) : (
          <div className="art-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((art) => (
              <div
                key={art._id}
                className="group flex flex-col bg-base-100 shadow-xl rounded-[2rem] overflow-hidden border border-base-200 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-primary shadow-lg">
                    {art.category}
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <h4 className="font-black text-2xl mb-2 tracking-tight">{art.title}</h4>
                  <div className="flex justify-between items-center mt-auto pt-6 border-t border-base-200">
                    <span className="flex items-center gap-1.5 font-bold text-pink-500">
                      <FaPaintBrush className="text-xs" /> {art.likedBy?.length || 0} Likes
                    </span>
                    <Link
                      to={`/arts/art/${art._id}`}
                      className="btn btn-sm btn-ghost text-primary font-black hover:bg-primary/10 rounded-xl"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDetails;
