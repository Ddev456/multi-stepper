import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface CreateZoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    area: number;
    sunExposure: 'full' | 'partial' | 'shade';
    soilType: string;
    irrigation: boolean;
    microclimate: {
      temperature: 'warmer' | 'normal' | 'cooler';
      wind: 'protected' | 'normal' | 'exposed';
      moisture: 'dry' | 'normal' | 'wet';
    };
  }) => void;
}

const EXPOSURE_OPTIONS = {
  full: { label: 'Plein soleil', description: 'Plus de 6h de soleil direct par jour' },
  partial: { label: 'Mi-ombre', description: '4-6h de soleil direct par jour' },
  shade: { label: 'Ombre', description: 'Moins de 4h de soleil direct par jour' }
} as const;

export const CreateZoneDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateZoneDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    area: 0,
    sunExposure: 'full' as const,
    soilType: "",
    irrigation: false,
    microclimate: {
      temperature: 'normal' as const,
      wind: 'normal' as const,
      moisture: 'normal' as const,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle zone</DialogTitle>
          <DialogDescription>
            Définissez les caractéristiques de votre zone de culture.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de la zone</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Potager principal"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">Surface (m²)</Label>
              <Input
                id="area"
                type="number"
                min="0"
                step="0.1"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sunExposure">Exposition</Label>
              <Select
                value={formData.sunExposure}
                onValueChange={(value: 'full' | 'partial' | 'shade') => 
                  setFormData({ ...formData, sunExposure: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'exposition" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(EXPOSURE_OPTIONS).map(([key, { label, description }]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex flex-col">
                        <span>{label}</span>
                        <span className="text-sm text-muted-foreground">{description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="soilType">Type de sol</Label>
              <Select
                value={formData.soilType}
                onValueChange={(value) => setFormData({ ...formData, soilType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type de sol" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Argileux",
                    "Limoneux",
                    "Sableux",
                    "Calcaire",
                    "Humifère",
                  ].map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="irrigation">Irrigation automatique</Label>
              <Switch
                id="irrigation"
                checked={formData.irrigation}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, irrigation: checked })}
              />
            </div>
            <div className="space-y-4">
              <Label>Microclimate</Label>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="temperature">Température</Label>
                  <Select
                    value={formData.microclimate.temperature}
                    onValueChange={(value: 'warmer' | 'normal' | 'cooler') =>
                      setFormData({
                        ...formData,
                        microclimate: { ...formData.microclimate, temperature: value },
                      })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warmer">Plus chaud que la moyenne</SelectItem>
                      <SelectItem value="normal">Température normale</SelectItem>
                      <SelectItem value="cooler">Plus frais que la moyenne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wind">Exposition au vent</Label>
                  <Select
                    value={formData.microclimate.wind}
                    onValueChange={(value: 'protected' | 'normal' | 'exposed') =>
                      setFormData({
                        ...formData,
                        microclimate: { ...formData.microclimate, wind: value },
                      })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="protected">Protégé du vent</SelectItem>
                      <SelectItem value="normal">Exposition normale</SelectItem>
                      <SelectItem value="exposed">Très exposé au vent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="moisture">Humidité du sol</Label>
                  <Select
                    value={formData.microclimate.moisture}
                    onValueChange={(value: 'dry' | 'normal' | 'wet') =>
                      setFormData({
                        ...formData,
                        microclimate: { ...formData.microclimate, moisture: value },
                      })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry">Sol sec</SelectItem>
                      <SelectItem value="normal">Humidité normale</SelectItem>
                      <SelectItem value="wet">Sol humide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Créer la zone</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
