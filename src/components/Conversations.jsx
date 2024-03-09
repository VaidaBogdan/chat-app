import styled from "styled-components";
import { useGetConversations } from "../hooks/useGetConversations"
import { Conversation } from "./Conversation";

export const Conversations = () => {

    const {isLoading, conversations} = useGetConversations();

    return(
        <Container>
            {!isLoading && conversations.map( (conversation) => ( <Conversation key={conversation._id}conversation={conversation} />) )}
            {isLoading && (<h3>Loading...</h3>)}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 1rem;

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