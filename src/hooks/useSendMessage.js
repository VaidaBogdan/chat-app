import axios from "axios";
import { sendMessageRoute } from "../utils/apiRoutes";
import { useConversation } from "./useConversation";
import { toast } from "react-toastify";
import { useState } from "react";

const toastOptions = {

    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: false,
    hideProgressBar: true,
    theme: "dark"
};

const useSendMessage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async (message) => {
        setIsLoading(true);
        try {
            const route = sendMessageRoute.replace(':id', selectedConversation._id);
            const data = await axios.post(route, { message }, { withCredentials: true });
            if(data.error){
                throw new Error(data.error)
            }

            setMessages([...messages, data.data]);
        }
        catch (error) {
            console.log(error.response.data.message)
            toast(error.response.data.message, toastOptions);
        }
        finally {
            setIsLoading(false);
        }
    }

    return {isLoading, sendMessage}
}

export default useSendMessage