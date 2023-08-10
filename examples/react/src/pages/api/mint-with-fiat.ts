import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { walletAddress, collectionGuid, tokenId } = req.query;
      if (!walletAddress || !collectionGuid || !tokenId) {
        res.redirect(303, `${req.headers.origin}`);
        return;
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'USD',
              unit_amount: 100,
              product_data: {
                name: `Token ${tokenId}`,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          collectionGuid: `${collectionGuid}`,
          tokenId: `${tokenId}`,
        },
        client_reference_id: `${walletAddress}`,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.redirect(303, session.url!);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
