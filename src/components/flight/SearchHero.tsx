import React, { useState } from 'react';

interface SearchHeroProps {
  onSearch: (bookingNumber: string) => void;
  isLoading?: boolean;
}

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading = false }) => {
  const [bookingNumber, setBookingNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingNumber.trim()) {
      setError('Please enter a booking number');
      return;
    }
    if (bookingNumber.trim().length < 6) {
      setError('Booking number must be at least 6 characters');
      return;
    }
    setError('');
    onSearch(bookingNumber.toUpperCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setBookingNumber(value);
    if (error) setError('');
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0033A0] via-[#0055CC] to-[#00B0F0]">
        {/* Cloud decorations */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-48 h-24 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-20 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-28 bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Plane decoration */}
        <svg className="absolute top-1/4 right-1/4 w-24 h-24 text-white/10 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/90 text-sm font-medium">Real-time flight tracking</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Find Your Flight
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-lg mx-auto">
          Enter your booking confirmation number to view your complete itinerary and flight details.
        </p>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="bookingNumber" className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Booking Confirmation Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="bookingNumber"
                    value={bookingNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Booking Number"
                    className={`w-full pl-12 pr-4 py-4 text-lg font-mono tracking-wider border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0033A0]/20 transition-all ${
                      error 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-[#0033A0]'
                    }`}
                    maxLength={10}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-left text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0033A0] to-[#0055CC] hover:from-[#002880] hover:to-[#0044AA] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Find My Flight</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick tips */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Your booking number can be found in your confirmation email or on your e-ticket.
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
