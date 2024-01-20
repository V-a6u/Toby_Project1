import React, { useState } from 'react';
import { SERVER_URL } from '../Login/constants.js';
import Home from '../Home/Home.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { useNavigate } from 'react-router';
import { withRouter } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' })
    const [isAuthenticated, setAuth] = useState(false);
    
    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const login = () => {
        axios
            .post(SERVER_URL + 'api/token/login', user)
            .then((res) => {
                if (res.data.authorizationToken) {

                    console.log("Token data: " + res.data.authorizationToken)
                    const jwtToken = res.data.authorizationToken;
                    if (jwtToken) {
                        sessionStorage.setItem("jwt", jwtToken);
                        localStorage.setItem("user", user);
                        setAuth(true);
                       /**  if (res.AccessToken)
                        {
                            localStorage.setItem("jwt", res.AccessToken);
                            sessionStorage.setItem("jwt", jwtToken);
                        }*/
                        
                    }
                    else {
                        toast.warn('Check your username and password 1', {
                            //position: toast.POSITION.BOTTOM_LEFT
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error.message)
                toast.error('Check your username and password', {
                    //position: toast.POSITION.BOTTOM_LEFT
                })
            })
    }

    if (isAuthenticated === true) {
        //navigate('/');
        //return (<Home/>)
        window.history.back();
        //history.back();
    }
    else {
        return ( 
        <>
            <div className="container">
           
           
                <div className="row justify-content-center">
                
                    <div className="col-lg-8 col-md-5 col-lg-8">
                        <form>
                        <h1 class="display-6 text-black">Login:</h1>
            <br />
                            <div className="row">
                                
                                    <div className="form-group text-black">    
                        <label for="Username" >Username: </label><br/>
            <input type={"text"} name="username"label="Username" onChange={handleChange} /><br/>
            </div>
            
            <div className='form-group text-black'>
            <label for="Username" >Password: </label><br/>
 <input type="password" name="password"
            label="Password" onChange={handleChange} /><br/><br/>
            </div>
            <div className="text-end">
                            &nbsp;
                            <div className="d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-primary mb-2 p-3"  style={{ width: "200px" }}  onClick={login}> 
     Login
 </button>
 </div>
 </div>
 </div>
 <br/>
 <br/>
 <ToastContainer autoClose={5000} />

 </form>
</div>

</div>
 </div>
 </>

        );
    }
}

export default Login;