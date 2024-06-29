"use client";

import styles from "./index.module.css";
import clsx from "clsx";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <header className={clsx(styles.header, "container")}>
        <nav className={styles.navbar}>
          <div>
            <Link href={"/"}>
              <p className={clsx(styles.sitename)}>The TomatoAid 🍅</p>
              <p className={clsx(styles.short_desc)}>Donation MaDe Simple...</p>
            </Link>
          </div>
          <div>
            {user ? (
              <button onClick={logout} className={clsx(styles.btn)}>
                Logout
              </button>
            ) : (
              <Link className={clsx(styles.btn)} href={"/auth/login"}>
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
