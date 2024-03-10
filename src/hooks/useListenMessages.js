
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext'
import { useConversation } from './useConversation';

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(() =>{
    socket?.on('newMessage', (message) => {
      setMessages([...messages, message]);
    })
    return () => socket?.off('newMessage');
  },[socket, messages, setMessages])

}

export default useListenMessages