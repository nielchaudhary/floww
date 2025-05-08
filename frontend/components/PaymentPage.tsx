import { motion } from 'framer-motion';
import { Spotlight } from './Spotlight';
import { Helmet } from 'react-helmet';

export const PaymentPage = () => {
  return (
    <>
      <Helmet>
        <title>floww | Payment</title>
      </Helmet>
      <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        <Spotlight />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-gray-400 text-3xl font-bold">
            we're currently in talks with stripe & rzp,
          </h1>
          <h1 className="text-gray-400 text-3xl font-bold">so please check back soon!</h1>
        </motion.div>
      </div>
    </>
  );
};
