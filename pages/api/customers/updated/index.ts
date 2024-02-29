import Pusher from 'pusher';
import type { NextApiRequest, NextApiResponse } from 'next';

const appId = process.env.PUSHER_APP_ID || process.env.NEXT_PUBLIC_PUSHER_APP_ID;
const appKey = process.env.PUSHER_APP_KEY || process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
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
      const customersUpdatedSignal = req.body;
      console.log(`Customers Updated Webhook`, customersUpdatedSignal);

      await pusher.trigger(`customers`, `updated`, {
        customersUpdatedSignal: customersUpdatedSignal,
        message: `customers updated`,
      }).then(() => {
        console.log(`Pusher trigger successful`);
      }).catch(pusherError => {
        console.log(`Error Triggering Customer Update Pusher`, pusherError);
      });

      res.status(200).json({ message: `Customers Updated Webhook`, change: customersUpdatedSignal });
    } catch (error) {
      res.status(500).json({ error: `Failed to get Webhook.` });
    }
  } else {
    res.setHeader(`Allow`, [`POST`]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}