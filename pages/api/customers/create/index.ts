import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;

            const storeName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME || process.env.SHOPIFY_STORE_NAME;
            const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || process.env.SHOPIFY_API_VERSION;
            const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
            const shopifyURL = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/customers.json`;

            let shopifyResponse = await fetch(shopifyURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken,
              },
              body: JSON.stringify({
                customer: {
                    email: email,
                    verified_email: false,
                    send_email_invite: true,
                    // first_name: "John",
                    // last_name: "Doe",
                    // phone: "+1234567890",
                    // addresses: [{
                    //   address1: "123 Shopify Street",
                    //   city: "Shopifytown",
                    //   province: "Shopify Province",
                    //   country: "Shopifyland",
                    //   zip: "12345"
                    // }],
                    // tags: "New Customer, Special Offer",
                    // note: "This customer loves Shopify",
                    accepts_marketing: false,
                    tax_exempt: false,
                }
              }),
            });

            if (!shopifyResponse.ok) {
                console.log(`Error creating product: ${shopifyResponse.statusText}`);
                return res.status(shopifyResponse.status).json({error: `Error creating customer: ${shopifyResponse.statusText}`});
            }
        
            let newShopifyCustomer = await shopifyResponse.json();
            res.status(200).json(newShopifyCustomer);
        } catch (error) {
            res.status(500).json({ message: `Error Adding Customer from Server`, errorMessage: error.message });
        }
    } else {
        res.setHeader(`Allow`, [`POST`]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}