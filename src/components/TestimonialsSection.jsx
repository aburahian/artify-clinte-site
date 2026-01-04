import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Digital Artist",
        text: "Artify has completely changed how I showcase my portfolio.",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
        name: "Marcus Thorne",
        role: "Art Collector",
        text: "Finding unique pieces here is effortless and reliable.",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
        name: "Elena Rodriguez",
        role: "Traditional Painter",
        text: "This platform genuinely respects artists.",
        avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-24">
            <div className="w-11/12 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black mb-4">
                        What Our Community Says
                    </h2>
                    <p className="text-base-content/60 max-w-2xl mx-auto italic">
                        Real feedback from real artists and collectors.
                    </p>
                </motion.div>

                <div className="testimonials-grid grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="testimonial-card bg-base-100 p-8 rounded-2xl border border-base-200 shadow-xl shadow-primary/5 transition-all"
                        >
                            <div className="flex gap-4 items-center mb-6">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    loading="lazy"
                                    className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                                />
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <p className="text-xs text-primary font-bold uppercase">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                            <p className="italic text-base-content/80">
                                “{t.text}”
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
