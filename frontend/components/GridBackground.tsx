import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Spotlight } from "./Spotlight";

export function DotBackground() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-black">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white" 
      />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
     
        className="relative z-10 flex flex-col items-center justify-center max-w-7xl"
      >
           <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-7xl">
           f l o w 
        </h1>
        <br/>
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-5xl">
          turn your product ideas into workflows instantly
        </h1>
      </motion.div>
    </div>
  );
}

export default DotBackground;