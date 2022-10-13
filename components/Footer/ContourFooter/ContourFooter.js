import styles from "./ContourFooter.module.scss";
import Image from "next/image";
import Link from "next/link";
import MenuList from "../../MenuList/MenuList";

const ContourFooter = (props) => {
    let address = [];

    if (props.options.address) {
        address = props.options.address.map((line, i) => {
            return <li key={i}>{line.address_line}</li>;
        });
    }

    const date = new Date();
    const year = date.getFullYear();

    let socialLinks = [];
    if (props.options.social_links) {
        socialLinks = props.options.social_links.map((link, i) => {
            return (
                <li key={i}>
                    <Link href={link.link}>
                        <a target="_blank">
                            {link.icon && (
                                <Image
                                    src={link.icon.url}
                                    alt={link.icon.alt}
                                    width={link.icon.width}
                                    height={link.icon.height}
                                    layout="fixed"
                                    className={styles.icon}
                                />
                            )}
                        </a>
                    </Link>
                </li>
            );
        });
    }

    return (
        <footer className={styles.footer}>
            <div className={`grid-12 ${styles.container}`}>
                <div
                    className={`col-start-1 col-end-4 ${styles.logoContainer}`}
                >
                    <Link href="/">
                        <a>
                            {props.options.logo && (
                                <Image
                                    src={props.options.logo.url}
                                    alt={props.options.logo.alt}
                                    width={props.options.logo.width}
                                    height={props.options.logo.height}
                                    layout="fixed"
                                    className={styles.logo}
                                />
                            )}
                        </a>
                    </Link>
                </div>
                <div
                    className={`col-start-5 col-end-8 ${styles.addressContainer}`}
                >
                    {address.length > 0 && (
                        <ul className={styles.address}>{address}</ul>
                    )}
                    {(props.options.email || props.options.phone_number) && (
                        <div className={styles.contactInfo}>
                            {props.options.email && (
                                <Link href={`mailto:${props.options.email}`}>
                                    {props.options.email}
                                </Link>
                            )}
                            {props.options.email &&
                                props.options.phone_number && <span>|</span>}
                            {props.options.phone_number && (
                                <Link
                                    href={`tel:${props.options.phone_number}`}
                                >
                                    {props.options.phone_number}
                                </Link>
                            )}
                        </div>
                    )}
                    {props.options.copyright_name && (
                        <div className={styles.copyright}>
                            &copy;{year} {props.options.copyright_name}
                        </div>
                    )}
                </div>
                <div
                    className={`col-start-9 col-end-12 ${styles.linksContainer}`}
                >
                    {props.footerMenuData.length && (
                        <ul className={styles.footerMenu}>
                            <MenuList
                                data={props.footerMenuData}
                                frontPageID={props.frontPageID}
                            />
                        </ul>
                    )}
                    {props.options.social_links.length && (
                        <ul className={styles.socialLinks}>{socialLinks}</ul>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default ContourFooter;
