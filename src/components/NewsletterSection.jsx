import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterSection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[120px] -z-10"
            />

            <div className="w-11/12 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="newsletter-card bg-primary text-white rounded-[4rem] p-8 md:p-24 text-center shadow-[0_40px_100px_-20px_rgba(255,51,102,0.3)] relative overflow-hidden"
                >
                    {/* Interior Decorative Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />

                    <div className="max-w-3xl mx-auto relative z-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-6 py-2 bg-white/10 rounded-full mb-8"
                        >
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Weekly Art Digest</span>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight italic">
                            Join the <br /> Creative Circle
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 font-medium mb-16 leading-relaxed max-w-xl mx-auto">
                            The pulse of the art world, delivered to your inbox every Sunday.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 p-3 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20">
                            <input
                                type="email"
                                required
                                placeholder="Your masterpiece email..."
                                className="input h-16 md:h-20 flex-1 bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 outline-none text-xl font-bold px-8"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn h-16 md:h-20 bg-white text-primary border-none hover:bg-white text-lg font-black px-12 rounded-[2rem] flex items-center gap-3 shadow-2xl"
                            >
                                Get Access <FaPaperPlane className="text-sm" />
                            </motion.button>
                        </form>

                        <p className="mt-12 text-xs text-white/40 font-black uppercase tracking-[0.5em]">
                            Curated Content • Zero Noise • One Click Unsubscribe
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;
