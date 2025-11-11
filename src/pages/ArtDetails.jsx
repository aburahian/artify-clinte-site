import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hook/useAxiosSecure";

const ArtDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const [art, setArt] = useState({});
  console.log(art);

  useEffect(() => {
    axiosInstance.get(`/artworks/${id}`).then((res) => {
      setArt(res.data);
      console.log(res.data);
    });
  }, [axiosInstance, id]);

  return (
    <div className="w-11/12 mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src={art.image}
          alt={art.title}
          className="w-full h-full object-cover rounded-3xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">
            {art.title}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{art.medium}</p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {art.description}
          </p>
          <Link to={`/arts/art/artist/${art.artistEmail}`}>
            <button className="flex items-center gap-2 px-5 bg-gray-200 mb-6 text-gray-700 py-2 rounded-full">
              Artist Details
            </button>
          </Link>
          <div className="flex gap-4 mb-6">
            <button
              className={`flex items-center gap-2 px-5 py-2  rounded-full ${
                art?.liked
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold transition`}
            >
              {art?.liked ? <FaHeart /> : <FaRegHeart />}{" "}
              {art.likes?.length || 0}
            </button>

            <button
              className={`flex items-center gap-2 px-5 py-2 rounded-full ${
                art?.favorited
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold transition`}
            >
              <FaStar /> {art?.favorited ? "Favorited" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* 
      {art && (
        <div className="mt-16 border-t pt-10">
          <h2 className="text-2xl font-bold text-primary mb-6">About the Artist</h2>
          <div className="flex items-center gap-6">
            <img
              src={artist.photo}
              alt={artist.name}
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold">{art.title}</h3>
              <p className="text-gray-600">
                Total Artworks: <span className="font-bold">{artist.totalArts}</span>
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ArtDetails;
