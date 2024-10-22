import { useState } from "react";
import { getAuth , updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc ,doc} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'


const Profile = () => {
    const auth = getAuth();
    const [changeDetails , setChangeDetails] = useState(false)
    const [formData , setFormData] = useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email,
    })
    const {email , name} = formData
    const navigate = useNavigate()

    const onLogout = ()=>{
        auth.signOut();
        navigate('/');
    }

    const onSubmit = async(e)=>{
        try{
            if(auth.currentUser.displayName !== name){
                //update displayName in fb
                await updateProfile(auth.currentUser , {
                    displayName:name
                })

                //update in firestore
                const userDoc = doc(db, 'users' , auth.currentUser.uid)
                await updateDoc(userDoc , {
                    name
                })
            }
        }catch(error){
            toast.error("could not update profile details")
        }
    }

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState , 
            [e.target.id]:e.target.value
        }))
    }

    return (
        <div className="profile">
            <div className="profileHeader">
                <h1 className="pageHeader">profile</h1>
                <button type="button" className="logOut" onClick={onLogout}>logout</button>
            </div>

            <main>
                <div className="profileDetailsHeader">
                    <p className="personalDetailsText">Personal Details</p>
                    <p className="changePersonalDetails" onClick={()=>{
                        changeDetails && onSubmit()
                        setChangeDetails((prevState)=> !prevState);
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>

                <div className="profileCard">
                    <form >
                        <input 
                        type="text" 
                        id="name" 
                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                        disabled={!changeDetails}
                        value={name}
                        onChange={onChange}
                        />  
                        
                        <input 
                        type="text" 
                        id="email" 
                        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                        disabled={!changeDetails}
                        value={email}
                        onChange={onChange}
                        />
                    </form>
                </div>

                <Link to='/create-listing' className="createListing">
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>
            </main>
        </div>
    )
  
}
export default Profile;