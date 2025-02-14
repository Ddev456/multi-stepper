import { LucideIcon, Sun, Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';

export interface GardenerProfile {
    id: string;
    name: string;
    gardenConfigurations: GardenConfiguration[];
}

export interface GardenConfiguration {
    id: string;
    name: string;
    climate: Climate;
    gardeningDays: string[];
    soilType: string;
    gardenSize: string;
    sunExposure: string;
}

export interface Climate {
    type: string;
    icon: LucideIcon;
    characteristics: string[];
}

export interface Plant {
    id: string;
    name: string;
    category: string;
    cultivationSteps: CultivationStep[];
    recommendedClimate: string[];
    description: string;
    icon?: string;
    season: string;
    plantingPeriod: string;
    growthTime: string;
    spacing: string;
    exposure: string;
    difficulty: 'Facile' | 'Moyen' | 'Difficile';
    waterNeeds: 'Faible' | 'Moyen' | 'Élevé';
    companions: string[];
    diseases: Disease[];
}

export interface Disease {
    name: string;
    symptoms: string;
    treatment: string;
}

export interface CultivationStep {
    id: string;
    name: string;
    description: string;
    duration: number;
    season: string;
    importance: 'high' | 'medium' | 'low';
}

// Mock data
export const mockGardenerProfile: GardenerProfile = {
    id: '1',
    name: 'Jean Dupont',
    gardenConfigurations: [
        {
            id: 'config-1',
            name: 'Mon Potager Principal',
            climate: {
                type: 'Méditerranéen',
                icon: Sun,
                characteristics: ['Été chaud et sec', 'Hiver doux et humide']
            },
            gardeningDays: ['monday', 'wednesday', 'saturday'],
            soilType: 'Argilo-calcaire',
            gardenSize: '50m²',
            sunExposure: 'Plein sud'
        },
        {
            id: 'config-2',
            name: 'Jardinière de Balcon',
            climate: {
                type: 'Urbain abrité',
                icon: Cloud,
                characteristics: ['Mi-ombre', 'Protection du vent']
            },
            gardeningDays: ['sunday'],
            soilType: 'Terreau universel',
            gardenSize: '2m²',
            sunExposure: 'Est'
        }
    ]
};

export const mockPlants: Plant[] = [
    {
        id: 'tomato',
        name: 'Tomate',
        category: 'Légumes',
        description: 'La tomate est un fruit-légume polyvalent, idéal pour les potagers débutants comme expérimentés. Elle offre une récolte abondante et peut être cultivée en pleine terre ou en pot.',
        icon: 'tomato.svg',
        season: 'Printemps-Été',
        plantingPeriod: 'Mars à Mai',
        growthTime: '60-80 jours',
        spacing: '50-70 cm',
        exposure: 'Plein soleil',
        difficulty: 'Moyen',
        waterNeeds: 'Moyen',
        companions: ['Basilic', 'Œillets d\'Inde', 'Persil'],
        diseases: [
            {
                name: 'Mildiou',
                symptoms: 'Taches brunes sur les feuilles et les fruits',
                treatment: 'Traitement au cuivre, éviter l\'humidité excessive'
            }
        ],
        recommendedClimate: ['Méditerranéen', 'Tempéré'],
        cultivationSteps: [
            {
                id: 'sowing',
                name: 'Semis',
                description: 'Semer les graines en godets à 1-2 cm de profondeur',
                duration: 14,
                season: 'Début printemps',
                importance: 'high'
            },
            {
                id: 'transplant',
                name: 'Repiquage',
                description: 'Transplanter en pleine terre quand les plants font 15-20 cm',
                duration: 1,
                season: 'Mi-printemps',
                importance: 'high'
            },
            {
                id: 'care',
                name: 'Entretien',
                description: 'Tuteurer les plants et retirer les gourmands régulièrement',
                duration: 90,
                season: 'Printemps-Été',
                importance: 'medium'
            },
            {
                id: 'harvest',
                name: 'Récolte',
                description: 'Récolter les fruits bien mûrs, de préférence le matin',
                duration: 60,
                season: 'Été',
                importance: 'medium'
            }
        ]
    },
    {
        id: 'carrot',
        name: 'Carotte',
        category: 'Légumes',
        description: 'La carotte est un légume-racine facile à cultiver, parfait pour les débutants. Elle s\'adapte bien à différents types de sol et peut être cultivée presque toute l\'année.',
        icon: 'carrot.svg',
        season: 'Printemps-Automne',
        plantingPeriod: 'Mars à Juillet',
        growthTime: '70-80 jours',
        spacing: '5-10 cm',
        exposure: 'Soleil à mi-ombre',
        difficulty: 'Facile',
        waterNeeds: 'Moyen',
        companions: ['Poireau', 'Oignon', 'Romarin'],
        diseases: [
            {
                name: 'Mouche de la carotte',
                symptoms: 'Galeries dans les racines, feuillage jaunissant',
                treatment: 'Voile anti-insectes, rotation des cultures'
            }
        ],
        recommendedClimate: ['Tempéré', 'Océanique'],
        cultivationSteps: [
            {
                id: 'soil-prep',
                name: 'Préparation du sol',
                description: 'Bêcher profondément et affiner la terre',
                duration: 1,
                season: 'Printemps',
                importance: 'high'
            },
            {
                id: 'sowing',
                name: 'Semis',
                description: 'Semer en ligne à 1 cm de profondeur',
                duration: 21,
                season: 'Printemps',
                importance: 'high'
            },
            {
                id: 'thinning',
                name: 'Éclaircissage',
                description: 'Éclaircir à 5-10 cm entre les plants',
                duration: 1,
                season: 'Printemps',
                importance: 'medium'
            },
            {
                id: 'harvest',
                name: 'Récolte',
                description: 'Récolter quand les carottes ont atteint leur taille désirée',
                duration: 30,
                season: 'Été-Automne',
                importance: 'medium'
            }
        ]
    }
];
