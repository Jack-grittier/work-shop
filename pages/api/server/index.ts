let connectedClients = [];
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // SSE setup
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',  
    })

    connectedClients.push(res);

    res.write('event: connect\n');
    res.write('data: Connection successful\n\n');

    req.on('close', () => {  
      connectedClients = connectedClients.filter(client => client !== res);
    });
  } else if (req.method === 'POST') {
    // Handle POST request
    const data = // updated data

    // Send events to clients
    connectedClients.forEach(client => {
      client.write(`event: update\n`);
      client.write(`data: ${JSON.stringify(data)}`);
    });
    
    res.end();
  }
}