import React from "react";
import ContourTextAndImageComponent from "../../components/ContourTextAndImageComponent/ContourTextAndImageComponent";

const ContourTextAndImage = (props) => {
    const contrast = !props.module.styling_options.includes("dark_background");

    const propObject = {
        contrast: contrast,
        titleValue: props.titleValue,
        stylingOptions: props.module.styling_options,
        buttonText: props.module.button.text,
        buttonLink: props.module.button.link,
        image: props.module.image,
        eyebrow: props.module.eyebrow,
        title: props.module.title,
        subtitle: props.module.subtitle,
        copy: props.module.copy,
    };

    return <ContourTextAndImageComponent propObject={propObject} />;
};

export default ContourTextAndImage;
