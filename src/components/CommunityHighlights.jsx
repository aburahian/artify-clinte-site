import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const CommunityHighlights = () => {
  const fakeCommunityHighlights = [
    {
      id: 1,
      title: "Sunset Overdrive",
      artist: "Abu Raihan",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop",
      likes: 120,
    },
    {
      id: 2,
      title: "Mountain Mist",
      artist: "Jane Doe",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
      likes: 95,
    },
    {
      id: 3,
      title: "City Lights",
      artist: "John Smith",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
      likes: 87,
    },
    {
      id: 4,
      title: "Ocean Breeze",
      artist: "Alice Johnson",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      likes: 102,
    },
    {
      id: 5,
      title: "Digital Dreams",
      artist: "Bob Lee",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
      likes: 76,
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-32">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <span className="text-primary font-black uppercase tracking-widest text-xs">Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            Community Highlights
          </h2>
          <p className="text-base-content/40 font-bold">Discover what's capturing hearts this week.</p>
        </motion.div>

        <Link
          to="/gallery"
          className="text-xs font-black uppercase tracking-[0.2em] px-8 py-4 bg-base-200 rounded-full hover:bg-primary hover:text-white transition-all shadow-lg"
        >
          View Full Stream
        </Link>
      </div>

      <div className="highlights-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {fakeCommunityHighlights.map((art, i) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="highlight-card group relative bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 transition-all hover:shadow-primary/20 border border-base-200"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-6 right-6">
                <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-pink-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                  <FaHeart />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-black text-xl mb-1 tracking-tight">{art.title}</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[1px] bg-white/50" />
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{art.artist}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default CommunityHighlights;
