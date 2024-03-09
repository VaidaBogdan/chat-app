import React from 'react'
import styled from 'styled-components'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'

const Messages = () => {

  const {isLoading, messages} = useGetMessages();

  return (
    <Container>
      {!isLoading && messages.length> 0 && messages.map( (message) => (<Message key={message._id} message={message}/>))}

      {!isLoading && messages.length === 0 && (<h3>Send a message to start the conversation!</h3>)}

      {isLoading && (<h3>Loading...</h3>)}

    </Container>
  )
}

export default Messages

const Container = styled.div`

    flex: 1 1 0%;
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: auto;
    background-color: #808080;
    h3{
      color: white;
      text-align: center;
      margin-top: 1rem;
    }

    &::-webkit-scrollbar {
      width: 10px; 
  }

  &::-webkit-scrollbar-track {
      background: #303030; 
  }

  &::-webkit-scrollbar-thumb {
      background: #888; 
      border-radius: 5px; 
  } 

  &::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }

`