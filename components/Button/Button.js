import React from "react";
import styles from "./Button.module.scss";
import Link from "next/link";
import Triangles from "../Triangles/Triangles";
import { convertLink } from "../../utils";

const Button = (props) => {
    // Expected props are link and text
    // Optional props are dark and fill (dark border and text/colored background instead of transparent) and no margin
    return (
        <button
            className={`${styles.button} ${props.dark ? styles.dark : ""} ${
                props.fill ? styles.fill : ""
            } ${props.nomargin ? styles.noMargin : ""}`}
        >
            <Link href={convertLink(props.link)}>
                <a>
                    {props.text}
                    <Triangles
                        triangles={styles.triangles}
                        trianglesHover={styles.trianglesHover}
                    />
                </a>
            </Link>
        </button>
    );
};

export default Button;
