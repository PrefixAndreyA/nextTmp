import React from "react";
import styles from "./ContourFeaturedIntroText.module.scss";
import Button from "../../components/Button/Button";
import LabelSmall from "../../typography/LabelSmall";
import Title2 from "../../typography/Title2";
import BodyMedium from "../../typography/BodyMedium";

const ContourFeaturedIntroText = (props) => {
    let numbers;

    if (props.module.numbers) {
        numbers = props.module.numbers.map((number, i) => {
            return (
                <div className={styles.numberContainer} key={i}>
                    <div className={styles.number}>{number.number}</div>
                    <LabelSmall overwriteStyle={styles.label}>
                        {number.label}
                    </LabelSmall>
                </div>
            );
        });
    }

    const contrast = props.module.styling_options.includes("light_background");

    return (
        <div
            className={`${styles.featuredIntroText}  ${
                props.module.styling_options.includes("extra_bottom_padding")
                    ? styles.extraBottomPadding
                    : ""
            } ${
                props.module.styling_options.includes("light_background")
                    ? styles.lightBackground
                    : ""
            }`}
        >
            <div className="grid-12">
                <div className={`col-start-3 col-end-10 ${styles.content}`}>
                    {props.module.eyebrow && (
                        <LabelSmall overwriteStyle={styles.eyebrow}>
                            {props.module.eyebrow}
                        </LabelSmall>
                    )}
                    <Title2
                        titleValue={props.titleValue}
                        overwriteStyle={styles.title}
                    >
                        {props.module.title}
                    </Title2>
                    {props.module.copy && (
                        <BodyMedium overwriteStyle={styles.copy}>
                            {props.module.copy}
                        </BodyMedium>
                    )}
                    {props.module.button.text && (
                        <Button
                            link={props.module.button.link}
                            text={props.module.button.text}
                            dark={contrast}
                        />
                    )}
                </div>
                {numbers &&
                    props.module.styling_options.includes(
                        "add_number_section"
                    ) && (
                        <div
                            className={`col-start-1 col-end-12 ${styles.numbers}`}
                        >
                            {numbers}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ContourFeaturedIntroText;
