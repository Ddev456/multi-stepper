import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plant, GardenConfiguration, mockGardenerProfile, mockPlants } from './mockData';
import { AssistantHeader } from './components/AssistantHeader';
import { PlantSelection } from './components/PlantSelection';
import { PlantList } from './components/PlantList';
import { ConfigurationSelector } from './components/ConfigurationSelector';
import { ProgramConfiguration, type ProgramConfig } from './components/ProgramConfiguration';
import { ConfigurationList } from './components/ConfigurationList';
import { PlantDetails } from './components/PlantDetails';
import { containerVariants, contentVariants, listItemVariants, quickTransition } from './animations';

type AssistantStep = 'configuration' | 'selection' | 'plant-details' | 'program' | 'summary';

interface SelectedPlant {
    plant: Plant;
    selectedSteps: string[];
    hasProgram?: boolean;
}

export function GardenAssistant() {
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentStep, setCurrentStep] = useState<AssistantStep>('configuration');
    const [selectedConfig, setSelectedConfig] = useState<GardenConfiguration | null>(null);
    const [configurations, setConfigurations] = useState<ProgramConfig[]>([]);
    const [isEditingConfig, setIsEditingConfig] = useState(false);
    const [editingConfig, setEditingConfig] = useState<ProgramConfig | null>(null);
    const [selectedPlants, setSelectedPlants] = useState<SelectedPlant[]>([]);
    const [currentPlantId, setCurrentPlantId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Légumes');
    const [viewingPlant, setViewingPlant] = useState<Plant | null>(null);

    const plantCategories = Array.from(new Set(mockPlants.map(p => p.category)));
    const currentPlant = currentPlantId 
        ? selectedPlants.find(p => p.plant.id === currentPlantId)
        : null;

    const allPlantsHaveProgram = selectedPlants.length > 0 && 
        selectedPlants.every(p => p.hasProgram);

    const handleClose = () => {
        setIsAssistantOpen(false);
        setCurrentStep('configuration');
        setSelectedConfig(null);
        setSelectedPlants([]);
        setCurrentPlantId(null);
        setSearchQuery('');
        setSelectedCategory('Légumes');
    };

    const handleConfigChange = (config: GardenConfiguration) => {
        setSelectedConfig(config);
    };

    const handlePlantView = (plant: Plant) => {
        setViewingPlant(plant);
        setCurrentStep('plant-details');
    };

    const handlePlantSelect = (plant: Plant) => {
        if (!selectedPlants.some(p => p.plant.id === plant.id)) {
            setSelectedPlants(prev => [...prev, {
                plant,
                selectedSteps: [],
            }]);
        }
        setViewingPlant(null);
        setCurrentStep('selection');
    };

    const handleRemovePlant = (plantId: string) => {
        setSelectedPlants(plants => plants.filter(p => p.plant.id !== plantId));
        if (currentPlantId === plantId) {
            setCurrentPlantId(null);
            setCurrentStep('selection');
        }
    };

    const handleGenerateProgram = (plantId: string) => {
        setCurrentPlantId(plantId);
        setCurrentStep('program');
    };

    const handleValidateProgram = () => {
        if (!currentPlant) return;
        
        setSelectedPlants(plants =>
            plants.map(p =>
                p.plant.id === currentPlant.plant.id
                    ? { ...p, hasProgram: true }
                    : p
            )
        );
        setCurrentPlantId(null);
        setCurrentStep('selection');
    };

    const handleStepToggle = (plantId: string, stepId: string) => {
        setSelectedPlants(plants =>
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

    const handleNextStep = () => {
        if (currentStep === 'configuration' && selectedConfig) {
            setCurrentStep('selection');
        }
    };

    const handlePreviousStep = () => {
        if (currentStep === 'selection') {
            setCurrentStep('configuration');
        } else if (currentStep === 'program') {
            setCurrentStep('selection');
            setCurrentPlantId(null);
        } else if (currentStep === 'summary') {
            setCurrentStep('selection');
        } else if (currentStep === 'plant-details') {
            setViewingPlant(null);
            setCurrentStep('selection');
        }
    };

    const handleConfigurationSave = (config: ProgramConfig) => {
        if (editingConfig) {
            setConfigurations(configs => 
                configs.map(c => c.name === editingConfig.name ? config : c)
            );
        } else {
            setConfigurations(configs => [...configs, config]);
        }
        setIsEditingConfig(false);
        setEditingConfig(null);
    };

    const handleEditConfiguration = (config: ProgramConfig) => {
        setEditingConfig(config);
        setIsEditingConfig(true);
    };

    const handleCreateConfiguration = () => {
        setEditingConfig(null);
        setIsEditingConfig(true);
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsAssistantOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div className={cn("fixed bottom-6 right-6 z-50", isExpanded && "w-full max-w-3xl")}>
            <AnimatePresence>
                {isAssistantOpen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-violet-200 p-4"
                    >
                        <AssistantHeader
                            onClose={handleClose}
                            isExpanded={isExpanded}
                            onToggleExpand={() => setIsExpanded(!isExpanded)}
                        />
                        
                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {currentStep === 'configuration' && (
                                    <motion.div
                                        key="configuration"
                                        variants={contentVariants(currentStep)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-6"
                                    >
                                        {isEditingConfig ? (
                                            <ProgramConfiguration
                                                onSave={handleConfigurationSave}
                                                initialConfig={editingConfig}
                                                onCancel={() => setIsEditingConfig(false)}
                                            />
                                        ) : (
                                            <>
                                                <div className="space-y-4">
                                                    <ConfigurationList
                                                        configurations={[
                                                            ...configurations,
                                                            ...mockGardenerProfile.gardenConfigurations
                                                        ]}
                                                        selectedConfig={selectedConfig}
                                                        onSelect={handleConfigChange}
                                                        onEdit={handleEditConfiguration}
                                                        onCreateNew={handleCreateConfiguration}
                                                    />
                                                </div>

                                                <div className="flex justify-end space-x-4">
                                                    <Button
                                                        onClick={handleNextStep}
                                                        disabled={!selectedConfig}
                                                        className="bg-violet-600 hover:bg-violet-700 text-white"
                                                    >
                                                        <span>Continuer</span>
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 'selection' && (
                                    <motion.div
                                        key="selection"
                                        variants={contentVariants(currentStep)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handlePreviousStep}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Configuration
                                            </Button>
                                        </div>

                                        <PlantSelection
                                            selectedConfig={selectedConfig}
                                            configurations={configurations}
                                            searchQuery={searchQuery}
                                            selectedCategory={selectedCategory}
                                            categories={plantCategories}
                                            plants={mockPlants}
                                            onConfigChange={handleConfigChange}
                                            onSearchChange={setSearchQuery}
                                            onCategoryChange={setSelectedCategory}
                                            onPlantSelect={handlePlantView}
                                        />

                                        <div className="mt-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-medium text-gray-900">
                                                    Plantes sélectionnées
                                                </h3>
                                                {allPlantsHaveProgram && selectedPlants.length > 0 && (
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        className="bg-violet-600 hover:bg-violet-700 text-white"
                                                        onClick={() => setCurrentStep('summary')}
                                                    >
                                                        Voir le récapitulatif
                                                    </Button>
                                                )}
                                            </div>
                                            <PlantList
                                                selectedPlants={selectedPlants}
                                                onRemovePlant={handleRemovePlant}
                                                onGenerateProgram={handleGenerateProgram}
                                                className="max-h-[300px]"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 'plant-details' && viewingPlant && (
                                    <motion.div
                                        key="plant-details"
                                        variants={contentVariants(currentStep)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-4"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handlePreviousStep}
                                            className="mb-2 text-gray-600 hover:text-gray-900"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Retour
                                        </Button>

                                        <PlantDetails
                                            plant={viewingPlant}
                                            onBack={handlePreviousStep}
                                            onAddPlant={handlePlantSelect}
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 'program' && (
                                    <motion.div
                                        key="program"
                                        variants={contentVariants(currentStep)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-4"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handlePreviousStep}
                                            className="mb-2 text-gray-600 hover:text-gray-900"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Retour
                                        </Button>

                                        {currentPlant && (
                                            <>
                                                <div className="bg-violet-50/80 rounded-lg p-6 border border-violet-100">
                                                    <h3 className="font-medium text-violet-900 mb-3">
                                                        Programme pour {currentPlant.plant.name}
                                                    </h3>
                                                    {selectedConfig && (
                                                        <div className="text-sm text-violet-700">
                                                            <p className="font-medium">{selectedConfig.name}</p>
                                                            <p className="mt-2 text-violet-600">
                                                                {selectedConfig.climate.characteristics.join(' • ')}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    <PlantList
                                                        selectedPlants={[currentPlant]}
                                                        onRemovePlant={handleRemovePlant}
                                                        onStepToggle={handleStepToggle}
                                                        showDetails
                                                        className="max-h-[400px]"
                                                    />
                                                </div>

                                                <div className="pt-4">
                                                    <Button
                                                        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                                                        onClick={handleValidateProgram}
                                                        disabled={currentPlant.selectedSteps.length === 0}
                                                    >
                                                        Valider le programme
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}

                                {currentStep === 'summary' && (
                                    <motion.div
                                        key="summary"
                                        variants={contentVariants(currentStep)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-4"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handlePreviousStep}
                                            className="mb-2 text-gray-600 hover:text-gray-900"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Retour
                                        </Button>

                                        <div className="bg-violet-50/80 rounded-lg p-6 border border-violet-100">
                                            <h3 className="font-medium text-violet-900 mb-3">
                                                Configuration sélectionnée
                                            </h3>
                                            {selectedConfig && (
                                                <div className="text-sm text-violet-700">
                                                    <p className="font-medium">{selectedConfig.name}</p>
                                                    <p className="mt-2 text-violet-600">
                                                        {selectedConfig.climate.characteristics.join(' • ')}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="font-medium text-gray-900">
                                                Programme de culture
                                            </h3>
                                            <PlantList
                                                selectedPlants={selectedPlants}
                                                onRemovePlant={handleRemovePlant}
                                                showDetails
                                                className="max-h-[400px]"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <Button 
                                                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                                                onClick={handleClose}
                                            >
                                                Terminer
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isAssistantOpen && (
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={quickTransition}
                    onClick={() => setIsAssistantOpen(true)}
                    className="bg-violet-600 text-white p-4 rounded-xl shadow-sm border border-violet-500 hover:bg-violet-700 transition-colors flex items-center gap-3"
                >
                    <BotIcon className="size-6" />
                    <span className="font-medium">Assistant</span>
                </motion.button>
            )}
        </div>
    );
}
