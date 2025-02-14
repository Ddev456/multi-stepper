"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Header } from './dashboard/Header';
import { FeatureCard } from './dashboard/FeatureCard';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { GardenAssistant } from './dashboard/GardenAssistant';
import { 
  Fence, Calendar, Sprout, Trophy, Zap, Heart, MapPin, Leaf, Sun, ArrowRight, 
  MessageSquare, X, Sparkles, Bot, Command, Search, ChevronRight,
  BotIcon,
  UserRound,
  UsersRound,
  Users2,
  CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  level: number;
  items: string[];
}

interface Suggestion {
  icon: LucideIcon;
  text: string;
  action: string;
}

interface Badge {
  emoji: string;
  label: string;
  color: string;
  progress: number;
}

interface GardenStat {
  label: string;
  value: string;
  color: string;
  icon: LucideIcon;
}

interface DayProgress {
  day: string;
  isCompleted: boolean;
  isToday: boolean;
}

interface Plant {
  name: string;
  icon: string;
  category: 'Légumes' | 'Fruits' | 'Herbes' | 'Fleurs';
  season: 'Printemps' | 'Été' | 'Automne' | 'Hiver';
}

const getTimeBasedSuggestions = (): Suggestion[] => {
  const hour = new Date().getHours();
  
  if (hour < 10) {
    return [
      { icon: Sun, text: "Vérifiez vos semis du matin", action: "morning-check" },
      { icon: Calendar, text: "Planifiez votre journée au jardin", action: "plan-day" }
    ];
  } else if (hour < 16) {
    return [
      { icon: Leaf, text: "Moment idéal pour l'entretien", action: "maintenance" },
      { icon: Sparkles, text: "Inspectez vos cultures", action: "inspect" }
    ];
  } else {
    return [
      { icon: Calendar, text: "Préparez vos tâches de demain", action: "tomorrow-tasks" },
      { icon: MessageSquare, text: "Notez vos observations", action: "notes" }
    ];
  }
};

const features: readonly Feature[] = [
  {
    title: 'Zones de Culture',
    description: 'Gérez vos espaces de jardinage : serre, balcon, bacs potagers...',
    icon: MapPin,
    color: '#22c55e',
    progress: 60,
    level: 2,
    items: ['Serre', 'Balcon', 'Potager']
  },
  {
    title: 'Planning & Rappels',
    description: 'Suivez votre calendrier de culture personnalisé',
    icon: Calendar,
    color: '#8b5cf6',
    progress: 40,
    level: 1,
    items: ['Semis', 'Repiquage', 'Récolte']
  },
  {
    title: 'Fiches plantes',
    description: 'Découvrez en plus sur les plantes à cultiver au jardin',
    icon: Leaf,
    color: '#f59e0b',
    progress: 25,
    level: 3,
    items: ['Bio', 'Permaculture', 'Traditionnel']
  },
  {
    title: 'Forum',
    description: 'Discutez avec d\'autres jardiniers',
    icon: UsersRound,
    color: '#ec4899',
    progress: 45,
    level: 2,
    items: ['Zone USDA', 'Météo', 'Alertes']
  }
] as const;

const badges: readonly Badge[] = [
  { emoji: '🌱', label: 'Jardinier Débutant', color: '#22c55e', progress: 75 },
  { emoji: '🌿', label: 'Jardinier Expert', color: '#8b5cf6', progress: 45 },
  { emoji: '🌺', label: 'Maître Jardinier', color: '#f59e0b', progress: 20 }
] as const;

const gardenStats: readonly GardenStat[] = [
  { label: 'Zone USDA', value: '8b', color: 'text-green-600', icon: MapPin },
  { label: 'Style de jardinage', value: 'Bio', color: 'text-purple-600', icon: Leaf },
  { label: 'Zones actives', value: '3', color: 'text-yellow-600', icon: Fence },
  { label: 'Cultures en cours', value: '8', color: 'text-pink-600', icon: Sprout }
] as const;

const dailyProgress: readonly DayProgress[] = [
  { day: 'L', isCompleted: true, isToday: true },
  { day: 'M', isCompleted: false, isToday: false },
  { day: 'Me', isCompleted: false, isToday: false },
  { day: 'J', isCompleted: false, isToday: false },
  { day: 'V', isCompleted: false, isToday: false },
  { day: 'S', isCompleted: false, isToday: false },
  { day: 'D', isCompleted: false, isToday: false }
] as const;

const plantCategories = ['Légumes', 'Fruits', 'Herbes', 'Fleurs'] as const;

const commonPlants: Plant[] = [
  { name: "Tomates", icon: "🍅", category: "Légumes", season: "Été" },
  { name: "Carottes", icon: "🥕", category: "Légumes", season: "Automne" },
  { name: "Salades", icon: "🥬", category: "Légumes", season: "Printemps" },
  { name: "Courgettes", icon: "🥒", category: "Légumes", season: "Été" },
  { name: "Fraises", icon: "🍓", category: "Fruits", season: "Printemps" },
  // ... plus de plantes à ajouter
];

const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
} as const;

const DailyProgress = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      {dailyProgress.map(({ day, isCompleted, isToday }) => (
        <div key={day} className="flex flex-col items-center gap-1">
          <motion.div 
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border-2 relative",
              isCompleted || isToday ? "bg-gradient-to-br from-green-400 to-green-500 border-green-400 text-white" : "border-gray-200 bg-gray-50"
            )}
            whileHover={{ scale: 1.1 }}
          >
            <Zap className={cn("w-5 h-5", isCompleted || isToday ? "text-white" : "text-gray-400")} />
            {isToday && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
          <span className="text-sm font-medium text-gray-600">{day}</span>
        </div>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Légumes');

  const filteredPlants = commonPlants.filter(plant => 
    plant.category === selectedCategory &&
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsAssistantOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] relative">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-4 space-y-6">
        {/* Welcome Section */}
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="relative space-y-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="absolute -left-2 -top-2 h-16 w-16 rounded-2xl bg-green-100" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-green-500 shadow-sm">
                    <Sprout className="size-7 text-white" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <motion.h1 
                    className="text-2xl font-bold text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Bienvenue sur Carnet Potager !
                  </motion.h1>
                  <motion.p 
                    className="text-base text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Planifiez vos cultures et optimisez votre jardin
                  </motion.p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-1.5"
                    >
                      <Users2 className="size-4 text-indigo-500" />
                      <span className="text-sm font-medium text-indigo-500">32 Jardiniers actifs</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5"
                    >
                      <Trophy className="size-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Niveau 2</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5"
                    >
                      <Sparkles className="size-4 text-amber-500" />
                      <span className="text-sm font-medium text-amber-500">3 objectifs atteints</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Command className="size-4" />
                  <span>Guide rapide</span>
                </Button>
                <Button className="gap-2">
                  <Search className="size-4" />
                  <span>Explorer</span>
                </Button>
              </div>
            </div>

           

            {/* Progress Bar 
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-[#4F4D5E]">Progression du jour</span>
                <span className="text-xs font-bold text-[#6C47FF]">1/3</span>
              </div>
              <div className="h-2 bg-[#F8F9FC] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#6C47FF] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '33%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            */}
          </div>
          
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          {/* Main Content */}
          <motion.div
            variants={animations.container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <motion.div key={feature.title} variants={animations.item}>
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={animations.container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={animations.item}>
              <WeatherWidget />
            </motion.div>
            
            <motion.div
              variants={animations.item}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2B283A]">Informations Jardin</h3>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-[#6C47FF] hover:text-[#5835FF] -mr-2"
                >
                  Modifier
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {gardenStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col gap-2 p-3 rounded-xl bg-[#F8F9FC] hover:bg-[#F8E9FF]/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#F8E9FF] flex items-center justify-center">
                        <stat.icon className="w-3.5 h-3.5 text-[#6C47FF]" />
                      </div>
                      <span className="text-xs text-[#4F4D5E]">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-[#2B283A]">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

   
      <div className="relative">
        <GardenAssistant />
      </div>
    </div>
  );
};
