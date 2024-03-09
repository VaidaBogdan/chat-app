import styled from "styled-components"
import { useConversation } from "../hooks/useConversation";

export const Conversation = ({conversation}) =>{

    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;


    return(
        <Container data-isselected={isSelected} onClick={() => setSelectedConversation(conversation)}>
            <div className="user-info">
                <p className="user-name">{conversation.username}</p>
            </div>
        </Container>
        
    )

}

const Container = styled.div `
    display: flex;
    padding: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
    background-color: ${props => props['data-isselected'] ? 'black' : 'white'};
    color: ${props => props['data-isselected'] ? 'white' : 'black'};
    flex: 1 1 0%;
    border-radius: 5px;
    border: 2px solid black;
    .user-info{
        display: flex;
        justify-content:space-between;
        font-weight:bold;
    }
    &:hover{
        background-color: #a2a2a2;
    }
`