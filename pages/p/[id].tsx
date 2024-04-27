import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import Post from "../../lib/Post";
import { NextPage } from "next";
import { PostData } from "../../lib/interfaces";

const P: NextPage = (props) => {
  const router = useRouter();
  console.log("That", props);
  const [post, setPost] = useState<PostData | null>(null);
  const id = router.query.id;
  const fetchPost = useCallback(async function (id: string) {
    const response = await fetch(`/api/post/${id}`, {
      method: "GET",
    });
    setPost(await response.json());
  }, []);

  useEffect(() => {
    if (typeof id === "string") fetchPost(id);
  }, [id]);

  return <div>{post ? <Post post={post} /> : null}</div>;
};

export default P;
