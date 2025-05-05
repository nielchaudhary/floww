import { cn } from "../lib/utils";
import {
  IconBrain,
  IconClock24,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconFileExport,
  IconRouteAltLeft, 
  IconTerminal2,
} from "@tabler/icons-react";
import { Spotlight } from "./Spotlight";
import { BottomGradient } from "./SignupForm";
import { motion } from "framer-motion";   
import React from "react";

import { useNavigate } from "react-router-dom";
export function FeaturePage() {
    const navigate = useNavigate();
    const features = [
        {
          title: "Built for the masses",
          description:
            "Whether you're a seasoned architect or just starting out, Flow helps everyone visualize and create professional system designs & workflows.",
          icon: <IconTerminal2 />,
        },
        {
          title: "Ease of use",
          description:
            "Transform complex ideas into clear workflows with just a simple prompt. No technical expertise required.",
          icon: <IconEaseInOut />,
        },
        {
          title: "Transparent Pricing",
          description:
            "Flexible plans that scale with your needs, from solo creators to enterprise teams.",
          icon: <IconCurrencyDollar />,
        },
        {
          title: "100% Uptime Guarantee",
          description: "Our reliable infrastructure ensures your workflow creation is never interrupted.",
          icon: <IconCloud />,
        },
        {
          title: "Secure Sharing",
          description: "Collaborate seamlessly with team members through our secure sharing features.",
          icon: <IconRouteAltLeft />,
        },
        {
          title: "24/7 Customer Support",
          description:
            "Get help anytime with our responsive support team and AI-powered assistance.",
          icon: <IconClock24 />,
        },
        {
          title: "Detailed Reasoning",
          description:
            "Understand the 'why' behind each component with comprehensive explanations that improve your system knowledge.",
          icon: <IconBrain />,
        },
        {
          title: "Export & Integration",
          description: "Take your designs anywhere with exports to Figma, Miro, or as ready-to-use code snippets.",
          icon: <IconFileExport />,
        },
      ];
  return (
    <div className="relative bg-black flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden overflow-y-hidden py-10"> 
      <Spotlight />

      <motion.div
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}   
        transition={{ duration: 0.8, ease: "easeInOut" }} 
        className="flex flex-col items-center w-full" 
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative z-10 py-10 px-4 max-w-7xl mx-auto overflow-x-hidden">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
   
        <button className="group/btn relative shadow-input w-40 h-10 rounded-xl font-bold bg-black border-transparent text-white text-sm mt-8 relative z-10 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]" onClick={() => navigate("/signup")}> 
          →
          <BottomGradient/>
        </button>
      </motion.div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};