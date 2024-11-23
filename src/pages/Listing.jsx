import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import Spinner from '../components/Spinner'
import ShareIcon from "../assets/svg/shareIcon.svg";


function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkcopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }
    return (
        <main>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: "cover", // Ensures the image covers the slide
                            }}
                            className="swiperSlideDiv"
                        >
                           
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href); //to copy the href
                setShareLinkCopied(true);
                setTimeout(() => {
                    setShareLinkCopied(false);
                }, 2000)
            }}>

                <img src={ShareIcon} alt="shareIcon" />
            </div>

            {shareLinkcopied && <p className='linkCopied'>Link Copied!</p>}

            <div className="listingDeta">
                <p className="listingName">{listing.name} - ${listing.offer ? listing.discountedPrice
                    : listing.regularPrice}</p>

                <p className="listingLocation">{listing.location}</p>
                <p className="listingType">
                    For {listing.type === `rent` ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className="discountPrice">
                        ${listing.regularPrice - listing.discountedPrice} discount
                    </p>
                )}
                <ul className="listingDetailsList">
                    <li>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `1 Bedroom`}
                    </li>

                    <li>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `1 Bathroom`}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.funished && 'Funished'}</li>
                    <p className="listingLocationTitle">Location</p>

                    <div className="leafletContainer">
                        <MapContainer
                            style={{ height: '100%', width: '100%' }}
                            center={[listing.geolocation.lat, listing.geolocation.lng]}
                            zoom={13}
                            scrollWheelZoom={true}
                        >

                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                            />

                            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                                <Popup>{listing.location}</Popup>

                            </Marker>
                        </MapContainer>
                    </div>

                    {
                        auth.currentUser?.uid !== listing.userRef && (
                            <Link className='primaryButton'
                                to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}>
                                Contact Landlord
                            </Link>
                        )}

                </ul>
            </div>
        </main>
    )
}

export default Listing
