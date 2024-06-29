"use client";

import styles from "./index.module.css";

import { useState } from "react";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsVisible(false);
    console.log("Banner Closed");
  };

  return (
    <>
      {isVisible && (
        <div className={styles.banner}>
          <p className={styles.banner__content}>
            Site is currently under construction and some features may be
            unavailable.
          </p>
          <button onClick={handleClick} className={styles.banner__close__btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;
