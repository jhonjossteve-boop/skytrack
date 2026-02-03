import React, { useState, useEffect } from 'react';
import Footer from './flight/Footer';
import SearchHero from './flight/SearchHero';
import FlightResults from './flight/FlightResults';
import NotFoundResult from './flight/NotFoundResult';
import Features from './flight/Features';
import Airlines from './flight/Airlines';
import SavedTripsPanel from './flight/SavedTripsPanel';
import { useSavedTrips, SavedTrip } from '@/hooks/useSavedTrips';


type ViewState = 'search' | 'loading' | 'results' | 'not-found';

const AppLayout: React.FC = () => {
  const [view, setView] = useState<ViewState>('search');
  const [searchedBookingNumber, setSearchedBookingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSavedTrips, setShowSavedTrips] = useState(false);

  const {
    savedTrips,
    saveTrip,
    removeTrip,
    updateNickname,
    setReminder,
    clearReminder,
    isTripSaved,
  } = useSavedTrips();

  // Valid booking number for demo
  const VALID_BOOKING = '02GHUY';

  // Check for due reminders on load
  useEffect(() => {
    const dueReminders = savedTrips.filter(trip => {
      if (!trip.reminder?.enabled) return false;
      const reminderDateTime = new Date(`${trip.reminder.date}T${trip.reminder.time}`);
      return reminderDateTime <= new Date();
    });

    if (dueReminders.length > 0 && Notification.permission === 'granted') {
      dueReminders.forEach(trip => {
        new Notification('Flight Reminder', {
          body: `Reminder for your trip: ${trip.nickname || `${trip.origin} to ${trip.destination}`}`,
          icon: '/favicon.ico',
        });
      });
    }
  }, [savedTrips]);

  const handleSearch = (bookingNumber: string) => {
    setSearchedBookingNumber(bookingNumber);
    setIsLoading(true);
    setView('loading');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (bookingNumber.toUpperCase() === VALID_BOOKING) {
        setView('results');
      } else {
        setView('not-found');
      }
    }, 1500);
  };

  const handleBackToSearch = () => {
    setView('search');
    setSearchedBookingNumber('');
  };

  const handleHeaderSearchClick = () => {
    handleBackToSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCurrentTrip = () => {
    // Save the current trip data (hardcoded for demo)
    saveTrip({
      bookingNumber: searchedBookingNumber,
      nickname: '',
      passengerName: 'Cynthia Rose',
      origin: 'AUS',
      destination: 'MDT',
      departureDate: '2025-02-04',
      departureTime: '5:10 PM',
      totalPrice: '$720',
      status: 'CONFIRMED',
    });
  };

  const handleSelectTrip = (bookingNumber: string) => {
    setShowSavedTrips(false);
    handleSearch(bookingNumber);
  };

  // Auto-load demo booking on mount for demonstration
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const booking = params.get('booking');
    if (booking) {
      handleSearch(booking);
    }
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // We'll request permission when user sets a reminder
    }
  }, []);

  const handleSetReminder = (id: string, reminder: SavedTrip['reminder']) => {
    // Request notification permission if needed
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setReminder(id, reminder);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with My Trips button */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0033A0] to-[#00B0F0] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#0033A0]">SkyTrack</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={handleHeaderSearchClick}
                className="text-gray-600 hover:text-[#0033A0] font-medium transition-colors"
              >
                Find Booking
              </button>
              <a href="#" className="text-gray-600 hover:text-[#0033A0] font-medium transition-colors">
                Flight Status
              </a>
              <a href="#" className="text-gray-600 hover:text-[#0033A0] font-medium transition-colors">
                Help Center
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* My Trips Button */}
              <button
                onClick={() => setShowSavedTrips(true)}
                className="relative flex items-center gap-2 bg-[#0033A0]/10 hover:bg-[#0033A0]/20 text-[#0033A0] font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="hidden sm:inline">My Trips</span>
                {savedTrips.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0033A0] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {savedTrips.length}
                  </span>
                )}
              </button>

              <button className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-[#0033A0] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.2a1 1 0 01.94.64l1.49 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.49a1 1 0 01.64.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.24 3 6V5z" />
                </svg>
                <span className="font-medium">+1 8312218866</span>
              </button>
              <button className="md:hidden p-2 text-gray-600 hover:text-[#0033A0]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 1h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {view === 'search' && (
          <>
            <SearchHero onSearch={handleSearch} isLoading={isLoading} />
            
            {/* Quick Access to Saved Trips */}
            {savedTrips.length > 0 && (
              <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px- py-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#0033A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 v4l3 3m6-3a9 9 0 11-1 0 9 9 0 0118 0z" />
                      </svg>
                      Recent Trips
                    </h2>
                    <button
                      onClick={() => setShowSavedTrips(true)}
                      className="text-[#0033A0] hover:text-[#002880] font-medium text-sm flex items-center gap-1"
                    >
                      View All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedTrips.slice(0, 3).map((trip) => (
                      <button
                        key={trip.id}
                        onClick={() => handleSelectTrip(trip.bookingNumber)}
                        className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-[#0033A0]/5 border border-gray-200 hover:border-[#0033A0]/30 rounded-xl transition-all text-left group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0033A0] to-[#00B0F0] rounded-lg flex items-center justify-center text-white font-bold">
                          {trip.origin}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate group-hover:text-[#0033A0]">
                            {trip.nickname || `${trip.origin} → ${trip.destination}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            {trip.passengerName} • {new Date(trip.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0033A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <Airlines />
            <Features />
          </>
        )}

        {view === 'loading' && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#0033A0] rounded-full border-t-transparent animate-spin"></div>
                <svg className="absolute inset-0 m-auto w-8 h-8 text-[#0033A0]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Searching for booking {searchedBookingNumber}...</p>
              <p className="text-gray-400 text-sm mt-2">Please wait while we retrieve your flight details</p>
            </div>
          </div>
        )}

        {view === 'results' && (
          <FlightResults 
            bookingNumber={searchedBookingNumber} 
            onBackToSearch={handleBackToSearch}
            onSaveTrip={handleSaveCurrentTrip}
            isSaved={isTripSaved(searchedBookingNumber)}
          />
        )}

        {view === 'not-found' && (
          <NotFoundResult 
            bookingNumber={searchedBookingNumber} 
            onBackToSearch={handleBackToSearch} 
          />
        )}
      </main>

      <Footer />

      {/* Saved Trips Panel */}
      <SavedTripsPanel
        trips={savedTrips}
        onSelectTrip={handleSelectTrip}
        onUpdateNickname={updateNickname}
        onRemoveTrip={removeTrip}
        onSetReminder={handleSetReminder}
        onClearReminder={clearReminder}
        isOpen={showSavedTrips}
        onClose={() => setShowSavedTrips(false)}
      />

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @media print {
          header, footer, button {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
