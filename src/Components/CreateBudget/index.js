import React from 'react';
import { useState, useEffect } from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import { Navbar, Nav, NavLink, Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import getCookie from '../../../src/UseCookie';
import {useHistory} from "react-router-dom";

const CreateBudget = () => {
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorAmount, setErrorAmount] = useState("");
    const history = useHistory();

    useEffect(() => {
        async function loadCategories() {

            const promise = await fetch('http://localhost:63244/moneysaver/GetTransactionCategories')
            const categories = await promise.json()
            let serverOptions = []
            serverOptions = categories.map(c => ({
                "value": c.id,
                "label": c.type
            }))
            let options = [{"value": "", "label": "Select category"}, ...serverOptions];
            
            setOptions(options);
        }
        loadCategories();
    }, []);

    const changeAmount = (event) => {
        setAmount(event.target.value)
    }

    const changeName = (event) => {
        setName(event.target.value)
    }

    const validateAmount = (event) => {
        if (event.target.value === "") {
            setErrorAmount("Amount field is required!")
        }
    }

    const handleSubmit = event => {
        var token = getCookie('x-auth-token')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ token: token, name: name, amount: amount, transactionCategory: selectedCategory })
        };
        event.preventDefault();
        fetch('http://localhost:63244/moneysaver/createbudget', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }
                if (response.ok) {
                    response.json().then((responseJson) => {
                        if (responseJson.id === -1) {
                            setErrorName("The Buget Name already exists!");
                        }
                        else {
                            setErrorName("");
                        }
                    })
                    history.push("/Home")
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const changeCategory = (event) => {
        setSelectedCategory(event.target.value)
    }

    return (
        <Container>
            <form className='form' onSubmit={handleSubmit}>
                <label for="budgetName">Budget Name: </label>
                <input type="text" id="budgetName" onChange={changeName}></input>
                <label for="amount">Amount: </label>
                <input type="number" id="amount" onChange={changeAmount} onBlur={validateAmount}></input>
                <span>{errorAmount}</span>
                <label for="category">Category: </label>
                <select field="Category" id="category" onChange={changeCategory}>
                    {options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <span>{errorName}</span>
                <Button variant="success" type="submit">Add Budget</Button>
            </form>

        </Container>
    )
}

export default CreateBudget;