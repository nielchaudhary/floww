import { DotBackgroundDemo } from './DotsBackground';
import { PlaceholdersAndVanishInput } from './PlaceHolderAndVanishInput';
import { useLocation } from 'react-router-dom';

export const FlowDesigner = () => {
  const location = useLocation();

  const flowChatPlaceHolders = ['Suggest Changes', 'Change the architecture'];

  return (
    <div className="relative bg-black flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden overflow-y-hidden py-10">
      <div className="bg-white-300 dark:bg-white-400 max-w-8xl border-white z-20 flex items-center justify-center overflow-hidden">
        {/* Architecture & Analysis Box */}
        <div className="relative rounded-lg shadow-lg h-210 w-300 mr-10 flex items-center justify-center overflow-hidden border border-white/10">
          <span
            className="absolute top-10 left-1/2 -translate-x-1/2 z-10 font-bold text-center text-gray-300 dark:text-gray-350 text-3xl"
            style={{ pointerEvents: 'none' }}
          >
            {location.state as string}
          </span>
          <div className="absolute inset-0 z-0">
            <DotBackgroundDemo />
          </div>
        </div>

        {/* Chat Box on the right*/}
        <div className="relative rounded-3xl shadow-lg h-210 w-100 flex flex-col p-6 bg-black border border-white/10">
          <span className="text-gray-400 text-xl font-bold mb-4 z-10">talk to floww</span>
          <div className="flex-1 overflow-y-auto">
            <div className="mb-2 text-gray-300 z">User: Hello!</div>
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
    </div>
  );
};
