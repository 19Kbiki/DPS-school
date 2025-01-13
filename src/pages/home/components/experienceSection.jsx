import { memoryLaneExpSection } from "../../../config/appContentConfig";

export default function ExperienceSection() {
    return (
        <section className="experience_section">
            <div className="container">
                <h2>{memoryLaneExpSection.title.main}</h2>
                <div className="exp_wrp">
                    {memoryLaneExpSection.cards.map((card, index) => (
                        <div key={index} className="exp_item">
                            <h3>{card.title}</h3>
                            <p>{card.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 