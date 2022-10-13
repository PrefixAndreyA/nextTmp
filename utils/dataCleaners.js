export function cleanPageData(pageData, getCircularReplacer) {
    if (pageData.length) {
        return pageData.map((page) => {
            const pageOptionsJSON = page.acf.page_options
                ? JSON.parse(
                      JSON.stringify(
                          page.acf.page_options,
                          getCircularReplacer()
                      )
                  )
                : [];
            if (page.acf.modules !== undefined) {
                return {
                    id: page.id,
                    acf: {
                        modules: page.acf.modules ? page.acf.modules : [],
                        page_options: pageOptionsJSON,
                    },
                    title: { rendered: page.title.rendered },
                    slug: page.slug,
                    yoastMeta: page.yoast_head,
                };
            } else {
                return [];
            }
        });
    } else {
        return [];
    }
}

export function cleanAllPosts(posts) {
    if (posts.length) {
        return posts.map((post) => {
            if (post.acf.post_archive_content !== undefined) {
                return {
                    acf: {
                        post_archive_content: post.acf.post_archive_content,
                    },
                    slug: post.slug,
                    tags: post.tags ? post.tags : [],
                };
            } else {
                return [];
            }
        });
    } else {
        return [];
    }
}

export function cleanMenu(menu) {
    if (menu.length) {
        return menu.map((menuItem) => ({
            ID: menuItem.object_id,
            menuID: menuItem.ID,
            classes: menuItem.classes,
            menu_item_parent: menuItem.menu_item_parent,
            target: menuItem.target,
            title: menuItem.title,
            url: menuItem.url,
        }));
    } else {
        return [];
    }
}

export function cleanFormData(formsJSON) {
    if (formsJSON.length) {
        return formsJSON.map((formJSON) => ({
            button: formJSON.button,
            fields: formJSON.fields,
            id: formJSON.id,
            buttonText: formJSON.buttonText ? formJSON.buttonText : "Submit",
        }));
    } else {
        return [];
    }
}

export function cleanTaxonomy(taxonomies) {
    if (taxonomies.length) {
        return taxonomies.map((taxonomy) => ({
            id: taxonomy.id,
            name: taxonomy.name,
            slug: taxonomy.slug,
            count: taxonomy.count,
        }));
    } else {
        return [];
    }
}

export function cleanTypes(types) {
    if (Object.keys(types).length) {
        return Object.keys(types).map((type) => ({
            slug: types[type].slug,
            rest_base: types[type].rest_base,
        }));
    } else {
        return [];
    }
}

export function cleanTypePosts(posts) {
    if (posts.length) {
        const simplified_posts = posts.map((post) => {
            const the_link = post.link.replace(
                process.env.NEXT_PUBLIC_API_URL,
                process.env.SITE_URL
            );
            return {
                slug: post.slug,
                link: the_link,
                date: post.date,
            };
        });
        return simplified_posts.filter((post) => {
            return !!post.link;
        });
    } else {
        return [];
    }
}
