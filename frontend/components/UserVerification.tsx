
import { IconSend } from '@tabler/icons-react'
import { BottomGradient, Input, LabelInputContainer } from './SignupForm'
import {Spotlight} from './Spotlight'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
export const UserVerificaiton = () => {
    const signUp = useSignUp()
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState('')

    const handleSubmit = async(verificationCode : string) => {
        if(verificationCode.length !== 6 || typeof verificationCode !== 'string'){
            toast.error('Please enter a valid verification code')
            return
        }
        
        const completeSignUp = await signUp.signUp?.attemptEmailAddressVerification({
            code: verificationCode,
        });
        if(completeSignUp?.status === 'complete'){
            toast.success('Verification successful!')
            navigate('/chat')
        }else{
            toast.error('Verification failed!')
        }
    }
    return (
        <div className="relative overflow-hidden flex flex-col items-center justify-center h-screen w-screen bg-black">
            <Spotlight/>
            <motion.div
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}   
        transition={{ duration: 0.8, ease: "easeInOut" }} 
        className="flex flex-col items-center w-full" 
      >
            <p className="text-gray-300 font-bold dark:text-gray-400 text-2xl text-center px-4">Please Enter The Verification Code Sent To Your Email</p>
            <div className="flex flex-col items-center justify-center mt-5 w-60">
            <LabelInputContainer>
            <Input id="verificationCode" placeholder="Verification Code" type="text" className="text-center" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </LabelInputContainer>
            </div>

            <button
            className="group/btn shadow-input relative flex mt-5 h-10 w-30 items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"

          onClick={() => handleSubmit(verificationCode)}

          >
            <IconSend className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300 font-bold">
              Submit
            </span>
            <BottomGradient />
          </button>
          </motion.div>

        </div>
    )
}