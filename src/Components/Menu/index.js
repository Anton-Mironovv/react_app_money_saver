import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import style from './Navigation.css';
import {Input, Row, Col, Container, Button, Jumbotron} from 'react-bootstrap'
import { UserContext } from '../../UserContext';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import NavigationItem from './NavigationItem';

const Header = () => {
    const {user, setUser} = useContext(UserContext);
    const isAdmin = user && user.role === "Administrator"
    
    const logOut = () => {
        document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        setUser(null)
    }
    return(
        <header>
            <nav className="navigation">
                <ul id="menuItems">
                
                           {user ? <li><Link className="nav-link" to="/Home" ><NavigationItem>Home</NavigationItem></Link></li> : ""}  
                           {user ? "" : <li><Link className="nav-link" to="/Login"><NavigationItem>Login</NavigationItem></Link></li>}
                           {user ? "" : <li><Link className="nav-link" to="/Register"><NavigationItem>Register</NavigationItem></Link></li>}
                           {user ? <li><Link  className="nav-link"  to="/Budget" >Add Budget</Link></li> : ""}
                           {user ? <li><Link  className="nav-link"  to="/AddTransaction" >Add Transaction</Link></li> : ""}
                           {user ? <li><Link  className="nav-link"  to="/Transactions" >Your Transactions</Link></li> : ""}
                           {user ? <li><Link  className="nav-link"  to="/" onClick={logOut}>Log Out</Link></li> : ""}
                </ul>
            </nav>
        </header>
    )
}

export default Header

