import * as appContent from "../../../config/appContentConfig";
import {Link} from "react-router-dom";
import React from "react";
import { NavHashLink } from "react-router-hash-link";

export default function HeroSection() {
    return (
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
                            <h5>{appContent.heroSections.title.centreTagline.top}</h5>
                            <h1>{appContent.heroSections.title.centreTagline.main}</h1>
                            <h5>{appContent.heroSections.title.centreTagline.bottom}</h5>
                        </div>
                        <div className="foot_info">
                            <h4>{appContent.heroSections.title.subTitle}</h4>
                            <p>{appContent.heroSections.title.footer}</p>
                        </div>
                        <div className='buttons'>
                            {appContent.heroSections.buttons.map((button, index) => (
                                <NavHashLink key={index} className={button.type} to={button.url}>{button.name}</NavHashLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}