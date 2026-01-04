import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Spinner from "../components/Spinner";
import {
    FaImage,
    FaHeart,
    FaUserFriends,
    FaChartBar
} from "react-icons/fa";

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating fetching stats since real API might not have /stats yet
        setTimeout(() => {
            setStats({
                totalArtworks: 12,
                totalLikes: 450,
                totalViews: 1200,
                followers: 85
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="h-full flex items-center justify-center"><Spinner /></div>;

    const cards = [
        { label: "My Artworks", value: stats.totalArtworks, icon: <FaImage />, color: "bg-blue-500" },
        { label: "Total Likes", value: stats.totalLikes, icon: <FaHeart />, color: "bg-pink-500" },
        { label: "Profile Views", value: stats.totalViews, icon: <FaChartBar />, color: "bg-indigo-500" },
        { label: "Followers", value: stats.followers, icon: <FaUserFriends />, color: "bg-emerald-500" },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-base-100 p-8 rounded-[2rem] border border-base-300 shadow-sm flex items-center gap-6">
                        <div className={`${card.color} text-white p-4 rounded-2xl`}>
                            {React.cloneElement(card.icon, { size: 24 })}
                        </div>
                        <div>
                            <p className="text-base-content/60 text-sm font-bold uppercase tracking-widest leading-none mb-2">{card.label}</p>
                            <h3 className="text-3xl font-black">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm min-h-[400px]">
                    <h3 className="text-xl font-bold mb-8">Performance Analytics</h3>
                    <div className="h-64 bg-base-200 rounded-3xl flex items-center justify-center border-2 border-dashed border-base-300">
                        <div className="text-center">
                            <FaChartBar size={48} className="mx-auto text-base-content/20 mb-4" />
                            <p className="text-base-content/40 font-bold uppercase tracking-widest text-xs">Chart data loading...</p>
                        </div>
                    </div>
                </div>

                <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm min-h-[400px]">
                    <h3 className="text-xl font-bold mb-8">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center gap-4 pb-6 border-b border-base-100 last:border-0 last:pb-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <FaHeart />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">New Like on "Sunset Peaks"</p>
                                    <p className="text-xs text-base-content/40">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
