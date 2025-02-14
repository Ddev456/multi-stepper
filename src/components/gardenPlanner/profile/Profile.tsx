"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Trophy,
  Sprout,
  Leaf,
  Zap,
  Settings,
  Upload,
  Edit,
  ChevronRight,
  MapPin,
  Calendar,
  Bell,
  Users2,
  Sparkles,
  CheckCheck,
  AlertCircle,
  Download,
  FileJson,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { DeleteAccountDialog } from "./DeleteAccountDialog";

interface AssistantConfig {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  level: string;
}

const assistantConfigs: AssistantConfig[] = [
  {
    id: 1,
    name: "Mode Rapide",
    description: "Configuration simplifiée pour un jardinage efficace",
    icon: <Zap className="size-5 text-amber-500" />,
    isActive: true,
    level: "Débutant"
  },
  {
    id: 2,
    name: "Mode Standard",
    description: "Configuration équilibrée pour un suivi régulier",
    icon: <Leaf className="size-5 text-green-500" />,
    isActive: false,
    level: "Intermédiaire"
  },
  {
    id: 3,
    name: "Mode Expert",
    description: "Configuration détaillée pour un contrôle total",
    icon: <Trophy className="size-5 text-purple-500" />,
    isActive: false,
    level: "Expert"
  }
];

const gardeningStyles = [
  { name: "Éco-responsable", icon: <Leaf />, active: true },
  { name: "Ornemental", icon: <Sprout />, active: false },
  { name: "Intensif", icon: <Zap />, active: false }
];

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [progress] = useState(75);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const level = Math.floor(progress / 20) + 1;

  return (
    <div className="container mx-auto py-8 space-y-8 bg-white">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 items-start"
      >
        <div className="relative group">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            <img
              src="/avatar.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload className="text-white size-6" />
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping" />
              <div className="relative rounded-full bg-green-500 text-white p-2">
                <Trophy className="size-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dylan Delhalle</h1>
              <p className="text-gray-600">Jardinier Niveau {level}</p>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="size-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
              <Sprout className="size-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">12 Plantes</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
              <MapPin className="size-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">Zone USDA 8b</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2">
              <Trophy className="size-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">15 Objectifs</span>
            </div>
          </div>

          <Progress value={progress} className="h-2 w-full" />
        </div>
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[500px]">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="assistant">Assistant</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Compte</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Style de Jardinage</CardTitle>
              <CardDescription>
                Choisissez votre approche préférée du jardinage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {gardeningStyles.map((style) => (
                  <Button
                    key={style.name}
                    variant={style.active ? "default" : "outline"}
                    className="gap-2"
                  >
                    {style.icon}
                    <span>{style.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>
                  Vos accomplissements de jardinage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Plantes cultivées</span>
                  <span className="font-medium">12/20</span>
                </div>
                <Progress value={60} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Objectifs atteints</span>
                  <span className="font-medium">15/25</span>
                </div>
                <Progress value={60} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Niveau global</span>
                  <span className="font-medium">Niveau {level}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>
                  Vos récompenses et accomplissements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "aspect-square rounded-xl flex items-center justify-center",
                        i < 4 ? "bg-green-50" : "bg-gray-50"
                      )}
                    >
                      {i < 4 ? (
                        <Trophy className={cn(
                          "size-6",
                          i === 0 ? "text-amber-500" :
                          i === 1 ? "text-purple-500" :
                          "text-green-500"
                        )} />
                      ) : (
                        <div className="size-6 rounded-full bg-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurations de l'Assistant</CardTitle>
              <CardDescription>
                Personnalisez votre expérience de jardinage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {assistantConfigs.map((config) => (
                <div
                  key={config.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-colors",
                    config.isActive && "border-green-500 bg-green-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{config.name}</h3>
                      <p className="text-sm text-gray-600">{config.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{config.level}</Badge>
                    <Button variant="ghost" size="icon">
                      <Edit className="size-4" />
                    </Button>
                    <Switch checked={config.isActive} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de Culture</CardTitle>
              <CardDescription>
                Définissez vos préférences pour une meilleure expérience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Types de Plantes Préférées</label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">Légumes</Badge>
                  <Badge variant="secondary" className="cursor-pointer">Fruits</Badge>
                  <Badge variant="outline" className="cursor-pointer">Aromatiques</Badge>
                  <Badge variant="outline" className="cursor-pointer">Fleurs</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Jours de Jardinage Préférés</label>
                <div className="grid grid-cols-7 gap-2">
                  {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
                    <Button
                      key={i}
                      variant={i === 1 || i === 4 ? "default" : "outline"}
                      className="h-10 w-10 p-0"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Notifications</CardTitle>
              <CardDescription>
                Gérez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="size-4 text-gray-600" />
                    <span className="font-medium">Rappels de Jardinage</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Notifications pour vos tâches programmées
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-gray-600" />
                    <span className="font-medium">Alertes Météo</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Notifications en cas de conditions météo importantes
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Users2 className="size-4 text-gray-600" />
                    <span className="font-medium">Activité du Forum</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Notifications des réponses et mentions
                  </p>
                </div>
                <Switch checked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et paramètres de compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adresse Email</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="email"
                      value="dylan.delhalle@example.com"
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                      disabled
                    />
                    <Button variant="outline" className="shrink-0">
                      Modifier
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mot de passe</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="password"
                      value="••••••••"
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                      disabled
                    />
                    <Button variant="outline" className="shrink-0">
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Exportation des Données</h3>
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 size-4" />
                    Télécharger mes données
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileJson className="mr-2 size-4" />
                    Exporter mes configurations
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-red-600 mb-4">Zone Dangereuse</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium text-red-900">Désactiver mon compte</div>
                      <p className="text-sm text-red-600">
                        Votre compte sera temporairement désactivé
                      </p>
                    </div>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Désactiver
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium text-red-900">Supprimer mon compte</div>
                      <p className="text-sm text-red-600">
                        Cette action est irréversible et supprimera toutes vos données
                      </p>
                    </div>
                    <Button 
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => {
          // Implémenter la logique de suppression du compte ici
          console.log("Compte supprimé");
        }}
      />
    </div>
  );
};
