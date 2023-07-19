import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getCookieValue} from '../lib/cookies'
import Post from '../lib/Post'
import { useState, useEffect, useCallback } from 'react';
import Landing from '../lib/Landing'
import Home from '../lib/Home'

const Index: NextPage = () => {
  const [username, setUsername] = useState(null);

 
  useEffect(() => {
    setUsername(getCookieValue("username"));
  }, []);

    

  if (username) {

  return (
    <Home username={username}/>
  )  
  } else {
  

  
  return (
    <Landing/>
  )
  }
}

export default Index
