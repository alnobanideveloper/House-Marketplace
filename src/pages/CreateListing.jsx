import { useState , useEffect ,useRef} from "react"
import {getAuth , onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function CreateListing() {
    const [loading , setLoading] = useState(false)
    const [geolocationEnabled , setGeolocation] = useState(true)
    const [formData , setFormData] = useState({
        type:'rent',
        nanme:'',
        bedrooms:0,
        bathrooms:0,
        parkingSpot:false,
        furnished:false,
        address:'',
        offer:false,
        regularPrice:0,
        images:{},
        latitude:0,
        longitude:0,

    })

    const auth = getAuth();
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setFormData({...formData , userRef:user.uid})
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return ()=>{
            isMounted.current = false;
        }
    } , [isMounted])
    if(loading){
        return <Spinner />
    }
    
  return (
    <div>
        
    </div>
  )
}
