import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Login: NextPage = () => {
  const { push } = useRouter();
  const [error, setError] = useState<Error | null>(null);
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target as HTMLFormElement); // Get the form data
    const searchparams = new URLSearchParams(formData as any);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: searchparams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const body = await response.json();

      if (response.ok) {
        console.log("Post created successfully!", body.username);
        push("/");
      } else {
        throw new Error(body.error);
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error as Error);
    }
  };
  const clearError = () => {
    setError(null);
  };

  return (
    <div>
      <Head>
        <title>login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>
        <form method="POST" onSubmit={onSubmit} className={styles.grid}>
          <input
            type="text"
            name="username"
            onChange={clearError}
            className={styles.card}
          />
          <input
            type="password"
            name="password"
            onChange={clearError}
            className={styles.card}
          />
          <button type="submit" className={styles.card}>
            Log in
          </button>
          {error ? <p className={styles.error}>{error.message}</p> : null}
        </form>
      </main>
    </div>
  );
};

export default Login;
