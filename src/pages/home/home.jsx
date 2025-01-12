import React from 'react'
import {Link} from 'react-router-dom'
import "./home.scss"

export default function Home() {
    return (
        <div>
            <section className='banner'>
                <div className="banner-video-container">
                    <video autoPlay muted loop className="banner-video">
                        <source src="/assets/bg.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <div className="banner-overlay"></div>
                    {/* Gradient Overlay */}
                    <div className="containers">
                        <div className="hom_info">
                            <div>
                                <h5>The great memories of school </h5>
                                <h1>MEMORY LANE 2K25 </h1>
                                <h5>Nostalgia Feeling</h5>
                            </div>
                            <div>
                                <h4>Where the great memories of school come to life</h4>
                                <p>Siliguri - 5th April 2025</p>
                            </div>
                            <div className='buttons'>
                                <Link to="/register">Book now</Link>
                                <Link to="/register">More info</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
