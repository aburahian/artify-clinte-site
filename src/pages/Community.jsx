import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaRegComment, FaRegHeart } from "react-icons/fa";

const posts = [
    {
        id: 1,
        author: "Elena Vance",
        role: "Digital Artist",
        content: "Just finished my latest piece 'Neon Dreams'. The lighting was a challenge but I love how the shadows turned out! What do you guys think about the color palette?",
        time: "1 hour ago",
        likes: 124,
        comments: 18,
        tags: ["#digitalart", "#neon", "#process"]
    },
    {
        id: 2,
        author: "Marcus Thorne",
        role: "Abstract Painter",
        content: "Excited to announce my upcoming exhibition in Berlin! Most of the works displayed will be from my 'Silent Echoes' collection. Hope to see some of you there!",
        time: "4 hours ago",
        likes: 89,
        comments: 5,
        tags: ["#exhibition", "#abstract", "#berlin"]
    },
    {
        id: 3,
        author: "Sophia Chen",
        role: "Photographer",
        content: "Catching the golden hour in the mountains today. Nature never ceases to amaze me with its perfect compositions.",
        time: "Yesterday",
        likes: 256,
        comments: 32,
        tags: ["#photography", "#nature", "#goldenhour"]
    }
];

const Community = () => {
    return (
        <div className="pb-32">
            <div className="bg-linear-to-b from-primary/10 to-transparent py-24 mb-16">
                <div className="w-11/12 mx-auto">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-1 bg-primary rounded-full" />
                            <span className="text-primary font-black uppercase tracking-widest text-xs">Creatives United</span>
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter mb-6">
                            Artify <span className="text-primary">Community</span>
                        </h1>
                        <p className="text-xl text-base-content/60 font-medium">Connect with fellow artists, share your latest work-in-progress, and get inspired by the journey of others.</p>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-base-100 rounded-[2.5rem] p-10 border border-base-200 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-base-content/20 overflow-hidden">
                                    <FaUserCircle size={56} />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-none">{post.author}</h3>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{post.role}</p>
                                </div>
                                <span className="ml-auto text-xs font-bold text-base-content/30 uppercase tracking-widest">{post.time}</span>
                            </div>

                            <p className="text-lg text-base-content/70 font-medium leading-relaxed mb-8">
                                {post.content}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-xl">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-8 pt-8 border-t border-base-100">
                                <button className="flex items-center gap-2 text-sm font-black text-base-content/40 hover:text-pink-500 transition-colors">
                                    <FaRegHeart size={18} /> {post.likes} Likes
                                </button>
                                <button className="flex items-center gap-2 text-sm font-black text-base-content/40 hover:text-primary transition-colors">
                                    <FaRegComment size={18} /> {post.comments} Comments
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="bg-base-100 rounded-[2.5rem] p-10 border border-base-200 shadow-sm">
                        <h3 className="text-xl font-black mb-6">Trending Topics</h3>
                        <div className="space-y-4">
                            {["#ArtifyChallenge", "#DesignSystems", "#ModernPainting", "#DigitalNFTs"].map(tag => (
                                <div key={tag} className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl border border-transparent hover:border-primary/20 cursor-pointer transition-all">
                                    <span className="font-black text-sm">{tag}</span>
                                    <span className="text-xs font-bold text-base-content/30 italic">2.4k posts</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary/30">
                        <h3 className="text-2xl font-black mb-4 leading-tight">Join the Conversation!</h3>
                        <p className="font-medium text-white/80 mb-8">Share your art with thousands of creators worldwide.</p>
                        <button className="btn bg-white text-primary border-none hover:bg-white/90 rounded-2xl px-8 font-black w-full">
                            Start Posting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
