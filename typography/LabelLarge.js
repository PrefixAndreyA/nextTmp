import React from "react";

const LabelLarge = (props) => {
    if (props.titleValue) {
        const Title = `h${props.titleValue}`;
        return (
            <Title
                className={`label-large ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </Title>
        );
    } else {
        return (
            <div
                className={`label-large ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </div>
        );
    }
};

export default LabelLarge;
