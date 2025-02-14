import { mockGardenZones, mockConfigurations, mockCultivationStages } from '@/lib/mocks/mockData';

export const validateGardenZone = (gardenId: string, zoneId: string): boolean => {
  try {
    const zone = mockGardenZones.find(z => z._id === zoneId && z.gardenId === gardenId);
    return !!zone;
  } catch (error) {
    console.error('Erreur lors de la validation de la zone:', error);
    return false;
  }
};

export const validateConfigurationWithPlants = (
  configurationId: string,
  plants: Array<{ plantId: string; startPoint: string }>
): boolean => {
  try {
    const configuration = mockConfigurations.find(c => c._id === configurationId);
    if (!configuration) return false;

    // Vérification pour chaque plante
    return plants.every(plant => {
      const cultivationStages = mockCultivationStages.filter(
        stage => stage.plantId === plant.plantId
      );
      
      return cultivationStages.some(stage => stage.name.toLowerCase() === plant.startPoint);
    });
  } catch (error) {
    console.error('Erreur lors de la validation de la configuration:', error);
    return false;
  }
};
