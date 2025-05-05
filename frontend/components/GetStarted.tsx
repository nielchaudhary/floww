import { useNavigate } from "react-router-dom";

export const GetStarted = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black w-screen">
            <button className=" text-white text-sm font-bold absolute top-3 right-0 m-4 border-2 border-white rounded-xl px-4 py-2" onClick={() => navigate("/chat")}>
                Continue without login 
            </button>
            
           
            
        </div>  
    )
}
