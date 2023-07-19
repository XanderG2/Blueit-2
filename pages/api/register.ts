// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

const Database = require("@replit/database")

const db = new Database()

type Data = {
  name: string
}
async function no(
  res: NextApiResponse<Data>, 
  message?:string
) {
  res.status(400).json({ error:message ?? "DENIES" })
  
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (!req.body) return no(res);

  const {username,password} = req.body;

  if (typeof username!="string") return no(res);
  if (typeof password!="string") return no(res);
    if ( username.length < 2 || username.length > 50) return no(res,"username must be between 2-50 characters long.");
  if ( password.length < 5 || password.length > 100) return no(res, "password must be between 5-100 characters long.")
if (await db.get("user:"+username)) return no(res, "this account is already registered")

  await db.set("user:"+username,password);
    		const cookies = new Cookies(req, res)

  cookies.set('username', username, { maxAge: 1800000, httpOnly: false })
  
  res.status(200).json({ username })
}
