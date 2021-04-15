import React from 'react';
import { useState, useEffect } from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import getCookie from '../../../src/UseCookie';
import { Navbar, Nav, NavLink, Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom";



const AddTransaction = () => {

    const [options, setOptions] = useState([]);
    const [errorName, setErrorName] = useState("");
    const [errorAmount, setErrorAmount] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const history = useHistory();

    useEffect(() => {
        async function loadBudgets() {

            var token = getCookie('x-auth-token')
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ token: token })
            }

            fetch('http://localhost:63244/moneysaver/ReadBudgets', requestOptions)
                .then(async response => {

                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = response.status;

                        return Promise.reject(error);
                    }

                    if (response.ok) {
                        response.json().then((responseJson) => {
                            let serverOptions = []
                            serverOptions = responseJson.map(c => ({
                                "value": c.id,
                                "label": c.name
                            }))
                            let options = [{"value": "", "label": "Select category"}, ...serverOptions];
                            setOptions(options);
                        })
                    }
                })
        }
        loadBudgets();
    }, []);

    const handleSubmit = (event) => {
        var token = getCookie('x-auth-token')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ token: token, amount: amount, selectedBudget: selectedBudget })
        };
        event.preventDefault();
        fetch('http://localhost:63244/moneysaver/createtransaction', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }
                if (response.ok) {
                    response.json().then((responseJson) => {
                        history.push("/Transactions")
                    })
                    console.log("response.ok")
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const changeAmount = (event) => {
        setAmount(event.target.value);
    }

    const validateAmount = () => {

    }

    const changeBudget = (event) => {
        //console.log(event.target.value)
        setSelectedBudget(event.target.value);
    }

    return (
        <Container>
            <form className="form" onSubmit={handleSubmit}>
                <label for="amount">Amount: </label>
                <input type="number" id="amount" onChange={changeAmount} onBlur={validateAmount}></input>
                <span>{errorAmount}</span>
                <label for="budget">Budget: </label>
                <select field="Budget" id="budget" onChange={changeBudget}>
                    {options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <span>{errorName}</span>
                <Button variant="success" type="submit">Add Transaction</Button>
            </form>
        </Container>
    )
}


export default AddTransaction;