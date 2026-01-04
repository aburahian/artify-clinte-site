import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

const ArtGallery = () => {
  const axiosInstance = useAxiosSecure();
  const { setLoading } = useAuth();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("artworks");

        const galleryImages = res.data.map((art) => ({
          original: art.image,
          thumbnail: art.image,
          description: `${art.title} by ${art.artistName || "Unknown"}`,
        }));

        setImages(galleryImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, [axiosInstance, setLoading]);

  return (
    <div className="w-11/12 mx-auto my-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="gallery-header mb-12"
      >
        <h2 className="text-4xl font-black tracking-tight mb-4 text-base-content">
          Infinite <span className="text-primary">Art Gallery</span>
        </h2>
        <div className="h-1.5 w-24 bg-primary rounded-full"></div>
      </motion.div>

      {images.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="gallery-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-200 bg-base-100 p-4 transition-all"
        >
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={true}
            autoPlay={true}
            slideInterval={5000}
            showThumbnails={true}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ArtGallery;
