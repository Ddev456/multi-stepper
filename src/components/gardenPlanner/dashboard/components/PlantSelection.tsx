import { Plant, GardenConfiguration } from '../mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlantSelectionProps {
    selectedConfig: GardenConfiguration | null;
    configurations: GardenConfiguration[];
    searchQuery: string;
    selectedCategory: string;
    categories: readonly string[];
    plants: Plant[];
    onConfigChange: (configId: string) => void;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
    onPlantSelect: (plant: Plant) => void;
}

export function PlantSelection({
    selectedConfig,
    configurations,
    searchQuery,
    selectedCategory,
    categories,
    plants,
    onConfigChange,
    onSearchChange,
    onCategoryChange,
    onPlantSelect,
}: PlantSelectionProps) {
    const filteredPlants = plants.filter(
        (plant) =>
            plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            plant.category === selectedCategory
    );

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Rechercher une plante..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 bg-gray-50 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                    />
                </div>

                <Tabs defaultValue={selectedCategory} onValueChange={onCategoryChange}>
                    <TabsList className="bg-gray-100 p-1">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value={selectedCategory} className="mt-4">
                        <ScrollArea className="h-[200px] pr-4">
                            <div className="grid grid-cols-2 gap-2">
                                {filteredPlants.map((plant) => (
                                    <motion.button
                                        key={plant.id}
                                        onClick={() => onPlantSelect(plant)}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                                            "hover:border-indigo-300 hover:bg-indigo-50/50",
                                            "focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2",
                                            "group relative"
                                        )}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <img 
                                            src={`/plants/${plant.icon || 'default.svg'}`}
                                            alt={plant.name}
                                            className="w-8 h-8"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900 group-hover:text-indigo-600">
                                                {plant.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Voir les détails
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.button>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
