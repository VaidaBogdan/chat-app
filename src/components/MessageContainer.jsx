import React, { useEffect } from 'react'
import styled from 'styled-components'
import Messages from './Messages'
import InputField from './InputField'
import { useConversation } from '../hooks/useConversation'

const MessageContainer = () => {

    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null)
    },[setSelectedConversation])

    return (
        <Container>

            { !selectedConversation ? (<NoConversationSelected />) :
                (<>
                    <div className="header">
                        <h3 className="user">{selectedConversation.username}</h3>
                    </div>

                    <Messages />
                    <InputField /></>)}


        </Container>

    )
}

export default MessageContainer

const NoConversationSelected = () => {
    return (
        <Container>
            <div className="no-conversation">
                <h3>Select a conversation to start chatting!</h3>
            </div>
        </Container>
    )
}

const Container = styled.div`
    @media (min-width: 768px){
        min-width: 450px;
    }
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #303030;
    height:100%;

    .header{
        padding: 0.5rem 1rem;
        background-color: black;
        color:white;
        font-size: 1rem;
        font-weight: bold;
        flex: 0.05;
        .user{
        }
    }

    .no-conversation{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color:white;
    }

`