import { useFormContext } from "react-hook-form";
import { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { Configuration, Garden, GardenZone, Plant, Variety, CultivationStageType, CultivationStage } from '@/types/api';
import type { SummarySection } from '@/types/ui';

export const SummaryStep = () => {
  const { watch } = useFormContext<GardenPlannerFormData>();
  const formData = watch();

  const { toast } = useToast();

  const config = useMockQuery<Configuration[]>(api.configurations.list)?.find(
    c => c._id === formData.configurationId
  );
  const garden = useMockQuery<Garden[]>(api.gardens.list)?.find(
    g => g._id === formData.gardenId
  );
  const zone = useMockQuery<GardenZone[]>(api.gardenZones.listByGarden, { 
    gardenId: formData.gardenId 
  })?.find(z => z._id === formData.zoneId);
  const plants = useMockQuery<Plant[]>(api.plants.list);
  const varieties = useMockQuery<Variety[]>(api.varieties.list);
  const stageTypes = useMockQuery<CultivationStageType[]>(api.cultivationStagesTypes.list);
  const stages = useMockQuery<CultivationStage[]>(api.cultivationStages.list);

  if (!config || !garden || !zone || !plants || !varieties || !stageTypes || !stages) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  const sections: SummarySection[] = [
    {
      title: "Configuration",
      items: [
        {
          label: "Configuration",
          value: config.configName,
          description: `Zone climatique: ${config.parameters.climate}, Jours préférés: ${config.parameters.preferredDays.join(", ")}`
        },
        {
          label: "Jardin",
          value: garden.name,
        },
        {
          label: "Zone",
          value: zone.name,
        }
      ]
    },
    {
      title: "Plantes sélectionnées",
      items: formData.plants.map(plant => {
        const plantData = plants.find(p => p._id === plant.plantId);
        const variety = plant.varietyId 
          ? varieties.find(v => v._id === plant.varietyId)
          : null;

        return {
          label: variety ? `${plantData?.name} (${variety.name})` : plantData?.name || "",
          value: `${plant.quantity} plant(s)`,
          description: `Début: ${format(new Date(plant.startDate), "PPP", { locale: fr })}`
        };
      })
    }
  ];

  // Ajouter une section pour les étapes de culture
  if (formData.cultivationSteps?.length) {
    const cultivationSection: SummarySection = {
      title: "Étapes de culture",
      items: []
    };

    formData.plants.forEach((plant, plantIndex) => {
      const plantData = plants.find(p => p._id === plant.plantId);
      if (!plantData) return;

      const plantStages = stages.filter(stage => stage.plantId === plant.plantId);
      
      plantStages.forEach((stage, stageIndex) => {
        const stepIndex = plantIndex * plantStages.length + stageIndex;
        const stepConfig = formData.cultivationSteps[stepIndex];
        const stageType = stageTypes.find(type => type._id === stage.stepTypeId);
        
        if (!stageType || (!stepConfig?.enabled && !stage.isRequired)) return;

        cultivationSection.items.push({
          label: `${plantData.name} - ${stageType.name}`,
          value: `${stepConfig.duration} jours`,
          status: stage.isRequired ? "warning" : "success",
          description: stageType.description
        });
      });
    });

    if (cultivationSection.items.length) {
      sections.push(cultivationSection);
    }
  }

  const totalEvents = formData.plants.reduce((acc, plant) => {
    const plantStages = stages.filter(stage => stage.plantId === plant.plantId);
    const enabledStages = plantStages.filter((stage, index) => {
      const stepIndex = plantStages.length * formData.plants.indexOf(plant) + index;
      return formData.cultivationSteps[stepIndex]?.enabled || stage.isRequired;
    });
    return acc + enabledStages.length;
  }, 0);

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Résumé de votre planification</AlertTitle>
        <AlertDescription>
          {totalEvents} événements seront générés pour {formData.plants.length} plante(s)
        </AlertDescription>
      </Alert>

      <ScrollArea className="h-[400px]">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {itemIndex > 0 && <Separator className="my-4" />}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{item.label}</p>
                          {item.status && (
                            <Badge variant={item.status === "warning" ? "destructive" : "default"}>
                              {item.status === "warning" ? "Requis" : "Optionnel"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                      {item.status && (
                        <Check className={
                          item.status === "warning" 
                            ? "text-destructive" 
                            : "text-green-500"
                        } />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};