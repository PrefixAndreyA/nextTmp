import React from "react";

const Title2 = (props) => {
    if (props.titleValue) {
        const Title = `h${props.titleValue}`;
        return (
            <Title
                className={`title2 ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </Title>
        );
    } else {
        return (
            <div
                className={`title2 ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </div>
        );
    }
};

export default Title2;
