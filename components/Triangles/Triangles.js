import React from "react";
import styles from "./Triangles.module.scss";

const Triangles = (props) => {
    return (
        <div className={styles.trianglesContainer}>
            {/* There's two sets of triangles just because of an annoying CSS issue where transitions don't work on properties changed by key frames it seems. On hover exit it wouldn't transition back to the correct opacity, it would just pop back immediately (ugly). So the hover exit opacity animation is now accomplished by fading in/out a whole different set of triangles. A lot of work for a very minor issue but now it works right! */}
            <div className={`${styles.triangles} ${props.triangles}`}>
                <span
                    className={`${props.triangle} ${styles.triangle1}`}
                ></span>
                <span
                    className={`${props.triangle} ${styles.triangle2}`}
                ></span>
                <span
                    className={`${props.triangle} ${styles.triangle3}`}
                ></span>
            </div>
            <div className={`${styles.trianglesHover} ${props.trianglesHover}`}>
                <span
                    className={`${props.triangle} ${styles.triangle1}`}
                ></span>
                <span
                    className={`${props.triangle} ${styles.triangle2}`}
                ></span>
                <span
                    className={`${props.triangle} ${styles.triangle3}`}
                ></span>
            </div>
        </div>
    );
};

export default Triangles;
