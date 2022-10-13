import React from "react";
import styles from "./ContourHero.module.scss";
import Image from "next/image";
import Button from "../../components/Button/Button";
import Title1 from "../../typography/Title1";
import BodySmall from "../../typography/BodySmall";

const ContourHero = (props) => {
    return (
        <div
            className={`${styles.hero}  ${
                props.module.styling_options.includes("has_gold_arrow")
                    ? styles.hasGoldArrow
                    : ""
            }  ${
                props.module.styling_options.includes("has_no_arrow")
                    ? styles.hasNoArrow
                    : ""
            }`}
        >
            {props.module.image && (
                <Image
                    src={props.module.image.url}
                    alt={props.module.image.alt}
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            )}
            <div
                className={`${styles.gradient}  ${
                    props.module.styling_options.includes(
                        "extra_bottom_padding"
                    )
                        ? styles.extraBottomPadding
                        : ""
                }`}
            >
                <div className={`grid-12 ${styles.content}`}>
                    <div className="col-start-1 col-end-9">
                        <Title1 titleValue={props.titleValue}>
                            {props.module.title}
                        </Title1>
                    </div>
                    {props.module.subtitle &&
                        props.module.styling_options.includes("is_tall") &&
                        props.module.subtitle && (
                            <div className="col-start-1 col-end-6">
                                <BodySmall>{props.module.subtitle}</BodySmall>
                            </div>
                        )}
                    {props.module.button.text &&
                        props.module.styling_options.includes("is_tall") &&
                        props.module.button.text && (
                            <div className="col-start-1 col-end-12">
                                <Button
                                    link={props.module.button.link}
                                    text={props.module.button.text}
                                    fill
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default ContourHero;
