import React from 'react';

interface LayoverIndicatorProps {
  duration: string;
  airportCode: string;
  city: string;
}

const LayoverIndicator: React.FC<LayoverIndicatorProps> = ({
  duration,
  airportCode,
  city,
}) => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-amber-800 font-semibold">Layover: {duration}</p>
          <p className="text-amber-600 text-sm">Connection in {city} ({airportCode})</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-amber-200">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-amber-600 text-xs">Same terminal connection</span>
        </div>
      </div>
    </div>
  );
};

export default LayoverIndicator;
