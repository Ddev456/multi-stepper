// Types partagés entre l'API et le frontend
export interface Configuration {
  _id: string;
  userId: string;
  configName: string;
  parameters: {
    climate: string;
    preferredDays: string[];
    cultureOffset: number;
  };
  createdAt: number;
  updatedAt: number;
}

export interface Garden {
  _id: string;
  name: string;
  description: string;
  climateZone: string;
  soilType: string[];
  area: number;
  createdAt: number;
  updatedAt: number;
}

export interface GardenZone {
  _id: string;
  gardenId: string;
  name: string;
  description: string;
}

export interface Plant {
  _id: string;
  name: string;
  cultivationStages: string[];
  scientificName?: string;
  description?: string;
  imageUrl?: string;
}

export interface Variety {
  _id: string;
  plantId: string;
  name: string;
}

export interface CultivationStageType {
  _id: string;
  name: string;
  code: string;
  description: string;
}

export interface CultivationStage {
  _id: string;
  plantId: string;
  name: string;
  duration: number;
  stepTypeId: string;
  defaultDuration: number;
  isRequired: boolean;
}

export interface DynamicEvent {
  title: string;
  description: string;
  date: string;
  plantName: string;
  type: string;
  status: 'pending' | 'completed' | 'cancelled';
}

// Types pour les paramètres des requêtes API
export interface DynamicEventsParams {
  configurationId: string;
  gardenId: string;
  zoneId: string;
  plants: Array<{
    plantId: string;
    varietyId?: string;
    quantity: number;
    startPoint: string;
    startDate: string;
  }>;
  cultivationSteps: Array<{
    enabled: boolean;
    duration: number;
  }>;
}
