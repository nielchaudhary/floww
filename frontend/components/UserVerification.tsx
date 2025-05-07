
import { IconRefresh, IconSend } from '@tabler/icons-react'
import { BottomGradient, Input, LabelInputContainer } from './SignupForm'
import {Spotlight} from './Spotlight'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSignUp } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import React from 'react'
export const UserVerificaiton = () => {
    const signUp = useSignUp()
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState('')
    const location = useLocation();

    const [isResendDisabled, setIsResendDisabled] = useState(false)
    const [resendTimer , setResendTimer] = useState(30);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isResendDisabled && resendTimer > 0) {
          interval = setInterval(() => {
            setResendTimer((prev) => prev - 1);
          }, 1000);
        } else if (resendTimer === 0) {
          setIsResendDisabled(false);
          setResendTimer(30);
        }
        return () => clearInterval(interval);
      }, [isResendDisabled, resendTimer]);


 
    const handleSubmit = async(verificationCode : string) => {
    
        if(verificationCode.length !== 6 || typeof verificationCode !== 'string'){
            toast.error('Please enter a valid verification code')
            return
        }

        
        const completeSignUp = await signUp.signUp?.attemptEmailAddressVerification({
            code: verificationCode,
        });
        if(completeSignUp?.status === 'complete'){
            toast.success('Verification successful!', {
                duration: 1000,
                onAutoClose: () => {
                    navigate('/chat')
                }
            })
           
        }else{
            toast.error('Verification failed!')
        }
    }
    return (
        <div className="relative overflow-hidden flex flex-col items-center justify-center h-screen w-screen bg-black">
            <Helmet>
                <title>floww | Verification</title>
            </Helmet>
            <Spotlight/>
            <motion.div
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}   
        transition={{ duration: 0.8, ease: "easeInOut" }} 
        className="flex flex-col items-center w-full" 
      >
            <p className="text-gray-300 font-bold dark:text-gray-400 text-2xl text-center px-4">Please enter the verification code sent to → <br/><span className="text-gray-300">{location.state.email}</span></p>
            <div className="flex flex-col items-center justify-center mt-5 w-60">
            <LabelInputContainer>
            <Input id="verificationCode" placeholder="Verification Code" type="text" className="text-center" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </LabelInputContainer>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">

            <button
            className="group/btn shadow-input relative flex mt-5 h-11 w-40 items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"

          onClick={() => handleSubmit(verificationCode)}

          >
            <IconSend className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300 font-bold">
              Submit
            </span>
            <BottomGradient />
          </button>


          <button
    className="group/btn shadow-input relative flex mt-5 h-11 w-40 items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
    disabled={isResendDisabled}
    onClick={async () => {
      setIsResendDisabled(true);
      await signUp.signUp?.prepareVerification({ strategy: "email_code" });
      toast.success('Verification code resent!');
    }}
  >
    <IconRefresh className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
    <span className="text-sm text-neutral-700 dark:text-neutral-300 font-bold">
      {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend'}
    </span>
    <BottomGradient />
  </button>
          </div>
          </motion.div>

        </div>
    )
}