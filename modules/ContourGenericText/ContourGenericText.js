import React from "react";
import styles from "./ContourGenericText.module.scss";
import Wysiwyg from "../../components/Wysiwyg/Wysiwyg";

const ContourGenericText = (props) => {
    const content = {
        __html: props.module.content,
    };

    return (
        <div
            className={
                props.module.styling_options.includes("colored_bg")
                    ? styles.coloredBG
                    : ""
            }
        >
            <div className="grid-12">
                {!props.module.styling_options.includes("smaller_column") && (
                    <div
                        className={`col-start-3 col-end-10 ${styles.container}`}
                    >
                        <Wysiwyg content={content} />
                    </div>
                )}
                {props.module.styling_options.includes("smaller_column") && (
                    <div
                        className={`col-start-4 col-end-9 ${styles.container}`}
                    >
                        <Wysiwyg content={content} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContourGenericText;
