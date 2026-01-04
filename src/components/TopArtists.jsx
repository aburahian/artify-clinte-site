import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCrown, FaStar } from "react-icons/fa";

const TopArtists = () => {
  const fakeTopArtists = [
    {
      id: 1,
      name: "Abu Raihan",
      email: "aburaihan@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
      totalLikes: 120,
      totalArtworks: 8,
      rank: 1
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
      totalLikes: 110,
      totalArtworks: 10,
      rank: 2
    },
    {
      id: 3,
      name: "John Smith",
      email: "john@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop",
      totalLikes: 95,
      totalArtworks: 7,
      rank: 3
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop",
      totalLikes: 90,
      totalArtworks: 9,
      rank: 4
    },
    {
      id: 5,
      name: "Bob Lee",
      email: "bob@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop",
      totalLikes: 85,
      totalArtworks: 6,
      rank: 5
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-32 relative">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 px-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-secondary rounded-full" />
            <span className="text-secondary font-black uppercase tracking-widest text-xs"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
            Top Creators
          </h2>
          <p className="text-base-content/40 font-bold mt-2">The visionaries leading our creative revolution.</p>
        </motion.div>

        <Link
          to="/artists"
          className="btn btn-outline border-base-300 rounded-full px-10 font-black hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg"
        >
          Leaderboard
        </Link>
      </div>

      <div className="artists-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {fakeTopArtists.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ y: -15 }}
            className="artist-card group bg-base-100 p-10 rounded-[3rem] flex flex-col items-center text-center border border-base-200 shadow-2xl shadow-primary/5 transition-all hover:shadow-primary/10 relative overflow-hidden"
          >
            {/* Rank Badge */}
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="text-4xl font-black text-primary/10 group-hover:text-primary/20">#{artist.rank}</span>
            </div>

            <div className="relative mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all"
              />
              <img
                src={artist.avatar}
                alt={artist.name}
                className="relative w-32 h-32 rounded-full border-4 border-base-100 shadow-2xl object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              {artist.rank === 1 && (
                <div className="absolute -top-4 -right-2 bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-4 border-base-100 transform rotate-12">
                  <FaCrown size={16} />
                </div>
              )}
            </div>

            <h3 className="font-black text-2xl mb-1 tracking-tight group-hover:text-primary transition-colors">{artist.name}</h3>
            <p className="text-sm text-base-content/40 font-bold mb-6 italic">@{artist.name.toLowerCase().replace(' ', '')}</p>

            <div className="mt-auto pt-6 border-t border-base-100 w-full">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-black text-base-content">{artist.totalArtworks}</p>
                  <p className="text-[10px] uppercase font-black text-base-content/30 tracking-widest">Arts</p>
                </div>
                <div className="w-[1px] h-8 bg-base-100" />
                <div className="text-center">
                  <p className="text-xl font-black text-primary">{artist.totalLikes}</p>
                  <p className="text-[10px] uppercase font-black text-base-content/30 tracking-widest">Likes</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
