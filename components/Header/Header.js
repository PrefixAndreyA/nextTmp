import { AppContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { isEmptyObject } from "../../utils";
import * as AllHeaders from "./";

const Header = (props) => {
    // The header needs to be persistent so we have to put it in the top level
    // This means we need to wait for the data to be passed up from the page templates
    // This also means google might not index the header, so we have to make a temp static version
    const { wordPressData } = useContext(AppContext);
    const [menuIsLight, setMenuIsLight] = useState(false);

    useEffect(() => {
        const headerScroll = () => {
            if (window.scrollY) {
                setMenuIsLight(true);
            } else {
                setMenuIsLight(false);
            }
        };

        if (typeof window !== "undefined") {
            document.addEventListener("scroll", headerScroll);
        }

        return () => {
            if (typeof window !== "undefined") {
                document.removeEventListener("scroll", headerScroll);
            }
        };
    }, []);

    let headerVersion = "ContourHeader";
    // I don't understand why this works, but it does... Probably merits a follow up.
    // Either version alone causes an error or an undefined at some point in the lifecycle, this magically does not.
    // if (props.staticProps) {
    //     if (props.staticProps.options !== undefined) {
    //         headerVersion = props.staticProps.options.header_version;
    //     }
    // } else {
    //     if (props.options !== undefined) {
    //         headerVersion = props.options.header_version;
    //     }
    // }

    let SiteHeader;
    if (headerVersion !== "") {
        SiteHeader = AllHeaders[headerVersion];
    } else {
        SiteHeader = AllHeaders["NullHeader"];
    }

    // If we're still waiting on the dynamic data, let's use the static data from getStaticProps so google can index it
    // We'll remove this from the DOM as soon as the dynamic data comes in
    if (!isEmptyObject(props)) {
        if (isEmptyObject(wordPressData)) {
            return (
                <SiteHeader
                    data={props}
                    menuIsLight={menuIsLight}
                    frontPageID={props.frontPageID}
                    dark={props.dark}
                />
            );
        } else {
            return (
                <SiteHeader
                    data={wordPressData}
                    menuIsLight={menuIsLight}
                    frontPageID={props.frontPageID}
                    dark={props.dark}
                />
            );
        }
    } else {
        return null;
    }
};

export default Header;
