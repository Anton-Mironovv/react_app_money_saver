import React, {useState, useEffect} from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import getCookie from '../../UseCookie';

const Home = () => {
    const [budgets, setBudgets] = useState([]);

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
                        setBudgets(responseJson) 
                    })
                    //console.log("response.ok")
                }
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        }
        loadBudgets();
    }, []);

    return (
    <div>
        <Menu/>
    <br/>
    <table>
        <tbody>
            <tr><td>Category</td><td>Amount</td></tr>

        {budgets.map((budget, index) =>
            <tr key= {index}>
                <td>{budget.categoryName}</td>
                <td>{budget.amount}</td>
            </tr>
        )}
        </tbody>
        </table>
    <Footer/>
    </div>)
}

export default Home;