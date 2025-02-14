import { Plant } from '../mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Droplets, Sun, Ruler, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlantDetailsProps {
    plant: Plant;
    onBack: () => void;
    onAddPlant: (plant: Plant) => void;
}

const DifficultyColor = {
    'Facile': 'bg-green-50 text-green-700',
    'Moyen': 'bg-amber-50 text-amber-700',
    'Difficile': 'bg-red-50 text-red-700',
} as const;

const WaterNeedsIcon = {
    'Faible': 1,
    'Moyen': 2,
    'Élevé': 3,
} as const;

export function PlantDetails({ plant, onBack, onAddPlant }: PlantDetailsProps) {
    const renderWaterNeeds = (level: keyof typeof WaterNeedsIcon) => {
        const count = WaterNeedsIcon[level];
        return (
            <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Droplets
                        key={i}
                        className={cn(
                            "h-4 w-4",
                            i < count ? "text-blue-500" : "text-gray-200"
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 max-w-2xl"
        >
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="hover:bg-gray-100"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{plant.name}</h3>
                    <Badge
                        variant="secondary"
                        className={cn(
                            "text-xs",
                            DifficultyColor[plant.difficulty]
                        )}
                    >
                        {plant.difficulty}
                    </Badge>
                </div>
            </div>

            {/* Overview */}
            <Card className="p-4">
                <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <img
                            src={`/plants/${plant.icon || 'default.svg'}`}
                            alt={plant.name}
                            className="w-10 h-10"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm text-gray-600 line-clamp-2">{plant.description}</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-600">{plant.season}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-600">{plant.growthTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="culture" className="space-y-3">
                <TabsList className="w-full grid grid-cols-3 h-9">
                    <TabsTrigger value="culture">Culture</TabsTrigger>
                    <TabsTrigger value="companions">Associations</TabsTrigger>
                    <TabsTrigger value="diseases">Maladies</TabsTrigger>
                </TabsList>

                <TabsContent value="culture">
                <ScrollArea className="h-56">
                    <Card className="p-4 space-y-4 bg-indigo-50 border border-indigo-100 text-indigo-600">
                        
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>Plantation</span>
                                        </div>
                                        <p className="font-medium">{plant.plantingPeriod}</p>
                                    </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                                        <Ruler className="h-3.5 w-3.5" />
                                        <span>Espacement</span>
                                    </div>
                                    <p className="font-medium">{plant.spacing}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                                        <Sun className="h-3.5 w-3.5" />
                                        <span>Exposition</span>
                                    </div>
                                    <p className="font-medium">{plant.exposure}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                                        <Droplets className="h-3.5 w-3.5" />
                                        <span>Arrosage</span>
                                    </div>
                                    {renderWaterNeeds(plant.waterNeeds)}
                                </div>
                            </div>
                        
                        <div className="pt-2">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Étapes de culture</h4>
                            <div className="space-y-3">
                                {plant.cultivationSteps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className={cn(
                                            "relative pl-6",
                                            index !== plant.cultivationSteps.length - 1 && "pb-3 border-l border-indigo-100"
                                        )}
                                    >
                                        <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-100 border-2 border-indigo-500" />
                                        <div>
                                            <div className="flex items-center justify-between gap-2">
                                                <h5 className="text-sm font-medium">{step.name}</h5>
                                                <Badge variant="secondary" className="text-xs">
                                                    {step.season}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-0.5">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="companions">
                <ScrollArea className="h-56">
                    <Card className="p-4 space-y-4 bg-indigo-50 border border-indigo-100 text-indigo-600">
                        <div className="flex flex-wrap gap-1.5">
                            {plant.companions.map((companion) => (
                                <Badge
                                    key={companion}
                                    variant="secondary"
                                    className="bg-green-50 text-green-700"
                                >
                                    {companion}
                                </Badge>
                            ))}
                        </div>
                    </Card>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="diseases">
                <ScrollArea className="h-56">
                    <Card className="p-4 space-y-4 bg-indigo-50 border border-indigo-100 text-indigo-600">
                        <div className="space-y-3">
                            {plant.diseases.map((disease) => (
                                <div key={disease.name} className="space-y-1">
                                    <h5 className="text-sm font-medium">{disease.name}</h5>
                                    <p className="text-xs text-gray-600">{disease.symptoms}</p>
                                    <p className="text-xs">
                                        <span className="font-medium">Traitement:</span> {disease.treatment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </ScrollArea>
                </TabsContent>
            </Tabs>

            {/* Action button */}
            <Button
                onClick={() => onAddPlant(plant)}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
            
                Ajouter à mon jardin
            </Button>
        </motion.div>
    );
}
