import React from "react";
import styles from "./ContourGridItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import Title4 from "../../typography/Title4";
import BodyLarge from "../../typography/BodyLarge";
import BodySmall from "../../typography/BodySmall";
import LabelSmall from "../../typography/LabelSmall";
import { convertLink } from "../../utils";

const ContourGridItem = (props) => {
    if (props.archive) {
        return (
            <div key={props.i} className={styles.linkContainer}>
                {props.item.image && (
                    <div
                        className={`${styles.gridImage} ${
                            props.square ? styles.square : ""
                        }`}
                    >
                        <Image
                            src={props.item.image.url}
                            alt={props.item.image.alt}
                            layout="fill"
                            objectFit="cover"
                            // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                            // Set the min width to the viewport size when the image reaches its max size
                            // Set the image size to whatever the image size is at that point
                            // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                            sizes="(min-width: 1184px) 352px"
                        />
                    </div>
                )}
                {props.item.title && (
                    <LabelSmall overwriteStyle={styles.eyebrow}>
                        {props.item.title}
                    </LabelSmall>
                )}
                {props.item.subtitle && <Title4>{props.item.subtitle}</Title4>}
                {props.item.content && (
                    <BodySmall overwriteStyle={styles.content}>
                        {props.item.content}
                    </BodySmall>
                )}
                {props.item.link && !props.external && (
                    <Link href={convertLink(props.item.link)}>
                        <a className={styles.link}>Read More</a>
                    </Link>
                )}
                {props.item.external_link && props.external && (
                    <Link href={convertLink(props.item.external_link)}>
                        <a className={styles.link} target="_blank">
                            Read More
                        </a>
                    </Link>
                )}
            </div>
        );
    } else {
        if (props.item.link && !props.external) {
            return (
                <Link href={convertLink(props.item.link)} key={props.i}>
                    <a className={styles.linkContainer}>
                        {props.item.image && (
                            <div
                                className={`${styles.gridImage} ${
                                    props.square ? styles.square : ""
                                }`}
                            >
                                <Image
                                    src={props.item.image.url}
                                    alt={props.item.image.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                                    // Set the min width to the viewport size when the image reaches its max size
                                    // Set the image size to whatever the image size is at that point
                                    // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                                    sizes="(min-width: 1184px) 352px"
                                />
                            </div>
                        )}
                        {props.item.title && (
                            <Title4 overwriteStyle={styles.title}>
                                {props.item.title}
                            </Title4>
                        )}
                        {props.item.subtitle && (
                            <BodyLarge overwriteStyle={styles.subtitle}>
                                {props.item.subtitle}
                            </BodyLarge>
                        )}
                    </a>
                </Link>
            );
        } else if (props.item.external_link && props.external) {
            return (
                <Link
                    href={convertLink(props.item.external_link)}
                    key={props.i}
                >
                    <a className={styles.linkContainer} target="_blank">
                        {props.item.image && (
                            <div
                                className={`${styles.gridImage} ${
                                    props.square ? styles.square : ""
                                }`}
                            >
                                <Image
                                    src={props.item.image.url}
                                    alt={props.item.image.alt}
                                    layout="fill"
                                    objectFit="cover"
                                    // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                                    // Set the min width to the viewport size when the image reaches its max size
                                    // Set the image size to whatever the image size is at that point
                                    // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                                    sizes="(min-width: 1184px) 352px"
                                />
                            </div>
                        )}
                        {props.item.title && (
                            <Title4 overwriteStyle={styles.title}>
                                {props.item.title}
                            </Title4>
                        )}
                        {props.item.subtitle && (
                            <BodyLarge overwriteStyle={styles.subtitle}>
                                {props.item.subtitle}
                            </BodyLarge>
                        )}
                    </a>
                </Link>
            );
        } else {
            return (
                <div className={styles.linkContainer}>
                    {props.item.image && (
                        <div
                            className={`${styles.gridImage} ${
                                props.square ? styles.square : ""
                            }`}
                        >
                            <Image
                                src={props.item.image.url}
                                alt={props.item.image.alt}
                                layout="fill"
                                objectFit="cover"
                                // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                                // Set the min width to the viewport size when the image reaches its max size
                                // Set the image size to whatever the image size is at that point
                                // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                                sizes="(min-width: 1184px) 352px"
                            />
                        </div>
                    )}
                    {props.item.title && (
                        <Title4 overwriteStyle={styles.title}>
                            {props.item.title}
                        </Title4>
                    )}
                    {props.item.subtitle && (
                        <BodyLarge overwriteStyle={styles.subtitle}>
                            {props.item.subtitle}
                        </BodyLarge>
                    )}
                </div>
            );
        }
    }
};

export default ContourGridItem;
