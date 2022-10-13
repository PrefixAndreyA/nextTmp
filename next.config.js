async function getRedirectionSettings(page = 0) {
    try {
        // https://redirection.me/developer/rest-api/#api-Redirect-GetRedirects
        const redirection_settings = await fetch(
            process.env.NEXT_PUBLIC_API_URL +
                "/wp-json/redirection/v1/redirect?filterBy[status]=enabled&page=" +
                page,
            {
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(
                            process.env.REST_USER + ":" + process.env.REST_PASS
                        ).toString("base64"),
                },
            }
        ).then((response) => response.json());
        return redirection_settings;
    } catch (error) {
        console.log("/next.config.js@20");
        console.error(error);
        return [];
    }
}

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["cakestudy.kzstage.com"],
        minimumCacheTTL: 604800,
    },
    async redirects() {
        try {
            let current_settings_page = 0,
                redirection_settings = await getRedirectionSettings(
                    current_settings_page
                );
            if (redirection_settings.total) {
                let total_settings_page = 1;
                if (redirection_settings.total > 25) {
                    total_settings_page = Math.ceil(
                        redirection_settings.total / 25
                    ); // include the last few redirects which are less than 25;
                    current_settings_page++; // 2nd page
                }
                while (current_settings_page < total_settings_page) {
                    const new_redirection_settings =
                        await getRedirectionSettings(current_settings_page); // no need to check total because response must has some redirects
                    redirection_settings.items.push(
                        ...new_redirection_settings.items
                    );
                    current_settings_page++; // next page
                }
                const redirect_settings = redirection_settings.items.map(
                    (redirect_setting) => {
                        return {
                            source: redirect_setting.url.endsWith("/")
                                ? redirect_setting.url.slice(0, -1)
                                : redirect_setting.url,
                            destination: redirect_setting.action_data.url,
                            permanent: true,
                        };
                    }
                );
                return redirect_settings;
            } else {
                console.log("/next.config.js@67");
                console.log(redirection_settings);
                return [];
            }
        } catch (error) {
            console.log("/next.config.js@72");
            console.error(error);
            return [];
        }
    },
};
