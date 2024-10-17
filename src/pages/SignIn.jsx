import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword , getAuth} from "firebase/auth"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { toast } from "react-toastify";
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from "../components/OAuth";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password  } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState , 
            [e.target.id] : e.target.value
        })
    )
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        try {
            const auth = getAuth();
            const userCredenntial = await signInWithEmailAndPassword(auth , email , password)
            userCredenntial.user && navigate('/')
            toast.success(`${userCredenntial.user.displayName} Logged in`)
        } catch (error) {
            toast.error('bad user credentials')
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
                            onClick={()=> setShowPassword((prevState)=>!prevState)}/>
                         </div>
                        <Link to='/forgot-pasword'
                        className="forgotPasswordLink">
                            Forgot Password
                        </Link>

                        <div className="signInBar">
                            <p className="signInText">
                                Sign In
                            </p>
                            <button className="signInButton"> 
                                <ArrowRightIcon fill="#ffffff" width='34px' height='34px' />
                            </button>
                        </div>
                    </form>
                    <OAuth/>
                    <Link to='/sign-up' className="registerLink">Sign up Instead</Link>
            </div>
        </>
    )

}
export default SignIn;