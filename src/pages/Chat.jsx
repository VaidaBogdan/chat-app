import styled from 'styled-components';
import { Sidebar } from '../components/Sidebar';
import MessageContainer from '../components/MessageContainer';

function Chat() {

    return(
        <Container>
            <Sidebar />
            <MessageContainer />
        </Container>
        
    )
}

const Container = styled.div`

    @media (min-width: 512px){
        min-height: 450px;
    }
    @media (min-width: 768px){
        min-height: 550px;
    }
    height: 75vh;
    width: 100%;
    margin: auto;
    display: flex;
    justify-content:center;
    align-items: stretch;
    background-color: #303030;
    border: 3px solid white;
    border-radius: 2px;
`

export default Chat;