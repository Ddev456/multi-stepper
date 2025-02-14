import { Plant, GardenConfiguration, ProgramConfig } from '../mockData';
import { SelectedPlant } from './useAssistantState';
import { useToast } from '@/hooks/use-toast';

interface AssistantState {
    setIsAssistantOpen: (value: boolean) => void;
    setCurrentStep: (step: 'configuration' | 'selection' | 'plant-details' | 'program' | 'summary') => void;
    setSelectedConfig: (config: GardenConfiguration | null) => void;
    setSelectedPlants: (value: React.SetStateAction<SelectedPlant[]>) => void;
    setCurrentPlantId: (value: string | null) => void;
    setSearchQuery: (value: string) => void;
    setSelectedCategory: (value: string) => void;
    setViewingPlant: (plant: Plant | null) => void;
    setConfigurations: (value: React.SetStateAction<ProgramConfig[]>) => void;
    setIsEditingConfig: (value: boolean) => void;
    setEditingConfig: (value: ProgramConfig | null) => void;
}

export function useAssistantActions(state: AssistantState) {
    const { toast } = useToast();

    const handleClose = () => {
        state.setIsAssistantOpen(false);
        state.setCurrentStep('configuration');
        state.setSelectedConfig(null);
        state.setSelectedPlants([]);
        state.setCurrentPlantId(null);
        state.setSearchQuery('');
        state.setSelectedCategory('Légumes');
    };

    const handlePlantView = (plant: Plant) => {
        state.setViewingPlant(plant);
        state.setCurrentStep('plant-details');
    };

    const handlePlantSelect = (plant: Plant) => {
        state.setSelectedPlants(prev => {
            if (!prev.some(p => p.plant.id === plant.id)) {
                return [...prev, { plant, selectedSteps: [] }];
            }
            return prev;
        });
        state.setViewingPlant(null);
        state.setCurrentStep('selection');
    };

    const handleRemovePlant = (plantId: string) => {
        state.setSelectedPlants(plants => plants.filter(p => p.plant.id !== plantId));
        if (state.currentPlantId === plantId) {
            state.setCurrentPlantId(null);
            state.setCurrentStep('selection');
        }
    };

    const handleGenerateProgram = (plantId: string) => {
        state.setCurrentPlantId(plantId);
        state.setCurrentStep('program');
    };

    const handleValidateProgram = (currentPlant: SelectedPlant | undefined) => {
        if (!currentPlant) return;
        
        // Ici, plus tard, on ajoutera l'enregistrement en base de données
        
        // Supprimer la plante de la liste des plantes sélectionnées
        state.setSelectedPlants(plants => 
            plants.filter(p => p.plant.id !== currentPlant.plant.id)
        );
        
        // Afficher le toast de confirmation
        toast({
            title: "Programme validé !",
            description: `Le programme de culture pour ${currentPlant.plant.name} a été enregistré avec succès.`,
            variant: "default",
            className: "bg-violet-50 border-violet-200",
        });

        state.setCurrentPlantId(null);
        state.setCurrentStep('selection');
    };

    const handleStepToggle = (plantId: string, stepId: string) => {
        state.setSelectedPlants(plants =>
            plants.map(p =>
                p.plant.id === plantId
                    ? {
                        ...p,
                        selectedSteps: p.selectedSteps.includes(stepId)
                            ? p.selectedSteps.filter(id => id !== stepId)
                            : [...p.selectedSteps, stepId]
                    }
                    : p
            )
        );
    };

    const handleNextStep = (selectedConfig: GardenConfiguration | null) => {
        if (state.currentStep === 'configuration' && selectedConfig) {
            state.setCurrentStep('selection');
        }
    };

    const handlePreviousStep = () => {
        switch (state.currentStep) {
            case 'selection':
                state.setCurrentStep('configuration');
                break;
            case 'program':
                state.setCurrentStep('selection');
                state.setCurrentPlantId(null);
                break;
            case 'summary':
                state.setCurrentStep('selection');
                break;
            case 'plant-details':
                state.setViewingPlant(null);
                state.setCurrentStep('selection');
                break;
        }
    };

    const handleConfigurationSave = (config: ProgramConfig, editingConfig: ProgramConfig | null) => {
        state.setConfigurations(configs => {
            if (editingConfig) {
                return configs.map(c => c.name === editingConfig.name ? config : c);
            }
            return [...configs, config];
        });
        state.setIsEditingConfig(false);
        state.setEditingConfig(null);
    };

    const handleEditConfiguration = (config: ProgramConfig | null) => {
        if (config === null) {
            state.setIsEditingConfig(false);
            state.setEditingConfig(null);
        } else {
            state.setIsEditingConfig(true);
            state.setEditingConfig(config);
        }
    };

    const handleCreateConfiguration = () => {
        state.setEditingConfig(null);
        state.setIsEditingConfig(true);
    };

    return {
        handleClose,
        handlePlantView,
        handlePlantSelect,
        handleRemovePlant,
        handleGenerateProgram,
        handleValidateProgram,
        handleStepToggle,
        handleNextStep,
        handlePreviousStep,
        handleConfigurationSave,
        handleEditConfiguration,
        handleCreateConfiguration,
    };
}
