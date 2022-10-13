import styles from "./SinglePostContent.module.scss";
import Image from "next/image";
import FontWait from "../FontWait/FontWait";
import Link from "next/link";

const SinglePostContent = (props) => {
    // Store gross paths
    const imageURL = props.postData._embedded["wp:featuredmedia"][0].source_url;
    const alt = props.postData._embedded["wp:featuredmedia"][0].alt_text;
    // We need the intrinsic dimensions of the image because of how Next.js does images
    const width =
        props.postData._embedded["wp:featuredmedia"][0].media_details.width;
    const height =
        props.postData._embedded["wp:featuredmedia"][0].media_details.height;
    // Get the post type for links and content
    let slug = props.postData.type;
    // But change default post type to whatever the blog/news url is
    if (slug == "post") {
        slug = "news";
    }

    return (
        <div className={styles.SinglePostContent}>
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
                sizes="(min-width: 848px) 800px"
            />
            <FontWait>
                <h1>{props.postData.title.rendered}</h1>
                <div
                    // dangerouslySetInnerHTML allows us to output HTML elements from a string
                    // It's only really dangerous if we don't control the content coming from the API, but we do
                    dangerouslySetInnerHTML={{
                        __html: props.postData.content.rendered,
                    }}
                />
                <Link href={`/${slug}`}>
                    <a className={styles.backToArchive}>Back to {slug}</a>
                </Link>
            </FontWait>
        </div>
    );
};

export default SinglePostContent;
