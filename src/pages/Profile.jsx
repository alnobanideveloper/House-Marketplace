import { useState , useEffect} from "react";
import { getAuth , updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc ,doc , collection , query , orderBy , where , getDocs , deleteDoc} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'


const Profile = () => {
    const auth = getAuth();
    const [changeDetails , setChangeDetails] = useState(false)
    const [loading , setLoading] = useState(true);
    const [listings , setListings] = useState(null);
    const [formData , setFormData] = useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email,
    })
    const {email , name} = formData

    const navigate = useNavigate()


    useEffect(()=>{
        const fetchUserListing = async ()=>{
            const listingRef = collection(db , 'listings');
            const q = query(listingRef , where('userRef' , '==' ,auth.currentUser.uid ), orderBy('timestamp' , 'desc'))
            
            const querySnap = await getDocs(q)

            let listing = [];
            querySnap.forEach((doc)=>{
                return listing.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            listing.forEach((listing)=> console.log(listing.data.userRef));
            setListings(listing);
            setLoading(false);
        }
        fetchUserListing();
    } , [])

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
    const onDelete = async (id)=>{
        try{
            if(window.confirm('are you sure you want to delete')){
                const updatedListing = listings.filter((listing)=> listing.id!==id )
                setListings(updatedListing);
    
                const docRef = doc(db , 'listing' , id);
                await deleteDoc(docRef);
                toast.success("deleted successfully")
            }

        }catch(error){
            toast.error(error.message);
        }
       
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

                {!loading && listings?.length > 0 && (
                    <>
                        <p className="listingText">your Listings</p>
                        <ul className="listingLists">
                            {listings.map((listing)=>(
                                <ListingItem  
                                key={listing.id} 
                                listing={listing.data} 
                                id={listing.id}
                                onDelete={()=>onDelete(listing.id)}
                                />
                            )
                        )}
                        </ul>
                    </>
                )}
            </main>
        </div>
    )
  
}
export default Profile;