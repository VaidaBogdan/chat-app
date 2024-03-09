import styled from 'styled-components';
import { useLogout } from '../hooks/useLogout'
import { FaSignOutAlt } from 'react-icons/fa';

export const LogoutButton = () => {

    const {logout} = useLogout();

    return (
        <Container>

            <button onClick={logout}>
            <FaSignOutAlt />
            </button>
        </Container>
        
    )
}

const Container = styled.div`

    flex-direction: column;
    display: flex;
    margin-top: auto;
    width: 100%;

    button{
        background-color: white;
        border: 2px solid black;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight:bold;
        padding: 0.25rem;
        &:hover{
            background-color: #d6d6d6;
        }
    }

`
