import { GardenConfiguration } from '../mockData';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Sun, Cloud, Thermometer, Check, Settings2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, listItemVariants } from '../animations';

interface ConfigurationSelectorProps {
    configurations: GardenConfiguration[];
    selectedConfig: GardenConfiguration | null;
    onConfigChange: (config: GardenConfiguration) => void;
    onEdit: (config: GardenConfiguration) => void;
    onCreateNew: () => void;
}

const getClimateIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'méditerranéen':
            return <Sun className="w-5 h-5 text-amber-500" />;
        case 'océanique':
            return <Cloud className="w-5 h-5 text-blue-500" />;
        case 'continental':
            return <Thermometer className="w-5 h-5 text-red-500" />;
        default:
            return <Sun className="w-5 h-5 text-gray-500" />;
    }
};

export function ConfigurationSelector({
    configurations,
    selectedConfig,
    onConfigChange,
    onEdit,
    onCreateNew,
}: ConfigurationSelectorProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">
                    Configuration du jardin
                </h3>
                <span className="text-sm text-gray-500">
                    {configurations.length} configurations disponibles
                </span>
            </div>

            <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                    {configurations.map((config) => (
                        <motion.div
                            key={config.id}
                            variants={listItemVariants}
                            className={cn(
                                "w-full p-4 rounded-lg border transition-all",
                                "hover:border-indigo-300 hover:bg-indigo-50/50",
                                "focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2",
                                "relative group cursor-pointer",
                                selectedConfig?.id === config.id && "border-indigo-500 bg-indigo-50"
                            )}
                            onClick={() => onConfigChange(config)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-100 rounded-lg -rotate-6" />
                                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-indigo-200">
                                        {getClimateIcon(config.climate.type)}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">
                                            {config.name}
                                        </h4>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(config);
                                            }}
                                        >
                                            <Settings2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {config.climate.type}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {config.climate.characteristics.map((char, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {selectedConfig?.id === config.id && (
                                <div className="absolute right-4 top-4">
                                    <Check className="w-5 h-5 text-indigo-600" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </ScrollArea>

            <Button
                variant="outline"
                onClick={onCreateNew}
                className="w-full border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-indigo-700"
            >
                <Plus className="h-4 w-4 mr-2" />
                Créer une nouvelle configuration
            </Button>
        </motion.div>
    );
}
