// import Pusher from 'pusher';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const appKey = process.env.PUSHER_APP_KEY || process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
// const appId = process.env.PUSHER_APP_ID || process.env.NEXT_PUBLIC_PUSHER_APP_ID;
// const appSecret = process.env.PUSHER_APP_SECRET || process.env.NEXT_PUBLIC_PUSHER_APP_SECRET;
// const appCluster = process.env.PUSHER_APP_CLUSTER || process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

// const pusherOptions = {
//   useTLS: true,
//   key: appKey,
//   appId: appId,
//   secret: appSecret,
//   cluster: appCluster,
// }

// const pusher = new Pusher(pusherOptions);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === `POST`) {
//     try {
//       const productsUpdatedSignal = req.body;
//       console.log(`Products Updated Webhook`, { pusher, pusherOptions, productsUpdatedSignal });

//       await pusher.trigger(`products`, `updated`, {
//         productsUpdatedSignal,
//         message: `products updated`,
//       }).then(() => {
//         console.log(`Pusher trigger successful`);
//       }).catch(pusherError => {
//         console.error(`Error Triggering Update Pusher`, { pusherError, pusher, pusherOptions });
//       });

//       res.status(200).json({ message: `Products Updated Webhook`, change: productsUpdatedSignal });
//     } catch (error) {
//       res.status(500).json({ error: `Failed to get Webhook.` });
//     }
//   } else {
//     res.setHeader(`Allow`, [`POST`]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { Server as WebSocketServer } from 'ws';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create a WebSocket server
const wss = new WebSocketServer({
  noServer: true,
  perMessageDeflate: false, // Disable compression if required
});

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  
  // Handle messages from the client
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });
});

// Upgrade HTTP requests to WebSocket
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle WebSocket upgrade request
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      wss.emit('connection', ws, req);
    });
  } else if (req.method === 'POST') {
    try {
      const productsUpdatedSignal = req.body;
      console.log('Products Updated Webhook', { productsUpdatedSignal });

      // Send data to connected WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ productsUpdatedSignal, message: 'products updated' }));
        }
      });

      res.status(200).json({ message: 'Products Updated Webhook', change: productsUpdatedSignal });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get Webhook.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}