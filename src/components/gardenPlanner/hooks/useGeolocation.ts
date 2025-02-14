import { useState, useCallback } from 'react';

interface GeolocationState {
  isLoading: boolean;
  error: string | null;
  position: {
    latitude: number;
    longitude: number;
  } | null;
}

interface UseGeolocationResult extends GeolocationState {
  getPosition: () => Promise<{ latitude: number; longitude: number } | null>;
}

export const useGeolocation = (): UseGeolocationResult => {
  const [state, setState] = useState<GeolocationState>({
    isLoading: false,
    error: null,
    position: null,
  });

  const getPosition = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setState(prev => ({
        ...prev,
        isLoading: false,
        position: coords,
        error: null,
      }));

      return coords;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Impossible d'accéder à votre localisation";

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        position: null,
      }));

      return null;
    }
  }, []);

  return {
    ...state,
    getPosition,
  };
};
