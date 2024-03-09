import React, { useState } from 'react'
import styled from 'styled-components'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../hooks/useSendMessage';

const InputField = () => {

    const [message, setMessage] = useState('');
    const {isLoading, sendMessage} = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message)return;
        await sendMessage(message);
        setMessage('');

    }
  return (
    <Container>
        <form onSubmit={handleSubmit}>
            <div className="form">
                <input type="text" className="input" placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" disabled={isLoading} className="button"><BsSend /></button>
            </div>
        </form>
    </Container>
  )
}

export default InputField

const Container = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    flex: 0.1;
    width: 100%;
    height: 100%;
    border: 1px solid black;

    .form{
        width: 100%;
        border-radius: 2rem;
        border: 2px solid white;
        display: flex;
        align-items: center;
        gap: 4rem;
        background-color: white;
        justify-content: space-between;
        input { 
            width: 95%;
            height: 60%;
            background-color: transparent;
            color: black;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: grey;
            }
            &:focus{
                outline: none;
            }
        }
        button {
            margin-left: auto;
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
            border: none;
            color: white;
            &:hover{
                background-color: #333333;
            }
            
        }
    }

    }

`