
import { Spotlight } from './Spotlight';
import {  TypewriterEffectSmooth } from './TypeWriterEffect';
import { useNavigate } from 'react-router-dom';
export const Landing = () => {

    const navigate = useNavigate();
    const words = [
        {
          text: "Turn",
          className: "text-gray-300 dark:text-gray-350",
    
        },
        {
          text: "ideas",
          className: "text-gray-300 dark:text-gray-350",
    
        },
        {
          text: "into",
          className: "text-gray-300 dark:text-gray-350",
    
        },
        {
          text: "workflows",
          className: "text-gray-300 dark:text-gray-350",
        },
        {
          text: "with",
          className: "text-gray-300 dark:text-gray-350",
    
        },
        {
          text: "flow",
          className: "text-teal-700 dark:text-teal-750",
        },
        
       
      ];
     

        return (
            <div className="relative bg-black flex flex-col items-center justify-center h-screen w-full">
               <Spotlight
               
              />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
                
                </p>
                <TypewriterEffectSmooth words={words} />
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                  <button onClick={() => navigate('/features')} className="w-40 h-10 rounded-xl font-bold bg-black border-2 dark:border-white border-transparent text-white text-sm">
                    Buildd →
                  </button>

                
                  
                </div>
              </div>
            </div>
          );
    
}


