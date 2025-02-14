import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X } from "lucide-react";
import { motion } from "framer-motion";

interface AssistantHeaderProps {
    isExpanded: boolean;
    onExpand: () => void;
    onClose: () => void;
}

export function AssistantHeader({ isExpanded, onExpand, onClose }: AssistantHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="absolute -left-2 -top-2 h-12 w-12 rounded-xl bg-indigo-100" />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 shadow-sm">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img src="/_logo.svg" className="h-6 w-6" alt="Logo Carnet Potager" />
                        </motion.div>
                    </div>
                </div>
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-medium text-gray-900"
                    >
                        Assistant Potager
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-gray-500"
                    >
                        Je vous aide à planifier vos cultures
                    </motion.p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onExpand}
                    className="text-gray-500 hover:text-gray-900"
                >
                    {isExpanded ? (
                        <Minimize2 className="h-4 w-4" />
                    ) : (
                        <Maximize2 className="h-4 w-4" />
                    )}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-500 hover:text-red-600"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
