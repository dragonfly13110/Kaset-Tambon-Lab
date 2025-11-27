import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900" />

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-500/20"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ backgroundSize: '200% 200%' }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -60, 0],
                    y: [0, -80, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />

            {/* Diagonal lines pattern */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                        style={{
                            top: `${i * 10}%`,
                            left: '-100%',
                            width: '200%',
                            transform: 'rotate(-45deg)',
                        }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Glowing orbs */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute top-2/3 left-1/4 w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]"
                animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 1, 0.4],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                }}
            />

            <motion.div
                className="absolute top-1/2 right-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* Hexagon pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                            <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-400" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
            </div>

            {/* Scanning line effect */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                animate={{
                    top: ['0%', '100%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Particle dots */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
                <svg width="100%" height="100%">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>
        </div>
    );
};

export default AnimatedBackground;
