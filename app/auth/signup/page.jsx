"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await signup(data.name, data.email, data.password);
    } catch (error) {
      console.log("[SIGNUP] : FORM Login Failed", error.message);
    }
  };
  // console.log("SIGNUP FORM: ", errors);

  const handleSignupDefault = async (e) => {
    e.preventDefault();
    try {
      await signup("user01", "user01@gmail.com", "user01@1234");
    } catch (error) {
      console.log("[SIGNUP] : Default Login Failed", error.message);
    }
  };

  return (
    <>
      <main className={"container"}>
        <h1 className={styles.title}>SignUp</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 30 })}
            className={styles.inputField}
          />
          {errors.name && (
            <span className={styles.errorMessage}>
              Name is required and should be less than 30 characters
            </span>
          )}

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

          <Link className={styles.loginButton} href={"/auth/login"}>
            Login
          </Link>
        </form>
        <button onClick={handleSignupDefault} className={styles.btn}>
          DEFAULT Signup
        </button>
      </main>
    </>
  );
};

export default SignUp;
