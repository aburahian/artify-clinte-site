import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

const Counter = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Extract number from string like "2.5K+" or "15K+"
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    const suffix = value.replace(/[0-9.]/g, '');

    useEffect(() => {
        const controls = animate(0, numericValue, {
            duration: 2,
            ease: "easeOut",
            onUpdate(value) {
                setDisplayValue(value.toFixed(1).replace(/\.0$/, ''));
            },
        });
        return () => controls.stop();
    }, [numericValue]);

    return <span>{displayValue}{suffix}</span>;
}

const stats = [
    { label: "Active Artists", value: "2.5K+" },
    { label: "Total Artworks", value: "15K+" },
    { label: "Daily Visitors", value: "45K+" },
    { label: "Awards Won", value: "120+" },
];

const StatsSection = () => {
    return (
        <section className="bg-primary/5 py-24 mt-24 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
            />

            <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
                        className="stat-item group"
                    >
                        <motion.p
                            className="text-4xl md:text-6xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                        >
                            <Counter value={stat.value} />
                        </motion.p>
                        <p className="text-base-content/60 font-black uppercase tracking-widest text-xs md:text-sm">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
