import { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";
import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

interface Garden {
  _id: string;
  name: string;
  description: string;
}

interface GardenZone {
  _id: string;
  gardenId: string;
  name: string;
  description: string;
}

export const GardenZoneStep = (): JSX.Element => {
  const { control, watch, setValue } = useFormContext<GardenPlannerFormData>();
  const selectedGardenId = watch('gardenId');

  // Récupération des jardins
  const gardens = useMockQuery<Garden[]>(api.gardens.list);
  
  // Récupération des zones pour le jardin sélectionné
  const zones = useMockQuery<GardenZone[]>(
    api.gardenZones.listByGarden,
    selectedGardenId ? { gardenId: selectedGardenId } : undefined
  );

  if (!gardens) {
    return <Skeleton className="w-full h-48" />;
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="gardenId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Jardin</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // Réinitialiser la zone quand on change de jardin
                setValue('zoneId', '');
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un jardin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {gardens.map((garden) => (
                  <SelectItem key={garden._id} value={garden._id}>
                    {garden.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choisissez le jardin où vous souhaitez planifier vos cultures
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedGardenId && (
        <FormField
          control={control}
          name="zoneId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone du jardin</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!zones?.length}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {zones?.map((zone) => (
                    <SelectItem key={zone._id} value={zone._id}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Sélectionnez la zone spécifique du jardin pour vos cultures
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};