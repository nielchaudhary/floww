import { Spotlight } from './Spotlight';
import { Helmet } from 'react-helmet';
import { CreateNewPrompt } from './PlaceHolderAndVanishInput';
import React from 'react';
export const NewPrompt = () => {
  return (
    <>
      <Helmet>
        <title>floww | Create New Prompt</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-black relative overflow-hidden">
        <Spotlight />
        <CreateNewPrompt />
      </div>
    </>
  );
};
