import { useRouter } from "next/router";
import { useState, useEffect, useCallback, FormEventHandler } from "react";
import Post from "../../lib/Post";
import { NextPage } from "next";
import { PostData } from "../../lib/interfaces";
import { getCookieValue } from "../../lib/cookies";
import { removeCookie } from "../../lib/cookieutils";
import { ReplyData } from "../../lib/interfaces";
import Reply from "../../lib/Reply";

const P: NextPage = (props) => {
  const router = useRouter();
  console.log("That", props);
  const [reply, setReply] = useState<ReplyData | null>(null);
  //const [replies, setReplies] = useState([]);
  //const [message, setMessage] = useState("");
  const id = router.query.id;
  const fetchPost = useCallback(async function (id: string) {
    const response = await fetch(`/api/reply/${id}`, {
      method: "GET",
    });
    setReply(await response.json());
  }, []);

  useEffect(() => {
    if (typeof id === "string") fetchPost(id);
  }, [fetchPost, id]);

  /*const getReplies = useCallback(async () => {
    try {
      const response = await fetch("/api/replies", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch replies: ${response.status} ${response.statusText}`
        );
      }
      const replies = await response.json();
      const filteredReplies = replies.filter(
        (reply: ReplyData) => reply.postId === router.query.id
      );
      setReplies(filteredReplies);
      return filteredReplies;
    } catch (error) {
      console.error("Error fetching replies:", error);
      return []; // Return an empty array if there's an error
    }
  }, [router.query.id]);
  useEffect(() => {
    getReplies();
  }, [getReplies]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target as HTMLFormElement); // Get the form data
    const searchparams = new URLSearchParams(formData as any);
    const username = getCookieValue("username");
    if (username) {
      searchparams.append("username", username);
    }
    if (typeof id === "string") {
      searchparams.append("postId", id);
    } else {
      console.log("id not string");
    }
    try {
      const response = await fetch("/api/replies", {
        method: "POST",
        body: searchparams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const body = await response.json();
      if (response.ok) {
        setMessage("");
        console.log("Post created successfully!");
        // After submitting, fetch the updated replies
        await getReplies();
      } else {
        console.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const reversed = [...replies].reverse();*/
  return (
    <main>
      <div>{reply ? <Reply reply={reply} /> : null}</div>
    </main>
  );
};

export default P;
