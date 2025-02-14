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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface CreateGardenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    climateZone: string;
    soilType: string;
    area: number;
  }) => void;
}

export const CreateGardenDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateGardenDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    climateZone: "",
    soilType: "",
    area: 0,
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
          <DialogTitle>Créer un nouveau jardin</DialogTitle>
          <DialogDescription>
            Renseignez les informations de votre jardin. Vous pourrez ajouter des zones de culture par la suite.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom du jardin</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Mon jardin"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description de votre jardin..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="climateZone">Zone climatique</Label>
              <Select
                value={formData.climateZone}
                onValueChange={(value) => setFormData({ ...formData, climateZone: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une zone" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => i + 1).map((zone) => (
                    <SelectItem key={zone} value={zone.toString()}>
                      Zone {zone}
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
          </div>
          <DialogFooter>
            <Button type="submit">Créer le jardin</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
