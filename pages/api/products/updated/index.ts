import Pusher from 'pusher';
import type { NextApiRequest, NextApiResponse } from 'next';

const pusher = new Pusher({
  useTLS: true,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `POST`) {
    try {
      const productsUpdatedSignal = req.body;
      console.log(`Products Updated Webhook`, productsUpdatedSignal);

      pusher.trigger(`products`, `updated`, {
        productsUpdatedSignal,
        message: `products updated`,
      }).then(() => {
        console.log(`Pusher trigger successful`);
      })
      .catch(e => {
        console.error(`Error triggering Pusher`, e);
      });

      res.status(200).json({ message: `Products Updated Webhook`, change: productsUpdatedSignal });
    } catch (error) {
      res.status(500).json({ error: `Failed to get Webhook.` });
    }
  } else {
    res.setHeader(`Allow`, [`POST`]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}