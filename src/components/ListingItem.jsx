import { Link } from "react-router-dom"
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

export default function ListingItem({ listing, id ,onDelete }) {
    return (
        <div>
            <li className="categoryListing">
                <Link to={`/category/${listing.type}/${id}`}
                    className="categoryListingLink">
                    <img src={listing.imgUrls[0]} alt={listing.name}
                        className="categoryListingImg" />

                    <div className="categoryListingDetails">
                        <p className="categoryListingLocation">
                            {listing.location}
                        </p>
                        <p className="categoryListingName">
                            {listing.name}
                        </p>

                        <p className="categoryListingPrice">
                            ${listing.offer ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : listing.regularPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            {listing.type === 'rent' && ' / Month'}
                        </p>
                        <div className="categoryListingInfoDiv">
                            <img src={bedIcon} alt="bed" />
                            <p className="categoryListingInfoText">
                                {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `1 Bedroom`}
                            </p>
                                <img src={bathtubIcon} alt="bath"/>
                                <p className="categoryListingInfoText">
                                    {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `1 Bathrooms`}
                                </p>
                        </div>
                    </div>
                </Link>

                {onDelete && (
                    <DeleteIcon 
                    className="removeIcon" 
                    fill="red" 
                    onClick={()=>onDelete(listing.id , listing.name)}
                    />
                )}
            </li>
        </div>
    )
}
