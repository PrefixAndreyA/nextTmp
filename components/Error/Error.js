import React from "react";
import Title3 from "../../typography/Title3";
import styles from "./Error.module.scss";

const Error = (props) => {
    return (
        <div className={styles.container}>
            <Title3>{props.message}</Title3>
        </div>
    );
};

export default Error;
