import React from "react";

const Wysiwyg = (props) => {
    return (
        <div className="arc-wysiwyg" dangerouslySetInnerHTML={props.content} />
    );
};

export default Wysiwyg;
