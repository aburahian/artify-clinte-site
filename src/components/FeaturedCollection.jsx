import React from "react";
import { motion } from "framer-motion";

const collections = [
    {
        title: "Cyberpunk Visions",
        count: 24,
        image: "https://images.unsplash.com/photo-1614850523296-e8c1d093600e?q=80&w=800&auto=format&fit=crop",
        accent: "bg-purple-500"
    },
    {
        title: "Abstract Emotions",
        count: 18,
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
        accent: "bg-pink-500"
    },
    {
        title: "Nature Unveiled",
        count: 32,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
        accent: "bg-emerald-500"
    }
];

const FeaturedCollection = () => {
    return (
        <section className="py-32 bg-base-200/30">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-primary rounded-full" />
                        <span className="text-primary font-black uppercase tracking-widest text-xs">Curated for You</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                        Featured Collections
                    </h2>
                    <p className="text-base-content/40 font-bold max-w-xl mx-auto">Hand-picked selections of the most inspiring work from our global community.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {collections.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all cursor-pointer"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />

                            <div className="absolute bottom-10 left-10 right-10">
                                <div className={`${item.accent} w-12 h-1.5 rounded-full mb-4`} />
                                <h3 className="text-3xl font-black text-white mb-2 leading-none uppercase tracking-tighter">{item.title}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 font-bold">{item.count} Artworks</span>
                                    <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                                        →
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
