import { z } from "zod";
import { validateGardenZone, validateConfigurationWithPlants } from "@/lib/validations/gardenPlanner";

const optimizationGoalSchema = z.object({
  type: z.enum(['spacing', 'succession', 'companion', 'workload'], {
    required_error: "Veuillez sélectionner un type d'optimisation",
  }),
  weight: z.number().min(0).max(1),
});

export const gardenPlannerSchema = z.object({
  configurationId: z.string({
    required_error: "Veuillez sélectionner une configuration",
  }),
  gardenId: z.string({
    required_error: "Veuillez sélectionner un jardin",
  }),
  zoneId: z.string({
    required_error: "Veuillez sélectionner une zone",
  }),
  plants: z.array(z.object({
    plantId: z.string({
      required_error: "Veuillez sélectionner une plante",
    }),
    varietyId: z.string().optional(),
    quantity: z.number().min(1, "La quantité doit être supérieure à 0"),
    startPoint: z.enum(['direct-sowing', 'indoor-sowing', 'transplant', 'cutting'], {
      required_error: "Veuillez sélectionner un point de départ",
    }),
    startDate: z.string({
      required_error: "Veuillez sélectionner une date de début",
    }),
  })).min(1, "Veuillez ajouter au moins une plante"),
  // Nouveaux champs pour le programme de culture
  programName: z.string({
    required_error: "Veuillez donner un nom à votre programme",
  }).min(3, "Le nom doit contenir au moins 3 caractères"),
  year: z.number({
    required_error: "Veuillez sélectionner une année",
  }).min(new Date().getFullYear(), "L'année doit être égale ou supérieure à l'année en cours"),
  optimizationGoals: z.array(optimizationGoalSchema)
    .min(1, "Veuillez sélectionner au moins un objectif d'optimisation")
    .default([
      { type: 'spacing', weight: 1 },
      { type: 'succession', weight: 1 },
      { type: 'companion', weight: 1 }
    ]),
  // Champs optionnels pour stocker les résultats d'optimisation
  optimizationScore: z.number().optional(),
  warnings: z.array(z.object({
    type: z.string(),
    message: z.string(),
    severity: z.enum(['high', 'medium', 'low'])
  })).optional(),
  // Étapes de culture
  cultivationSteps: z.array(z.object({
    enabled: z.boolean(),
    duration: z.number().min(1, "La durée doit être supérieure à 0"),
  }))
}).superRefine(async (data, ctx) => {
  // Validation de la relation jardin-zone
  const isValidZone = await validateGardenZone(data.gardenId, data.zoneId);
  if (!isValidZone) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La zone sélectionnée n'appartient pas au jardin choisi",
      path: ["zoneId"],
    });
  }
});

export type GardenPlannerFormData = z.infer<typeof gardenPlannerSchema>;