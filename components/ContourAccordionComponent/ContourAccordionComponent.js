import React from "react";
import styles from "./ContourAccordionComponent.module.scss";
import { useState, useRef } from "react";
import Title5 from "../../typography/Title5";
import BodySmall from "../../typography/BodySmall";
import LabelSmall from "../../typography/LabelSmall";
import LabelLarge from "../../typography/LabelLarge";
import Link from "next/link";
import { convertLink } from "../../utils";

// If you need an accordion just copy this one to a new component and adjust appropriately
const ContourAccordionComponent = (props) => {
    const container = useRef(null);

    const [isOpen, setIsOpen] = useState(null);
    const [drawerHeight, setDrawerHeight] = useState(0);

    const toggleSection = (e) => {
        const id = e.target.dataset.id;
        if (isOpen == id) {
            setIsOpen(null);
        } else {
            setIsOpen(id);
            setDrawerHeight(
                container.current.querySelector(`[data-height="${id}"]`)
                    .clientHeight
            );
        }
    };

    const list = props.data.map((item, i) => {
        return (
            <div
                className={`${styles.accordionSection} ${
                    isOpen == i ? styles.open : ""
                }`}
                key={i}
            >
                <div
                    className={styles.accordionTitle}
                    onClick={toggleSection}
                    data-id={i}
                >
                    {/* Put permanent title content here */}
                    <Title5 overwriteStyle={styles.title}>{item.title}</Title5>
                </div>
                <div
                    className={styles.accordionDrawer}
                    style={{ height: isOpen == i ? `${drawerHeight}px` : 0 }}
                >
                    <div
                        className={styles.accordionDrawerHeight}
                        data-height={i}
                    >
                        {/* Put all drawer content in here */}
                        <LabelSmall overwriteStyle={styles.subtitle}>
                            {item.subtitle}
                        </LabelSmall>
                        <BodySmall>{item.copy}</BodySmall>
                        <Link href={item.link ? convertLink(item.link) : "/"}>
                            <a className={styles.accordionLink}>
                                <LabelLarge>{item.link_text}</LabelLarge>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={styles.accordionContainer} ref={container}>
            {list}
        </div>
    );
};

export default ContourAccordionComponent;
