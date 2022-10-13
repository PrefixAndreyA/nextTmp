import * as wp from "./api/wordpress";
import { Fragment, useContext, useEffect } from "react";
import AfterBody from "../components/SEO/AfterBody";
import { AppContext } from "../context";
import BeforeBody from "../components/SEO/BeforeBody";
import BeforeHead from "../components/SEO/BeforeHead";
import Error from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import Head from "next/head";
import Header from "../components/Header/Header";
import { isEmptyObject } from "/utils";

const Custom500 = (props) => {
    // We need to send data up to the app component to pass to the header
    // This way it can remain persistent and do animations etc
    // Let's destructure the app context to grab the global data and the function to update it
    const { wordPressData, setWordPressData } = useContext(AppContext);

    // Let's trigger a re-render when the new data is assigned globally
    useEffect(() => {
        setWordPressData(props);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>{`${props.siteName} - 500`}</title>
                {props.options.before_head ? (
                    <BeforeHead options={props.options} />
                ) : null}
            </Head>
            {props.options.after_body ? (
                <AfterBody options={props.options} />
            ) : null}
            {isEmptyObject(wordPressData) ? (
                <Header
                    options={props.options}
                    headerMenuData={props.headerMenuData}
                    headerMenu2Data={props.headerMenu2Data}
                    frontPageID={props.frontPageID}
                    dark={true}
                />
            ) : null}
            <Error message="500 | Internal server error" />
            <Footer
                options={props.options}
                footerMenuData={props.footerMenuData}
                frontPageID={props.frontPageID}
            />
            {props.options.before_body ? (
                <BeforeBody options={props.options} />
            ) : null}
        </Fragment>
    );
};

export async function getStaticProps() {
    const frontPageID = await wp.getFrontPageID();

    const [headerMenuData, headerMenu2Data, footerMenuData, siteName, options] =
        await Promise.all([
            wp.getHeaderMenu(),
            wp.getHeaderMenu2(),
            wp.getFooterMenu(),
            wp.getSiteName(),
            wp.getOptions(),
        ]).then((response) => Promise.all(response));

    return {
        props: {
            frontPageID,
            options,
            siteName,
            footerMenuData,
            headerMenuData,
            headerMenu2Data,
        },
    };
}

export default Custom500;
