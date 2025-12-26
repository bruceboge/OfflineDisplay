import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Box,
  Megaphone,
  LogOut,
  Vote,
  Menu,
  X,
  Search,
  Bell,
  ChevronRight
} from "lucide-react";

export default function Layout() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { label: "Events", path: "/events", icon: <CalendarDays size={20} /> },
    { label: "Members", path: "/members", icon: <Users size={20} /> },
    { label: "Inventory", path: "/inventory", icon: <Box size={20} /> },
    { label: "Announcements", path: "/announcements", icon: <Megaphone size={20} /> },
    { label: "Elections", path: "/elections", icon: <Vote size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                <Vote size={20} />
            </div>
            <div>
                <h1 className="text-xl font-bold font-display text-slate-800 tracking-tight">ClubFlow</h1>
                <p className="text-xs text-brand-600 font-semibold tracking-wide uppercase">Workspace</p>
            </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-brand-50 text-brand-700 font-medium shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
                <>
                    {/* Active Indicator */}
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-500 rounded-r-full"></div>}
                    
                    <span className={`transition-colors duration-300 ${isActive ? 'text-brand-600' : 'group-hover:text-brand-500'}`}>
                        {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-accent-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-sm font-bold text-slate-700">
                {userProfile?.name?.charAt(0) || "U"}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{userProfile?.name || "User"}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{userProfile?.role || "Member"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 shadow-soft flex-col z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
         <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-slide-in-right">
                <SidebarContent />
            </div>
         </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                    <Menu size={20} />
                </button>
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all w-64"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto animate-fade-in">
                <Outlet />
            </div>
        </main>
      </div>
    </div>
  );
}