import styles from "./FontWait.module.scss";
import { useEffect, useState } from "react";

// This component is used to force its children to wait for font files to load before showing
// Otherwise there's an ugly jump when the page switches from system fonts to web fonts
// It's really only a problem because Next.js is so fast, but we don't have to always use it
// It's a nice to have on text above the fold
const FontWait = (props) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        document.fonts.ready.then(function () {
            setFontsLoaded(true);
        });
    }, []);

    return (
        <div
            className={`${styles.FontWait} ${
                fontsLoaded ? styles.showText : ""
            }`}
        >
            {props.children}
        </div>
    );
};

export default FontWait;
