import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import { FaChevronDown, FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const containerRef = useRef();

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.65,
      behavior: "smooth"
    });
  };

  const slides = [
    {
      id: 1,
      title: "Where Every Stroke \nTells a Story",
      subtitle: "Join the most vibrant community of emerging and established artists.",
      image: "https://i.ibb.co.com/PsVzgVTF/176937-1536x864.webp",
      btnText: "Explore Collection",
      btnLink: "/arts",
      accent: "primary"
    },
    {
      id: 2,
      title: "Turn Your Vision \nInto Reality",
      subtitle: "The ultimate marketplace to showcase, share, and sell your masterpieces.",
      image: "https://i.ibb.co.com/p6WyRHfH/painting-brushes-1536x1024.jpg",
      btnText: "Start Creating",
      btnLink: "/dashboard/add-artwork",
      accent: "secondary"
    },
    {
      id: 3,
      title: "Connect With \nGlobal Creators",
      subtitle: "Art has no borders. Discover culture and creativity from 85+ countries.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
      btnText: "Join Artify",
      btnLink: "/auth/register",
      accent: "accent"
    },
  ];

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="relative group">
      <section className="relative w-full overflow-hidden shadow-2xl">
        <Swiper
          modules={[Pagination, Autoplay, Navigation, EffectFade]}
          effect="fade"
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-[65vh]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {({ isActive }) => (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Background Image with Zoom Animation */}
                  <motion.div
                    animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />

                  {/* Dynamic Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="banner-content relative z-10 text-left w-11/12 mx-auto px-4 md:px-12 flex flex-col items-start pt-4">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <>
                          <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-4 mb-6"
                          >
                            <div className={`h-[2px] w-20 bg-${slide.accent}`} />

                            Premium Art Experience

                          </motion.div>

                          <motion.h2
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl tracking-tighter leading-[0.9] whitespace-pre-line"
                          >
                            {slide.title}
                          </motion.h2>

                          <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-base md:text-xl mb-10 text-white/70 font-medium max-w-xl leading-relaxed"
                          >
                            {slide.subtitle}
                          </motion.p>

                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6"
                          >
                            <Link
                              to={slide.btnLink}
                              className={`btn btn-${slide.accent} btn-lg rounded-2xl px-8 font-black shadow-2xl h-16 md:h-20 text-lg hover:scale-105 transition-transform flex items-center gap-3`}
                            >
                              {slide.btnText} <FaArrowRight />
                            </Link>

                            <Link
                              to="/gallery"
                              className="btn btn-outline border-white/30 text-white btn-lg rounded-2xl px-8 font-black h-16 md:h-20 text-lg hover:bg-white/10"
                            >
                              View Gallery
                            </Link>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Floating Art Elements (Visual Flair) */}
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute right-[10%] top-[20%] w-32 h-32 md:w-64 md:h-64 border-[30px] border-white/5 rounded-full hidden lg:block"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute right-[15%] bottom-[15%] w-48 h-48 border border-white/10 rounded-[4rem] hidden lg:block"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Improved Scroll Hint */}
        <motion.div
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hidden md:block cursor-pointer hover:text-white transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll to Explore</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
          </div>
        </motion.div>
      </section>
    </div >
  );
};

export default Banner;
