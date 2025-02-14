import { motion, AnimatePresence } from 'framer-motion';
import { Plant, GardenConfiguration, ProgramConfig, mockGardenerProfile } from '../mockData';
import { PlantSelection } from './PlantSelection';
import { PlantList } from './PlantList';
import { ConfigurationSelector } from './ConfigurationSelector';
import { ProgramConfiguration } from './ProgramConfiguration';
import { PlantDetails } from './PlantDetails';
import { contentVariants } from '../animations';
import { SelectedPlant } from '../hooks/useAssistantState';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface AssistantContentProps {
    currentStep: 'configuration' | 'selection' | 'plant-details' | 'program' | 'summary';
    selectedConfig: GardenConfiguration | null;
    configurations: ProgramConfig[];
    isEditingConfig: boolean;
    editingConfig: ProgramConfig | null;
    selectedPlants: SelectedPlant[];
    currentPlant: SelectedPlant | undefined;
    viewingPlant: Plant | null;
    searchQuery: string;
    selectedCategory: string;
    plantCategories: string[];
    mockPlants: Plant[];
    onConfigChange: (config: GardenConfiguration) => void;
    onPlantView: (plant: Plant) => void;
    onPlantSelect: (plant: Plant) => void;
    onRemovePlant: (plantId: string) => void;
    onGenerateProgram: (plantId: string) => void;
    onValidateProgram: () => void;
    onStepToggle: (plantId: string, stepId: string) => void;
    onConfigurationSave: (config: ProgramConfig) => void;
    onEditConfiguration: (config: ProgramConfig) => void;
    onCreateConfiguration: () => void;
    onPreviousStep: () => void;
    onNextStep: () => void;
}

export function AssistantContent({
    currentStep,
    selectedConfig,
    configurations,
    isEditingConfig,
    editingConfig,
    selectedPlants,
    currentPlant,
    viewingPlant,
    searchQuery,
    selectedCategory,
    plantCategories,
    mockPlants,
    onConfigChange,
    onPlantView,
    onPlantSelect,
    onRemovePlant,
    onGenerateProgram,
    onValidateProgram,
    onStepToggle,
    onConfigurationSave,
    onEditConfiguration,
    onCreateConfiguration,
    onPreviousStep,
    onNextStep,
}: AssistantContentProps) {
    return (
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
                                initialConfig={editingConfig}
                                onSave={onConfigurationSave}
                                onCancel={() => onEditConfiguration(null)}
                            />
                        ) : (
                            <>
                                <ConfigurationSelector
                                    configurations={[
                                        ...configurations,
                                        ...mockGardenerProfile.gardenConfigurations
                                    ]}
                                    selectedConfig={selectedConfig}
                                    onConfigChange={onConfigChange}
                                    onEdit={onEditConfiguration}
                                    onCreateNew={onCreateConfiguration}
                                />
                                

                                <div className="flex justify-end space-x-4">
                                    <Button
                                        onClick={onNextStep}
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
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onPreviousStep}
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
                            onConfigChange={onConfigChange}
                            onPlantSelect={onPlantView}
                        />

                        {selectedPlants.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-medium text-gray-900 mb-4">
                                    Plantes sélectionnées
                                </h3>
                                <PlantList
                                    selectedPlants={selectedPlants}
                                    onRemovePlant={onRemovePlant}
                                    onGenerateProgram={onGenerateProgram}
                                    className="max-h-[300px]"
                                />
                            </div>
                        )}
                    </motion.div>
                )}

                {currentStep === 'plant-details' && viewingPlant && (
                    <motion.div
                        key="plant-details"
                        variants={contentVariants(currentStep)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onPreviousStep}
                            className="mb-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour
                        </Button>

                        <PlantDetails
                            plant={viewingPlant}
                            onBack={onPreviousStep}
                            onAddPlant={onPlantSelect}
                        />
                    </motion.div>
                )}

                {currentStep === 'program' && currentPlant && (
                    <motion.div
                        key="program"
                        variants={contentVariants(currentStep)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="space-y-6"
                    >
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

                        <PlantList
                            selectedPlants={[currentPlant]}
                            onRemovePlant={onRemovePlant}
                            onStepToggle={onStepToggle}
                            showDetails
                            className="max-h-[400px]"
                        />

                        <div className="pt-4">
                            <Button
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                                onClick={onValidateProgram}
                                disabled={currentPlant.selectedSteps.length === 0}
                            >
                                Valider le programme
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
