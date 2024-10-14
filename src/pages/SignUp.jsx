import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import {doc , setDoc , serverTimestamp} from 'firebase/firestore'
import {  updateProfile , getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name : '',
        email: '',
        password: ''
    })
    const { name , email, password } = formData;
    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState , 
            [e.target.id] : e.target.value
        })
    )
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth , email , password);

            const user = userCredential.user;
            updateProfile(auth.currentUser,{
                displayName:name
            })

            navigate('/')

            const copyFormData = {...formData}
            delete copyFormData.password;
            copyFormData.serverTimeStamp = serverTimestamp();

            await setDoc(doc(db , "users" , user.uid) , copyFormData);
            toast.success(`${name} signed up`)
        } catch (error) {
            toast.error('something went wrong with registration');
        }
    }
    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Welcome Back!
                    </p>
                </header>

                <form onSubmit={onSubmit}>

                <input type="text"
                        id="name"
                        className="nameInput"
                        placeholder="Name"
                        value={name}
                        onChange={onChange}
                         />

                    <input type="email"
                        id="email"
                        className="emailInput"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                    />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange} />

                        <img src={visibilityIcon} alt="showPassword" className="showPassword"
                            onClick={() => setShowPassword((prevState) => !prevState)} />
                    </div>

                    <div className="signInBar">
                        <p className="signInText">
                            Sign Up
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill="#ffffff" width='34px' height='34px' />
                        </button>
                    </div>
                </form>
                {/* google Auth */}
                <Link to='/sign-in' className="registerLink">Sign In instead</Link>
            </div>
        </>
    )

}
export default SignUp;