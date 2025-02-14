import { Variants } from 'framer-motion';

export const springTransition = {
    type: "spring",
    damping: 25,
    stiffness: 400,
    mass: 0.8,
} as const;

export const fastSpringTransition = {
    type: "spring",
    damping: 20,
    stiffness: 500,
    mass: 0.6,
} as const;

export const quickTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30
};

export const containerVariants = (isExpanded: boolean): Variants => ({
    initial: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        width: isExpanded ? '800px' : '500px'
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        width: isExpanded ? '800px' : '500px',
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 1, 1]
        }
    }
});

export const contentVariants = (step: string): Variants => ({
    initial: {
        opacity: 0,
        x: step === 'configuration' ? -20 : 20,
        scale: 0.95
    },
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.1
        }
    },
    exit: {
        opacity: 0,
        x: step === 'configuration' ? 20 : -20,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 1, 1]
        }
    }
});

export const listItemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    exit: { 
        opacity: 0, 
        y: -20,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 1, 1]
        }
    }
};
