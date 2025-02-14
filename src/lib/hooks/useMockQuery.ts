import { useEffect, useState } from 'react';
import { 
  mockConfigurations, 
  mockGardens, 
  mockGardenZones, 
  mockPlants,
  mockVarieties,
  mockCultivationStages, 
  mockCultivationStagesTypes,
  generateDynamicEvents,
} from '../mocks/mockData';
import type { DynamicEventsParams } from '../../types/api';

// Simuler un délai réseau
const MOCK_DELAY = 500;

export function useMockQuery<T>(endpoint: string, args?: Record<string, any>): T | undefined {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const timer = setTimeout(() => {
      switch (endpoint) {
        case 'configurations.list':
          setData(mockConfigurations as T);
          break;

        case 'gardens.list':
          setData(mockGardens as T);
          break;

        case 'gardenZones.listByGarden':
          if (args?.gardenId) {
            setData(mockGardenZones.filter(zone => zone.gardenId === args.gardenId) as T);
          }
          break;

        case 'plants.list':
          setData(mockPlants as T);
          break;

        case 'varieties.list':
          setData(mockVarieties as T);
          break;

        case 'varieties.listByPlant':
          if (args?.plantId) {
            setData(mockVarieties.filter(variety => variety.plantId === args.plantId) as T);
          }
          break;

        case 'cultivationStagesTypes.list':
          setData(mockCultivationStagesTypes as T);
          break;
        
        case 'cultivationStages.list':
          setData(mockCultivationStages as T);
          break;

        case 'events.previewDynamicEvents':
          if (args?.configurationId && args?.gardenId && args?.zoneId && args?.plants && args?.cultivationSteps) {
            const dynamicEventParams: DynamicEventsParams = {
              configurationId: args.configurationId,
              gardenId: args.gardenId,
              zoneId: args.zoneId,
              plants: args.plants,
              cultivationSteps: args.cultivationSteps
            };
            const events = generateDynamicEvents(dynamicEventParams);
            setData(events as T);
          }
          break;

        default:
          console.warn(`Endpoint non géré: ${endpoint}`);
          break;
      }
    }, MOCK_DELAY);

    return () => clearTimeout(timer);
  }, [endpoint, args]);

  return data;
}
