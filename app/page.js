"use client";

import clsx from "clsx";
import styles from "./styles.module.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // console.log(user)

  useEffect(() => {
    if (!user) {
      console.log("[HOME] : no user found");
      // router.push('/auth/login');
    }
  }, [user, router]); 

  return (
    <main className={clsx("container")}>
      <h1 className={clsx(styles.title, "container")}>Home Page</h1>
      {user ? user.name : "No User found"}
      <br />
      <Link className={clsx(styles.btn)} href={"/user/donate-item/"}>
        Donate Items
      </Link>
      <br />
    </main>
  );
}
