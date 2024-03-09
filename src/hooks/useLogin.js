import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginRoute } from "../utils/apiRoutes";

const toastOptions = {

    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: false,
    hideProgressBar: true,
    theme: "dark"
};

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const{setAuthUser} = useAuthContext();


    const login = async({username, password}) =>{

        const val = handleValidation({username, password})
        if(!val) return;

        setIsLoading(true);

        try{
            const data = await axios.post(loginRoute, {username, password}, { withCredentials: true });
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

    return {isLoading, login};
}

function handleValidation({username, password}) {

    if (!username || !password ){
        toast("Please fill in both fields", toastOptions)
        return false;
    }
    return true;
}