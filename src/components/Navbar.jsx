import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathMathRoute = (route) => route === location.pathname;

    return (
        <footer className="navbar">
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem" onClick={() => navigate('/')}>
                        <ExploreIcon fill={pathMathRoute('/') ? '#2c2c2c' : '#8f8f8f'}
                            width='36px'
                            height='36px' />
                        <p className={pathMathRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'} >Explore</p>
                    </li>

                    <li className="navbarListItem" onClick={() => navigate('/offers')}>
                        <OfferIcon fill={pathMathRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} 
                            width='36px'
                            height='36px' />

                        <p className={pathMathRoute('/offers') ? 'navbarListItemNameActive' :
                             'navbarListItemName'}>Offer</p>
                    </li>

                    <li className="navbarListItem" onClick={() => navigate('/profile')}>
                        <PersonOutlineIcon fill={pathMathRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px'
                            height='36px' />
                        <p className={
                            pathMathRoute('/profile')
                                ? 'navbarListItemNameActive' : 'navbarListItemName'}> Profile</p>
                    </li>
                </ul>

            </nav>
        </footer>
    )
}
export default Navbar