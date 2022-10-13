import React from "react";
import styles from "./AccordionTemplate.module.scss";
import { useState, useRef } from "react";

// If you need an accordion just copy this one to a new component and adjust appropriately
const AccordionTemplate = () => {
    const dummyData = [
        {
            title: "Senior IT Support Technician",
            copy: "In porta mollis porttitor. Nam commodo hendrerit arcu. Vivamus lobortis fermentum felis, nec interdum purus ultrices non. Aliquam nec eleifend enim. Vestibulum sapien elit, rhoncus eu urna a, tincidunt porta velit.",
        },
        {
            title: "Property Manager",
            copy: "Praesent ut sem vitae massa aliquet pellentesque. Quisque at lectus vel lectus tempus facilisis id sit amet neque. Mauris pretium dolor vel bibendum consectetur.",
        },
        {
            title: "Assistant Property Manager",
            copy: "Vestibulum aliquam, velit a congue fermentum, nisi est viverra neque, ut maximus sem ex id nisi. Maecenas iaculis sollicitudin felis in semper.",
        },
    ];

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

    const dummyList = dummyData.map((item, i) => {
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
                    {item.title}
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
                        {item.copy}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={styles.accordionContainer} ref={container}>
            {dummyList}
        </div>
    );
};

export default AccordionTemplate;
