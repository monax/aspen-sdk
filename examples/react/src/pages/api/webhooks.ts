import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import {
  authenticate,
  issueToken,
  PublishingAPI,
} from "@monaxlabs/aspen-sdk/dist/apis";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;
const PUBLISHING_API_BASEURI = process.env.NEXT_PUBLIC_PUBLISHING_API_BASEURI!;
const PUBLISHING_API_USERNAME = process.env.PUBLISHING_API_USERNAME!;
const PUBLISHING_API_PASSWORD = process.env.PUBLISHING_API_PASSWORD!;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const validatePayment = (checkout: Stripe.Checkout.Session): boolean => {
  // Add payment validation here (e.g. checking payment amount is correct)
  return checkout.payment_status === "paid" && checkout.status === "complete";
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      if (validatePayment(checkoutSession)) {
        const { tokenId, collectionGuid } = checkoutSession.metadata!;
        const wallet = checkoutSession.client_reference_id!;
        console.log(
          `✅ Checkout complete for token ${tokenId} on collecton ${collectionGuid} to wallet ${wallet}`
        );
        console.log("Event id:", event.id);

        try {
          await authenticate(PublishingAPI.OpenAPI, {
            baseUrl: PUBLISHING_API_BASEURI,
            name: PUBLISHING_API_USERNAME,
            password: PUBLISHING_API_PASSWORD,
          });
          await issueToken(collectionGuid, {
            to: wallet,
            tokenId: Number.parseInt(tokenId),
          });
        } catch (err) {
          console.log(`Error issuing token: ${err}`);
          return res.status(500).send(`Issuance error: ${err}`);
        }
      } else {
        console.log(`Payment validation failed`);
        console.log("Event id:", event.id);
        return res.status(400).send("Payment validation failed.");
      }
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
