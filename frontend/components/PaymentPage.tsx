import { Spotlight } from "./Spotlight";


export const PaymentPage = () => {
    return (
        <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black overflow-hidden">
            <Spotlight />
                <h1 className="text-gray-400 text-3xl font-bold">we're currently in talks with stripe & rzp,</h1>
                <h1 className="text-gray-400 text-3xl font-bold">so please check back soon!</h1>
        </div>
    )
}
