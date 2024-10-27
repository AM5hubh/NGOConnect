"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faB,
    faBars,
    faChevronDown,
    faChevronUp,
    faClose,
    faSignOut,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const ScrollTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div>
            {visible && (
                <button
                    onClick={scrollToTop}
                    className="fixed w-10 h-10 bottom-24 md:bottom-8 right-5  bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 z-50 flex justify-center items-center"
                >
                    <FontAwesomeIcon icon={faChevronUp} className="" />
                </button>
            )}
        </div>
    );
};

export default ScrollTop;
