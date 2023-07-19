import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

const Register: NextPage = () => {
  const {push} = useRouter()
  const [error, setError] = useState(null)
  const onSubmit = async (event)=>{
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target); // Get the form data
    const searchparams = new URLSearchParams(formData);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: searchparams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (response.ok) {
        console.log("Post created successfully!");
        push("/")
      } else {
        const body = await response.json();
        throw new Error(body.error);
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error)
    }
  }
  
  return (
    <div>
      <Head>
        <title>register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Register
        </h1>
        <form method="POST" onSubmit={onSubmit}>
        <input type="text" name="username"/>
        <input type="password" name="password"/>
        <button type="submit">Register</button>
          {error?<p className={styles.error}>{error.message}</p>: null}
      </form>
      </main>
      </div>
    )};

export default Register
