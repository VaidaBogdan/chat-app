import React from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../context/AuthContext'
import { useConversation } from '../hooks/useConversation';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;

  return (
    <Container>
        <div className={`chat-bubble ${fromMe ? 'from-me' : ''}`}>
            {message.content}
        </div>

    </Container>
  )
}

export default Message

const Container = styled.div`

    flex: 1 1 0%;
    padding-left: 0.5rem:
    padding-right: 0.5rem;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .chat-bubble{
        max-width: 60%;
        padding: 10px 20px;
        margin: 10px 0;
        border-radius: 25px;
        background-color: white; 
        color: black; 
        align-self: flex-start;
    }

    .chat-bubble.from-me{
      background-color: black; 
      color: white; // text alb
      align-self: flex-end;
  }
`