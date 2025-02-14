import { JSX } from "react";
import { useFormContext, useFieldArray, ControllerRenderProps } from "react-hook-form";
import { PlusCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import type { Plant, Variety } from "@/types/api";
import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlantCard } from "./PlantCard";
import { PlantForm } from "./PlantForm";
import { useState } from "react";
import { cn } from "@/lib/utils";

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const PlantSelectionStep = (): JSX.Element => {
  const plantsData = useMockQuery<Plant[]>(api.plants.list);
  const varietiesData = useMockQuery<Variety[]>(api.varieties.list);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <AnimatePresence>
        <div className="grid gap-6 md:grid-cols-2">
          {fields.map((field, index) => {
            const selectedPlant = plantsData?.find(
              (p) => p._id === watch(`plants.${index}.plantId`)
            );
            const selectedVariety = varietiesData?.find(
              (v) => v._id === watch(`plants.${index}.varietyId`)
            );
            const hasFieldError = errors.plants?.[index];

            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  "space-y-4",
                  hasFieldError && "ring-2 ring-destructive ring-offset-2 rounded-lg p-4"
                )}
              >
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
                
                <AnimatePresence>
                  {expandedItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <PlantForm
                        control={control}
                        index={index}
                        plants={plantsData ?? []}
                        varieties={varietiesData ?? []}
                        onPlantChange={onPlantChange}
                        watchPlantId={watch(`plants.${index}.plantId`)}
                        isSubmitting={isSubmitting}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddPlant}
        disabled={isSubmitting}
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Ajouter une plante
      </Button>
    </div>
  );
};
