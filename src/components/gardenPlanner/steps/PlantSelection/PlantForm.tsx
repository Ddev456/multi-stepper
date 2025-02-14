import { JSX } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Plant, Variety } from "@/types/api";
import type { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { Control, ControllerRenderProps } from "react-hook-form";
import { START_POINTS } from "./PlantCard";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface PlantFormProps {
  control: Control<GardenPlannerFormData>;
  index: number;
  plants: Plant[];
  varieties: Variety[];
  onPlantChange: (value: string, index: number, field: ControllerRenderProps<GardenPlannerFormData, `plants.${number}.plantId`>) => void;
  watchPlantId: string;
}

export const PlantForm = ({
  control,
  index,
  plants,
  varieties,
  onPlantChange,
  watchPlantId
}: PlantFormProps): JSX.Element => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={`plants.${index}.plantId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plante</FormLabel>
            <Select
              onValueChange={(value) => onPlantChange(value, index, field)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une plante" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {plants.map((plant) => (
                  <SelectItem 
                    key={plant._id} 
                    value={plant._id}
                    className="flex items-center space-x-2"
                  >
                    <div className="relative h-6 w-6">
                      <Image
                        src={`/plants/${plant._id}.svg`}
                        alt={plant.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{plant.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`plants.${index}.varietyId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variété (optionnel)</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={!watchPlantId}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une variété" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {varieties
                  .filter((variety) => variety.plantId === watchPlantId)
                  .map((variety) => (
                    <SelectItem key={variety._id} value={variety._id}>
                      {variety.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`plants.${index}.startPoint`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de démarrage</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(START_POINTS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`plants.${index}.quantity`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantité</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                {...field}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value > 0) {
                    field.onChange(value);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`plants.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date de début</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(date.toISOString().split('T')[0]);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
