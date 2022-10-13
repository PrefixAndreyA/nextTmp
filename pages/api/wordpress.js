import {
    circularToJSON,
    createFormArray,
    getCircularReplacer,
    setUpAuth,
} from "/utils";
import {
    cleanAllPosts,
    cleanFormData,
    cleanMenu,
    cleanPageData,
    cleanTaxonomy,
    cleanTypePosts,
    cleanTypes,
} from "/utils/dataCleaners";

import Axios from "axios";

// We use Axios to fetch the data from the API
const wordpress = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getCategories() {
    try {
        const cats = await wordpress.get(
            "wp-json/wp/v2/categories?per_page=100"
        );
        const catsCleaned = cleanTaxonomy(cats.data);
        return catsCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getTags() {
    try {
        const tags = await wordpress.get("wp-json/wp/v2/tags?per_page=100");
        const tagsCleaned = cleanTaxonomy(tags.data);
        return tagsCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getOptions() {
    try {
        const options = await wordpress.get("wp-json/acf/v3/options/options");
        const optionsJSON = circularToJSON(options);
        return optionsJSON.data.acf;
    } catch (error) {
        console.error(error);
    }
}

export async function getSiteName() {
    try {
        const blogInfo = await wordpress.get("wp-json/custom/bloginfo");
        const siteName = circularToJSON(blogInfo);
        return siteName.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getFooterMenu() {
    try {
        const footerMenu = await wordpress.get("wp-json/custom/footermenu");
        const footerMenuDataCleaned = cleanMenu(footerMenu.data);
        return footerMenuDataCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getHeaderMenu() {
    try {
        const headerMenu = await wordpress.get("wp-json/custom/headermenu");
        const headerMenuDataCleaned = cleanMenu(headerMenu.data);
        return headerMenuDataCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getHeaderMenu2() {
    try {
        const headerMenu2 = await wordpress.get("wp-json/custom/headermenu2");
        const headerMenu2DataCleaned = cleanMenu(headerMenu2.data);
        return headerMenu2DataCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getPages(params = "") {
    try {
        const pages = await wordpress.get(`wp-json/wp/v2/${params}`);

        const pagesArray = Array.isArray(pages.data)
            ? pages.data
            : [pages.data];

        const pagesCleaned = cleanPageData(pagesArray, getCircularReplacer);

        return pagesCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getPagePaths(endpoint = "") {
    try {
        const pages = await wordpress.get(`wp-json/wp/v2/${endpoint}`);

        const pagesCleaned = pages.data.map((page) => ({
            id: page.id,
            slug: page.slug,
            parent: page.parent,
            parent_slug: page.parent_slug,
        }));

        return pagesCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getFrontPageID() {
    try {
        const frontPage = await wordpress.get("wp-json/custom/frontpage");
        const frontPageID = circularToJSON(frontPage);
        return frontPageID.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPreviewPages(pages, pageID, type) {
    try {
        const base64 = require("base-64");
        const headers = new Headers();
        const username = process.env.REST_USER;
        const password = process.env.REST_PASS;
        headers.set(
            "Authorization",
            "Basic " + base64.encode(`${username}:${password}`)
        );

        const revisedPage = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/${type}/${pageID}/revisions?skip_cache=1`,
            {
                method: "GET",
                headers: headers,
            }
        ).then((response) => response.json());

        const revisedPageJson = revisedPage[0];

        // Set up preview data
        // First let's copy the existing page data
        // Then let's change the acf fields and the page title, everything else should be the same
        const revisedPageCleaned = pages;
        if (revisedPageJson) {
            revisedPageCleaned[0].acf = revisedPageJson.acf;
            revisedPageCleaned[0].title = revisedPageJson.title;
        }
        return revisedPageCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getPosts() {
    try {
        const allPosts = await wordpress.get(
            "wp-json/wp/v2/posts?_embed&per_page=100"
        );
        const allPostsCleaned = cleanAllPosts(allPosts.data);
        return allPostsCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getForms() {
    try {
        // Set up creds for Gravity Forms API
        const headers = setUpAuth();

        const formJson = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/wp-json/gf/v2/forms`,
            {
                method: "GET",
                headers: headers,
            }
        ).then((response) => response.json());

        // Create array of all form IDs
        const idArray = createFormArray(formJson);

        // Create an array of all the form info returned from the API
        const allForms = idArray.map((id) => {
            return fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/wp-json/gf/v2/forms/${id}`,
                {
                    method: "GET",
                    headers: headers,
                }
            );
        });

        // Don't really understand this syntax, but basically it waits for all the forms to return from the API
        const forms = await Promise.all(allForms).then((response) =>
            Promise.all(response.map((r) => r.json()))
        );

        // Stringify the 'circular' data so it's ready to pass to the front end
        const formsJSON = circularToJSON(forms);

        // Let's remove some of the payload size
        // If different data is needed, change in /utils/dataCleaners.js
        const formDataCleaned = cleanFormData(formsJSON);

        return formDataCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getDevelopments() {
    try {
        const allDevelopments = await wordpress.get(
            "wp-json/wp/v2/portfolio?_embed&per_page=100"
        );
        const allDevelopmentsCleaned = cleanAllPosts(allDevelopments.data);
        return allDevelopmentsCleaned;
    } catch (error) {
        if (error.response.status === 404) {
            console.error(
                `\nWarning: If the server is up and running then you might need to add the CPT for developments (slug='portfolio')`
            );
            return [];
        }
        console.error(error);
    }
}

export async function getTypes() {
    try {
        const allTypes = await wordpress.get("wp-json/wp/v2/types");
        const allTypesCleaned = cleanTypes(allTypes.data);
        return allTypesCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getTypePosts(type_rest_base, page=1) {
    try {
        const allTypePosts = await wordpress.get("wp-json/wp/v2/" + type_rest_base + "?per_page=100&page=" + page);
        const allTypesPostsCleaned = cleanTypePosts(allTypePosts.data);
        return allTypesPostsCleaned;
    } catch (error) {
        console.error(error);
    }
}

export async function getOptionByName($name) {
    console.log($name);
    try {
        const optionValue = await wordpress.get(
            "wp-json/wallop/v1/options_table/" + $name
        );
        return !optionValue.data ? "" : await JSON.parse(optionValue.data);
    } catch (error) {
        console.error(error);
    }
}
