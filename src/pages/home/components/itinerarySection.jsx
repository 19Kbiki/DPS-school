import { itinerarySection } from "../../../config/appContentConfig";

export default function ItinerarySection() {

    return (
        <section className="itinerary">
            <div className="container">
                <h2>{itinerarySection.title.main}</h2>
                <img  src="/assets/light_bg_3.png" alt="" />
                <div className="wrp">
                    {itinerarySection.items.map((item, index) => (
                        <div key={index} className="iti_item">{item}</div> // Use index as the key for each list item
                    ))}
                </div>
            </div>
        </section>
    )
}