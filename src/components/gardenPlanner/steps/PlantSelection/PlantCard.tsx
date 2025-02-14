import { JSX } from "react";
import Image from "next/image";
import { Trash2, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Plant, Variety } from "@/types/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlantCardProps {
  plant?: Plant;
  variety?: Variety;
  startPoint: string;
  quantity: number;
  startDate: string;
  onDelete: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export const START_POINTS = {
  "direct-sowing": "Semis direct",
  "indoor-sowing": "Semis en intérieur",
  "transplant": "Plant/Transplant",
} as const;

export const PlantCard = ({ 
  plant, 
  variety, 
  startPoint, 
  quantity, 
  startDate,
  onDelete,
  isExpanded,
  onToggle
}: PlantCardProps): JSX.Element => {
  const imagePath = plant ? `/plants/${plant._id}.svg` : "";
  
  return (
    <Card className="relative">
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {plant && (
              <Image
                src={imagePath}
                alt={plant.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <CardTitle className="text-lg">
                {plant?.name || "Sélectionnez une plante"}
              </CardTitle>
              {variety && (
                <CardDescription>
                  Variété: {variety.name}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", {
                "transform rotate-180": isExpanded
              })}
            />
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="flex items-start space-x-4">
            {plant && (
              <div className="relative h-24 w-24 rounded-lg border bg-muted">
                <Image
                  src={imagePath}
                  alt={plant.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold">
                {plant ? plant.name : "Sélectionnez une plante"}
                {variety && ` (${variety.name})`}
              </h4>
              {plant && (
                <div className="mt-1 text-sm text-muted-foreground space-y-1">
                  <p>Type: {START_POINTS[startPoint as keyof typeof START_POINTS]}</p>
                  <p>Quantité: {quantity} plant(s)</p>
                  <p>Date de début: {format(new Date(startDate), "PPP", { locale: fr })}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
