import React from "react";

const BodyMedium = (props) => {
    if (props.titleValue) {
        const Title = `h${props.titleValue}`;
        return (
            <Title
                className={`body-medium ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </Title>
        );
    } else {
        return (
            <div
                className={`body-medium ${
                    props.overwriteStyle ? props.overwriteStyle : ""
                }`}
            >
                {props.children}
            </div>
        );
    }
};

export default BodyMedium;
