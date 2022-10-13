import * as wp from "../api/wordpress";

import { useContext, useEffect } from "react";

import { AppContext } from "../../context";
import PageContent from "../../components/PageContent/PageContent";

// This is the file for every top level page template except the home page
// The code is almost identical to the home page file
// But it's necessary for the structure of Next.js
// We'll run some slightly different code on the home/dynamic pages to pass the right props to children
// We need to use a custom WP REST API endpoint to get the page ID of the front page

// The props for this function come from Next.js, specifically the getStaticProps function in this file
const Page = (props) => {
    // We need to send data up to the app component to pass to the header
    // This way it can remain persistent and do animations etc
    // Let's destructure the app context to grab the global data and the function to update it
    const { wordPressData, setWordPressData } = useContext(AppContext);
    // Let's trigger a re-render when the new data is assigned globally
    useEffect(() => {
        setWordPressData(props);
    }, []);

    return (
        <PageContent
            frontPageID={props.frontPageID}
            pageData={props.pageData[0]}
            allPostsData={props.allPostsData}
            allDevelopmentsData={props.allDevelopmentsData}
            //forms={props.forms}
            options={props.options}
            siteName={props.siteName}
            footerMenuData={props.footerMenuData}
            headerMenuData={props.headerMenuData}
            headerMenu2Data={props.headerMenu2Data}
            cats={props.cats}
            tags={props.tags}
        />
    );
};

// getStaticProps is the function Next.js uses to pass data to this page
// This is all done on the server side on the build phase
// This means we can put sensitive data here without worrying about it being exposed on the client side
// ie. API keys etc.
export async function getStaticProps({ params, preview }) {
    // Set up the API calls for all the data we need from WordPress
    const frontPageID = await wp.getFrontPageID();

    const [
        pages,
        posts,
        //forms,
        headerMenuData,
        headerMenu2Data,
        footerMenuData,
        siteName,
        options,
        tags,
        categories,
        developments,
    ] = await Promise.all([
        wp.getPages(`pages?_embed&slug=${params.page}`),
        wp.getPosts(),
        //wp.getForms(),
        wp.getHeaderMenu(),
        wp.getHeaderMenu2(),
        wp.getFooterMenu(),
        wp.getSiteName(),
        wp.getOptions(),
        wp.getTags(),
        wp.getCategories(),
        wp.getDevelopments(),
    ]).then((response) => Promise.all(response));

    const pageData = preview
        ? await wp.getPreviewPages(pages, pages[0].id, "pages")
        : pages;

    // Return all of the props that the page and its children will need in a props object of key:value pairs
    return {
        props: {
            frontPageID,
            pageData,
            posts,
            developments,
            //forms,
            options,
            siteName,
            footerMenuData,
            headerMenuData,
            headerMenu2Data,
            categories,
            tags,
        },
    };
}

// getStaticPaths is how Next.js knows how to route pages
// It expects a 'paths' object containing an array with this structure:
// paths: [
//     { params: { page: "page-path" } },
//     { params: { page: "another-page-path" } }
// ];
// The 'page' key depends on the name you give the folder or filename at the root of the dynamic files, ie. [page]
// We'll build this dynamically on the server
export async function getStaticPaths() {
    // We need the pages object from the API to build our path object
    const pages = await wp.getPagePaths("pages?_embed&per_page=100");

    // We need to know what the home page is so we don't create it at its own url at /pagename
    const frontPageID = await wp.getFrontPageID();
    // We also need the sites in a multisite build
    // We can't make the pages that also exist in the post folders
    // Let's hardcode the ones to remove for now, maybe later we can automate
    // I think we can grab all the custom post types and then the reading url for blog?
    const postUrlSubfolders = ["blog", "portfolio"];

    // Now let's loop through the data and push new page entries into our path array
    const pagesFiltered = pages.filter((page) => {
        return (
            page.parent === 0 &&
            page.id !== frontPageID &&
            !postUrlSubfolders.includes(page.slug)
        );
    });
    const pagePaths = pagesFiltered.map((page) => {
        return {
            params: { page: page.slug },
        };
    });

    // Return our array to the front end so Next.js knows which pages to show at which routes
    return {
        paths: pagePaths,
        // This fallback value is required
        // If true Next.js will try to create the page dynamically if there's no matching route for the current url
        // If false Next.js will point to a 404 page
        // Creating the pages dynamically only really makes sense if we have a massive number of pages
        // If we had like 1,000 blogs the build step would take forever, and it would be helpful to only route some
        // But that's not the case here, so let's set it to false
        fallback: false,
    };
}

export default Page;
