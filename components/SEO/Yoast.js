import Head from "next/head";
import parse from "html-react-parser";

const Yoast = (props) => {
    const search_regex = new RegExp(process.env.NEXT_PUBLIC_API_URL, "g");
    const the_meta = props.meta.replace(search_regex, process.env.SITE_URL);
    return <Head>{parse(the_meta)}</Head>;
};

export default Yoast;
