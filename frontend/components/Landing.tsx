
import { Spotlight } from './Spotlight';
import {  TypewriterEffectSmooth } from './TypeWriterEffect';
import { useNavigate } from 'react-router-dom';
import { BottomGradient } from './SignupForm';
import { Helmet } from 'react-helmet';
export const Landing = () => {

  

    const navigate = useNavigate();
    const words = [
        {
          text: "turn",
          className: "text-gray-400 dark:text-gray-450",
    
        },
        {
          text: "ideas",
          className: "text-gray-400 dark:text-gray-450",
    
        },
        {
          text: "into",
          className: "text-gray-400 dark:text-gray-450",
    
        },
        {
          text: "workflows",
          className: "text-gray-400 dark:text-gray-450",
        },
        {
          text: "with",
          className: "text-gray-400 dark:text-gray-450",
    
        },
        {
          text: "floww",
          className: "text-teal-700 dark:text-teal-750",
        },
        {
          text: "💡"
        },
        
       
      ];
     

        return (
          <>
          <Helmet>
            <title>floww | Home</title>
          </Helmet>
            <div className="relative bg-black flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden overflow-y-hidden py-10">
               <Spotlight
               
              />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
                
                </p>
                <TypewriterEffectSmooth words={words} />
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                  <button onClick={() => navigate('/features')} className="group/btn relative fle shadow-input w-40 h-10 rounded-xl font-bold bg-black border-transparent text-white text-sm  dark:bg-zinc-900  dark:shadow-[0px_0px_1px_1px_#262626]">
                     →
                    <BottomGradient/>
                  </button>

                
                  
                </div>
              </div>
            </div>
          </>
          );
      
  }


