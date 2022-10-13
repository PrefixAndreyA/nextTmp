import React from "react";
import styles from "./ContourPortfolioArchive.module.scss";
import Button from "../../components/Button/Button";
import Image from "next/image";
import Link from "next/link";
import LabelSmall from "../../typography/LabelSmall";
import Title2 from "../../typography/Title2";
import BodySmall from "../../typography/BodySmall";
import Title3 from "../../typography/Title3";
import BodyLarge from "../../typography/BodyLarge";
import Triangles from "../../components/Triangles/Triangles";
import { convertLink } from "../../utils";

const ContourPortfolioArchive = (props) => {
    const contrast = !props.module.styling_options.includes("dark_background");

    const developments = props.module.developments.map((development, i) => {
        const row = development.row.developments.map((single, i) => {
            return (
                <div className={styles.single} key={i}>
                    <div className={styles.imageContainer}>
                        {single.image && (
                            <Image
                                src={single.image.url}
                                alt={single.image.alt}
                                layout="fill"
                                objectFit="cover"
                            />
                        )}
                        <div className={styles.infoContainer}>
                            <Link
                                href={
                                    single.link ? convertLink(single.link) : "/"
                                }
                            >
                                <a className={styles.developmentInfo}>
                                    {single.title && (
                                        <Title3>{single.title}</Title3>
                                    )}
                                    {single.subtitle && (
                                        <BodyLarge
                                            overwriteStyle={styles.subtitle}
                                        >
                                            {single.subtitle}
                                        </BodyLarge>
                                    )}
                                    <Triangles
                                        triangles={styles.triangles}
                                        trianglesHover={styles.trianglesHover}
                                        triangle={styles.triangle}
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div key={i} className={`grid-12 ${styles.flex}`}>
                {row}
            </div>
        );
    });

    return (
        <div
            className={`${styles.container} ${
                props.module.styling_options.includes("extra_bottom_padding")
                    ? styles.extraBottomPadding
                    : ""
            } ${
                props.module.styling_options.includes("dark_background")
                    ? styles.darkBackground
                    : ""
            }`}
        >
            <div className={`grid-12 ${styles.flex}`}>
                <div className="col-start-1 col-end-6">
                    <div className={styles.imageContainer}>
                        {props.module.content_plus_development.development
                            .image && (
                            <Image
                                src={
                                    props.module.content_plus_development
                                        .development.image.url
                                }
                                alt={
                                    props.module.content_plus_development
                                        .development.image.alt
                                }
                                layout="fill"
                                objectFit="cover"
                            />
                        )}
                        <div className={styles.infoContainer}>
                            <Link
                                href={convertLink(
                                    props.module.content_plus_development
                                        .development.link
                                )}
                            >
                                <a className={styles.developmentInfo}>
                                    {props.module.content_plus_development
                                        .development.title && (
                                        <Title3>
                                            {
                                                props.module
                                                    .content_plus_development
                                                    .development.title
                                            }
                                        </Title3>
                                    )}
                                    {props.module.content_plus_development
                                        .development.subtitle && (
                                        <BodyLarge
                                            overwriteStyle={styles.subtitle}
                                        >
                                            {
                                                props.module
                                                    .content_plus_development
                                                    .development.subtitle
                                            }
                                        </BodyLarge>
                                    )}
                                    <Triangles
                                        triangles={styles.triangles}
                                        trianglesHover={styles.trianglesHover}
                                        triangle={styles.triangle}
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className={`col-start-7 col-end-12 ${styles.contentContainer}`}
                >
                    <div className={styles.content}>
                        {props.module.content_plus_development.content
                            .eyebrow && (
                            <LabelSmall overwriteStyle={styles.eyebrow}>
                                {
                                    props.module.content_plus_development
                                        .content.eyebrow
                                }
                            </LabelSmall>
                        )}
                        {props.module.content_plus_development.content
                            .title && (
                            <Title2 titleValue={props.titleValue}>
                                {
                                    props.module.content_plus_development
                                        .content.title
                                }
                            </Title2>
                        )}
                        {props.module.content_plus_development.content.copy && (
                            <BodySmall overwriteStyle={styles.copy}>
                                {
                                    props.module.content_plus_development
                                        .content.copy
                                }
                            </BodySmall>
                        )}
                        {props.module.content_plus_development.content.button
                            .text && (
                            <Button
                                text={
                                    props.module.content_plus_development
                                        .content.button.text
                                }
                                link={
                                    props.module.content_plus_development
                                        .content.button.link
                                }
                                dark={contrast}
                            />
                        )}
                    </div>
                </div>
            </div>
            {developments}
        </div>
    );
};

export default ContourPortfolioArchive;
