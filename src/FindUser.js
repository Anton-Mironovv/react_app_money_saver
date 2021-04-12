import { useState, useEffect } from 'react';
import getCookie from '../src/UseCookie.js';
export default function useFindUser() {
   const [user, setUser] = useState(null);
   
    useEffect( () => {
        function findUser() {
        var token = getCookie('x-auth-token')
        const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };

        fetch('http://localhost:63244/autentication/Verify?token='+ token, requestOptions)
        .then(res => {
            if (res.ok) {
                res.json().then((responseJson) => {
                    setUser(responseJson);
                })
            }
    }).catch(err => {
        console.log(err)
    });
  }   findUser();
}, []);

return {
   user,
   setUser
   }
}