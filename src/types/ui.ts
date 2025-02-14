// Types spécifiques aux composants UI
import type { Configuration, Garden, GardenZone, Plant, Variety, CultivationStage, CultivationStageType, DynamicEvent } from './api';

export interface SummarySection {
  title: string;
  items: Array<{
    label: string;
    value: string;
    status?: "warning" | "success";
    description?: string;
  }>;
}

// Types pour les props des composants
export interface StepProps {
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

// Types pour les états UI locaux
export interface UIState {
  isLoading: boolean;
  error?: string;
  activeStep: number;
}

// PlantSelectionStep

export interface PlantStartOption {
  type: 'direct-sowing' | 'indoor-sowing' | 'transplant' | 'cutting';
  recommendedWindows: Array<CultureWindow>;
  constraints?: Array<CultureConstraint>;
  notes?: string;
  successRate?: number;
}

export interface CultureWindow {
  startMonth: number;
  endMonth: number;
  climateZones: Array<string>;
  optimal: boolean;
  conditions?: {
    minTemperature?: number;
    maxTemperature?: number;
    rainfall?: 'low' | 'moderate' | 'high';
    dayLength?: 'short' | 'medium' | 'long';
  };
}

export interface PlantGrowthData {
  temperatureRange: {
    min: number;
    optimal: number;
    max: number;
  };
  growthDuration: {
    min: number;
    average: number;
    max: number;
  };
  sunExposure: 'full' | 'partial' | 'shade';
  waterNeeds: 'low' | 'moderate' | 'high';
}

export interface CultureConstraint {
  type: 'temperature' | 'soil' | 'water' | 'companion';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PlantWithOptions extends Plant{
  startOptions: Array<PlantStartOption>;
  cultivationStages: Array<'seed' | 'seedling' | 'transplant'>;
  growthData?: PlantGrowthData;
}