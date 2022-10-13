import React from "react";

const Title4 = (props) => {
    if (props.titleValue) {
        const Title = `h${props.titleValue}`;
        return (
            <Title
                className={`title4 ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </Title>
        );
    } else {
        return (
            <div
                className={`title4 ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </div>
        );
    }
};

export default Title4;
