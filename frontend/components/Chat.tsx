import { Helmet } from "react-helmet"
import { Spotlight } from "./Spotlight"


export const ChatPage = () => {
    return (
        <>
        <Helmet>
            <title>floww | Chat</title>
        </Helmet>
        <div className="relative flex flex-col items-center justify-center overflow-hidden py-10 h-screen w-screen bg-black">
            <Spotlight/>
            <h1 className="text-white text-4xl font-bold">chat karo bhosdiwalo, shuru karo</h1>
        </div>
        </>
    )
}

