import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { sendMail } from "./sendgrid-mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

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
        const { email } = checkoutSession.metadata!;
        console.log(`✅ Checkout complete for email ${email}`);
        console.log("Event id:", event.id);

        try {
          sendMail("agnieszka.skrobot@monaxlabs.io");
        } catch (err) {
          console.log(`Failed sending an email`);
          return res.status(500).send(`Error: ${err}`);
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
