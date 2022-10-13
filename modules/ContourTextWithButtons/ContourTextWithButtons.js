import React from "react";
import styles from "./ContourTextWithButtons.module.scss";
import Wysiwyg from "../../components/Wysiwyg/Wysiwyg";
import Button from "../../components/Button/Button";

const ContourTextWithButtons = (props) => {
    const content = {
        __html: props.module.content,
    };

    return (
        <div className={`grid-12 ${styles.container}`}>
            <div className={`col-start-2 col-end-7 ${styles.left}`}>
                <Wysiwyg content={content} />
                <Button
                    text={props.module.button.text}
                    link={props.module.button.link}
                    dark={true}
                    fill={true}
                />
            </div>
            <div className={`col-start-9 col-end-12 ${styles.right}`}>
                <Button
                    text={props.module.button.text}
                    link={props.module.button.link}
                    dark={true}
                    fill={true}
                    nomargin={true}
                />
            </div>
        </div>
    );
};

export default ContourTextWithButtons;
