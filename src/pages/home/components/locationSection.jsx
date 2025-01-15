import { locationsSection } from "../../../config/appContentConfig";

export default function LocationSection() {
    return(
        <section className="location">
            <div className="container">
                <h2>{locationsSection.title}</h2>
                <img src="/assets/light_bg_2.png" alt="" />
                <div className="loc_wrp">
                <div className="lcl_info">
                    <h3>{locationsSection.hotelName}</h3>
                    {/* <h5>{locationsSection.hotelAddress}</h5> */}
                    {/* <h3>{locationsSection.roomName}</h3>
                    <h5>{locationsSection.roomAddress}</h5> */}
                </div>
                <iframe className="map"
                        title={locationsSection.hotelName}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114041.02710412377!2d88.34886915823314!3d26.719407444070583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44114f5441dcd%3A0xdeb5c4702063edff!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1736674518676!5m2!1sen!2sin"
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    )
}