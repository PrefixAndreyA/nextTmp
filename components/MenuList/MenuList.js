import React from "react";
import { getPath } from "../../utils";
import Link from "next/link";
import Submenu from "./Submenu";

// This component outputs an unstyled list of links (no container ul) with submenu lists (with ul) if necessary
// We can use it for most/all menus and just style them in the parent component
const MenuList = (props) => {
    if (!props.data) {
        return null;
    }

    const submenuItems = props.data.filter(
        (menuItem) => menuItem.menu_item_parent != 0
    );

    const menu = props.data.map((menuItem, i) => {
        const path = getPath(menuItem, props.frontPageID);

        const currentSubmenu = submenuItems.filter(
            (item) => item.menu_item_parent == menuItem.menuID
        );

        const submenu = currentSubmenu.map((menuItem, i) => {
            const subpath = getPath(menuItem, props.frontPageID);

            return (
                <li key={i} className="menu-item submenu__menu-item">
                    <Link href={`${path}${subpath}`}>
                        <a
                            className="submenu__link"
                            onClick={props.linkClickHandler}
                            target={menuItem.target}
                        >
                            <span>{menuItem.title}</span>
                        </a>
                    </Link>
                </li>
            );
        });

        if (menuItem.menu_item_parent === "0") {
            const hasSubmenuClasses = submenu.length
                ? "menu-item--has-submenu"
                : "";

            return (
                <li key={i} className={`menu-item ${hasSubmenuClasses}`}>
                    <Link href={path}>
                        <a
                            onClick={props.linkClickHandler}
                            target={menuItem.target}
                        >
                            <span>{menuItem.title}</span>
                        </a>
                    </Link>

                    {submenu.length ? <Submenu>{submenu}</Submenu> : null}
                </li>
            );
        }
    });

    return <>{menu}</>;
};

export default MenuList;
