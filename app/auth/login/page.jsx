"use client";

import styles from "./styles.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      console.log("[LOGIN] : user already");
      router.push("/");
    }
  }, [user, router]);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.log("[LOGIN] : Form Login Failed", error.message);
    }
  };
  // console.log("LOGIN FORM: ", errors);

  const handleLoginDefault = async (e) => {
    e.preventDefault();
    try {
      await login("user01@gmail.com", "user01@1234");
    } catch (error) {
      console.log("[LOGIN] : Default Login Failed", error.message);
    }
  };

  return (
    <>
      <main className={"container"}>
        <h1 className={styles.title}>Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className={styles.inputField}
          />
          {errors.email && (
            <span className={styles.errorMessage}>Email is required</span>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 16,
            })}
            className={styles.inputField}
          />
          {errors.password && (
            <span className={styles.errorMessage}>
              Password must be 8-16 characters
            </span>
          )}

          <input type="submit" className={styles.submitButton} />

          <Link className={styles.signupButton} href={"/auth/signup"}>
            SignUp
          </Link>
        </form>
        <button onClick={handleLoginDefault} className={styles.btn}>
          DEFAULT Login
        </button>
      </main>
    </>
  );
};

export default LogIn;
