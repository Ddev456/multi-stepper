import { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Garden } from "../types/garden.types";
import { JSX } from "react";

interface GardenSelectProps {
  gardens: Garden[];
  onCreateGarden: () => void;
  onSelect: (gardenId: string) => void;
}

export const GardenSelect = ({ gardens, onCreateGarden, onSelect }: GardenSelectProps): JSX.Element => {
  const form = useFormContext<GardenPlannerFormData>();
  const { control } = form;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormField
          control={control}
          name="gardenId"
          render={({ field }) => {
            const selectedGarden = gardens.find(g => g._id === field.value);
            
            return (
              <FormItem className="flex-1 mr-4">
                <FormLabel>Jardin</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    onSelect(value);
                  }}
                  defaultValue={field.value}
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
                        <div className="flex flex-col">
                          <span>{garden.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {garden.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex">
                  {selectedGarden && (
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Zone {selectedGarden.climateZone}</Badge>
                      {selectedGarden.soilType && (
                        <Badge variant="outline">Sol: {selectedGarden.soilType}</Badge>
                      )}
                      {selectedGarden.area && (
                        <Badge variant="outline">{selectedGarden.area}m²</Badge>
                      )}
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onCreateGarden}
          className="mt-8"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau jardin
        </Button>
      </div>
    </div>
  );
};
