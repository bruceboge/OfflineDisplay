import { useAuth } from "../components/AuthContext";
import { 
    Calendar, 
    Users, 
    TrendingUp, 
    ArrowRight, 
    Vote, 
    Clock,
    MoreHorizontal 
} from "lucide-react";

export default function Dashboard() {
  const { userProfile } = useAuth();
  
  const stats = [
    { label: "Total Members", value: "1,248", change: "+12%", icon: <Users size={20} className="text-blue-600" />, bg: "bg-blue-50" },
    { label: "Upcoming Events", value: "3", change: "Next: Fri", icon: <Calendar size={20} className="text-purple-600" />, bg: "bg-purple-50" },
    { label: "Active Polls", value: "1", change: "Ends in 2d", icon: <Vote size={20} className="text-orange-600" />, bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 font-display">
                Good Morning, <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">{userProfile?.name?.split(' ')[0] || 'Member'}</span> 👋
            </h1>
            <p className="text-slate-500 mt-1">Here's what's happening in your club today.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition shadow-sm">
                View Reports
            </button>
            <button className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition shadow-lg shadow-brand-500/30">
                New Event
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start">
                    <div className={`${stat.bg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                        {stat.change}
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content / Recent Events */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <button className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {[1, 2, 3].map((item, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">John Doe registerd for "Robotics 101"</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock size={12} /> 2 hours ago
                            </p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Side Widgets */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Your Shortcuts</h2>
            <div className="space-y-3">
                <div className="p-4 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl text-white shadow-lg shadow-brand-500/20 relative overflow-hidden cursor-pointer group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <Vote size={24} className="mb-3" />
                        <h3 className="font-bold text-lg">Create Poll</h3>
                        <p className="text-brand-100 text-sm opacity-90">Engage with members</p>
                    </div>
                </div>
                
                <div className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Analytics</h3>
                            <p className="text-xs text-slate-500">Check engagement</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}