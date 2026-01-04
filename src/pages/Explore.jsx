import React, { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import NotFound from "./NotFound";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Explore = () => {
  const axiosInstance = useAxiosSecure();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortField, setSortField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 8,
        search: searchTerm,
        category: selectedCategory,
        sortField: sortField
      });
      const res = await axiosInstance.get(`/artworks?${params.toString()}`);
      setArts(res.data?.data || []);
      setMeta(res.data?.meta || { totalPages: 1 });
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setArts([]);
      setMeta({ totalPages: 1 });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtworks();
  }, [currentPage, selectedCategory, sortField, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1);
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

          <select
            onChange={handleSortChange}
            value={sortField}
            className="select select-bordered h-12 rounded-xl bg-base-100 min-w-[150px] border-base-300 focus:outline-primary"
          >
            <option value="">Sort By (Default)</option>
            <option value="createdAt">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : arts.length === 0 ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-base-200/50 rounded-[3rem] border border-dashed border-base-300">
          <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center text-base-content/20 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-black mb-2">No Artworks Found</h3>
          <p className="text-base-content/60 max-w-sm">We couldn't find any artworks matching your current filters or search criteria. Try adjusting them!</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSortField("");
              setCurrentPage(1);
            }}
            className="btn btn-primary mt-8 rounded-2xl px-8"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {arts.map((art) => (
              <ArtCard key={art._id} art={art} />
            ))}
          </div>

          {/* Pagination Controls */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center mt-16 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="btn btn-outline border-base-300 rounded-xl px-6 disabled:opacity-30"
              >
                Previous
              </button>
              {[...Array(meta.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn rounded-xl px-5 ${currentPage === i + 1 ? "btn-primary shadow-lg shadow-primary/20" : "btn-ghost"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === meta.totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="btn btn-outline border-base-300 rounded-xl px-6 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
