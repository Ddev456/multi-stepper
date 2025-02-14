import { Plant, CultivationStep } from '../mockData';
import { Button } from '@/components/ui/button';
import { ChevronRight, Leaf, X, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { CultivationSteps } from './CultivationSteps';

interface PlantListProps {
    selectedPlants: Array<{
        plant: Plant;
        selectedSteps: string[];
        hasProgram?: boolean;
    }>;
    onRemovePlant: (plantId: string) => void;
    onGenerateProgram?: (plantId: string) => void;
    onStepToggle?: (plantId: string, stepId: string) => void;
    showDetails?: boolean;
    className?: string;
}

export function PlantList({ 
    selectedPlants, 
    onRemovePlant, 
    onGenerateProgram,
    onStepToggle,
    showDetails = false,
    className 
}: PlantListProps) {
    if (selectedPlants.length === 0) {
        return (
            <div className={cn("text-center py-8 text-gray-500", className)}>
                <Leaf className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p>Aucune plante sélectionnée</p>
                <p className="text-sm mt-1">Sélectionnez des plantes pour créer votre programme</p>
            </div>
        );
    }

    return (
        <ScrollArea className={cn("pr-4", className)}>
            <div className="space-y-4">
                {selectedPlants.map(({ plant, selectedSteps, hasProgram }) => (
                    <Card key={plant.id} className="relative group bg-indigo-50 text-indigo-600">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemovePlant(plant.id)}
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </Button>

                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8">
                                    <div className="absolute inset-0 bg-indigo-100 rounded-lg -rotate-6" />
                                    <img 
                                        src={'/plants/spinach.svg'}
                                        className="relative size-8 rounded-lg"
                                        alt={plant.name}
                                    />
                                </div>
                                <CardTitle className="text-base">{plant.name}</CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-2">
                                {hasProgram ? (
                                    <>
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span className="text-green-600">Programme généré</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{selectedSteps.length}</span>
                                        <span>étapes sélectionnées</span>
                                    </>
                                )}
                            </CardDescription>
                        </CardHeader>

                        {showDetails && (
                            <CardContent>
                                <ScrollArea className="h-[200px]">
                                    <CultivationSteps
                                        steps={plant.cultivationSteps}
                                        selectedSteps={selectedSteps}
                                        onStepToggle={onStepToggle ? (stepId) => onStepToggle(plant.id, stepId) : undefined}
                                    />
                                </ScrollArea>
                            </CardContent>
                        )}

                        <CardFooter className="pt-3">
                            {onGenerateProgram && !hasProgram ? (
                                <Button
                                    variant="outline"
                                    className="w-full justify-between group/btn hover:border-indigo-500 hover:bg-indigo-50"
                                    onClick={() => onGenerateProgram(plant.id)}
                                >
                                    <span className="text-gray-700 group-hover/btn:text-indigo-600">Générer un programme</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover/btn:text-indigo-500 transition-colors" />
                                </Button>
                            ) : !showDetails && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemovePlant(plant.id)}
                                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    Retirer
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
