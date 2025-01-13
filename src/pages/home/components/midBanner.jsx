import { midBanner } from "../../../config/appContentConfig";

export default function MidBanner() {
    return (
        <section className="mid-banner">
            <div className="container">
                <div className="md_banner">
                <h2>{midBanner.tagline.title}</h2>
                <h5>{midBanner.tagline.subTitle}</h5>
                </div>
            </div>
        </section>
    )
}