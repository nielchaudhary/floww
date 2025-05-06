import { Spotlight } from "./Spotlight";
import { IconCheck } from "@tabler/icons-react";
import { BottomGradient } from './SignupForm';
import { motion } from "framer-motion"; 

const tiers = [
    {
      name: 'dev',
      id: 'tier-dev',
      href: '#',
      priceMonthly: '$15',
      description: "Perfect for individual creators and developers building their workflow visualizations.",
      features: [
        'Up to 20 workflow designs',
        'Basic AI-powered diagram creation',
        'Export to PNG and PDF',
        'Community support',
        'Standard system components library',
        'Basic reasoning explanations'
      ],
      featured: false,
    },
    {
      name: 'pro',
      id: 'tier-pro',
      href: '#',
      priceMonthly: '$50',
      description: 'Enhanced capabilities and support for professional teams and businesses.',
      features: [
        'all dev features',
        '24/7 priority customer support',
        'Detailed system reasoning',
        'Secure team collaboration',
        '100% uptime guarantee',
        'Custom integrations'
      ],
      featured: true,
    },
  ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const PricingSection = () => {
  return (
    <div className="bg-black flex flex-col relative items-center justify-center h-screen w-full overflow-hidden py-16 lg:px-8">
      <Spotlight />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-4xl px-4" 
      >
        <div className="mx-auto max-w-4xl text-center mb-8">
          <h2 className="text-sm font-bold tracking-tight text-gray-400 sm:text-2xl">
            built for everyone, <br /> from devs to enterprises
          </h2>
        </div>

        <div className="relative mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8">
          {tiers.map((tier) => {
            const isFeatured = tier.featured;

            const outerContainerClasses = classNames(
              'rounded-3xl relative mb-6 lg:mb-0', 
              isFeatured
                ? 'p-1 moving-border-gradient'
                : 'p-0 bg-black-500/60 sm:mx-8 lg:mx-0 ring-1 ring-white/10',
            );

            const innerContainerClasses = classNames(
              'p-6 sm:p-8 h-full',
              isFeatured
                ? 'bg-black rounded-[calc(1.5rem-1px)]'
                : 'bg-transparent rounded-3xl'
            );

            return (
              <div key={tier.id} className={outerContainerClasses}>
                <div className={innerContainerClasses}>
                  <h3
                    id={tier.id}
                    className={classNames(isFeatured ? 'text-indigo-400' : 'text-indigo-400', 'text-base/7 font-semibold')}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-x-2">
                    <span
                      className={classNames(
                        isFeatured ? 'text-white' : 'text-white',
                        'text-5xl font-semibold tracking-tight',
                      )}
                    >
                      {tier.priceMonthly}
                    </span>
                    <span className={classNames(isFeatured ? 'text-gray-400' : 'text-gray-400', 'text-base font-bold')}>/month</span>
                  </p>
                  <p className={classNames(isFeatured ? 'text-gray-300' : 'text-gray-300', 'mt-6 text-base/7 font-bold')}>
                    {tier.description}
                  </p>
                  <ul
                    role="list"
                    className={classNames(
                      isFeatured ? 'text-gray-300' : 'text-gray-300',
                      'mt-6 space-y-3 text-sm/6 sm:mt-8 font-bold',
                    )}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <IconCheck
                          aria-hidden="true"
                          className={classNames(isFeatured ? 'text-gray-400' : 'text-gray-400', 'h-6 w-5 flex-none font-bold')}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="group/btn relative shadow-input rounded-xl font-bold bg-black border-transparent text-white text-sm dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] mt-6 block px-3.5 py-2.5 text-center sm:mt-8"
                  >
                    →
                    <BottomGradient />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};