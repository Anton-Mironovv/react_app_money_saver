import React from 'react';
import {useState, useEffect} from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import getCookie from '../../../src/UseCookie';
import {Navbar, Nav, NavLink, Container, Row, Col, Jumbotron, Button} from 'react-bootstrap';



const AddTransaction = () => {

    const [options, setOptions] = useState([]);
    const [errorName, setErrorName]= useState("");
    const [errorAmount, setErrorAmount]= useState("");
    const [amount, setAmount]= useState("");
    const [selectedBudget, setSelectedBudget]= useState("");

    useEffect( () => {
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
                
                if(response.ok){
                    response.json().then((responseJson) => {
                        //console.log(responseJson)
                        let options = []
                        options = responseJson.map(c => ({
                            "value": c.id,
                            "label": c.name
                        }))
                    console.log(options);
                         setOptions(options);
                    })
                    //console.log("response.ok")
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
            body: JSON.stringify({ token: token , amount: amount, selectedBudget: selectedBudget })
        };
        console.log(requestOptions)
        event.preventDefault();
        fetch('http://localhost:63244/moneysaver/createtransaction', requestOptions)
        .then(async response => {
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                return Promise.reject(error);
            }
            if(response.ok){
                response.json().then((responseJson) => {
                    console.log("here")
                    // if(responseJson.id === -1) {
                    //     setErrorName("The Buget Name already exists!");
                    // }
                    // else{
                    //     setErrorName("");
                    // }
                })
                console.log("response.ok")
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
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
        <div>
            <Menu/>
        <br/>
        <Container>  
                    <Row>
                            <Col></Col>
                            <Col md={ 8 }>
                                <Jumbotron>
                                    <form onSubmit={handleSubmit}>
                                        <input type="number" onChange= {changeAmount} onBlur={validateAmount}></input>
                                        <span>{errorAmount}</span>
                                        <select field="Budget" onChange={changeBudget}>
                                            {options.map(option =>
                                            <option key={option.value} value={option.value}>{option.label}</option>)}
                                        </select>
                                        <span>{errorName}</span>
                                        <Button variant="success" type="submit">Add Transaction</Button>
                                    </form>
                                </Jumbotron>
                            </Col>
                            <Col></Col>
                    </Row>
        </Container>
            <Footer/>
        </div>)
    }


export default AddTransaction;