import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

const Login: NextPage = () => {
  const {push} = useRouter()
  const [error, setError] = useState(null)
  const onSubmit = async (event)=>{
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target); // Get the form data
    const searchparams = new URLSearchParams(formData);
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
        push("/")
        
      } else {
        throw new Error(body.error);
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error)
    }
  }
  const clearError = ()=> {setError(null)}
  
  return (
    <div>
      <Head>
        <title>login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Login
        </h1>
        <form method="POST" onSubmit={onSubmit}>
        <input type="text" name="username" onChange={clearError}/>
        <input type="password" name="password" onChange={clearError}/>
        <button type="submit">Log in</button>
          {error?<p className={styles.error}>{error.message}</p>: null}
      </form>
      </main>
      </div>
    )};

export default Login
