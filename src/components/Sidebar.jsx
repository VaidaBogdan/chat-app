import styled from "styled-components"
import { Conversations } from "./Conversations"
import { LogoutButton } from "./LogoutButton"
import { useAuthContext } from "../context/AuthContext";

export const Sidebar = () => {

    const { authUser } = useAuthContext();
    return (
        <Container>
            <Conversations />
            <BottomContainer>

                <div className="logged-user">
                    {authUser && (
                        <p>{`Logged in as: ${authUser.username}`}</p>
                    )}
                </div>
                <LogoutButton />
            </BottomContainer>


        </Container>
    )
}

const Container = styled.div`

    @media (min-width: 768px){
        min-width: 250px;
    }
    border: 1px solid black;
    padding: 1rem;
    display:flex;
    flex-direction: column;
    gap: 2rem;



`

const BottomContainer = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    .logged-user{
        font-weight: bold;
        background-color: black;
        width: 100%;
        font-size: 1rem;
        color: white;
        align-items: center;
        justify-content: center;
        display: flex;
        padding: 0.5rem;
        border-radius: 5px;
        border: 2px solid white;
    }
    
`;