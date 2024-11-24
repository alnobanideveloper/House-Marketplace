import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where, orderBy, limit, startAfter, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
const Category = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing , setLastFetchedListing] = useState(null);

    const params = useParams()

    useEffect(() => {

        const fetchListings = async () => {
            try {
                const listingsRef = collection(db, 'listings');
                const q = query(
                    listingsRef,
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(5)
                );

                //Execute query ,get documents for that specific query
                const querySnap = await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length-1];
                setLastFetchedListing(lastVisible);

                const listings = querySnap.docs.map((doc) => ({
                    data: doc.data(),
                    id: doc.id
                })
                );

                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error("Could not fetch listings")
                console.log(error.message);
            }
        }

        fetchListings();
    }, [])

    //pagination / load more
    const onMoreFetchListings = async () => {
        try {
            const listingsRef = collection(db, 'listings');
            const q = query(
                listingsRef,
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(5)
            );

            //Execute query ,get documents for that specific query
            const querySnap = await getDocs(q);

            const lastVisible = querySnap.docs[querySnap.docs.length-1];
            setLastFetchedListing(lastVisible );

            const listings = querySnap.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id
            })
            );

            setListings((prevState)=> [...prevState , ...listings]);
            setLoading(false);

        } catch (error) {
            toast.error("Could not fetch listings")
            console.log(error.message);
        }
    }

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    places for {params.categoryName}
                </p>
            </header>

            {
                loading ? (<Spinner />) :
                    listings && listings.length > 0 ? (
                        <>
                            <main>
                                <ul className="categoryListings">
                                        <h3>
                                            {listings.map(listing => 
                                                <ListingItem 
                                                listing={listing.data}
                                                id={listing.id}
                                                key={listing.id}
                                                />)}
                                        </h3>
                                </ul>
                            </main>

                            <br />
                            <br />

                            {
                                lastFetchedListing && (
                                    <p className="loadMore" onClick={onMoreFetchListings}>Load More</p>
                                )
                            }

                        </>) : (
                        <p>No listings for {params.categoryName}</p>)
            }

        </div>
    )
}

export default Category
