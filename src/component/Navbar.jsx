import React, { useContext } from "react";
import Menu from "./images/bars-solid.svg";
import Close from "./images/times-solid.svg";
import { Link, useNavigate } from "react-router-dom";
import './css/Header.css';
import { auth } from './Config/Config';
import { UserContext } from './context/UserContext'
import { MovieContext } from './context/MovieContext';

const Navbar = () => {

    const { totalFavorite } = useContext(MovieContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                navigate('/');
            })
    }

    return(
        <>
            <header>
                <div className="menu">
                    <img src={Menu} alt="" width="20" />
                </div>
                <div className="logo text-gray-800 sm:text-sm lg:text-2xl md:text-xl font-bold">
                    <h1><Link to="/">Get Your Movie</Link></h1>
                </div>
                {!user && 
                <>
                <nav>
                    <ul className="toggle">
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li className="close">
                            <img src={Close} alt="" width="20" />
                        </li>
                    </ul>
                </nav>
                </>
                }
                {user && 
                <>
                <nav>
                    <ul className="toggle">
                        <li><Link to="/">{user}</Link></li>
                        <li><Link to="/add-movie">Add</Link></li>
                        <li><Link to="/view">View</Link></li>
                        <li><Link to="/add-to-favorite">Favorite(<span>{totalFavorite}</span>)</Link></li>
                        <li className="close">
                            <img src={Close} alt="" width="20" />
                        </li>
                    </ul>
                    <div className="nav-cart" onClick={handleLogout}>
                        LOGOUT
                    </div>
                </nav>
                </>
                }
            </header>
        </>
        )
}

export default Navbar;