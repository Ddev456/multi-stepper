import { useState, useCallback } from 'react';
import { useMockQuery } from '@/lib/hooks/useMockQuery';
import { api } from '@/lib/mocks/mockConvex';
import { useToast } from '@/hooks/use-toast';
import type { 
  Garden, 
  GardenZone, 
  CreateGardenInput, 
  CreateZoneInput 
} from '../types/garden.types';

interface GardenOperationsState {
  isLoading: boolean;
  error: Error | null;
}

export const useGardenOperations = () => {
  const { toast } = useToast();
  const [state, setState] = useState<GardenOperationsState>({
    isLoading: false,
    error: null,
  });

  const createGarden = useCallback(async (data: CreateGardenInput): Promise<Garden | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data: garden, error } = await useMockQuery<Garden>(api.gardens.create, data);
      
      if (error) {
        throw error;
      }

      if (garden) {
        toast({
          title: "Jardin créé",
          description: "Votre nouveau jardin a été créé avec succès.",
        });
        return garden;
      }
      
      return null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Impossible de créer le jardin");
      setState(prev => ({ ...prev, error }));
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [toast]);

  const createZone = useCallback(async (data: CreateZoneInput): Promise<GardenZone | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data: zone, error } = await useMockQuery<GardenZone>(api.gardenZones.create, data);
      
      if (error) {
        throw error;
      }

      if (zone) {
        toast({
          title: "Zone créée",
          description: "Votre nouvelle zone de culture a été créée avec succès.",
        });
        return zone;
      }
      
      return null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Impossible de créer la zone");
      setState(prev => ({ ...prev, error }));
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [toast]);

  return {
    ...state,
    createGarden,
    createZone,
  };
};
