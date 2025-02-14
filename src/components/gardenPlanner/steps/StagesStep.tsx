import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";
import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

interface CultivationStageType {
  _id: string;
  name: string;
  code: string;
  description: string;
}

interface CultivationStage {
  _id: string;
  plantId: string;
  stepTypeId: string;
  isRequired: boolean;
  defaultDuration: number;
}

export const StagesStep = (): JSX.Element => {
  const { control, watch } = useFormContext<GardenPlannerFormData>();
  const selectedPlants = watch('plants') || [];
  
  const stageTypes = useMockQuery<CultivationStageType[]>(api.cultivationStagesTypes.list);
  const stages = useMockQuery<CultivationStage[]>(api.cultivationStages.list);

  if (!stageTypes || !stages) {
    return <Skeleton className="w-full h-48" />;
  }

  return (
    <div className="space-y-6">
      {selectedPlants.map((plant, plantIndex) => {
        const plantStages = stages.filter(
          stage => stage.plantId === plant.plantId
        );

        if (!plantStages.length) {
          return (
            <Card key={plantIndex} className="p-4">
              <CardContent>
                <p className="text-muted-foreground">
                  Aucune étape de culture disponible pour cette plante
                </p>
              </CardContent>
            </Card>
          );
        }

        return (
          <Card key={plantIndex} className="p-4">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">
                Étapes de culture pour {plant.plantId}
              </h3>
              
              {plantStages.map((stage, stageIndex) => {
                const stageType = stageTypes.find(type => type._id === stage.stepTypeId);
                if (!stageType) return null;

                const stepIndex = plantIndex * plantStages.length + stageIndex;

                return (
                  <div key={stage._id} className="space-y-2 border-b pb-4 last:border-0">
                    <FormField
                      control={control}
                      name={`cultivationSteps.${stepIndex}.enabled`}
                      defaultValue={stage.isRequired}
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={stage.isRequired}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal">
                              {stageType.name}
                              {stage.isRequired && " (Requis)"}
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              {stageType.description}
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={control}
                      name={`cultivationSteps.${stepIndex}.duration`}
                      defaultValue={stage.defaultDuration}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durée (en jours)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {selectedPlants.length === 0 && (
        <p className="text-center text-muted-foreground">
          Veuillez d'abord sélectionner des plantes dans l'étape précédente
        </p>
      )}
    </div>
  );
};