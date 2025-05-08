import React, { useState } from "react";
import { useSignUp } from '@clerk/clerk-react';
import { cn } from "../lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { validateSignupForm, SignupFormData } from "../utils/SignupUtils";
import {
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { MultiStepLoader } from "./MultiStepLoader";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const radius = 150;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            `shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm font-bold text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  },
);
Input.displayName = "Input";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export function SignupForm() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const { signUp, setActive } = useSignUp();

  const signupLoadingStates = [
    { text: "Validating your information" },
    { text: "Creating your account" },
    { text: "Sending verification email" },
    { text: "Setting up your floww profile" },
    { text: "Almost ready to build crazy products..." }
  ];

  const handleSignupFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!signUp || !setActive) {
      return;
    }

    if(validateSignupForm({
      firstname,
      email,
      password,
    } as SignupFormData) === false) {
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      })

      await signUp.prepareVerification({ strategy: "email_code" });

      toast.success("Verification email sent!");
      
      setTimeout(() => {
        navigate("/user/verify" , {
          state: {
            email: email,
          }
        });
      }, 1500);
      
    } catch(error) {
      console.error(error);
      setLoading(false); 
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>floww | Signup</title>
      </Helmet>
      
      <MultiStepLoader 
        loadingStates={signupLoadingStates} 
        loading={loading} 
        duration={1500} 
        loop={false}
      />
      
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}   
          transition={{ duration: 0.8, ease: "easeInOut" }} 
        >
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to <span className="text-teal-700 dark:text-teal-750">floww</span> 💡
        </h2>

        <form className="my-8" onSubmit={handleSignupFormSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Cracked" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Builder" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="buildcrazyproducts@flow.app" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </LabelInputContainer>
           
          <button
            className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            disabled={loading} 
          >
            <IconUserPlus className="h-4 w-4 text-neutral-300" /> 
            Sign up
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
         
        </form>
        <div className="mt-8 flex justify-center text-lg font-bold text-neutral-600 dark:text-neutral-300">
          Already have an account?
        </div>
        <div className="flex justify-center">
          <button
              className="group/btn mt-2 shadow-input relative flex h-10 w-40 items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button" 
              onClick={() => navigate("/login")}
              disabled={loading} 
            >
              <IconLogin className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Login
              </span>
              <BottomGradient />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};