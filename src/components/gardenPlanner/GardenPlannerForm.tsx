"use client";

import { gardenPlannerSchema, GardenPlannerFormData } from '@/schema/gardenplanner.schema';
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '../ui/form';
import { FormControlsProvider } from './hooks/useForm';
import FormHeader from './formHeader';
import FormFooter from './formFooter'
import RenderComponent from './renderComponent';
import { ConfigurationStep } from './steps/ConfigurationStep';
import { GardenZoneStep } from './steps/GardenZoneStep';
import { PlantSelectionStep } from './steps/PlantSelection/index';
import { PreviewStep } from './steps/PreviewStep';
import { SummaryStep } from './steps/SummaryStep';
import { StagesStep } from './steps/StagesStep';

export type Step = {
    id: string;
    title: string;
    description: string;
    component: () => React.JSX.Element;
    inputs: (keyof GardenPlannerFormData)[];
}

const steps: Step[] = [
    {
        id: "1",
        title: "Configuration initiale",
        description: "Choisissez la configuration à appliquer.",
        component: ConfigurationStep,
        inputs: ["configurationId"],
    },
    {
        id: "2",
        title: "Jardin et Zone de jardin",
        description: "Choisissez votre jardin et sa zone de jardin associé.",
        component: GardenZoneStep,
        inputs: ["gardenId", "zoneId"],
    },
    {
        id: "3",
        title: "Sélection des plantes",
        description: "Choisissez les plantes dont vous souhaiter générer un planning de culture.",
        component: PlantSelectionStep,
        inputs: ["plants"],
    },
    {
        id: "4",
        title: "Sélection des étapes de culture",
        description: "Choisissez les étapes de culture à appliquer à chaque plante.",
        component: StagesStep,
        inputs: ["cultivationSteps"],
    },
    {
        id: "5",
        title: "Prévisualisation",
        description: "Prévisualisez les événements qui seront générés.",
        component: PreviewStep,
        inputs: [],
    },
    {
        id: "6",
        title: "Résumé",
        description: "Vérifiez vos choix avant de valider.",
        component: SummaryStep,
        inputs: [],
    }
];

const GardenPlannerForm = () => {
    const form = useForm<GardenPlannerFormData>({
        resolver: zodResolver(gardenPlannerSchema),
        mode: "onSubmit",
        defaultValues: {
            plants: [],
            programName: `Programme ${new Date().getFullYear()}`,
            year: new Date().getFullYear(),
            optimizationGoals: [
                { type: 'spacing', weight: 1 },
                { type: 'succession', weight: 1 },
                { type: 'companion', weight: 1 }
            ],
            cultivationSteps: []
        }
    });

    const onSubmit = async (data: GardenPlannerFormData) => {
        console.log(data);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormControlsProvider steps={steps}>
                        <FormHeader steps={steps} />
                        <RenderComponent steps={steps} />
                        <FormFooter steps={steps} />
                    </FormControlsProvider>
                </form>
            </Form>
        </div>
    );
}

export default GardenPlannerForm