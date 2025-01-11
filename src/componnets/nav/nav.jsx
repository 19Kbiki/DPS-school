import React from 'react';
import { Link, Links, useLocation } from 'react-router-dom'; // Import useLocation hook
import "./nav.scss"
export default function Nav() {
    const location = useLocation(); // Get the current location

    // Check if the current route is the home page
    const isHomePage = location.pathname === '/';

    return (
        <div>
            <header>
                <div className="container">
                    <nav className='nav'>
                        <div className="logo">
                            <Link to="/">
                                <img src="/assets/logo.png" alt="" />
                            </Link>
                        </div>
                        <div className="menu">
                            <ul>
                                <li>FAQ</li>
                            </ul>
                            {/* Conditionally render the "book now" button */}
                            {isHomePage && (
                                <Link to="/register">Book now</Link>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}
