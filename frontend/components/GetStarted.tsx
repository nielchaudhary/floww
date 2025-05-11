import { useNavigate } from 'react-router-dom';
import { Spotlight } from './Spotlight';
import React from 'react';
import { SignupForm, BottomGradient } from './SignupForm';
export const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black w-screen overflow-x-hidden overflow-y-hidden py-10">
      <Spotlight />
      <button
        className=" group/btn text-white text-sm font-bold absolute top-3 right-0 m-4 rounded-xl px-4 py-2 font-medium bg-gradient-to-br from-black to-neutral-600 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
        onClick={() => navigate('/new')}
      >
        Continue without login
        <BottomGradient />
      </button>
      <div className="flex flex-col items-center justify-center">
        <SignupForm />
      </div>
    </div>
  );
};
