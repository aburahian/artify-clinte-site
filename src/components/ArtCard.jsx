import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const ArtCard = ({ art }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition rounded-xl overflow-hidden">
      <figure className="h-56 p-4">
        <img
          src={art.image}
          alt={art.title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <h3 className="font-semibold text-lg">{art.title}</h3>
        <p className="text-sm text-gray-500">by {art.artistName}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-400">{art.category}</p>
          <div className="flex items-center gap-1 text-pink-500">
            <FaHeart size={16} />
            <span>{art.likes?.length || 0}</span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            to={`/artworks/${art._id}`}
            className="btn btn-sm btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
