import { useState } from 'react';
import { Plant, GardenConfiguration, ProgramConfig } from '../mockData';

export interface SelectedPlant {
    plant: Plant;
    selectedSteps: string[];
    hasProgram?: boolean;
}

export function useAssistantState() {
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentStep, setCurrentStep] = useState<'configuration' | 'selection' | 'plant-details' | 'program' | 'summary'>('configuration');
    const [selectedConfig, setSelectedConfig] = useState<GardenConfiguration | null>(null);
    const [configurations, setConfigurations] = useState<ProgramConfig[]>([]);
    const [isEditingConfig, setIsEditingConfig] = useState(false);
    const [editingConfig, setEditingConfig] = useState<ProgramConfig | null>(null);
    const [selectedPlants, setSelectedPlants] = useState<SelectedPlant[]>([]);
    const [currentPlantId, setCurrentPlantId] = useState<string | null>(null);
    const [viewingPlant, setViewingPlant] = useState<Plant | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Légumes');

    return {
        // State
        isAssistantOpen,
        setIsAssistantOpen,
        isExpanded,
        setIsExpanded,
        currentStep,
        setCurrentStep,
        selectedConfig,
        setSelectedConfig,
        configurations,
        setConfigurations,
        isEditingConfig,
        setIsEditingConfig,
        editingConfig,
        setEditingConfig,
        selectedPlants,
        setSelectedPlants,
        currentPlantId,
        setCurrentPlantId,
        viewingPlant,
        setViewingPlant,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
    };
}
