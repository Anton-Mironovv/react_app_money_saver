import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import { Input, Row, Col, Container, Button, Jumbotron } from 'react-bootstrap'
import Menu from '../../Components/Menu'
//import Styles from './index.module.css'
//import useAuth from '../../Hooks/useAuth';
//import {validateUsername, validateEmail, validatePassword, validatePasswordRepeat} from '../../Utils/validator.js'

const Register = () => {
    //const { registerUser, error } = useAuth();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordRepeatError, setPasswordRepeatError] = useState('')
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const values = { username, email, password, passwordRepeat, setUsernameError, setPasswordError }
        await registerUser(values);
    }

    const registerUser = async (data) => {
        const { username, password, email, setUsernameError, setPasswordError } = data;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": username, "email": email, "password": password })
        };
        fetch('http://localhost:63244/autentication/register', requestOptions).then((response) => {
            if (response.ok) {
                history.push('/login')
            } else if (response.status === 400) {
                response.json().then((result => {
                    setPasswordError(result.message)
                }))
            } else if (response.status === 401) {
                response.json().then((result => {
                    setPasswordError(result.message)
                }))
            } else if (response.status === 409) {
                response.json().then((result => {
                    setUsernameError(result.message)
                }))
            } else {
                throw new Error('Something went wrong!');
            }
        })
            .catch((error) => {
                setPasswordError("Invalid username or password.")
            });
    }

    return (
        <Container>
            <form className="form" onSubmit={handleSubmit}>
                <label for="username">User Name: </label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} ></input>
                <label for="email">Email: </label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} ></input>
                <label for="password">Password: </label>
                <input type='password' id="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <label for="repeatPassword">Repeat Password: </label>
                <input type='password' id="repeatPassword" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} ></input>
                {/* <Row>
                                        <Col sm={{size: 8, order: 2, offset: 2}}>
                                            <p className={[Styles.passwordInfo]}>*Password must be at least 6 characters long, must contain at least one upper case letter and one digit.</p>
                                        </Col>
                                    </Row> */}
                <Button variant="success" type="submit">Register</Button>
            </form>
        </Container>
    )
}

export default Register