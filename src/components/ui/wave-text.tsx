"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedTextProps {
    text?: string;
    className?: string;
    isHovered?: boolean;
}

function Text_03({
    text = "Hover me",
    className = "",
    isHovered,
}: AnimatedTextProps) {
    return (
        <motion.span
            className={cn(
                "inline-block cursor-pointer transition-all",
                className
            )}
            initial="initial"
            animate={isHovered !== undefined ? (isHovered ? "hover" : "initial") : undefined}
            whileHover={isHovered === undefined ? "hover" : undefined}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    variants={{
                        initial: { y: 0, scale: 1 },
                        hover: {
                            y: [0, -7, 0],
                            scale: [1, 1.25, 1],
                            transition: {
                                duration: 0.35,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                                delay: index * 0.02,
                            },
                        },
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export { Text_03 };
