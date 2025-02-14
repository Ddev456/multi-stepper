"use client";

import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Sun, Cloud, Droplets, Wind } from 'lucide-react';

const WeatherIcon = ({ type }: { type: 'sun' | 'cloud' | 'rain' }) => {
  const icons = {
    sun: Sun,
    cloud: Cloud,
    rain: Droplets
  };
  const Icon = icons[type];

  return (
    <motion.div
      animate={{ 
        y: [0, -4, 0],
        rotate: type === 'sun' ? [0, 180] : [0, 0]
      }}
      transition={{ 
        duration: type === 'sun' ? 8 : 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      <Icon className="w-8 h-8 text-yellow-500" />
    </motion.div>
  );
};

export const WeatherWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl border-2 border-blue-400 shadow-lg">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          }}
        />
        
        <div className="relative p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WeatherIcon type="sun" />
              <div>
                <p className="text-3xl font-bold">22°C</p>
                <p className="text-sm opacity-90">Ensoleillé</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="opacity-75 hover:opacity-100 transition-opacity duration-200"
            >
              <Wind className="w-6 h-6" />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <Cloud className="w-4 h-4" />
              <span className="text-sm">12%</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <Droplets className="w-4 h-4" />
              <span className="text-sm">65%</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              <Wind className="w-4 h-4" />
              <span className="text-sm">8 km/h</span>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
