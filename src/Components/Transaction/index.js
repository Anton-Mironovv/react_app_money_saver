import React from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import { useState, useEffect } from 'react';
import getCookie from '../../../src/UseCookie';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        async function loadTransactions() {

            var token = getCookie('x-auth-token')
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ token: token })
            }
            fetch('http://localhost:63244/moneysaver/ReadTransactions', requestOptions)
                .then(async response => {

                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = response.status;

                        return Promise.reject(error);
                    }

                    if (response.ok) {
                        response.json().then((responseJson) => {
                            console.log(responseJson);
                            setTransactions(responseJson)
                        })
                        //console.log("response.ok")
                    }
                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });
        }
        loadTransactions();
    }, []);

    return (
        <table className="home-table">
            <tbody>
                <tr><td>Budget Name</td><td>Amount</td><td>Category Name</td></tr>

                {transactions.map((transaction, index) =>
                    <tr key={index}>
                        <td>{transaction.budgetName}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.categoryName}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Transaction;