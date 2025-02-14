import { useState } from 'react';
import { api } from '../mocks/mockConvex';
import type { Garden, GardenZone } from '../mocks/mockData';

interface GardenOperationsResult {
  isLoading: boolean;
  error: Error | null;
  createGarden: (data: CreateGardenData) => Promise<Garden | null>;
  createZone: (data: CreateZoneData) => Promise<GardenZone | null>;
}

interface CreateGardenData {
  name: string;
  description: string;
  climateZone: string;
  soilType: string;
  area: number;
}

interface CreateZoneData {
  gardenId: string;
  name: string;
  area: number;
  sunExposure: 'full' | 'partial' | 'shade';
  soilType: string;
  irrigation: boolean;
  microclimate: {
    temperature: 'warmer' | 'normal' | 'cooler';
    wind: 'protected' | 'normal' | 'exposed';
    moisture: 'dry' | 'normal' | 'wet';
  };
}

// Simulation d'appels API avec délai
const mockApiCall = async <T>(endpoint: string, data: any): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newItem = {
    _id: `${endpoint.split('.').pop()}_${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  return newItem as T;
};

export const useGardenOperations = (): GardenOperationsResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createGarden = async (data: CreateGardenData): Promise<Garden | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newGarden = await mockApiCall<Garden>(api.gardens.create, data);
      return newGarden;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create garden'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createZone = async (data: CreateZoneData): Promise<GardenZone | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newZone = await mockApiCall<GardenZone>(api.gardenZones.create, data);
      return newZone;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create zone'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createGarden,
    createZone
  };
};
