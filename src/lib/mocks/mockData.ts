import type { Configuration, Garden, GardenZone, Plant, Variety, 
  CultivationStageType, CultivationStage, DynamicEvent, DynamicEventsParams } from '@/types/api';

export const mockConfigurations: Configuration[] = [
  {
    _id: "1",
    userId: "user1",
    configName: "Configuration par défaut",
    parameters: {
      preferredDays: ["MONDAY", "WEDNESDAY", "SATURDAY"],
      climate: "usda-zone-8",
      cultureOffset: 0
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: "2",
    userId: "user1",
    configName: "Configuration été",
    parameters: {
      preferredDays: ["SATURDAY", "SUNDAY"],
      climate: "usda-zone-8",
      cultureOffset: -7
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const mockGardens: Garden[] = [
  {
    _id: "1",
    name: "Mon Potager Principal",
    description: "Potager en pleine terre",
    climateZone: "usda-zone-8",
    soilType: ["loam"],
    area: 100,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: "2",
    name: "Jardin de Terrasse",
    description: "Culture en pots sur la terrasse",
    climateZone: "usda-zone-8",
    soilType: ["clay"],
    area: 50,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const mockGardenZones: GardenZone[] = [
  {
    _id: "1",
    gardenId: "1",
    name: "Zone Ensoleillée",
    description: "Zone bien exposée au soleil"
  },
  {
    _id: "2",
    gardenId: "1",
    name: "Zone Mi-Ombre",
    description: "Zone partiellement ombragée"
  }
];

export const mockPlants: Plant[] = [
  {
    _id: "tomato",
    name: "Tomate",
    cultivationStages: ["seed", "seedling", "transplant"],
    description: "Plante potagère très populaire, idéale pour les débutants",
    imageUrl: "/plants/tomato.svg"
  },
  {
    _id: "potato",
    name: "Pomme de terre",
    cultivationStages: ["seed", "seedling", "transplant"],
    description: "Légume commun utilisé pour la cuisine",
    imageUrl: "/plants/potato.svg"
  },
  {
    _id: "spinach",
    name: "Épinard",
    cultivationStages: ["seed", "transplant"],
    description: "Légume feuille riche en fer et en vitamines",
    imageUrl: "/plants/spinach.svg"
  },
  {
    _id: "basil",
    name: "Basilic",
    cultivationStages: ["seed", "seedling"],
    description: "Herbe aromatique méditerranéenne parfaite pour la cuisine",
    imageUrl: "/plants/basil.svg"
  },
  {
    _id: "zucchini",
    name: "Courgette",
    cultivationStages: ["seed", "transplant"],
    description: "Plante productive de la famille des courges",
    imageUrl: "/plants/zucchini.svg"
  },
  {
    _id: "peas",
    name: "Petits Pois",
    cultivationStages: ["seed"],
    description: "Légumineuse grimpante facile à cultiver",
    imageUrl: "/plants/peas.svg"
  }
];

export const mockVarieties: Variety[] = [
  // Tomates
  {
    _id: "1",
    plantId: "tomato",
    name: "Coeur de Boeuf",
  },
  {
    _id: "2",
    plantId: "tomato",
    name: "Roma",
  },
  {
    _id: "3",
    plantId: "tomato",
    name: "Cerise",
  },
  // Carottes
  {
    _id: "4",
    plantId: "carrot",
    name: "Nantaise",
  },
  // Épinards
  {
    _id: "5",
    plantId: "spinach",
    name: "Géant d'Hiver",
  },
  {
    _id: "6",
    plantId: "spinach",
    name: "Matador",
  },
  // Basilic
  {
    _id: "7",
    plantId: "basil",
    name: "Grand Vert",
  },
  {
    _id: "8",
    plantId: "basil",
    name: "Pourpre",
  },
  // Courgettes
  {
    _id: "9",
    plantId: "zucchini",
    name: "Black Beauty",
  },
  {
    _id: "10",
    plantId: "zucchini",
    name: "Cocozelle",
  },
  // Petits Pois
  {
    _id: "11",
    plantId: "peas",
    name: "Merveille de Kelvedon",
  },
  {
    _id: "12",
    plantId: "peas",
    name: "Petit Provençal",
  }
];

export const mockCultivationStagesTypes: CultivationStageType[] = [
  {
    _id: "1",
    name: "Semis",
    code: "SOWING",
    description: "Semer les graines"
  },
  {
    _id: "2",
    name: "Repiquage",
    code: "TRANSPLANTING",
    description: "Repiquer les plants"
  },
  {
    _id: "3",
    name: "Récolte",
    code: "HARVESTING",
    description: "Récolter les fruits/légumes"
  },
  {
    _id: "4",
    name: "Taille",
    code: "PRUNING",
    description: "Tailler les plants"
  }
] as const;

export const mockCultivationStages: CultivationStage[] = [
  {
    _id: "1",
    plantId: "tomato", // Tomate
    name: "Semis",
    stepTypeId: "1", // Semis
    isRequired: true,
    defaultDuration: 14, // jours
    duration: 14,
  },
  {
    _id: "2",
    plantId: "tomato", // Tomate
    stepTypeId: "2", // Repiquage
    name: "Repiquage",
    duration: 7,
    isRequired: true,
    defaultDuration: 7,
  },
  {
    _id: "3",
    plantId: "tomato", // Tomate
    stepTypeId: "3", // Récolte
    name: "Récolte",
    duration: 90,
    isRequired: true,
    defaultDuration: 90,
  },
  {
    _id: "4",
    plantId: "tomato", // Tomate
    stepTypeId: "4", // Taille
    name: "Taille",
    duration: 30,
    isRequired: false,
    defaultDuration: 30,
  },
  {
    _id: "5",
    plantId: "carrot", // Carotte
    stepTypeId: "1", // Semis
    name: "Semis",
    duration: 10,
    isRequired: true,
    defaultDuration: 10,
  },
  {
    _id: "6",
    plantId: "carrot", // Carotte
    stepTypeId: "3", // Récolte
    name: "Récolte",
    duration: 90,
    isRequired: true,
    defaultDuration: 70,
  }
];

// Fonction utilitaire pour ajouter des jours à une date
const addDays = (date: string, days: number): string => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
};

// Fonction pour générer les événements en fonction des étapes de culture
export const generateDynamicEvents = (params: DynamicEventsParams): DynamicEvent[] => {
  const events: DynamicEvent[] = [];
  const config = mockConfigurations.find(c => c._id === params.configurationId);
  const garden = mockGardens.find(g => g._id === params.gardenId);

  if (!config || !garden) return events;

  // Ajustement climatique basé sur la zone USDA
  const climateAdjustments: Record<string, number> = {
    'usda-zone-3': -7,
    'usda-zone-4': -5,
    'usda-zone-5': -3,
    'usda-zone-6': 0,
    'usda-zone-7': 2,
    'usda-zone-8': 4,
    'usda-zone-9': 6,
  };

  const climateOffset = climateAdjustments[config.parameters.climate] || 0;

  params.plants.forEach((plant, plantIndex) => {
    const plantData = mockPlants.find(p => p._id === plant.plantId);
    if (!plantData) return;

    const variety = plant.varietyId 
      ? mockVarieties.find(v => v._id === plant.varietyId)
      : null;

    const plantName = variety 
      ? `${plantData.name} (${variety.name})`
      : plantData.name;

    let currentDate = new Date(plant.startDate);

    // Récupérer les étapes de culture pour cette plante
    const plantStages = mockCultivationStages.filter(
      stage => stage.plantId === plant.plantId
    );

    plantStages.forEach((stage, stageIndex) => {
      const stepIndex = plantIndex * plantStages.length + stageIndex;
      const stepConfig = params.cultivationSteps[stepIndex];

      if (!stepConfig?.enabled && !stage.isRequired) return;

      const stageType = mockCultivationStagesTypes.find(
        type => type._id === stage.stepTypeId
      );
      if (!stageType) return;

      // Calculer la durée ajustée
      const adjustedDuration = stepConfig.duration + climateOffset + config.parameters.cultureOffset;
      const addDays = (dateStr: string, days: number): string => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            throw new Error(`Date invalide: ${dateStr}`);
        }
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };
      const event: DynamicEvent = {
        title: `${stageType.name} - ${plantName}`,
        description: `${stageType.description} pour ${plant.quantity} plant(s)`,
        date: addDays(currentDate.toISOString(), adjustedDuration),
        plantName,
        type: stageType.code,
        status: 'pending'
      };

      events.push(event);
      currentDate = new Date(event.date);
    });
  });

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};