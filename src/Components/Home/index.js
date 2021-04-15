import React, { useState, useEffect } from 'react';
import './Home.css';
import getCookie from '../../UseCookie';
import {useHistory} from "react-router-dom"

const Home = () => {
    const [budgets, setBudgets] = useState([]);

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
                        const error = response.status;

                        return Promise.reject(error);
                    }

                    if (response.ok) {
                        response.json().then((responseJson) => {
                            setBudgets(responseJson);
                        })
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
        loadBudgets();
    }, []);

    return (
        <table className="home-table">
            <tbody>
                <tr><td>Budget Name</td><td>Category</td><td>Amount</td></tr>

                {budgets.map((budget, index) =>
                    <tr key={index}>
                        <td>{budget.name}</td>
                        <td>{budget.categoryName}</td>
                        <td>{budget.amount}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Home;