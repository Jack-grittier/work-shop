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
      const productsUpdatedSignal = req.body;
      console.log(`Products Updated Webhook`, { pusher, pusherOptions, productsUpdatedSignal });

      await pusher.trigger(`products`, `updated`, {
        productsUpdatedSignal,
        message: `products updated`,
      }).then(() => {
        console.log(`Pusher trigger successful`);
      }).catch(pusherError => {
        console.error(`Error Triggering Update Pusher`, { pusherError, pusher, pusherOptions });
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