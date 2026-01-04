import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

import Banner from "../components/Banner";
import TopArtists from "../components/TopArtists";
import CommunityHighlights from "../components/CommunityHighlights";
import ArtGallery from "./ArtGallery";
import ArtCard from "../components/ArtCard";
import Spinner from "../components/Spinner";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import FAQSection from "../components/FAQSection";
import FeaturedCollection from "../components/FeaturedCollection";
import useAxios from "../Hook/useAxios";

const Home = () => {
  const axiosInstance = useAxios();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true); // Set loading to true when fetching starts

    axiosInstance
      .get("/latest-art")
      .then((res) => {
        if (isMounted) {
          setArts(res.data);
          setLoading(false); // Set loading to false on success
        }
      })
      .catch((err) => {
        console.error("Failed to fetch latest art:", err);
        if (isMounted) setLoading(false); // Set loading to false on error
      });

    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  return (
    <div className="pb-20 overflow-hidden relative">
      {/* Decorative Background Blobs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          rotate: [0, 90, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[50%] -left-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10"
      />

      <Banner />

      {/* Latest Artworks */}
      <section className="latest-art-section w-11/12 mx-auto mt-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="latest-art-header flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <span className="text-primary font-black uppercase tracking-widest text-xs">New Arrivals</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              Latest Masterpieces
            </h2>
          </div>

          <Link
            to="/arts"
            className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:text-primary transition-colors"
          >
            Explore Full Market <span className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-base-content/30 animate-pulse text-center">
              Fetching the finest <br /> expressions...
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {arts.map((art, i) => (
              <motion.div
                key={art._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ArtCard art={art} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <FeaturedCollection />
      <TopArtists />
      <CommunityHighlights />
      <ArtGallery />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;

