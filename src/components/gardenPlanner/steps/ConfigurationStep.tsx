import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GardenPlannerFormData } from "@/schema/gardenplanner.schema";
import { useMockQuery } from "@/lib/hooks/useMockQuery";
import { api } from "@/lib/mocks/mockConvex";
import { Skeleton } from "@/components/ui/skeleton";

interface Configuration {
  _id: string;
  userId: string;
  configName: string;
  parameters: {
    preferredDays?: string[];
    climate?: string;
    cultureOffset?: number;
  };
}

export const ConfigurationStep = () => {
  const { control } = useFormContext<GardenPlannerFormData>();
  const configurations = useMockQuery<Configuration[]>(api.configurations.list);

  if (!configurations) {
    return <Skeleton className="w-full h-48" />;
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="configurationId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Configuration de génération</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une configuration" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {configurations.map((config) => (
                  <SelectItem key={config._id} value={config._id}>
                    {config.configName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Cette configuration détermine vos préférences de jardinage (jours disponibles, climat, etc.)
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};