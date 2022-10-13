import AfterBody from "../SEO/AfterBody";
import { AppContext } from "../../context";
import BeforeBody from "../SEO/BeforeBody";
import BeforeHead from "../SEO/BeforeHead";
import Footer from "../Footer/Footer";
import Head from "next/head";
import Header from "../Header/Header";
import Modules from "../Modules/Modules";
import Yoast from "../SEO/Yoast";
import { isEmptyObject } from "../../utils";
import { useContext } from "react";
const PageContent = (props) => {
    const { wordPressData, setWordPressData } = useContext(AppContext);

    return (
        <>
            {props.pageData.yoastMeta && (
                <Yoast meta={props.pageData.yoastMeta} />
            )}
            <Head>
                {props.options.before_head && (
                    <BeforeHead options={props.options} />
                )}
            </Head>
            {props.options.after_body && <AfterBody options={props.options} />}
            {isEmptyObject(wordPressData) && (
                <Header
                    options={props.options}
                    headerMenuData={props.headerMenuData}
                    headerMenu2Data={props.headerMenu2Data}
                    frontPageID={props.frontPageID}
                />
            )}
            <Modules
                modules={props.pageData.acf.modules}
                forms={props.forms}
                options={props.options}
                allPostsData={props.allPostsData}
                allDevelopmentsData={props.allDevelopmentsData}
                allCareersData={props.allCareersData}
                cats={props.cats}
                tags={props.tags}
                events={props.events}
            />
            <Footer
                options={props.options}
                footerMenuData={props.footerMenuData}
                frontPageID={props.frontPageID}
            />
            {props.options.before_body && (
                <BeforeBody options={props.options} />
            )}
        </>
    );
};

export default PageContent;
