import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BotIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockPlants } from './mockData';
import { AssistantHeader } from './components/AssistantHeader';
import { AssistantContent } from './components/AssistantContent';
import { containerVariants, quickTransition } from './animations';
import { useAssistantState } from './hooks/useAssistantState';
import { useAssistantActions } from './hooks/useAssistantActions';
import { Toaster } from '@/components/ui/toaster';

export function GardenAssistant() {
    const state = useAssistantState();
    const actions = useAssistantActions(state);

    const plantCategories = Array.from(new Set(mockPlants.map(p => p.category)));
    const currentPlant = state.currentPlantId 
        ? state.selectedPlants.find(p => p.plant.id === state.currentPlantId)
        : undefined;

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                state.setIsAssistantOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <>
            <div className={cn(
                "fixed bottom-6 right-6 z-50",
                state.isExpanded && "w-full max-w-3xl"
            )}>
                <AnimatePresence>
                    {state.isAssistantOpen && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white rounded-xl shadow-lg overflow-hidden border border-violet-200 p-4"
                        >
                            <AssistantHeader
                                onClose={actions.handleClose}
                                isExpanded={state.isExpanded}
                                onToggleExpand={() => state.setIsExpanded(!state.isExpanded)}
                            />
                            
                            <AssistantContent
                                currentStep={state.currentStep}
                                selectedConfig={state.selectedConfig}
                                configurations={state.configurations}
                                isEditingConfig={state.isEditingConfig}
                                editingConfig={state.editingConfig}
                                selectedPlants={state.selectedPlants}
                                currentPlant={currentPlant}
                                viewingPlant={state.viewingPlant}
                                searchQuery={state.searchQuery}
                                selectedCategory={state.selectedCategory}
                                plantCategories={plantCategories}
                                mockPlants={mockPlants}
                                onConfigChange={state.setSelectedConfig}
                                onPlantView={actions.handlePlantView}
                                onPlantSelect={actions.handlePlantSelect}
                                onRemovePlant={actions.handleRemovePlant}
                                onGenerateProgram={actions.handleGenerateProgram}
                                onValidateProgram={() => actions.handleValidateProgram(currentPlant)}
                                onStepToggle={actions.handleStepToggle}
                                onConfigurationSave={(config) => actions.handleConfigurationSave(config, state.editingConfig)}
                                onEditConfiguration={actions.handleEditConfiguration}
                                onCreateConfiguration={actions.handleCreateConfiguration}
                                onPreviousStep={actions.handlePreviousStep}
                                onNextStep={() => actions.handleNextStep(state.selectedConfig)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!state.isAssistantOpen && (
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={quickTransition}
                        onClick={() => state.setIsAssistantOpen(true)}
                        className="bg-violet-600 text-white p-4 rounded-xl shadow-sm border border-violet-500 hover:bg-violet-700 transition-colors flex items-center gap-3"
                    >
                        <BotIcon className="size-6" />
                        <span className="font-medium">Assistant</span>
                    </motion.button>
                )}
            </div>
            <Toaster />
        </>
    );
}