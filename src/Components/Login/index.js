import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Button, Jumbotron } from 'react-bootstrap';
import { UserContext } from '../../UserContext';
import Menu from '../../Components/Menu';
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { user, setUser } = useContext(UserContext);
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const values = { username, password, setPasswordError }
        await loginUser(values);
    }

    const loginUser = async (data) => {
        const { username, password, setPasswordError } = data;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ "username": username, "password": password })
        };
        fetch('http://localhost:63244/autentication/login', requestOptions).then((response) => {
            if (response.ok) {
                response.json().then((responseJson) => {
                    const authToken = responseJson['token']
                    const user = responseJson['user']
                    document.cookie = `x-auth-token=${authToken}`
                    setUser(user)
                    history.push('/Home')
                })
            } else if (response.status == 401) {
                setPasswordError("Invalid username or password.")
            } else {
                throw new Error('Something went wrong!');
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div>
            <Container>

                <form className="form" onSubmit={handleSubmit}>
                    <label for="username">User Name: </label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} error={usernameError}></input>
                    <label for="password">Password: </label>
                    <input type='password' id="password" value={password} onChange={e => setPassword(e.target.value)} error={passwordError}></input>
                    <Button variant="success" type="submit">Login</Button>
                </form>
            </Container>
        </div>)
}

export default Login