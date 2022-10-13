import React from "react";
import ContourGridComponent from "../../components/ContourGridComponent/ContourGridComponent";
import ContourGridItem from "../../components/ContourGridItem/ContourGridItem";
import Title2 from "../../typography/Title2";
import Title6 from "../../typography/Title6";
import Button from "../../components/Button/Button";
import styles from "./ContourGrid.module.scss";

const ContourGrid = (props) => {
    const isArchive = !props.module.styling_options.includes("is_image_links");
    const isExternal =
        props.module.styling_options.includes("is_external_link");
    const isSquare = props.module.styling_options.includes("square_image");

    const grid = props.module.grid.map((item, i) => {
        return (
            <ContourGridItem
                item={item}
                i={i}
                key={i}
                archive={isArchive}
                external={isExternal}
                square={isSquare}
            />
        );
    });

    return (
        <div className={styles.grid}>
            {props.module.title &&
                props.module.styling_options.includes("show_title") &&
                !props.module.styling_options.includes("large_title") && (
                    <Title6 overwriteStyle={styles.title}>
                        {props.module.title}
                    </Title6>
                )}
            {props.module.title &&
                props.module.styling_options.includes("show_title") &&
                props.module.styling_options.includes("large_title") && (
                    <Title2 overwriteStyle={styles.bigTitle}>
                        {props.module.title}
                    </Title2>
                )}
            {grid.length && <ContourGridComponent list={grid} />}
            {props.module.styling_options.includes("show_button") &&
                props.module.button.text && (
                    <div className={styles.buttonContainer}>
                        <Button
                            link={props.module.button.link}
                            text={props.module.button.text}
                            dark
                            nomargin
                        />
                    </div>
                )}
        </div>
    );
};

export default ContourGrid;
