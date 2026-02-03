import { useState, useEffect, useCallback } from 'react';

export interface SavedTrip {
  id: string;
  bookingNumber: string;
  nickname: string;
  passengerName: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  totalPrice: string;
  status: string;
  savedAt: string;
  reminder?: {
    enabled: boolean;
    date: string;
    time: string;
  };
}

const STORAGE_KEY = 'skytrack_saved_trips';

export const useSavedTrips = () => {
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load trips from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedTrips(parsed);
      } catch (e) {
        console.error('Failed to parse saved trips:', e);
        setSavedTrips([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever trips change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTrips));
    }
  }, [savedTrips, isLoaded]);

  const saveTrip = useCallback((trip: Omit<SavedTrip, 'id' | 'savedAt'>) => {
    const newTrip: SavedTrip = {
      ...trip,
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString(),
    };
    
    setSavedTrips(prev => {
      // Check if booking already exists
      const existingIndex = prev.findIndex(t => t.bookingNumber === trip.bookingNumber);
      if (existingIndex >= 0) {
        // Update existing trip
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...trip, savedAt: new Date().toISOString() };
        return updated;
      }
      return [newTrip, ...prev];
    });
    
    return newTrip;
  }, []);

  const removeTrip = useCallback((id: string) => {
    setSavedTrips(prev => prev.filter(trip => trip.id !== id));
  }, []);

  const updateNickname = useCallback((id: string, nickname: string) => {
    setSavedTrips(prev => prev.map(trip => 
      trip.id === id ? { ...trip, nickname } : trip
    ));
  }, []);

  const setReminder = useCallback((id: string, reminder: SavedTrip['reminder']) => {
    setSavedTrips(prev => prev.map(trip => 
      trip.id === id ? { ...trip, reminder } : trip
    ));
  }, []);

  const clearReminder = useCallback((id: string) => {
    setSavedTrips(prev => prev.map(trip => 
      trip.id === id ? { ...trip, reminder: undefined } : trip
    ));
  }, []);

  const getTripByBookingNumber = useCallback((bookingNumber: string) => {
    return savedTrips.find(trip => trip.bookingNumber === bookingNumber);
  }, [savedTrips]);

  const isTripSaved = useCallback((bookingNumber: string) => {
    return savedTrips.some(trip => trip.bookingNumber === bookingNumber);
  }, [savedTrips]);

  return {
    savedTrips,
    isLoaded,
    saveTrip,
    removeTrip,
    updateNickname,
    setReminder,
    clearReminder,
    getTripByBookingNumber,
    isTripSaved,
  };
};
