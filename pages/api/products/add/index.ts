import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { title, price, imageSrc, category, description, quantity } = req.body;

            const storeName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME || process.env.SHOPIFY_STORE_NAME;
            const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || process.env.SHOPIFY_API_VERSION;
            const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;

            const shopifyURL = `https://${storeName}.myshopify.com/admin/api/${apiVersion}/products.json`;

            const shopifyResponse = await fetch(shopifyURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': accessToken
                },
                body: JSON.stringify({
                    product: {
                        title: title,
                        product_type: category,
                        body_html: description,
                        images: [{ src: imageSrc }],
                        variants: [{ 
                            price: price,
                            inventory_quantity: quantity,
                            inventory_management: 'shopify',
                        }],
                    }
                })
            });

            if (!shopifyResponse.ok) {
                console.log(`Error creating product: ${shopifyResponse.statusText}`);
            }

            const responseData = await shopifyResponse.json();
            res.status(200).json(responseData);
        } catch (error) {
            res.status(500).json({ message: `Error Adding Product from Server`, errorMessage: error.message });
        }
    } else {
        res.setHeader(`Allow`, [`POST`]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
