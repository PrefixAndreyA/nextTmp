import React from "react";
import * as AllFooters from "./";

const Footer = (props) => {
    const footerVersion = "ContourFooter";

    const SiteFooter = AllFooters[footerVersion];

    return (
        <SiteFooter
            options={props.options}
            footerMenuData={props.footerMenuData}
            frontPageID={props.frontPageID}
        />
    );
};

export default Footer;
