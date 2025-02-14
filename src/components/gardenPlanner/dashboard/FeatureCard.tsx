"use client";

import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  progress: number;
}

export const FeatureCard = ({ title, description, icon: Icon, color, progress }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -4
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <Card className="relative bg-white rounded-3xl overflow-hidden border-0 shadow-lg">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </motion.div>

            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <div className="w-2 h-2 rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Progression</span>
              <span className="text-sm font-medium" style={{ color }}>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
