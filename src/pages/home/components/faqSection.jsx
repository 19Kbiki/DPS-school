import React from "react";
import { faqSection } from "../../../config/appContentConfig";

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = React.useState(null);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <section className="faq" id="faq">
            <div className="container">
                <div className="fqa_wrp">
                    <div>
                        <h2>{faqSection.title.main}</h2>
                        <p>{faqSection.items.q}</p>
                        <p>{faqSection.items.a}</p>

                    </div>
                    <div className="accordion">
                        {faqSection.items.map((item, index) => (
                            <div
                                key={index}
                                className={`accordion-item ${activeIndex === index ? "active" : ""}`}
                            >
                                <div
                                    className="accordion-header"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <p>{item.q}</p>
                                    <span className={`arrow ${activeIndex === index ? "rotate" : ""}`}>
                                        >
                                    </span>
                                </div>
                                {activeIndex === index && <div className="accordion-body">{item.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}