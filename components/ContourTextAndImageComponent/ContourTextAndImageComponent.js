import React from "react";
import styles from "./ContourTextAndImageComponent.module.scss";
import Button from "../../components/Button/Button";
import Image from "next/image";
import LabelSmall from "../../typography/LabelSmall";
import Title2 from "../../typography/Title2";
import BodyExtraLarge from "../../typography/BodyExtraLarge";
import BodySmall from "../../typography/BodySmall";

const ContourTextAndImageComponent = (props) => {
    const skipLinkSlug = props.propObject.eyebrow
          ? props.propObject.eyebrow.toLowerCase().replace(/\s+/g, '-')
          : "";

    return (
        <div
            className={`${styles.fullBackground} ${
                props.propObject.stylingOptions.includes("dark_background") ||
                !props.propObject.contrast
                    ? styles.darkBackground
                    : ""
            }`}
            id={skipLinkSlug}
        >
            <div
                className={`grid-12 ${styles.container} ${
                    props.propObject.stylingOptions.includes("image_on_left") ||
                    props.imageOnLeft
                        ? styles.imageOnLeft
                        : ""
                } ${
                    props.propObject.stylingOptions.includes(
                        "extra_bottom_padding"
                    )
                        ? styles.extraBottomPadding
                        : ""
                } ${props.overwriteStyle ? props.overwriteStyle : ""}`}
            >
                {!props.propObject.stylingOptions.includes("image_on_left") &&
                    !props.imageOnLeft && (
                        <div
                            className={`col-start-1 col-end-5 ${styles.contentContainer}`}
                        >
                            {props.propObject.eyebrow && (
                                <LabelSmall overwriteStyle={styles.eyebrow}>
                                    {props.propObject.eyebrow}
                                </LabelSmall>
                            )}
                            {props.propObject.title && (
                                <Title2
                                    overwriteStyle={styles.title}
                                    titleValue={props.propObject.titleValue}
                                >
                                    {props.propObject.title}
                                </Title2>
                            )}
                            {props.propObject.subtitle && (
                                <BodyExtraLarge>
                                    {props.propObject.subtitle}
                                </BodyExtraLarge>
                            )}
                            {props.propObject.copy && (
                                <BodySmall overwriteStyle={styles.copy}>
                                    {props.propObject.copy}
                                </BodySmall>
                            )}
                            {props.propObject.buttonText && (
                                <Button
                                    text={props.propObject.buttonText}
                                    link={props.propObject.buttonLink}
                                    dark={props.propObject.contrast}
                                />
                            )}
                        </div>
                    )}
                {!props.propObject.stylingOptions.includes("image_on_left") &&
                    !props.imageOnLeft &&
                    props.propObject.image && (
                        <div
                            className={`col-start-6 col-end-12 ${styles.imageContainer}`}
                        >
                            <Image
                                src={props.propObject.image.url}
                                alt={props.propObject.image.alt}
                                width={props.propObject.image.width}
                                height={props.propObject.image.height}
                                layout="responsive"
                                // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                                // Set the min width to the viewport size when the image reaches its max size
                                // Set the image size to whatever the image size is at that point
                                // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                                sizes="(min-width: 1920px) 1058px"
                            />
                        </div>
                    )}
                {(props.propObject.stylingOptions.includes("image_on_left") ||
                    props.imageOnLeft) &&
                    props.propObject.image && (
                        <div
                            className={`col-start-1 col-end-7 ${styles.imageContainer}`}
                        >
                            <Image
                                src={props.propObject.image.url}
                                alt={props.propObject.image.alt}
                                width={props.propObject.image.width}
                                height={props.propObject.image.height}
                                layout="responsive"
                                // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                                // Set the min width to the viewport size when the image reaches its max size
                                // Set the image size to whatever the image size is at that point
                                // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                                sizes="(min-width: 1920px) 1058px"
                            />
                        </div>
                    )}
                {(props.propObject.stylingOptions.includes("image_on_left") ||
                    props.imageOnLeft) && (
                    <div
                        className={`col-start-8 col-end-12 ${styles.contentContainer}`}
                    >
                        {props.propObject.eyebrow && (
                            <LabelSmall overwriteStyle={styles.eyebrow}>
                                {props.propObject.eyebrow}
                            </LabelSmall>
                        )}
                        {props.propObject.title && (
                            <Title2
                                overwriteStyle={styles.title}
                                titleValue={props.propObject.titleValue}
                            >
                                {props.propObject.title}
                            </Title2>
                        )}
                        {props.propObject.subtitle && (
                            <BodyExtraLarge>
                                {props.propObject.subtitle}
                            </BodyExtraLarge>
                        )}
                        {props.propObject.copy && (
                            <BodySmall overwriteStyle={styles.copy}>
                                {props.propObject.copy}
                            </BodySmall>
                        )}
                        {props.propObject.buttonText && (
                            <Button
                                text={props.propObject.buttonText}
                                link={props.propObject.buttonLink}
                                dark={props.propObject.contrast}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContourTextAndImageComponent;
