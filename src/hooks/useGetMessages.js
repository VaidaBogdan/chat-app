import { useEffect, useState } from 'react'
import { useConversation } from './useConversation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getMessagesRoute } from '../utils/apiRoutes';

const toastOptions = {

    position: "bottom-right",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: false,
    hideProgressBar: true,
    theme: "dark"
};

const useGetMessages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        const getMesages = async () => {
            setIsLoading(true);
            try {
                const route = getMessagesRoute.replace(':id', selectedConversation._id);
                const data = await axios.get(route, { withCredentials: true })
                if(data.error){
                    throw new Error(data.error)
                }
                setMessages(data.data);
            }
            catch (error) {
                console.log(error.response.data.message);
                toast(error.response.data.message, toastOptions);
            }
            finally {
                setIsLoading(false);
            }

        }
        if(selectedConversation?._id) getMesages();

    }, [selectedConversation?._id, setMessages])

    return {isLoading, messages};

}

export default useGetMessages