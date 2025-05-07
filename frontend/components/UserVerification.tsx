
import { IconSend } from '@tabler/icons-react'
import { BottomGradient, Input } from './SignupForm'
import { LabelInputContainer } from './SignupForm'
import {Spotlight} from './Spotlight'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export const UserVerificaiton = () => {
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState('')

    const handleSubmit = () => {
        if(verificationCode.length === 6){
            navigate('/chat')
        }
    }
    return (
        <div className="relative overflow-hidden flex flex-col items-center justify-center h-screen w-screen bg-black">
            <Spotlight/>
            <p className="text-gray-300 font-bold dark:text-gray-400 text-2xl text-center px-4">Please Enter The Verification Code Sent To Your Email</p>
            <div className="flex flex-col items-center justify-center mt-5 w-60">
            <LabelInputContainer>
            <Input id="verificationCode" placeholder="Verification Code" type="text" className="text-center" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </LabelInputContainer>
            </div>

            <button
            className="group/btn shadow-input relative flex mt-5 h-10 w-30 items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"

          onClick={handleSubmit}

          >
            <IconSend className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300 font-bold">
              Submit
            </span>
            <BottomGradient />
          </button>
        </div>
    )
}