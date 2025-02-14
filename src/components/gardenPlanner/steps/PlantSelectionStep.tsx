import { JSX } from "react";
import { useFormContext, useFieldArray, useWatch, ControllerRenderProps } from "react-hook-form";
import { PlusCircle, Trash2, Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";

// Composants UI
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import type { Plant, Variety } from "@/types/api";
import { PlantWithOptions } from "@/types/ui";
import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";

// Types
interface PlantCardProps {
  plant?: PlantWithOptions;
  variety?: Variety;
  startPoint: string;
  quantity: number;
  startDate: string;
  onDelete: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

// Constantes
const START_POINTS = {
  "direct-sowing": "Semis direct",
  "indoor-sowing": "Semis en intérieur",
  "transplant": "Plant/Transplant",
} as const;

// Utilitaires
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Composants
const PlantCard = ({ 
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

import { useState } from 'react';

const PlantSelectionStep = (): JSX.Element => {
  const plantsData = useMockQuery<Plant[]>(api.plants.list) ?? [];
  const varietiesData = useMockQuery<Variety[]>(api.varieties.list) ?? [];
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<GardenPlannerFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plants"
  });

  // Gestionnaires d'événements
  const onPlantChange = (
    value: string,
    index: number,
    field: ControllerRenderProps<GardenPlannerFormData, `plants.${number}.plantId`>
  ): void => {
    field.onChange(value);
    setValue(`plants.${index}.varietyId`, "");
  };

  const handleAddPlant = (): void => {
    const newIndex = fields.length;
    append({
      plantId: "",
      varietyId: "",
      startPoint: "direct-sowing",
      quantity: 1,
      startDate: getTodayDate()
    });
    setExpandedItems([...expandedItems, newIndex]);
  };

  const handleRemovePlant = (index: number): void => {
    remove(index);
    setExpandedItems(expandedItems.filter(item => item !== index));
  };

  const togglePlantExpanded = (index: number): void => {
    setExpandedItems(current =>
      current.includes(index)
        ? current.filter(item => item !== index)
        : [...current, index]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((field, index) => {
          const selectedPlant = plantsData.find(
            (p) => p._id === watch(`plants.${index}.plantId`)
          );
          const selectedVariety = varietiesData.find(
            (v) => v._id === watch(`plants.${index}.varietyId`)
          );

          return (
            <div key={field.id} className="space-y-4">
              <PlantCard
                plant={selectedPlant}
                variety={selectedVariety}
                startPoint={field.startPoint}
                quantity={field.quantity}
                startDate={field.startDate}
                onDelete={() => handleRemovePlant(index)}
                isExpanded={expandedItems.includes(index)}
                onToggle={() => togglePlantExpanded(index)}
              />
              
              {expandedItems.includes(index) && (
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
                            {plantsData.map((plant) => (
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
                          disabled={!watch(`plants.${index}.plantId`)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une variété" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {varietiesData
                              .filter((variety) => variety.plantId === watch(`plants.${index}.plantId`))
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
              )}
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddPlant}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Ajouter une culture
      </Button>
    </div>
  );
};

export { PlantSelectionStep } from "./PlantSelection";