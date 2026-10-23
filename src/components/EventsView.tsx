import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, X } from 'lucide-react';
import { EventItem } from '../types.ts';
import { registerForEvent } from '../services/api.ts';

interface EventsViewProps {
  events: EventItem[];
  onRefreshEvents: () => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, onRefreshEvents }) => {
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!registeringEvent) return;
    setIsSubmitting(true);
    try {
      await registerForEvent(registeringEvent.id);
      setRegisteredSuccess(true);
      onRefreshEvents();
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          <span>Community Gatherings</span>
          <span aria-hidden="true">·</span>
          <span>Hands-on Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Hackathons, Bootcamps & Technical Symposiums
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          EthioTech hosts inter-university technical competitions, hardware workshops, and engineering summits connecting students directly with senior industry mentors.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const isFull = event.registeredCount >= event.capacity;
          return (
            <div
              key={event.id}
              className="bg-[#0b1322] border border-slate-800/90 hover:border-slate-700 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-cyan-400 uppercase tracking-wider">{event.type}</span>
                  <div className="flex items-center gap-1.5 font-mono text-slate-300">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{event.registeredCount} / {event.capacity} Enrolled</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug">{event.title}</h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {event.description}
                </p>

                {/* Logistics details */}
                <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isFull ? 'Registration at capacity' : 'Free admission for university students'}
                </span>

                <button
                  onClick={() => {
                    setRegisteringEvent(event);
                    setRegisteredSuccess(false);
                  }}
                  disabled={isFull}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    isFull
                      ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  {isFull ? 'Sold Out' : 'Register Attendee'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1322] border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setRegisteringEvent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {registeredSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Registration Confirmed</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You are registered for <strong>{registeringEvent.title}</strong>. An email confirmation has been queued for your university credentials.
                </p>
                <button
                  onClick={() => setRegisteringEvent(null)}
                  className="w-full py-2.5 text-xs font-semibold bg-emerald-500 text-slate-950 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase">{registeringEvent.type}</span>
                  <h3 className="text-lg font-bold text-white">{registeringEvent.title}</h3>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-800">
                  <div><strong>Date:</strong> {registeringEvent.date}</div>
                  <div><strong>Time:</strong> {registeringEvent.time}</div>
                  <div><strong>Venue:</strong> {registeringEvent.location}</div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Click below to confirm your attendance. Please bring your student ID card or developer accreditation on the day of the event.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setRegisteringEvent(null)}
                    className="w-1/2 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRegister}
                    disabled={isSubmitting}
                    className="w-1/2 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
