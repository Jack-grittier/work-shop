import Pusher from 'pusher';
import type { NextApiRequest, NextApiResponse } from 'next';

const appKey = process.env.PUSHER_APP_KEY || process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const appId = process.env.PUSHER_APP_ID || process.env.NEXT_PUBLIC_PUSHER_APP_ID;
const appSecret = process.env.PUSHER_APP_SECRET || process.env.NEXT_PUBLIC_PUSHER_APP_SECRET;
const appCluster = process.env.PUSHER_APP_CLUSTER || process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

const pusherOptions = {
  useTLS: true,
  key: appKey,
  appId: appId,
  secret: appSecret,
  cluster: appCluster,
}

const pusher = new Pusher(pusherOptions);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `POST`) {
    try {
      const productsCreatedSignal = req.body;
      console.log(`Products Created Webhook`, productsCreatedSignal);

      await pusher.trigger(`products`, `created`, {
        productsCreatedSignal,
        message: `products created`,
      }).then(() => {
        console.log(`Pusher trigger successful`);
      }).catch(pusherError => {
        console.log(`Error Triggering Update Pusher`, pusherError);
      });

      res.status(200).json({ message: `Products Created Webhook`, change: productsCreatedSignal });
    } catch (error) {
      res.status(500).json({ error: `Failed to get Webhook.` });
    }
  } else {
    res.setHeader(`Allow`, [`POST`]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}