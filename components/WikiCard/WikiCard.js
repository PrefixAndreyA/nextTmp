import React from "react";
import styles from "./WikiCard.module.scss";

const WikiCard = (props) => {
    const list = props.list.map((listItem, i) => {
        return (
            <li key={i}>
                <a href={listItem.link} target='_blank' rel='noreferrer'>
                    {listItem.text}
                </a>
            </li>
        );
    });

    return (
        <div className={styles.card} style={{ background: props.bg }}>
            <div className={styles.cardContent}>
                {props.title && <h2>{props.title}</h2>}
                {props.subtitle && <p>{props.subtitle}</p>}
                <ul>{list}</ul>
            </div>
        </div>
    );
};

export default WikiCard;
