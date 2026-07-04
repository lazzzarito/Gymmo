"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LiveBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#1a1b26]">
            {/* Grid Horizon */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(79,214,190,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(79,214,190,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_scale(2)] opacity-30 animate-[grid-move_20s_linear_infinite]" />

            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-secondary/5 blur-[100px] rounded-full opacity-50" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full opacity-30" />

            {/* Floating Particles */}
            <Particles count={15} />
        </div>
    );
}

interface ParticleData {
    x: number;
    y: number;
    drift: number;
    duration: number;
    delay: number;
}

function Particles({ count }: { count: number }) {
    const [state, setState] = useState<{ mounted: boolean; particles: ParticleData[] }>({ mounted: false, particles: [] });

    useEffect(() => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const h = typeof window !== 'undefined' ? window.innerHeight : 1000;
        const data: ParticleData[] = Array.from({ length: count }).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            drift: Math.random() * -100,
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ mounted: true, particles: data });
    }, [count]);

    if (!state.mounted) return null;

    return (
        <>
            {state.particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                    initial={{
                        x: p.x,
                        y: p.y,
                        opacity: 0,
                    }}
                    animate={{
                        y: [null, p.y + p.drift],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </>
    );
}
