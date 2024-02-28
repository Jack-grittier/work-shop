import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      res.status(200).json({
        status: `Healthy`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({ error: `Server is in Error State` });
    }
  } else {
    res.status(405).json({ error: `Server is in Error State` });
  }
}