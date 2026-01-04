import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        question: "How do I start selling my art on Artify?",
        answer: "To start selling, simply register as an artist, set up your profile, and click on 'Add Artwork' in your dashboard. Once published, your work will be visible to collectors worldwide."
    },
    {
        question: "What types of art can I find here?",
        answer: "We support a wide range of mediums, including digital art, traditional painting, photography, 3D models, and illustrations. Our community is diverse and always growing!"
    },
    {
        question: "Is there a commission fee?",
        answer: "Artify is currently free for emerging artists. We believe in empowering creators and only charge a minimal platform fee for premium features and verified seller status."
    },
    {
        question: "How secure is the payment process?",
        answer: "All transactions are handled through secure, industry-standard payment gateways. We ensure that both artists and collectors are protected throughout the exchange."
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-32 w-11/12 mx-auto">
            <div className="flex flex-col md:flex-row gap-20">
                <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-secondary rounded-full" />
                        <span className="text-secondary font-black uppercase tracking-widest text-xs">Got Questions?</span>
                    </div>
                    <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight">
                        Everything You <br /> Need to <span className="text-secondary">Know</span>
                    </h2>
                    <p className="text-base-content/60 font-medium leading-relaxed">
                        Find answers to common questions about our platform, selling art, andjoining our creative community.
                    </p>
                </div>

                <div className="md:w-2/3 space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-[2.5rem] border transition-all duration-300 ${activeIndex === index
                                    ? "bg-base-100 border-primary shadow-2xl shadow-primary/5"
                                    : "bg-base-200/50 border-transparent hover:border-base-300"
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-10 py-8 flex items-center justify-between text-left"
                            >
                                <span className="text-xl font-bold">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    className={`text-primary ${activeIndex === index ? "opacity-100" : "opacity-40"}`}
                                >
                                    <FaChevronDown size={20} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-10 pb-10 text-base-content/70 font-medium leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
