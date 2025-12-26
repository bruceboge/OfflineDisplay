import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock Data Fetching
    setTimeout(() => {
        const mockEvents = [
            {
                id: '1',
                title: 'Robotics Workshop: Intro to Arduino',
                description: 'Join us for a hands-on session where we will learn the basics of Arduino programming and circuit building. No prior experience required!',
                location: 'Engineering Building, Room 304',
                date: new Date(Date.now() + 86400000 * 2), // 2 days from now
                attendees: Array(15).fill('student')
            },
            {
                id: '2',
                title: 'Annual Hackathon Kickoff',
                description: 'The biggest event of the year! Form teams, grab some pizza, and start coding. Prizes worth over $1000 to be won.',
                location: 'Main Auditorium',
                date: new Date(Date.now() + 86400000 * 10), // 10 days from now
                attendees: Array(42).fill('student')
            },
            {
                id: '3',
                title: 'Guest Speaker: AI in 2025',
                description: 'Dr. Sarah Connor shares her insights on the future of Artificial Intelligence and its impact on software engineering jobs.',
                location: 'Virtual Zoom Meeting',
                date: new Date(Date.now() - 86400000 * 5), // 5 days ago (Past)
                attendees: Array(89).fill('student')
            }
        ];
        setEvents(mockEvents);
        setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">Events</h1>
          <p className="text-slate-500 mt-1">Manage and track your club's upcoming activities.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 font-medium active:scale-95">
          <Plus size={20} /> Create Event
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
             <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <h3 className="text-lg font-medium text-slate-900">No events found</h3>
                <p className="text-slate-500">Get started by creating your first event.</p>
             </div>
          ) : (
            events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
                <div className={`h-2 w-full ${event.date && event.date < new Date() ? 'bg-slate-300' : 'bg-brand-500'}`}></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        event.date && event.date < new Date() 
                        ? 'bg-slate-100 text-slate-500' 
                        : 'bg-brand-50 text-brand-700'
                    }`}>
                        {event.date ? (event.date < new Date() ? 'Past' : 'Upcoming') : 'TBC'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                        {event.attendees?.length || 0} RSVPs
                    </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{event.title}</h3>
                    <p className="text-slate-500 text-sm mb-5 line-clamp-2 leading-relaxed">{event.description}</p>

                    <div className="space-y-3 pt-4 border-t border-slate-50">
                    {event.date ? (
                        <>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Calendar size={16} className="text-brand-400"/>
                            <time className="font-medium" dateTime={event.date.toISOString()}>
                                {event.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </time>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Clock size={16} className="text-brand-400"/>
                            <span>{event.date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        </>
                    ) : (
                        <div className="text-sm text-slate-400 italic">Date to be confirmed</div>
                    )}
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin size={16} className="text-brand-400"/>
                        <span className="truncate">{event.location}</span>
                    </div>
                    </div>
                </div>
                </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}