"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScoreRingProps {
  score: number // 0 to 10
  size?: number
  strokeWidth?: number
  label?: string
  color?: string
  className?: string
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  color = "#10b981", // emerald-500
  className,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percent = score / 10
  const offset = circumference - percent * circumference

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white tracking-tighter">
          {score.toFixed(1)}
        </span>
        {label && <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">{label}</span>}
      </div>
    </div>
  )
}
