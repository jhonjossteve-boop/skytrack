import React from 'react';

const Airlines: React.FC = () => {
  const airlines = [
    { name: 'Delta', code: 'DL' },
    { name: 'United', code: 'UA' },
    { name: 'American', code: 'AA' },
    { name: 'Southwest', code: 'WN' },
    { name: 'JetBlue', code: 'B6' },
    { name: 'Alaska', code: 'AS' },
    { name: 'Spirit', code: 'NK' },
    { name: 'Frontier', code: 'F9' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm mb-8">
          Supporting all major airlines
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                <span className="font-bold text-sm text-gray-600">{airline.code}</span>
              </div>
              <span className="font-medium hidden sm:inline">{airline.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Airlines;
