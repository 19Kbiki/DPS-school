import {locationsSection} from "../../../config/appContentConfig";

export default function LocationSection() {
    return (
        <section className="location">
            <div className="container">
                <h2>{locationsSection.title}</h2>
                <img src="/assets/light_bg_2.webp" alt=""/>
                <div className="loc_wrp">
                    <div className="lcl_info">
                        <h3>{locationsSection.hotelName}</h3>
                        <h5>{locationsSection.hotelAddress}</h5>
                        <h4>{locationsSection.roomName}</h4>
                        <h6>{locationsSection.roomAddress}</h6>
                    </div>
                    <iframe className="map"
                            title={locationsSection.hotelName}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4528.325055201846!2d88.43285829999999!3d26.7356893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4410012a02d41%3A0x71504ba93061b4d4!2sHiland%20Hotel%2C%20Siliguri!5e1!3m2!1sen!2sin!4v1740558784973!5m2!1sen!2sin"
                            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    )
}