import React from "react";
import WikiCard from "../../components/WikiCard/WikiCard";
import styles from "./WikiList.module.scss";

const WikiList = (props) => {
    const cards = props.module.card_repeater.map((card, i) => {
        return (
            <WikiCard
                key={i}
                title={card.title}
                subtitle={card.subtitle}
                bg={card.background_color}
                list={card.list_repeater}
            />
        );
    });

    return <div className={styles.container}>{cards}</div>;
};

export default WikiList;
