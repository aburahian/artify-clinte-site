import React from "react";
import { motion } from "framer-motion";
import {
    FaPaintBrush,
    FaUsers,
    FaGlobe,
    FaCertificate,
} from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
    const stats = [
        { label: "Verified Artists", value: "2,500+", icon: FaUsers },
        { label: "Artworks Sold", value: "15,000+", icon: FaPaintBrush },
        { label: "Global Reach", value: "85 Countries", icon: FaGlobe },
        { label: "Awards Won", value: "120+", icon: FaCertificate },
    ];

    const fadeInX = (direction) => ({
        initial: { opacity: 0, x: direction === "left" ? -40 : 40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    });

    return (
        <div className="pb-24 overflow-hidden">
            {/* HERO */}
            <section className="relative h-[65vh] mt-20 flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1541963463532-d68292c34b19"
                    alt="Art background"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-base-100/10 via-base-100/50 to-base-100 -z-10" />

                <div className="hero-content text-center px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
                            Empowering <span className="text-primary">Creativity</span> Globally
                        </h1>

                        <p className="text-xl md:text-2xl text-base-content/60 max-w-2xl mx-auto">
                            Artify is more than a gallery. It’s a creative ecosystem where artists
                            and collectors connect and shape the future of art.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* STATS */}
            <section className="w-11/12 mx-auto mt-20">
                <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="stat-card bg-base-100 p-10 rounded-[2.5rem] border border-base-200 shadow-2xl shadow-primary/5 text-center transition-all"
                        >
                            <div
                                className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6"
                                aria-hidden="true"
                            >
                                <stat.icon size={28} />
                            </div>
                            <h3 className="text-3xl font-black mb-2">{stat.value}</h3>
                            <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MISSION */}
            <section className="mission-section w-11/12 mx-auto py-32 grid lg:grid-cols-2 gap-20 items-center overflow-hidden">
                <motion.div {...fadeInX("left")} className="mission-text">
                    <h2 className="text-4xl font-black mb-8 leading-tight">
                        Bridging{" "}
                        <span className="text-primary underline">Traditional</span> &
                        <span className="text-secondary"> Digital</span> Art
                    </h2>

                    <p className="text-lg text-base-content/60 mb-8">
                        Art should be accessible, borderless, and fair. We give artists
                        global exposure while ensuring collectors discover authentic,
                        high-quality work.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Curated quality-first platform",
                            "Fair compensation for artists",
                            "Community-driven creative growth",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-4 font-bold">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                                    ✓
                                </span>
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div {...fadeInX("right")} className="mission-image relative">
                    <img
                        src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8"
                        alt="Gallery"
                        loading="lazy"
                        className="rounded-[3rem] shadow-2xl"
                    />

                    <div className="absolute -bottom-10 -left-10 bg-base-100 p-8 rounded-[2rem] shadow-xl hidden md:block">
                        <p className="text-2xl font-black text-primary">Est. 2024</p>
                        <p className="text-sm text-base-content/40">Founded in Dhaka</p>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section
                className="w-11/12 mx-auto bg-primary text-white rounded-[4rem] p-16 text-center shadow-2xl shadow-primary/20"
            >
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                    Start Your Creative Journey
                </h2>
                <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto">
                    Join thousands of artists and collectors already building with Artify.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/register?role=artist"
                        className="btn bg-white text-primary h-16 px-12 rounded-2xl font-black shadow-lg"
                    >
                        Join as Artist
                    </Link>
                    <Link
                        to="/arts"
                        className="btn btn-outline border-white text-white h-16 px-12 rounded-2xl font-black shadow-lg"
                    >
                        Explore Gallery
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
