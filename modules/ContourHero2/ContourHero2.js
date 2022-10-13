import React from "react";
import styles from "./ContourHero2.module.scss";
import Title1 from "../../typography/Title1";
import Title5 from "../../typography/Title5";

const ContourHero2 = (props) => {
    return (
        <div
            className={`${styles.container} ${
                props.module.styling_options.includes("extra_bottom_padding")
                    ? styles.extraBottomPadding
                    : ""
            }`}
        >
            <div className="grid-12">
                <div className={`col-start-3 col-end-10 ${styles.column}`}>
                    <Title1
                        titleValue={props.titleValue}
                        overwriteStyle={styles.title}
                    >
                        {props.module.title}
                    </Title1>
                    <Title5
                        overwriteStyle={styles.subtitle}
                        overwriteStyle={styles.subtitle}
                    >
                        {props.module.subtitle}
                    </Title5>
                </div>
            </div>
        </div>
    );
};

export default ContourHero2;
