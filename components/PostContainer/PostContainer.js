import styles from "./PostContainer.module.scss";
import Link from "next/link";
import Image from "next/image";
import FontWait from "../FontWait/FontWait";

const PostContainer = (props) => {
    // React outputs listed data in the JSX in the form of an array
    // So let's create an array of list elements from the menu data array we got from the API
    const posts = props.postData.map((post, i) => {
        // Store gross paths
        const imageURL = post._embedded["wp:featuredmedia"][0].source_url;
        const alt = post._embedded["wp:featuredmedia"][0].alt_text;
        // We need the intrinsic dimensions of the image because of how Next.js does images
        const width = post._embedded["wp:featuredmedia"][0].media_details.width;
        const height =
            post._embedded["wp:featuredmedia"][0].media_details.height;
        // We just need the final part of the path for inner pages
        // So let's take the full url from the API and grab that part
        // Get the url and remove the trailing slash
        let url = post.link.slice(0, -1);
        // Find the position in the string where the last slash is
        let n = url.lastIndexOf("/");
        // Remove everything up to and including the last slash
        var path = url.substring(n + 1);
        // Get the post type for the URLS. Usually CPTs will match, but for posts it might be something custom like news or blog or whatever, so let's make it conditional
        let slug = post.type;
        if (slug == "post") {
            slug = "news";
        }

        return (
            <Link href={`/${slug}/${path}`} key={i}>
                <a className={styles.postArchiveItem}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={imageURL}
                            alt={alt}
                            width={width}
                            height={height}
                            layout="responsive"
                            // We can use the sizes prop to set a max image size based on the largest size the image will be in its container, as opposed to trusting the viewport
                            // Set the min width to the viewport size when the image reaches its max size
                            // Set the image size to whatever the image size is at that point
                            // It's not fool proof because when you stack an image into a single column it can get larger, but it's a good general system
                            sizes="(min-width: 1248px) 588px"
                        />
                    </div>
                    {/* Styling will work with or without FontWait */}
                    <FontWait>
                        <div>
                            <h2>{post.title.rendered}</h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.excerpt.rendered,
                                }}
                            />
                            <div className={styles.readPost}>Read Post</div>
                        </div>
                    </FontWait>
                </a>
            </Link>
        );
    });

    return <div className={styles.PostContainer}>{posts}</div>;
};

export default PostContainer;
