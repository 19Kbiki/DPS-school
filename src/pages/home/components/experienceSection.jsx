import {memoryLaneExpSection} from "../../../config/appContentConfig";

export default function ExperienceSection() {
    return (<div>
        <h2>{memoryLaneExpSection.title.main}</h2>
        {memoryLaneExpSection.cards.map((card, index) => (
            <div>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
            </div>
        ))}
    </div>)
}