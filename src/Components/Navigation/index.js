import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {UserContext} from '../../UserContext';
import LoginPage from '../Login';
import RegisterPage from '../Register';
import HomePage from '../../Components/Home';
import BudgetPage from '../CreateBudget';
import TransactionsPage from '../Transaction';
import GuestPage from '../GuestHome';
import AddTransactionsPage from '../AddTransaction';

//import ReportPage from '../../Components/Report'
//import ProfilePage from '../../Components/Profile'

const Navigation = () =>{
    const { user, setUser, isLoading } = useContext(UserContext);
    const isAdmin = user && user.role === "Administrator"
    return (
      
        <Switch>
            <Route path="/" exact component={GuestPage}/>
            <Route path="/Home" exact component={HomePage}/>
            <Route path="/Login">
                {user ? (<Redirect to="/Home" />): (<LoginPage />)}
            </Route>
            <Route path="/Register">
                {user ? (<Redirect to="/Home" />): (<RegisterPage />)}
            </Route>
            <Route path="/Budget"exact component={BudgetPage}/>
            <Route path="/Transactions"exact component={TransactionsPage}/>
            <Route path="/AddTransaction"exact component={AddTransactionsPage}/>
            
            {/* <Route path="/Report"> 
                {user && isAdmin ? (<ReportPage />) : (<Redirect to="/" />) }
            </Route>
            <Route path="/Profile"> 
                {user ? (<ProfilePage />) : (<Redirect to="/" />) }
            </Route> */}
        </Switch>
        )
}

export default Navigation