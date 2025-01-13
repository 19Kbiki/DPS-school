import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import './nav.scss';
import { navBarItems } from '../../config/appContentConfig';
import { NavHashLink } from 'react-router-hash-link';
import { Offcanvas } from "bootstrap";
export default function Nav() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to toggle mobile menu
    const location = useLocation(); // Get the current location
    const isHomePage = location.pathname === '/'; // Check if it's the home page

    const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
    const toggleOffcanvas = () => {
        setOffcanvasOpen(!isOffcanvasOpen);
    };

    const closeOffcanvas = () => {
        setOffcanvasOpen(false);
    }; 
    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = 80; // Adjust offset to scroll up by 250px
        window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
    };


    return (
        <div>
            {/* Desktop Navbar */}
            <header className="nav-bar">
                <div className="container">
                    <nav className="nav">
                        <div className="logo">
                            <Link to="/">
                                <img src="/assets/logo.png" alt="" />
                            </Link>
                        </div>
                        <div className="menu">
                            <ul>
                                {navBarItems.map((ele, index) => (
                                    <li key={index}>
                                        <NavHashLink smooth to={ele.url} scroll={(el) => scrollWithOffset(el)}>
                                            {ele.name}
                                        </NavHashLink>
                                    </li>
                                ))}
                            </ul>
                            {isHomePage && (
                                <Link to="/register" className="nav_btn">
                                    Register now
                                </Link>
                            )}
                        </div>

                        <div className="humbergur">
                            <button
                                type="button"

                                onClick={toggleOffcanvas} // Open offcanvas
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>

                            {/* Offcanvas Menu */}
                            <div className={`offcanvas offcanvas-end hum_body ${isOffcanvasOpen ? 'show' : ''}`} tabindex="-1">
                                <div className="offcanvas-header">
                                    <div className="logo">
                                        <Link to="/" onClick={closeOffcanvas}>
                                            <img src="/assets/logo.png" alt="Logo" />
                                        </Link>
                                    </div>
                                    <button

                                        onClick={closeOffcanvas} // Close offcanvas
                                    >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul>
                                        {navBarItems.map((ele, index) => (
                                            <li key={index}>
                                                <NavHashLink
                                                    smooth
                                                    to={ele.url}
                                                    scroll={(el) => scrollWithOffset(el)}
                                                    onClick={closeOffcanvas} // Close offcanvas on navigation
                                                >
                                                    {ele.name}
                                                </NavHashLink>
                                            </li>
                                        ))}
                                    </ul>
                                    {location.pathname === '/' && (
                                        <Link to="/register" className="nav_btn" onClick={closeOffcanvas}>
                                            Register now
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Backdrop for Offcanvas */}
                            {isOffcanvasOpen && (
                                <div
                                    className="offcanvas-backdrop"
                                    onClick={closeOffcanvas} // Close offcanvas when clicking outside
                                ></div>
                            )}
                        </div>
                    </nav>
                </div>
            </header >






        </div >
    );
}
