import { useLocation , useNavigate} from "react-router-dom"
import {getAuth , signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc , setDoc , getDoc , serverTimestamp} from 'firebase/firestore'
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import googleIcon from '../assets/svg/googleIcon.svg'
const OAuth = ()=>{
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async()=>{
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider();
            const results = await signInWithPopup(auth , provider);
            const user = results.user;

            //check for user
            const docRef = doc(db , 'users' , user.uid);
            console.log(docRef);
            const docSnap = await getDoc(docRef);
            console.log(docSnap);

            //if user doesnt exits , create user
            if(!docSnap.exists()){
                await setDoc(doc(db,'users' , user.uid) , {
                    name: user.displayName,
                    email: user.email,
                    createdAt: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    }

    return (
        <div className="socialLogin">
            <p>Sign {location.pathname === './sign-up' ? 'up' : 'in'} with </p>
        <button 
        className="socialIconDiv" 
        onClick={onGoogleClick}>
            <img  className="socialIconImg" src={googleIcon} alt="google" width="34px"/>
        </button>
        </div>
    )
}
export default OAuth