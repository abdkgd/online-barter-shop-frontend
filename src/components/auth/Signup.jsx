import React, { useState , useEffect } from 'react'
import blank from '../../assets/images/male-1.svg'
import { getUsers } from '../../app/actions/UserActions.jsx'
import { addAccount } from "../../app/actions/AccountActions.jsx";
import { loggedIn } from "../../app/actions/LoggedActions.jsx";
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";

const Signup = ({logged, setLogged}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user) 

    useEffect(() => {
        dispatch(getUsers());
    }, [])
    
    const [profileImg, setProfileImg] = useState(blank)
    const [showAlert1, setShowAlert1] = useState(false)
    const [showAlert2, setShowAlert2] = useState(false)
    const [form, setForm] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        rating: 0,
        phoneNumber: '',
        profilePhoto: ''
    })
    const [reenter, setReenter] = useState({
        repassword: ''
    });


    const imageHandler = (e) => {
        
        const reader = new FileReader();
        console.log(reader)
        console.log(reader.onload);

        reader.onload = () =>{
            if(reader.readyState === 2){
                setProfileImg(reader.result)
                setForm({
                    ...form,
                    [e.target.id]: reader.result
                })
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch (error) {
            setProfileImg(blank);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    };

    const handleChangeReenter = (e) => {
        setReenter({
            repassword: e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        let flag = false;
        for (let index = 0; index < userData.length; index++) {
            if(userData[index].username === form.username){
                flag = true;
            }
        }
        let postForm = false;
        if(flag){
            setShowAlert2(true)
            postForm = true;
        }
        else{
            setShowAlert2(false)    
        }

        if(form.password !== reenter.repassword){
            setShowAlert1(true);
            postForm = true;
        }
        else{
            setShowAlert1(false);
        }
        if(!postForm){
            console.log(form);
            const res = await dispatch(addAccount(form));
            window.location.href = "/";
            console.log(res.data.id);
            window.localStorage.clear();
            dispatch(loggedIn(res.data.id));
            setLogged(!logged);
        }
    };
    return (
        <div className="auth-outer">
            <form className="auth-inner" onSubmit={handleSubmit}>
                {showAlert1 && <Alert variant="danger">Password do not match!!</Alert>}
                {showAlert2 && <Alert variant="danger">Username already exist!!</Alert>}
                <div className="container">
                    <h3>Register</h3>
                    <div className="row">
                            <div className="col">
                                <div className="profileWrapper lineWrap">
                                    <label>Add Profile Image</label>
                                    <div className="form-group">
                                        <div className="imgWrapper">
                                            <img src={profileImg} alt="" className="img border border-dark rounded-circle" />
                                        </div>
                                        <div className="imgInputWrapper">
                                            <input required type="file" accept="image/*" name="image-upload" className="imgInput" onChange={imageHandler} id="profilePhoto"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input required type="text" className="form-control" placeholder="Enter username" onChange={handleChange} id="username"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required type="password" className="form-control" placeholder="Enter password" onChange={handleChange} id="password"/>
                                </div>

                                <div className="form-group">
                                    <label>Reenter Password</label>
                                    <input type="password" className="form-control" placeholder="Reenter password" onChange={handleChangeReenter} id="repassword"/>
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input required type="email" className="form-control" placeholder="Enter email" onChange={handleChange} id="email"/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>First name</label>
                                    <input required type="text" className="form-control" placeholder="First name" onChange={handleChange} id="firstname"/>
                                </div>

                                <div className="form-group">
                                    <label>Last name</label>
                                    <input required type="text" className="form-control" placeholder="Last name" onChange={handleChange} id="lastname"/>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input required type="tel" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" className="form-control" placeholder="Enter Phone Number" onChange={handleChange} id="phoneNumber"/>
                                </div>
                                <div className="btnWrapper">
                                    <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                                    <p className="forgot-password text-right">
                                        Already registered <a href="#">log in?</a>
                                    </p>
                                </div>
                            </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default Signup
