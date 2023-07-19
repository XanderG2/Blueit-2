import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {getCookieValue} from '../lib/cookies';
import Post from './Post';
import { useState, useEffect, useCallback } from 'react';
import {removeCookie} from './cookieutils.tsx';
import {useRouter} from 'next/router';

const Home: NextPage = ({username}) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPosts = useCallback(async function () {
    const response = await fetch("/api/posts", {
      method: "GET",
    });
    setPosts( await response.json());
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    removeCookie('username');
    router.push('/logout');
  };
  
  const onSubmit = async (event)=>{
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target); // Get the form data
    const searchparams = new URLSearchParams(formData);
    searchparams.append("username", getCookieValue("username"));
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: searchparams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const body = await response.json()
      fetchPosts()
      if (response.ok) {
        setMessage("")
        console.log("Post created successfully!");
      } else {
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
const reversed = [...posts].reverse()
  return (
    <div>
      <Head>
        <title>Blueit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 >
          Welcome back, {username}!
        </h1>
        <button onClick={handleLogout}>Logout</button>
<form id="postForm" onSubmit={onSubmit}>
        <input type="text" name="content" value={message} onChange={e=> {setMessage(e.target.value)}} />
        <button type="submit">Post</button>
      </form>
      <div id="posts">
        {reversed.map((post, i) => <Post key={i} post={post} />)}
      </div>
</main>
    </div>
  )  
  
}

export default Home
