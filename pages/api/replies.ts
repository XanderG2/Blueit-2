// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { Database } from "../../lib/database";

const db = new Database();

type Data =
  | {
      ok: boolean;
    }
  | any[]
  | { error: string };
async function no(res: NextApiResponse<Data>, message?: string) {
  res.status(400).json({ error: message ?? "DENIES" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (!req.body) return no(res);

    const { username, content, postId } = req.body;

    if (typeof username !== "string" || typeof content !== "string")
      return no(res);
    if (username.length < 2 || username.length > 50)
      return no(res, "username must be between 2-50 characters long.");
    if (content.length < 1 || content.length > 280)
      return no(res, "content must be between 1-280 characters long.");

    // Save the post in the database
    const id = Date.now();
    await db.set(`reply:${id}`, { postId, id, username, content });

    res.status(200).json({ ok: true });
  } else {
    const postIds = await db.list("reply:");

    const posts = [];
    for (const postId of postIds) {
      const post = await db.get(postId);
      posts.push(post);
    }

    res.status(200).json(posts);
  }
}
