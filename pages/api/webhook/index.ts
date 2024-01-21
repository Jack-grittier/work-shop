const { io } = require('../../../socket');
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `POST`) {
    try {
      const webhook = req.body;
      console.log(`Webhook received:`, webhook);
      io.emit('webhookEvent', webhook);
      res.status(200).json({ message: `Webhook received`, webhook });
    } catch (error) {
      res.status(500).json({ error: `Failed to get Webhook.` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}