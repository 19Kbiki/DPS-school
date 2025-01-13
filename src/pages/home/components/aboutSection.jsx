import { aboutSection } from "../../../config/appContentConfig";

export default function AboutSection() {
    return (
        <section className="about_section" id="about">
            <div className="container">
                <div className="abt_wrp">
                    <div className="imges">
                        <img  className="about_img" src="/assets/about.png" alt="" />
                    </div>
                    <div className="abt_info">
                        <h2>{aboutSection.title.main}</h2>
                        {aboutSection.desktop.map((data, index) => <p key={index}>{data}</p>)}
                        <img src="/assets/light_bg.png" alt="" />
                        <button>
                            Register now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}