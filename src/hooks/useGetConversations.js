import { useEffect, useState } from "react"
import { usersRoute } from "../utils/apiRoutes";
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

export const useGetConversations = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setIsLoading(true);
            try {
                const data = await axios.get(usersRoute, { withCredentials: true })
                if(data.error){
                    throw new Error(data.error)
                }

                setConversations(data.data)

            }
            catch (error) {
                toast(error.response.data.message, toastOptions);
            }
            finally {
                setIsLoading(false);
            }

        }
        getConversations()
    }, [])

    return {isLoading, conversations};
}