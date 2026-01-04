import React, { useRef, useState } from "react";
import { FaUser, FaEnvelope, FaGlobe, FaCamera, FaSave, FaPen } from "react-icons/fa";
import useAuth from "../Hook/useAuth";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const containerRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        bio: user?.bio || "Passionate artist and creator exploring the world of visual expression.",
        website: user?.website || "https://artify.com/artist"
    });

    useGSAP(() => {
        gsap.from(".profile-card", {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".profile-item", {
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateUserProfile(formData.displayName, formData.photoURL);
            // In a real app, you'd also save bio/website to your database here
            setIsEditing(false);
            toast.success("Profile updated successfully! ✨");
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-10">
            <div className="profile-card bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-200">
                {/* Header/Cover Placeholder */}
                <div className="h-48 bg-linear-to-r from-primary via-secondary to-accent opacity-80 relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                </div>

                <div className="px-10 pb-12 -mt-24 relative z-10">
                    <div className="flex flex-col md:flex-row items-end gap-8 mb-10">
                        <div className="relative group">
                            <img
                                src={formData.photoURL || "https://i.ibb.co/5vFdhSM/default-avatar.png"}
                                alt="Profile"
                                className="w-48 h-48 rounded-[2.5rem] object-cover ring-8 ring-base-100 shadow-2xl transition-transform group-hover:scale-[1.02]"
                            />
                            {isEditing && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <FaCamera className="text-white text-3xl" />
                                </div>
                            )}
                        </div>

                        <div className="flex-grow pb-4">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-4xl font-black tracking-tight">{formData.displayName || "Artist Name"}</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn btn-primary rounded-2xl px-6 font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                                    >
                                        <FaPen /> Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="btn btn-primary rounded-2xl px-8 font-black shadow-lg shadow-primary/20 flex items-center gap-2"
                                    >
                                        {loading ? <span className="loading loading-spinner"></span> : <FaSave />}
                                        Save Changes
                                    </button>
                                )}
                            </div>
                            <p className="text-primary font-black uppercase tracking-widest mt-1">Verified Artist</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <div className="profile-item space-y-2">
                                <label className="text-sm font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                                    <FaEnvelope /> Email Address
                                </label>
                                <p className="text-lg font-bold bg-base-200/50 p-4 rounded-2xl border border-base-300 opacity-60">
                                    {user?.email}
                                </p>
                            </div>

                            <div className="profile-item space-y-2">
                                <label className="text-sm font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                                    <FaUser /> Display Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        className="input input-bordered w-full h-14 rounded-2xl font-bold focus:outline-primary"
                                    />
                                ) : (
                                    <p className="text-lg font-bold bg-base-200/50 p-4 rounded-2xl border border-base-300">
                                        {formData.displayName || "Not set"}
                                    </p>
                                )}
                            </div>

                            <div className="profile-item space-y-2">
                                <label className="text-sm font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                                    <FaGlobe /> Website
                                </label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="input input-bordered w-full h-14 rounded-2xl font-bold focus:outline-primary"
                                    />
                                ) : (
                                    <a href={formData.website} className="text-lg font-bold text-primary hover:underline bg-base-200/50 p-4 rounded-2xl border border-base-300 block">
                                        {formData.website}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="profile-item space-y-2 h-full flex flex-col">
                                <label className="text-sm font-black text-base-content/40 uppercase tracking-widest flex items-center gap-2">
                                    <FaPen /> Short Bio
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="textarea textarea-bordered w-full grow rounded-2xl font-medium p-6 focus:outline-primary min-h-[220px]"
                                    />
                                ) : (
                                    <p className="text-lg font-medium bg-base-200/50 p-8 rounded-[2rem] border border-base-300 italic text-base-content/70 grow">
                                        "{formData.bio}"
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
