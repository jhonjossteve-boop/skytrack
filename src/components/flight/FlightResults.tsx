import React, { useState } from 'react';
import FlightSegmentCard from './FlightSegmentCard';
import LayoverIndicator from './LayoverIndicator';

interface FlightResultsProps {
  bookingNumber: string;
  onBackToSearch: () => void;
  onSaveTrip?: () => void;
  isSaved?: boolean;
}

const FlightResults: React.FC<FlightResultsProps> = ({ 
  bookingNumber, 
  onBackToSearch,
  onSaveTrip,
  isSaved = false,
}) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const itinerary = `
FLIGHT ITINERARY
================
Booking Reference: ${bookingNumber}
Status: PAID - CONFIRMED

PASSENGER INFORMATION
---------------------
Name: Cynthia Rose
Trip Type: One Way
Journey Date: Wednesday, February 4, 2025
Cabin Class: Main Classic (Q)
Total Duration: 5h 16m
Stops: 1 Stop (Connecting Flight)

FLIGHT SEGMENT 1
----------------
Flight: DL1397
Aircraft: Airbus A321
Departure: AUS - Austin, TX at 5:10 PM
Arrival: ATL - Atlanta, GA at 8:38 PM
Terminal: Terminal S
Duration: 2h 28m
Amenities: Snacks

LAYOVER
-------
1h 4m in Atlanta, GA (ATL)

FLIGHT SEGMENT 2
----------------
Flight: DL1283
Aircraft: Boeing 717-200
Departure: ATL - Atlanta, GA at 9:42 PM (Terminal S)
Arrival: MDT - Harrisburg, PA at 11:26 PM
Duration: 1h 44m

PAYMENT INFORMATION
-------------------
Total Price: $720.00
Payment Status: Paid in Full

Thank you for flying with us!
    `;
    
    const blob = new Blob([itinerary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itinerary-${bookingNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveTrip = () => {
    if (onSaveTrip) {
      onSaveTrip();
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Save Confirmation Toast */}
      {showSaveConfirm && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Trip saved to My Trips!</span>
          </div>
        </div>
      )}

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white/80 text-sm">Booking Status</p>
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  PAID – CONFIRMED
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white text-green-600 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                Paid
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full font-medium text-sm">
                Ref: {bookingNumber}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <button
            onClick={onBackToSearch}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0033A0] font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </button>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Save Trip Button */}
            <button
              onClick={handleSaveTrip}
              disabled={isSaved}
              className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors ${
                isSaved 
                  ? 'bg-green-100 text-green-700 cursor-default' 
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isSaved ? 'Saved to My Trips' : 'Save Trip'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#0033A0] text-gray-700 hover:text-[#0033A0] font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Itinerary
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#0033A0] hover:bg-[#002880] text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Itinerary
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Overview Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Trip Overview</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-[#0033A0]/10 text-[#0033A0] px-3 py-1 rounded-full text-sm font-medium">
                    One Way
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Journey Date</p>
                  <p className="font-semibold text-gray-900">Wed, February 4</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Cabin Class</p>
                  <p className="font-semibold text-gray-900">Main Classic (Q)</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Duration</p>
                  <p className="font-semibold text-gray-900">5h 16m</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Stops</p>
                  <p className="font-semibold text-gray-900">1 Stop</p>
                </div>
              </div>

              {/* Visual Journey Timeline */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#0033A0]">AUS</p>
                    <p className="text-gray-500 text-sm">Austin, TX</p>
                    <p className="text-gray-900 font-medium mt-1">5:10 PM</p>
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="relative">
                      <div className="h-1 bg-gray-200 rounded-full">
                        <div className="h-1 bg-gradient-to-r from-[#0033A0] via-amber-400 to-[#00B0F0] rounded-full w-full"></div>
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0033A0] rounded-full border-2 border-white shadow"></div>
                      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00B0F0] rounded-full border-2 border-white shadow"></div>
                    </div>
                    <div className="flex justify-center mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">5h 16m total</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#00B0F0]">MDT</p>
                    <p className="text-gray-500 text-sm">Harrisburg, PA</p>
                    <p className="text-gray-900 font-medium mt-1">11:26 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Segment 1 */}
            <FlightSegmentCard
              segmentNumber={1}
              flightNumber="DL1397"
              aircraft="Airbus A321"
              departureCode="AUS"
              departureCity="Austin, TX"
              departureTime="5:10 PM"
              arrivalCode="ATL"
              arrivalCity="Atlanta, GA"
              arrivalTime="8:38 PM"
              terminal="Terminal S"
              duration="2h 28m"
              amenities={['Snacks']}
            />

            {/* Layover */}
            <LayoverIndicator
              duration="1h 4m"
              airportCode="ATL"
              city="Atlanta, GA"
            />

            {/* Flight Segment 2 */}
            <FlightSegmentCard
              segmentNumber={2}
              flightNumber="DL1283"
              aircraft="Boeing 717-200"
              departureCode="ATL"
              departureCity="Atlanta, GA"
              departureTime="9:42 PM"
              arrivalCode="MDT"
              arrivalCity="Harrisburg, PA"
              arrivalTime="11:26 PM"
              terminal="Terminal S"
              duration="1h 44m"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Passenger Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0033A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Passenger
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0033A0] to-[#00B0F0] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  CR
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Cynthia Rose</p>
                  <p className="text-gray-500 text-sm">Primary Passenger</p>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-lg">Payment</h3>
                  <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                    Paid
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Total Price</span>
                  <span className="text-2xl font-bold text-gray-900">$720</span>
                </div>
                <div className="flex items-center justify-between text-green-600">
                  <span className="font-medium">Payment Status</span>
                  <span className="font-bold flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Paid in Full
                  </span>
                </div>

                {/* Receipt Toggle */}
                <button
                  onClick={() => setShowReceipt(!showReceipt)}
                  className="w-full mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-600 hover:text-[#0033A0] transition-colors"
                >
                  <span className="font-medium">View Receipt Details</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${showReceipt ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showReceipt && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-fadeIn">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Base Fare</span>
                      <span className="text-gray-900">$598.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Taxes & Fees</span>
                      <span className="text-gray-900">$89.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Carrier Surcharge</span>
                      <span className="text-gray-900">$32.50</span>
                    </div>
                    <div className="flex justify-between font-bold pt-3 border-t border-gray-100">
                      <span className="text-gray-900">Total Charged</span>
                      <span className="text-gray-900">$720.00</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Payment received on Jan 28, 2025</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Reference Card */}
            <div className="bg-gradient-to-br from-[#0033A0] to-[#0055CC] rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Booking Reference</h3>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-mono font-bold tracking-widest">{bookingNumber}</p>
              </div>
              <p className="text-white/70 text-sm mt-4 text-center">
                Keep this reference number for check-in and at the airport
              </p>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-[#0033A0] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat with Support</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-[#0033A0] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call 1-800-SKY-TRACK</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-[#0033A0] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>FAQs</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
