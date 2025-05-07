
import {Spotlight} from './Spotlight'

export const UserVerificaiton = () => {
    return (
        <div className="relative overflow-hidden flex flex-col items-center justify-center h-screen w-screen bg-black">
            <Spotlight/>
            <h1 className="text-white text-4xl font-bold">User Verification</h1>
            <p className="text-white text-lg">Please check your email for a verification code</p>
        </div>
    )
}