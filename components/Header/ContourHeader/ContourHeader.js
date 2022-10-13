import styles from "./ContourHeader.module.scss";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Hamburger from "../../Hamburger/Hamburger";
import MenuList from "../../MenuList/MenuList";
import { AppContext } from "../../../context";

const ContourHeader = (props) => {
    const { wordPressData, setWordPressData } = useContext(AppContext);

    const [hamburgerIsActive, setHamburgerIsActive] = useState(false);

    const toggleMenu = () => {
        setHamburgerIsActive(!hamburgerIsActive);
    };

    const closeMenu = () => {
        setHamburgerIsActive(false);
    };

    const [headerDark, setHeaderDark] = useState(false);

    useEffect(() => {
        if (
            wordPressData.pageData &&
            wordPressData.pageData[0].acf.page_options
        ) {
            if (
                wordPressData.pageData[0].acf.page_options.includes(
                    "dark_header"
                )
            ) {
                setHeaderDark(true);
            } else {
                setHeaderDark(false);
            }
        }
        if (props.dark) {
            setHeaderDark(true);
        }
    });

    const menuIsLight = props.menuIsLight
        ? `${styles.light} menu-light`
        : "menu-dark";
    const darkHeader = headerDark ? styles.dark : "";
    const hamburgerIsActiveStyles = hamburgerIsActive ? styles.open : "";

    return (
        <header
            className={`${styles.header} ${menuIsLight} ${hamburgerIsActiveStyles} ${darkHeader}`}
        >
            <div className={styles.lightOverlay}></div>
            <div className={`${styles.mobileMenuContainer} mobile-menu`}>
                <ul className={styles.mobileMenu}>
                    <MenuList
                        data={props.data.headerMenuData}
                        linkClickHandler={closeMenu}
                        frontPageID={props.frontPageID}
                        className="mobileMenu"
                    />
                </ul>
                <ul className={styles.mobileMenu2}>
                    <MenuList
                        data={props.data.headerMenu2Data}
                        linkClickHandler={closeMenu}
                        frontPageID={props.frontPageID}
                        className="mobileMenu2"
                    />
                </ul>
            </div>
            {/* There's a bunch of logic here for getting the right images and accounting for no images */}
            <Link href="/">
                <a className={styles.logoContainer} onClick={closeMenu}>
                    <div className={styles.logoPositioner}>
                        {props.pageProps === undefined
                            ? props.data.options.logo_light && (
                                  <Image
                                      src={props.data.options.logo_light.url}
                                      alt={props.data.options.logo_light.alt}
                                      width={
                                          props.data.options.logo_light.width
                                      }
                                      height={
                                          props.data.options.logo_light.height
                                      }
                                      layout="fixed"
                                      priority
                                      className={styles.logoLight}
                                  />
                              )
                            : props.pageProps.options.logo_light && (
                                  <Image
                                      src={
                                          props.pageProps.options.logo_light.url
                                      }
                                      alt={
                                          props.pageProps.options.logo_light.alt
                                      }
                                      width={
                                          props.pageProps.options.logo_light
                                              .width
                                      }
                                      height={
                                          props.pageProps.options.logo_light
                                              .height
                                      }
                                      layout="fixed"
                                      priority
                                      className={styles.logoLight}
                                  />
                              )}
                    </div>
                    <div className={styles.logoPositioner}>
                        {props.pageProps === undefined
                            ? props.data.options.logo_dark && (
                                  <Image
                                      src={props.data.options.logo_dark.url}
                                      alt={props.data.options.logo_dark.alt}
                                      width={props.data.options.logo_dark.width}
                                      height={
                                          props.data.options.logo_dark.height
                                      }
                                      layout="fixed"
                                      priority
                                      className={styles.logoDark}
                                  />
                              )
                            : props.pageProps.options.logo_dark && (
                                  <Image
                                      src={
                                          props.pageProps.options.logo_dark.url
                                      }
                                      alt={
                                          props.pageProps.options.logo_dark.alt
                                      }
                                      width={
                                          props.pageProps.options.logo_dark
                                              .width
                                      }
                                      height={
                                          props.pageProps.options.logo_dark
                                              .height
                                      }
                                      layout="fixed"
                                      priority
                                      className={styles.logoDark}
                                  />
                              )}
                    </div>
                </a>
            </Link>

            <ul className={`${styles.mainMenu} main-menu`}>
                <MenuList
                    data={props.data.headerMenuData}
                    linkClickHandler={closeMenu}
                    frontPageID={props.frontPageID}
                />
            </ul>

            <ul className={`${styles.menu2} menu-2`}>
                <MenuList
                    data={props.data.headerMenu2Data}
                    linkClickHandler={closeMenu}
                    frontPageID={props.frontPageID}
                    className="mainMenu2"
                />
            </ul>

            <div className={styles.hamburgerContainer} onClick={toggleMenu}>
                <Hamburger
                    dark={props.menuIsLight || headerDark}
                    active={hamburgerIsActive}
                />
            </div>
        </header>
    );
};

export default ContourHeader;
