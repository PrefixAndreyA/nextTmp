import React from "react";
import Title2 from "../../typography/Title2";
import styles from "./ContourAccordion.module.scss";
import ContourAccordionComponent from "../../components/ContourAccordionComponent/ContourAccordionComponent";

const ContourAccordion = (props) => {
    return (
        <div className="grid-12">
            <div className={`col-start-3 col-end-10 ${styles.container}`}>
                <Title2
                    overwriteStyle={styles.title}
                    titleValue={props.titleValue}
                >
                    {props.module.title}
                </Title2>
                <ContourAccordionComponent data={props.module.accordion} />
            </div>
        </div>
    );
};

export default ContourAccordion;
