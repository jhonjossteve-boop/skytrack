import React from 'react';

interface NotFoundResultProps {
  bookingNumber: string;
  onBackToSearch: () => void;
}

const NotFoundResult: React.FC<NotFoundResultProps> = ({ bookingNumber, onBackToSearch }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find a booking with reference <span className="font-mono font-bold text-[#0033A0]">{bookingNumber}</span>. 
          Please check the booking number and try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={onBackToSearch}
            className="w-full bg-[#0033A0] hover:bg-[#002880] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Try Another Search
          </button>
          <p className="text-gray-500 text-sm">
            Need help? Contact us at <a href="tel:1-800-SKY-TRACK" className="text-[#0033A0] hover:underline">1-800-SKY-TRACK</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundResult;
