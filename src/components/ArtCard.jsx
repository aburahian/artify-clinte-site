import React from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ArtCard = ({ art }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-base-100 rounded-[2rem] overflow-hidden border border-base-200 hover:border-primary/40 transition-all duration-500 shadow-sm hover:shadow-2xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={art.image}
          alt={art.title}
          className="h-full w-full object-cover"
        />

        {/* Like Badge */}
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-pink-500 shadow-xl transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
          <FaHeart size={16} />
          <span className="text-sm font-black">{art.likedBy?.length || 12}</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[10px] uppercase tracking-widest font-black text-white bg-primary px-3 py-1.5 rounded-xl shadow-lg">
            {art.category || "Fine Art"}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="w-full flex gap-3"
          >
            <Link
              to={`/arts/art/${art._id}`}
              className="flex-1 py-4 bg-white text-primary font-black rounded-2xl text-center shadow-2xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <FaEye /> Quick View
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <h3 className="font-black text-2xl text-base-content truncate group-hover:text-primary transition-colors leading-tight">
            {art.title}
          </h3>
          <p className="text-sm text-base-content/50 font-bold mt-1">
            by <span className="text-secondary italic">@{art.artistName || "UnknownArtist"}</span>
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-base-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-base-content/30 uppercase tracking-widest">Reserve Price</span>
            <span className="text-xl font-black text-primary">
              {art.price > 0 ? `$${art.price}` : 'Accepting Bids'}
            </span>
          </div>
          <Link
            to={`/arts/art/${art._id}`}
            className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span className="font-black">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtCard;
