import React from "react";

const Title1 = (props) => {
    if (props.titleValue) {
        const Title = `h${props.titleValue}`;
        return (
            <Title
                className={`title1 ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </Title>
        );
    } else {
        return (
            <div
                className={`title1 ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </div>
        );
    }
};

export default Title1;
