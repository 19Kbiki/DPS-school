import {aboutSection} from "../../../config/appContentConfig";

export default function AboutSection() {
    return (<div>
        <h2>{aboutSection.title.main}</h2>
        {aboutSection.desktop.map(data => <p>{data}</p>)}
    </div>)
}