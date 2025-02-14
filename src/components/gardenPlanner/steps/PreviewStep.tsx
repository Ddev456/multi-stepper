import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";
import { useFormContext } from "react-hook-form";
import { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { DynamicEvent } from "@/types/api";

const EVENT_TYPE_COLORS = {
  SOWING: "bg-green-500",
  TRANSPLANTING: "bg-blue-500",
  HARVESTING: "bg-yellow-500",
  PRUNING: "bg-purple-500",
} as const;

export const PreviewStep = () => {
  const { watch } = useFormContext<GardenPlannerFormData>();
  const formData = watch();
  
  // Utilisation de la query Convex pour prévisualiser les événements
  const previewEvents = useMockQuery<DynamicEvent[]>(api.events.previewDynamicEvents, {
    configurationId: formData.configurationId,
    gardenId: formData.gardenId,
    zoneId: formData.zoneId,
    plants: formData.plants,
    cultivationSteps: formData.cultivationSteps
  });

  if (!previewEvents?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun événement à prévisualiser. Assurez-vous d'avoir sélectionné au moins une plante
        et configuré ses étapes de culture.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Prévisualisation des événements</h3>
        <p className="text-sm text-muted-foreground">
          {previewEvents.length} événements générés
        </p>
      </div>
      
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {previewEvents.map((event, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge 
                        variant="secondary"
                        className={EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS]}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.date), "PPP", { locale: fr })}
                    </p>
                    {event.description && (
                      <p className="mt-2 text-sm">{event.description}</p>
                    )}
                  </div>
                  <div className="text-sm font-medium">
                    {event.plantName}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};