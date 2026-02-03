import React from 'react';

interface FlightSegmentProps {
  segmentNumber: number;
  flightNumber: string;
  aircraft: string;
  departureCode: string;
  departureCity: string;
  departureTime: string;
  arrivalCode: string;
  arrivalCity: string;
  arrivalTime: string;
  terminal?: string;
  duration: string;
  amenities?: string[];
}

const FlightSegmentCard: React.FC<FlightSegmentProps> = ({
  segmentNumber,
  flightNumber,
  aircraft,
  departureCode,
  departureCity,
  departureTime,
  arrivalCode,
  arrivalCity,
  arrivalTime,
  terminal,
  duration,
  amenities = [],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Segment Header */}
      <div className="bg-gradient-to-r from-[#0033A0] to-[#0055CC] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{segmentNumber}</span>
            </div>
            <div>
              <p className="text-white/80 text-sm">Flight</p>
              <p className="text-white font-bold text-lg">{flightNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-white text-sm font-medium">{aircraft}</span>
          </div>
        </div>
      </div>

      {/* Flight Details */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          {/* Departure */}
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">{departureTime}</p>
            <p className="text-2xl font-bold text-[#0033A0] mt-1">{departureCode}</p>
            <p className="text-gray-500 text-sm mt-1">{departureCity}</p>
          </div>

          {/* Flight Path Visualization */}
          <div className="flex-1 px-6">
            <div className="relative flex items-center justify-center">
              <div className="w-full h-0.5 bg-gray-200"></div>
              <div className="absolute left-0 w-3 h-3 bg-[#0033A0] rounded-full"></div>
              <div className="absolute right-0 w-3 h-3 bg-[#00B0F0] rounded-full"></div>
              <div className="absolute bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0033A0] rotate-90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                  <span className="text-xs font-medium text-gray-600">{duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">{arrivalTime}</p>
            <p className="text-2xl font-bold text-[#00B0F0] mt-1">{arrivalCode}</p>
            <p className="text-gray-500 text-sm mt-1">{arrivalCity}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          {terminal && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-600 text-sm font-medium">{terminal}</span>
            </div>
          )}
          
          {amenities.length > 0 && (
            <div className="flex items-center gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                  {amenity.toLowerCase().includes('snack') && (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-xs font-medium text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Duration: {duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSegmentCard;
