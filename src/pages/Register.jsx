import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';
import { useRegister } from '../hooks/useRegister.js';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {isLoading, register} = useRegister();


    const handleSubmit = async (event) => {
        event.preventDefault();
        await register({username, password})

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
        <RegisterFormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="welcome-container">
                    <h1>Welcome to the chat!</h1>
                </div>
                <input type="text" placeholder="Enter a username..." name="username" onChange={(event) => handleChangeUsername(event)} />
                <input type="password" placeholder="Enter a password..." name="password" onChange={(event) => handleChangePassword(event)} />
                <button type="submit" hidden={isLoading}>Register your user</button>
                <span>Already have an account? Login <Link className="login-link"to="/login">here</Link></span>
            </form>
        </RegisterFormContainer>
    </>

    )
}

const RegisterFormContainer = styled.div`
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
        }
        .login-link{
            padding: 0.25rem;
        }
    }
    `;

export default Register;