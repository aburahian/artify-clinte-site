import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully! We'll get back to you soon. 💌");
        e.target.reset();
    };

    const contactInfo = [
        { icon: <FaEnvelope />, label: "Email Us", value: "support@artify.com", sub: "24/7 Response Rate" },
        { icon: <FaPhone />, label: "Call Us", value: "+880 123 456 789", sub: "Mon - Fri, 9am - 6pm" },
        { icon: <FaMapMarkerAlt />, label: "Our Studio", value: "Gulshan 1, Dhaka", sub: "Creative Hub, Bangladesh" },
    ];

    return (
        <div className="pb-24">
            <section className="bg-primary/5 py-24">
                <div className="w-11/12 mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-base-content tracking-tighter mb-6">
                        Get in <span className="text-primary">Touch</span>.
                    </h1>
                    <p className="text-xl text-base-content/60 font-medium max-w-2xl mx-auto italic">
                        Have questions about our platform or want to partner with us?
                        We're here to help you on your artistic journey.
                    </p>
                </div>
            </section>

            <div className="w-11/12 mx-auto mt-24 grid lg:grid-cols-3 gap-12">
                {/* Contact Info Cards */}
                <div className="lg:col-span-1 space-y-6">
                    {contactInfo.map((info, i) => (
                        <div key={i} className="bg-base-100 p-8 rounded-[2rem] border border-base-200 shadow-xl shadow-primary/5 flex items-center gap-6">
                            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0">
                                {info.icon}
                            </div>
                            <div>
                                <p className="text-xs font-black text-base-content/40 uppercase tracking-widest mb-1">{info.label}</p>
                                <p className="text-lg font-bold mb-1">{info.value}</p>
                                <p className="text-xs text-primary font-medium">{info.sub}</p>
                            </div>
                        </div>
                    ))}

                    <div className="bg-secondary p-8 rounded-[2rem] text-white overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        <h4 className="text-xl font-bold mb-4 relative z-10">Follow Our Journey</h4>
                        <div className="flex gap-4 relative z-10">
                            {['FB', 'IG', 'TW', 'LI'].map(social => (
                                <button key={social} className="w-12 h-12 bg-white/20 hover:bg-white hover:text-secondary rounded-xl font-black text-xs transition-colors">
                                    {social}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2 bg-base-100 p-8 md:p-16 rounded-[3rem] border border-base-200 shadow-2xl">
                    <h3 className="text-3xl font-black mb-8">Send us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-base-content/80 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-base-content/80 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-base-content/80 ml-1">Subject</label>
                            <input
                                type="text"
                                placeholder="How can we help?"
                                required
                                className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-base-content/80 ml-1">Message</label>
                            <textarea
                                placeholder="Describe your request in detail..."
                                rows={6}
                                required
                                className="textarea textarea-bordered w-full rounded-2xl focus:outline-primary transition-all p-6"
                            ></textarea>
                        </div>
                        <button className="btn btn-primary h-16 rounded-2xl px-12 font-black text-lg shadow-2xl shadow-primary/32 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4">
                            Send Message <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
