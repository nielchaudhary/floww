import { DotBackground } from './DotsBackground';
import { PlaceholdersAndVanishInput } from './PlaceHolderAndVanishInput';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';

export const FlowDesigner = () => {
  const location = useLocation();

  const flowChatPlaceHolders = ['Suggest Changes', 'Change the architecture'];

  return (
    <div className="relative bg-black flex flex-col items-center justify-center min-h-screen w-full overflow-x-hidden overflow-y-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeIn',
        }}
        className="w-full max-w-8xl"
      >
        <div className="bg-white-300 dark:bg-white-400 border-white z-20 flex flex-col lg:flex-row items-center justify-center overflow-hidden gap-6 lg:gap-10">
          {/* Architecture & Analysis Box */}
          <div className="relative rounded-lg shadow-lg h-96 lg:h-210 w-full lg:w-300 flex items-center justify-center overflow-scroll scrollbar-hide border border-white/10">
            <span
              className="absolute top-10 left-1/2 -translate-x-1/2 z-10 font-bold text-center text-gray-300 dark:text-gray-350 text-2xl lg:text-3xl"
              style={{ pointerEvents: 'none' }}
            >
              {location.state}
            </span>
            <div className="absolute inset-0 z-0">
              <DotBackground />
            </div>
          </div>

          {/* Chat Box on the right */}
          <div className="relative rounded-3xl shadow-lg h-96 lg:h-210 w-full lg:w-100 flex flex-col p-4 lg:p-6 bg-black border border-white/10">
            <span className="text-gray-300 text-lg lg:text-xl font-bold mb-4 z-10">
              Discuss with <span className="text-teal-700 dark:text-teal-750">floww</span>
            </span>
            <div className="flex-1 overflow-y-auto">
              <div className="mb-2 text-gray-300">User: Hello!</div>
              <div className="mb-2 text-blue-400">AI: Hi there! How can I help?</div>
            </div>
            <PlaceholdersAndVanishInput
              placeholders={flowChatPlaceHolders}
              onChange={(e) => {
                console.log(e.target.value);
              }}
              onSubmit={() => {
                console.log('Submitted');
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
