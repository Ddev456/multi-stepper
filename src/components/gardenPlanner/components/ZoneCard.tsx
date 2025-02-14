import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Droplets, Wind, Thermometer } from "lucide-react";
import { GardenZone, EXPOSURE_TYPES, MICROCLIMATE_OPTIONS } from "../types/garden.types";
import { cn } from "@/lib/utils";
import { JSX } from "react";

interface ZoneCardProps {
  zone: GardenZone;
  isSelected: boolean;
  onSelect: (zoneId: string) => void;
}

export const ZoneCard = ({ zone, isSelected, onSelect }: ZoneCardProps): JSX.Element => {
  return (
    <Card 
      className={cn(
        "relative cursor-pointer transition-all hover:ring-2 hover:ring-primary/50",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect(zone._id)}
    >
      <CardHeader>
        <div className="text-base flex justify-between items-center">
          <span className="font-medium">{zone.name}</span>
          <Switch checked={isSelected} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="microclimate">Microclimate</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Surface</span>
                <span>{zone.area}m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Exposition</span>
                <span>{EXPOSURE_TYPES[zone.sunExposure]}</span>
              </div>
              {zone.soilType && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type de sol</span>
                  <span>{zone.soilType}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Irrigation</span>
                <Switch checked={zone.irrigation} disabled />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="microclimate" className="space-y-4">
            {zone.microclimate && (
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {MICROCLIMATE_OPTIONS.temperature[zone.microclimate.temperature]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {MICROCLIMATE_OPTIONS.wind[zone.microclimate.wind]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {MICROCLIMATE_OPTIONS.moisture[zone.microclimate.moisture]}
                  </span>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
