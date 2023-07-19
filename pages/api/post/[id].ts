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
  const id = req.query.id
  const post = await db.get(`post:${id}`);
    res.status(200).json(post)


}
