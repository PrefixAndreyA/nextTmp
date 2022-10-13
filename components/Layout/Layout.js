import { useContext } from "react";
import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import { isEmptyObject } from "../../utils";
import { AppContext } from "../../context";
import { useRouter } from "next/router";

// This component allows us to put a persistent header on every page
const Layout = (props) => {
    const router = useRouter();
    let dark = false;
    if (router.route == "/404" || router.route == "/500") {
        dark = true;
    }
    const { wordPressData, setWordPressData } = useContext(AppContext);
    return (
        <div className={styles.layout}>
            {!isEmptyObject(wordPressData) && (
                <Header
                    staticProps={props.staticProps}
                    frontPageID={props.staticProps.frontPageID}
                    dark={dark}
                />
            )}
            {props.children}
        </div>
    );
};

export default Layout;
