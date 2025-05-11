import { IconLogin } from '@tabler/icons-react';
import { BottomGradient } from './SignupForm';
import { Input, LabelInputContainer } from './SignupForm';
import { Spotlight } from './Spotlight';
import { IconBrandGithub } from '@tabler/icons-react';
import { Label } from './SignupForm';
import { IconBrandGoogle } from '@tabler/icons-react';
import { validateLoginForm, LoginFormData } from '../utils/SignupUtils';
import { useState } from 'react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import { useClerk, useSignIn } from '@clerk/clerk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiStepLoader } from './MultiStepLoader';

enum LoginStrategy {
  GITHUB = 'github',
  GOOGLE = 'google',
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useClerk();

  const loginLoadingStates = [
    { text: 'Logging in...' },
    { text: 'Verifying email...' },
    { text: 'Redirecting to dashboard...' },
  ];

  const handleSocialLogin = async (provider: LoginStrategy) => {
    // Sign out any existing session to prevent conflicts
    await signOut();

    if (!isLoaded) {
      toast.error('Authentication system is loading. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const strategy = provider === LoginStrategy.GITHUB ? 'oauth_github' : 'oauth_google';

      //TODO - update the mode later on when you productionise it
      const mode = 'development';

      // For development environment, handle the test mode differently
      if (mode === 'development') {
        // For testing OAuth providers in development, we need to use the redirect method
        // but can set special parameters to help with testing

        const redirectUrl = window.location.origin + '/new';
        const redirectUrlComplete = window.location.origin + '/new';

        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl,
          redirectUrlComplete,
        });

        toast.success(`Test login with ${provider} initiated. Redirecting...`);
      } else {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: window.location.origin + '/new',
          redirectUrlComplete: window.location.origin + '/new',
        });

        toast.success(`Logging in with ${provider}...`);
      }
    } catch (error) {
      setLoading(false);
      console.error(`${provider} login error:`, error);

      if (error instanceof Error) {
        if (error.message.includes('not enabled')) {
          toast.error(`${provider} login is not enabled. Please contact support.`);
        } else if (error.message.includes('configuration')) {
          toast.error(`${provider} is not properly configured. Please check your Clerk settings.`);
        } else {
          toast.error(`Failed to login with ${provider}. ${error.message}`);
        }
      } else {
        toast.error(`Failed to login with ${provider}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>, email: string) => {
    e.preventDefault();

    if (
      validateLoginForm({
        email,
        password,
      } as LoginFormData) === false
    ) {
      return;
    }

    setLoading(true);

    try {
      const signInResponse = await signIn?.create({
        strategy: 'email_code',
        identifier: email,
      });

      if (signInResponse?.status === 'complete') {
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/user/verify', {
            state: {
              email: email,
            },
          });
        }, 1500);
      }

      console.log(signInResponse);
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message?.includes('user not found') ||
          error.message?.includes('no account') ||
          error.message?.includes("Couldn't find your account"))
      ) {
        toast.error('Account with this email does not exist.');
      } else {
        toast.error('An error occurred during login. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>floww | Login</title>
      </Helmet>

      <MultiStepLoader
        loadingStates={loginLoadingStates}
        loading={loading}
        duration={1500}
        loop={false}
      />
      <div className="relative bg-black flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden overflow-y-hidden py-10">
        <Spotlight />
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Login to <span className="text-teal-700 dark:text-teal-750">floww</span> 💡
          </h2>

          <form className="my-8" onSubmit={(e) => handleLoginFormSubmit(e, email)}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="buildcrazyproducts@flow.app"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>

            <button
              className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              <IconLogin className="h-4 w-4 text-neutral-300" />
              <span>Login</span>
              <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          </form>

          <div className="flex space-x-4 flex-row">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              onClick={() => handleSocialLogin(LoginStrategy.GITHUB)}
              type="button"
              disabled={loading}
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">GitHub</span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
              onClick={() => handleSocialLogin(LoginStrategy.GOOGLE)}
              disabled={loading}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Google</span>
              <BottomGradient />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
