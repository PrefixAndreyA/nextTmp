import React, { useState } from "react";

const Submenu = ({ children }) => {
    const [showMobileSubmenu, setShowMobileSubmenu] = useState(false);

    const handleShowSubmenu = () => {
        setShowMobileSubmenu(true);
    };

    const handleHideSubmenu = () => {
        setShowMobileSubmenu(false);
    };

    return (
        <>
            <button
                className="submenu__button button--no-style"
                onClick={handleShowSubmenu}
            >
                <span className="submenu__arrow"></span>
                <span className="sr-only">Click to show Submenu</span>
            </button>

            <div
                className={`submenu ${
                    showMobileSubmenu ? " submenu--show" : ""
                }`}
            >
                <button
                    className="submenu__button submenu__button--back button--no-style"
                    onClick={handleHideSubmenu}
                >
                    <div className="submenu__arrow submenu__arrow--point-left"></div>
                    <span className="submenu__button-text">Back to Main</span>
                </button>

                <ul className="submenu__list">{children}</ul>
            </div>
        </>
    );
};
export default Submenu;
