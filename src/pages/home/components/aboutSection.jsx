import { useNavigate } from "react-router-dom";
import { aboutSection } from "../../../config/appContentConfig";
import { ROUTES } from "../../../App";

export default function AboutSection() {
    const navigate = useNavigate();
    const handelClick = () => {
        navigate(ROUTES.REGISTER)
    }

    return (
        <section className="about_section" id="about">
            <div className="container">
                <div className="abt_wrp">
                    <div className="imges">
                        <img  className="about_img" src="/assets/about.webp" alt="" />
                    </div>
                    <div className="abt_info">
                        <h2>{aboutSection.title.main}</h2>
                        {aboutSection.desktop.map((data, index) => <p key={index}>{data}</p>)}
                        <img src="/assets/light_bg.webp" alt="" />
                        <button onClick={handelClick}>
                            Register now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}