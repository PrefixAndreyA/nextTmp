import React from "react";
import styles from "./ContourGridComponent.module.scss";

const ContourGridComponent = (props) => {
    return <div className={`grid-12 ${styles.gridThirds}`}>{props.list}</div>;
};

export default ContourGridComponent;
