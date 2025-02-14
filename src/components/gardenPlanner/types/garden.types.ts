export interface Garden {
  _id: string;
  name: string;
  description?: string;
  climateZone: string;
  soilType: string;
  area: number;
  createdAt: string;
  updatedAt: string;
}

export interface GardenZone {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateGardenInput {
  name: string;
  description: string;
  climateZone: string;
  soilType: string;
  area: number;
}

export interface CreateZoneInput {
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

export const SOIL_TYPES = [
  'sandy',
  'clay',
  'loamy',
  'silty',
  'peaty',
  'chalky',
] as const;

export const EXPOSURE_TYPES = {
  full: 'Plein soleil',
  partial: 'Mi-ombre',
  shade: 'Ombre',
} as const;

export const MICROCLIMATE_OPTIONS = {
  temperature: {
    warmer: 'Plus chaud',
    normal: 'Normal',
    cooler: 'Plus frais',
  },
  wind: {
    protected: 'Protégé',
    normal: 'Normal',
    exposed: 'Exposé',
  },
  moisture: {
    dry: 'Sec',
    normal: 'Normal',
    wet: 'Humide',
  },
} as const;
