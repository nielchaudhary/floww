import { Spotlight } from './Spotlight';
import { TypewriterEffectSmooth } from './TypeWriterEffect';
import { useNavigate } from 'react-router-dom';
import { BottomGradient } from './SignupForm';
import { Helmet } from 'react-helmet';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import React from 'react';
export const Landing = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const words = [
    {
      text: 'design',
      className: 'text-gray-300 dark:text-gray-350',
    },
    {
      text: 'your',
      className: 'text-gray-300 dark:text-gray-350',
    },
    {
      text: 'system',
      className: 'text-gray-300 dark:text-gray-350',
    },
    {
      text: 'architecture',
      className: 'text-gray-300 dark:text-gray-350',
    },
    {
      text: 'using',
      className: 'text-gray-300 dark:text-gray-350',
    },
    {
      text: 'AI',
      className: 'text-gray-300 dark:text-gray-350',
    },
  ];

  return (
    <>
      <Helmet>
        <title>floww | Home</title>
      </Helmet>
      <div className="relative bg-black flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden overflow-y-hidden py-10">
        <Spotlight />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-teal-700 dark:text-teal-750 text-6xl  font-bold"
          >
            floww 💡
          </motion.h1>
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  "></p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <button
              className="group/btn relative flex items-center justify-center shadow-input w-40 h-10 rounded-xl font-bold bg-black border-transparent text-white text-sm  dark:bg-zinc-900  dark:shadow-[0px_0px_1px_1px_#262626]"
              onClick={() => {
                isSignedIn ? navigate('/new') : navigate('/signup');
              }}
            >
              →
              <BottomGradient />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
