import { CultivationStep } from '../mockData';
import { motion } from 'framer-motion';
import { Calendar, Sun, Cloud, Thermometer } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

interface CultivationStepsProps {
    steps: CultivationStep[];
    selectedSteps: string[];
    onStepToggle?: (stepId: string) => void;
    className?: string;
}

const getStepIcon = (season: string) => {
    switch (season.toLowerCase()) {
        case 'été':
            return <Sun className="w-5 h-5 text-amber-500" />;
        case 'printemps':
            return <Cloud className="w-5 h-5 text-green-500" />;
        case 'automne':
            return <Cloud className="w-5 h-5 text-orange-500" />;
        case 'hiver':
            return <Thermometer className="w-5 h-5 text-blue-500" />;
        default:
            return <Calendar className="w-5 h-5 text-violet-600" />;
    }
};

const stepVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        },
    }),
    exit: { opacity: 0, y: -20 },
};

export function CultivationSteps({ 
    steps, 
    selectedSteps,
    onStepToggle,
    className 
}: CultivationStepsProps) {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    const selectedDuration = steps
        .filter(step => selectedSteps.includes(step.id))
        .reduce((acc, step) => acc + step.duration, 0);
    
    const progress = (selectedDuration / totalDuration) * 100;

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Progression du programme</span>
                <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="space-y-3 mt-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        custom={index}
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={cn(
                            "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                            selectedSteps.includes(step.id)
                                ? "bg-indigo-50 border-indigo-200"
                                : "bg-white border-gray-200",
                            onStepToggle && "cursor-pointer hover:border-indigo-300"
                        )}
                        onClick={() => onStepToggle?.(step.id)}
                    >
                        <div className="shrink-0 mt-1">
                            {getStepIcon(step.season)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h4 className="font-medium text-gray-900">
                                    {step.name}
                                </h4>
                                <Badge 
                                    variant={step.importance === 'high' ? 'default' : 'secondary'}
                                    className={cn(
                                        "shrink-0",
                                        step.importance === 'high' 
                                            ? "bg-indigo-500 hover:bg-indigo-600" 
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                >
                                    {step.importance === 'high' ? 'Important' : 'Optionnel'}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {step.description}
                            </p>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="bg-white border-indigo-200 text-indigo-600">
                                    {step.season}
                                </Badge>
                                <Badge variant="outline" className="bg-white border-green-200 text-green-600">
                                    {step.duration} jours
                                </Badge>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
