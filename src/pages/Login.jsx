import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLogin } from '../hooks/useLogin';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {isLoading, login} = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login({username, password});

    }

    const handleChangeUsername = (event) => {
        event.preventDefault();
        setUsername(event.target.value);

    }

    const handleChangePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    return (<>
        <LoginFormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="welcome-container">
                    <h1>Welcome back!</h1>
                </div>
                <input type="text" placeholder="Enter a username..." name="username" onChange={(event) => handleChangeUsername(event)} />
                <input type="password" placeholder="Enter a password..." name="password" onChange={(event) => handleChangePassword(event)} />
                <button type="submit" hidden={isLoading}>Login</button>
                <span>Don't have an account? Make one <Link className="register-link"to="/register">here</Link></span>
            </form>
        </LoginFormContainer>
    </>

    )
}

const LoginFormContainer = styled.div`
    height:100vh;
    width:100vw;
    background-color:#303030;
    justify-content:center;
    gap: 1rem;
    flex-direction: column;
    display:flex;
    align-items: center;
    .welcome-container{
        display:flex;
        align-items:center;
        justify-content:center;
    }

    form{
        flex-direction: column;
        display: flex;
        gap: 1rem;
        background-color: black;
        border-radius: 10px;
        padding: 3rem 3rem;
        h1{
            color: white;
            padding: 1.5rem;
        }
        input{
            padding: 1rem;
            background-color: transparent;
            border: 2px solid white;
            border-radius: 1rem;
            font-size: 1rem;
            witdh: 100%;
            color:white;
        }
        button{
            border-radius:15px;
            background-color: white;
            padding: 1rem;
            border: 2px solid black;
            cursor: pointer;
            font-size: 1rem;
            font-weight:bold;
            transition: 0.2s ease-in-out;
            &:hover{
                background-color: #d6d6d6;
            }
        }
        span{
            font-size: 0.8rem;
            color: white;
            text-transform: uppercase;
            a {
                color: #b5b5b5;
                text-decoration:none;

            }
            display: flex;
            align-items: center;
            justify-content:center;
            padding: 0.5rem;
        }
        .register-link{
            padding: 0.5rem;
        }
    }
    `;

export default Login;