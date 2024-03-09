import { useState } from "react"
import { logoutRoute } from "../utils/apiRoutes";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";


const toastOptions = {

    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: false,
    hideProgressBar: true,
    theme: "dark"
};

export const useLogout = () =>{

    const [isLoading, setIsLoading] = useState(false)
    const {setAuthUser} = useAuthContext();


    const logout = async () =>{
        setIsLoading(true);
        try{
            const data = await axios.post(logoutRoute)
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        }
        catch(error){
            console.log(error.response.data.message)
            toast(error.response.data.message, toastOptions);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {isLoading, logout};
}