import React, { useState } from 'react';
import { SavedTrip } from '@/hooks/useSavedTrips';

interface SavedTripsPanelProps {
  trips: SavedTrip[];
  onSelectTrip: (bookingNumber: string) => void;
  onUpdateNickname: (id: string, nickname: string) => void;
  onRemoveTrip: (id: string) => void;
  onSetReminder: (id: string, reminder: SavedTrip['reminder']) => void;
  onClearReminder: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SavedTripsPanel: React.FC<SavedTripsPanelProps> = ({
  trips,
  onSelectTrip,
  onUpdateNickname,
  onRemoveTrip,
  onSetReminder,
  onClearReminder,
  isOpen,
  onClose,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNickname, setEditNickname] = useState('');
  const [reminderModalId, setReminderModalId] = useState<string | null>(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');

  const handleStartEdit = (trip: SavedTrip) => {
    setEditingId(trip.id);
    setEditNickname(trip.nickname);
  };

  const handleSaveNickname = (id: string) => {
    onUpdateNickname(id, editNickname);
    setEditingId(null);
    setEditNickname('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditNickname('');
  };

  const handleOpenReminderModal = (trip: SavedTrip) => {
    setReminderModalId(trip.id);
    if (trip.reminder) {
      setReminderDate(trip.reminder.date);
      setReminderTime(trip.reminder.time);
    } else {
      // Default to day before departure
      const depDate = new Date(trip.departureDate);
      depDate.setDate(depDate.getDate() - 1);
      setReminderDate(depDate.toISOString().split('T')[0]);
      setReminderTime('09:00');
    }
  };

  const handleSaveReminder = () => {
    if (reminderModalId && reminderDate) {
      onSetReminder(reminderModalId, {
        enabled: true,
        date: reminderDate,
        time: reminderTime,
      });
      setReminderModalId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSavedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const isReminderDue = (reminder: SavedTrip['reminder']) => {
    if (!reminder || !reminder.enabled) return false;
    const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
    return reminderDateTime <= new Date();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0033A0] to-[#0055CC]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">My Trips</h2>
                <p className="text-white/70 text-sm">{trips.length} saved booking{trips.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {trips.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Trips</h3>
                <p className="text-gray-500 text-sm">
                  Search for a booking and save it to quickly access your flight details later.
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-[#0033A0]/30 transition-colors"
                  >
                    {/* Trip Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          {editingId === trip.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editNickname}
                                onChange={(e) => setEditNickname(e.target.value)}
                                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0]"
                                placeholder="Enter nickname..."
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveNickname(trip.id)}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {trip.nickname || `Trip to ${trip.destination}`}
                              </h3>
                              <button
                                onClick={() => handleStartEdit(trip)}
                                className="p-1 text-gray-400 hover:text-[#0033A0] hover:bg-gray-100 rounded"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                            </div>
                          )}
                          <p className="text-sm text-gray-500 mt-0.5">
                            {trip.passengerName} • Saved {formatSavedDate(trip.savedAt)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'CONFIRMED' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {trip.status}
                        </span>
                      </div>

                      {/* Route */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-lg font-bold text-[#0033A0]">{trip.origin}</span>
                          <div className="flex-1 flex items-center">
                            <div className="h-0.5 flex-1 bg-gray-300"></div>
                            <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                            <div className="h-0.5 flex-1 bg-gray-300"></div>
                          </div>
                          <span className="text-lg font-bold text-[#00B0F0]">{trip.destination}</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(trip.departureDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{trip.departureTime}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{trip.totalPrice}</span>
                      </div>

                      {/* Reminder Badge */}
                      {trip.reminder?.enabled && (
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${
                          isReminderDue(trip.reminder) 
                            ? 'bg-amber-50 border border-amber-200' 
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <svg className={`w-4 h-4 ${isReminderDue(trip.reminder) ? 'text-amber-500' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                          <span className={`text-sm ${isReminderDue(trip.reminder) ? 'text-amber-700' : 'text-blue-700'}`}>
                            {isReminderDue(trip.reminder) ? 'Reminder due!' : `Reminder: ${formatDate(trip.reminder.date)} at ${trip.reminder.time}`}
                          </span>
                          <button
                            onClick={() => onClearReminder(trip.id)}
                            className={`ml-auto p-1 rounded hover:bg-white/50 ${isReminderDue(trip.reminder) ? 'text-amber-500' : 'text-blue-500'}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Booking Number */}
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-500">Booking:</span>
                        <span className="font-mono font-bold text-[#0033A0]">{trip.bookingNumber}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center border-t border-gray-200 divide-x divide-gray-200">
                      <button
                        onClick={() => onSelectTrip(trip.bookingNumber)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#0033A0] hover:bg-[#0033A0]/5 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      <button
                        onClick={() => handleOpenReminderModal(trip)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Remind
                      </button>
                      <button
                        onClick={() => onRemoveTrip(trip.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reminder Modal */}
      {reminderModalId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Set Reminder</h3>
              <p className="text-sm text-gray-500">Get notified before your flight</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Date</label>
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Time</label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 focus:border-[#0033A0]"
                />
              </div>
              <p className="text-xs text-gray-500">
                Note: Reminders will be shown when you visit the app. For push notifications, enable browser notifications.
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setReminderModalId(null)}
                className="flex-1 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReminder}
                className="flex-1 px-4 py-2 bg-[#0033A0] text-white font-medium rounded-lg hover:bg-[#002880] transition-colors"
              >
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedTripsPanel;
