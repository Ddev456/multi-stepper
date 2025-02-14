export interface Configuration {
  _id: string;
  userId: string;
  configName: string;
  parameters: {
    preferredDays?: string[];
    climate?: string;
    cultureOffset?: number;
  };
}

export interface ClimateZoneResponse {
  climateZone: string;
  confidence: number;
}

export type USDAZone = `usda-zone-${number}${'a' | 'b'}`;

export const USDA_ZONES = Array.from(
  { length: 26 },
  (_, i) => {
    const zone = Math.floor(i / 2) + 1;
    const suffix = i % 2 === 0 ? 'a' : 'b';
    return `usda-zone-${zone}${suffix}` as USDAZone;
  }
);
