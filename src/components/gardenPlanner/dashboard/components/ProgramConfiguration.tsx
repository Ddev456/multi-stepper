import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { containerVariants, listItemVariants } from '../animations';

interface ProgramConfigurationProps {
  onSave: (config: ProgramConfig) => void;
  onCancel: () => void;
  initialConfig?: ProgramConfig;
}

export interface ProgramConfig {
  name: string;
  reminderFrequency: number;
  autoAdjustDates: boolean;
  weatherAlerts: boolean;
  customSteps: string[];
}

export function ProgramConfiguration({ onSave, onCancel, initialConfig }: ProgramConfigurationProps) {
  const [config, setConfig] = useState<ProgramConfig>(initialConfig ?? {
    name: '',
    reminderFrequency: 3,
    autoAdjustDates: true,
    weatherAlerts: true,
    customSteps: [],
  });

  const handleSave = () => {
    onSave(config);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Card className="p-8 border-violet-200 bg-violet-50/30">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-violet-900">
              Nom de la configuration
            </Label>
            <Input
              id="name"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="Ex: Configuration standard"
              className="w-full border-violet-200 focus:border-violet-500 focus:ring-violet-500 bg-white"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-violet-900">
              Fréquence des rappels (jours)
            </Label>
            <Slider
              value={[config.reminderFrequency]}
              onValueChange={(values) => setConfig({ ...config, reminderFrequency: values[0] })}
              min={1}
              max={7}
              step={1}
              className="my-6"
            />
            <span className="text-sm text-violet-600">
              {config.reminderFrequency} jour{config.reminderFrequency > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-6 pt-4 border-t border-violet-200">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoAdjust" className="space-y-1">
                <span className="text-violet-900">Ajustement automatique des dates</span>
                <p className="text-sm font-normal text-violet-600">
                  Ajuste les dates en fonction de la météo
                </p>
              </Label>
              <Switch
                id="autoAdjust"
                checked={config.autoAdjustDates}
                onCheckedChange={(checked) => setConfig({ ...config, autoAdjustDates: checked })}
                className="data-[state=checked]:bg-violet-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="weatherAlerts" className="space-y-1">
                <span className="text-violet-900">Alertes météo</span>
                <p className="text-sm font-normal text-violet-600">
                  Notifications en cas de conditions défavorables
                </p>
              </Label>
              <Switch
                id="weatherAlerts"
                checked={config.weatherAlerts}
                onCheckedChange={(checked) => setConfig({ ...config, weatherAlerts: checked })}
                className="data-[state=checked]:bg-violet-600"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-violet-200 hover:bg-violet-50 hover:text-violet-900 text-violet-700"
        >
          Annuler
        </Button>
        <Button
          onClick={handleSave}
          disabled={!config.name}
          className="bg-violet-600 hover:bg-violet-700 text-white disabled:bg-violet-300"
        >
          Enregistrer
        </Button>
      </div>
    </motion.div>
  );
}
