import React, {useState} from 'react'
import { validateLogin } from "../../app/actions/Validation.jsx";
import { loggedIn } from "../../app/actions/LoggedActions.jsx";
import { Alert } from 'react-bootstrap'

import { useDispatch, useSelector } from "react-redux";
const Login = ({logged, setLogged}) => {
    const dispatch = useDispatch()
    const isValid = useSelector(state => state.validate)
    const [errorLogin, setErrorLogin] = useState(false)
    
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(form);
        const res = await dispatch(validateLogin(form));
        console.log(res.data);
        if(res.data !== -1){
            window.location.href = "/";
            console.log(res.data);
            dispatch(loggedIn(res.data));
            console.log(logged);
            setLogged(!logged);
            console.log(logged);
        }
        else{
            setErrorLogin(!errorLogin);
        }
    };

    return (
        <div className="auth-outer">
            <form className="auth-inner-login" onSubmit={handleSubmit}>
                <div className="loginWrapper">
                    <h3>Log in</h3>
                    {errorLogin && <Alert variant="danger">Incorrect username and password</Alert>}
                    <div className="form-group">
                        <label>Username</label>
                        <input required type="text" id="username" className="form-control" placeholder="Enter username" onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input required type="password" id="password" className="form-control" placeholder="Enter password" onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                    
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form> 
        </div>
    )
}
export default Login
