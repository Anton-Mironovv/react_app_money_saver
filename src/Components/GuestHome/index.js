import React from 'react';
import Menu from '../Menu';
import Footer from '../Footer';

const GuestHome = () => {
    return(
        <div id="guestInfo">
            <Menu/>
            <h1><i><u>Welcome to the Money Saver World</u></i></h1>

            <p>Create you account <i>now</i> for observing how your transactions affect the family or the business budget.</p>

            <p>Taking care of the family budget is very important part of the daylife. Find more information in <a id="familyBusiness" href="https://www.simple.com/blog/effective-family-budget#:~:text=A%20family%20budget%20is%20a,categories%2C%20including%20income%20and%20expenses." target="_blank">this artile</a></p>

            <div>Thank you for joining the Money Saver App</div>

            <p>Our team is sticktly following the <a id="gdpr" href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation" target="_blank">GDPR</a> rules</p>
            <Footer/>
        </div>
    )
}

export default GuestHome;