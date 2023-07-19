import {useRouter} from 'next/router'
import { useState, useCallback, useEffect } from 'react'
import Post from '../../lib/Post'

const P: NextPage = (props) => {
  const router = useRouter()
  console.log("That", props)
  const [post, setPost] = useState([]);
  const id = router.query.id
  const fetchPost = useCallback(async function (id) {
    const response = await fetch(`/api/post/${id}`, {
      method: "GET",
    });
    setPost( await response.json());
  }, []);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return <div>{post?<Post post={post}/>:null}</div>
}

export default P