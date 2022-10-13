import "normalize.css";
import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { AppContext } from "../context";
import { useState, useEffect } from "react";
import { isEmptyObject } from "../utils";

// This file is the root of the whole site
// Hence putting our layout component here to have our header persistent between pages
// Let's also create a context for global state management
function MyApp({ Component, pageProps }) {
    const [wordPressData, setWordPressData] = useState({});
    const value = { wordPressData, setWordPressData };
    const [staticProps, setStaticProps] = useState({});

    useEffect(() => {
        if (!isEmptyObject(wordPressData)) {
            setStaticProps(pageProps);
        }
    });

    return (
        <AppContext.Provider value={value}>
            <Layout staticProps={staticProps}>
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    );
}

export default MyApp;
