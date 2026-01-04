import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../Hook/useAuth";
import {
    FaUser,
    FaImage,
    FaHeart,
    FaPlus,
    FaChartLine,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaHome,
    FaAmilia,
    FaDatabase
} from "react-icons/fa";

const DashboardLayout = () => {
    const { user, signOutUser } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOutUser();
        navigate("/");
    };

    const isAdmin = user?.email === 'admin@artify.com';

    const menuItems = [
        { label: "Overview", path: "/dashboard", icon: <FaChartLine />, roles: ['user', 'admin'] },
        { label: "My Profile", path: "/dashboard/profile", icon: <FaUser />, roles: ['user', 'admin'] },
        { label: "My Gallery", path: "/dashboard/my-gallery", icon: <FaImage />, roles: ['user', 'admin'] },
        { label: "Add Artwork", path: "/dashboard/add-artwork", icon: <FaPlus />, roles: ['user', 'admin'] },
        { label: "Favorites", path: "/dashboard/favorites", icon: <FaHeart />, roles: ['user', 'admin'] },
        { label: "Manage Users", path: "/dashboard/users", icon: <FaUser />, roles: ['admin'] },
        { label: "Platform Stats", path: "/dashboard/stats", icon: <FaDatabase />, roles: ['admin'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(isAdmin ? 'admin' : 'user'));

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-full w-72 bg-base-100 border-r border-base-300 transition-transform duration-300 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="bg-primary p-2 rounded-xl text-white">
                            <FaAmilia size={24} />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight">Artify</span>
                    </div>

                    <nav className="flex-grow space-y-2">
                        {filteredMenu.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all
                                    ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}
                                `}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-base-200 space-y-2">
                        <Link
                            to="/"
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-base-content/60 hover:bg-base-200"
                        >
                            <FaHome />
                            <span>Back to Home</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-20 bg-base-100 border-b border-base-300 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden btn btn-ghost btn-sm rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FaBars size={20} />
                        </button>
                        <h1 className="text-xl font-black tracking-tight">Dashboard</h1>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="flex items-center gap-4 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold group-hover:text-primary transition-colors">{user?.displayName}</p>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">
                                    {isAdmin ? 'Administrator' : 'Artist'}
                                </p>
                            </div>
                            <img
                                src={user?.photoURL || "https://i.ibb.co/5vFdhSM/default-avatar.png"}
                                alt="Avatar"
                                className="w-12 h-12 rounded-2xl ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 group-hover:ring-primary transition-all"
                            />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[70] menu p-2 shadow-2xl bg-base-100 border border-base-200 rounded-3xl w-60 mt-4 animate-in fade-in zoom-in duration-200">
                            <li className="menu-title px-4 py-2 font-black text-xs uppercase tracking-widest opacity-40">User Menu</li>
                            <li>
                                <Link to="/dashboard/profile" className="flex items-center gap-3 py-4 px-4 rounded-2xl font-bold hover:bg-base-200">
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <FaUser size={14} />
                                    </div>
                                    <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="flex items-center gap-3 py-4 px-4 rounded-2xl font-bold hover:bg-base-200">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <FaChartLine size={14} />
                                    </div>
                                    <span>Dashboard Home</span>
                                </Link>
                            </li>
                            <div className="divider my-1 opacity-50 px-4"></div>
                            <li>
                                <button onClick={handleLogout} className="flex items-center gap-3 py-4 px-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors">
                                    <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                                        <FaSignOutAlt size={14} />
                                    </div>
                                    <span>Logout Account</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-grow overflow-y-auto p-8 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
