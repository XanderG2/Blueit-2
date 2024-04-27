// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import { Database } from "../../lib/database";

const db = new Database();

type Data =
  | {
      username: string;
    }
  | { error: string };
async function no(res: NextApiResponse<Data>, message?: string) {
  res.status(400).json({ error: message ?? "DENIES" });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.body) return no(res);

  const { username, password } = req.body;

  if (typeof username != "string") return no(res);
  if (typeof password != "string") return no(res);
  if (username.length < 2 || username.length > 50)
    return no(res, "username must be between 2-50 characters long.");
  if (password.length < 5 || password.length > 100)
    return no(res, "password must be between 5-100 characters long.");

  const expected = await db.get("user:" + username);
  if (!expected) return no(res, "this account is not already registered");
  if (expected != password)
    return no(
      res,
      "wrong password i am coming to you ip adress that is : " + (req as any).ip
    );

  const cookies = new Cookies(req, res);

  cookies.set("username", username, { maxAge: 1800000, httpOnly: false });

  res.status(200).json({ username });
}
