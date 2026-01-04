import React, { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import NotFound from "./NotFound";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Explore = () => {
  const axiosInstance = useAxiosSecure();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("artWorks").then((res) => setArts(res.data));
    setLoading(false);
  }, [axiosInstance]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setQuery(query);
    setLoading(true);
    axiosInstance.get(`/search?search=${query}`).then((res) => {
      setArts(res.data);
      setLoading(false);
    });
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setLoading(true);
    axiosInstance.get(`/artWorks?category=${category}`).then((res) => {
      setArts(res.data);
      setLoading(false);
    });
  };
  return (
    <div className="w-11/12 mx-auto pb-24">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 my-16">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight mb-4">
            Explore Masterpieces
          </h2>
          <p className="text-base-content/60 text-lg">
            Discover a curated collection of digital and physical art from creators around the globe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative grow">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                name="search"
                placeholder="Search art, artists..."
                className="input input-bordered h-14 rounded-2xl w-full sm:w-80 focus:outline-primary transition-all pr-12"
              />
              <button type="submit" className="btn btn-primary h-14 rounded-2xl px-8 shadow-lg shadow-primary/20">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-12 items-center p-6 bg-base-200 rounded-3xl border border-base-300">
        <span className="text-sm font-bold uppercase tracking-widest text-base-content/40 mr-2">Filters:</span>

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered h-12 rounded-xl bg-base-100 min-w-[200px] border-base-300 focus:outline-primary"
          >
            <option value="">All Categories</option>
            <option>Digital Art</option>
            <option>Illustration</option>
            <option>Photography</option>
            <option>Painting</option>
            <option>3D Model</option>
          </select>

          <select className="select select-bordered h-12 rounded-xl bg-base-100 min-w-[150px] border-base-300 focus:outline-primary">
            <option value="">Sort By</option>
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Popular</option>
            <option>Price: Low to High</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : query.length > 0 && arts.length === 0 ? (
        <NotFound />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {arts.map((art) => (
            <ArtCard key={art._id} art={art} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
