import React from 'react';
import {useState, useEffect} from 'react'
import Menu from '../Menu';
import Footer from '../Footer';
import {Navbar, Nav, NavLink, Container, Row, Col, Jumbotron, Button} from 'react-bootstrap';
import getCookie from '../../../src/UseCookie';

const CreateBudget = () => {
    const [options, setOptions] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [amount, setAmount]= useState("");
    const [name, setName]= useState("");
    const [errorName, setErrorName]= useState("");
    const [errorAmount, setErrorAmount]= useState("");
    
    useEffect( () => {
        async function loadCategories() {
            
                const promise = await fetch('http://localhost:63244/moneysaver/GetTransactionCategories')
                const categories = await promise.json()
                let options = []
                options = categories.map(c => ({
                    "value": c.id,
                    "label": c.type
                }))
            console.log(options);
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
        if(event.target.value === ""){
            setErrorAmount("Amount field is required!")
        }
    }

    const handleSubmit = event => {
        var token = getCookie('x-auth-token')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ token: token , name: name, amount: amount, transactionCategory: selectedCategory })
        };
        event.preventDefault();
        fetch('http://localhost:63244/moneysaver/createbudget', requestOptions)
        .then(async response => {
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                return Promise.reject(error);
            }
            if(response.ok){
                response.json().then((responseJson) => {
                    if(responseJson.id === -1) {
                        setErrorName("The Buget Name already exists!");
                    }
                    else{
                        setErrorName("");
                    }
                })
                console.log("response.ok")
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    const changeCategory = (event) => {
        setSelectedCategory(event.target.value)
    }

    return (
    <div>
        <Menu/>
    <br/>
    <Container>  
                <Row>
                        <Col></Col>
                        <Col md={ 8 }>
                            <Jumbotron>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" onChange= {changeName}></input>
                                    <input type="number" onChange= {changeAmount} onBlur={validateAmount}></input>
                                    <span>{errorAmount}</span>
                                    <select field="Category" onChange={changeCategory}>
                                        {options.map(option =>
                                        <option key={option.value} value={option.value}>{option.label}</option>)}
                                    </select>
                                    <span>{errorName}</span>
                                    <Button variant="success" type="submit">Add Budget</Button>
                                </form>
                            </Jumbotron>
                        </Col>
                        <Col></Col>
                </Row>
    </Container>
        <Footer/>
    </div>)
}

export default CreateBudget;