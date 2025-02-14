import { useMockQuery } from '../hooks/useMockQuery';

// Mock de l'API Convex
export const api = {
  configurations: {
    list: 'configurations.list',
  },
  gardens: {
    list: 'gardens.list',
  },
  gardenZones: {
    listByGarden: 'gardenZones.listByGarden',
  },
  plants: {
    list: 'plants.list',
  },
  varieties: {
    listByPlant: 'varieties.listByPlant',
    list: 'varieties.list',
  },
  events: {
    previewDynamicEvents: 'events.previewDynamicEvents',
  },
  cultivationStagesTypes: {
    list: 'cultivationStagesTypes.list',
  },
  cultivationStages: {
    list: 'cultivationStages.list',
  },
};

// HOC pour remplacer useQuery de Convex
export function withMockConvex<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithMockConvexComponent(props: P) {
    // @ts-ignore - On ignore l'erreur car c'est un mock
    const useQuery = useMockQuery;

    return <WrappedComponent {...props} />;
  };
}
