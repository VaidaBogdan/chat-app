import { useState } from "react";
import { registerRoute } from "../utils/apiRoutes";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


const toastOptions = {

    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: false,
    hideProgressBar: true,
    theme: "dark"
};

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const{setAuthUser} = useAuthContext();


    const register = async({username, password}) =>{

        const val = handleValidation({username, password})
        if(!val) return;

        setIsLoading(true);
        try{
            const data = await axios.post(registerRoute, {username, password}, { withCredentials: true });
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user",JSON.stringify(data.data))
            setAuthUser(data.data)

        }
        catch(error){
            toast(error.response.data.message, toastOptions);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {isLoading, register};
}

function handleValidation({username, password}) {

    if (username.length <= 3) {
        toast("Username should be 4+ characters long!", toastOptions);
        return false;
    }
    if (password.lenght < 8) {
        toast("Password should be 8+ characters long!", toastOptions);
        return false;
    }
    return true;
}