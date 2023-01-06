import express, { Express } from "express";
import Stripe from "stripe";
import {
  issueToken,
  authenticateAllFromFile,
} from "@monaxlabs/aspen-sdk/dist/apis";

const credentialsFile = new URL("./credentials.json", import.meta.url).pathname;
const apiKey = process.env.STRIPE_APIKEY!;
const endpointSecret = process.env.STRIPE_ENDPOINTSECRET!;

// https://buy.stripe.com/test_4gweVg2Az2d57OEbII?client_reference_id=0x2fE4984E6a2627CE7037b20AC98Ed5C3F33aE9CD
// https://buy.stripe.com/test_eVa6oK8YXeZRb0Q4gh?client_reference_id=0x2fE4984E6a2627CE7037b20AC98Ed5C3F33aE9CD
// https://buy.stripe.com/test_9AQ8wSfnlbNFb0QcMO?client_reference_id=0x2fE4984E6a2627CE7037b20AC98Ed5C3F33aE9CD
// 4242424242424242
// 4000000000009995

const stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });

const app: Express = express();
const port = process.env.PORT || 4344;

const validatePayment = (checkout: Stripe.Checkout.Session): boolean => {
  // Add payment validation here (e.g. checking payment amount is correct)
  return checkout.payment_status === "paid";
};

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    // Ensure event is signed properly.
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig!,
        endpointSecret
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    switch (event.type) {
      // Capture successful payments
      case "checkout.session.completed":
        // Unpack the Stripe webhook event
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const { tokenId, collectionGuid } = checkoutSession.metadata!;
        const wallet = checkoutSession.client_reference_id!;

        console.log(
          `Checkout complete for token ${tokenId} on collecton ${collectionGuid} to wallet ${wallet}`
        );

        // Validate payment
        if (!validatePayment(checkoutSession)) {
          console.log(`Payment validation failed`);
          response.status(400).send("Payment validation failed.");
          return;
        }

        // Issue token
        try {
          await authenticateAllFromFile("production", credentialsFile);
          await issueToken(collectionGuid, {
            to: wallet,
            tokenId: Number.parseInt(tokenId),
          });
        } catch (err) {
          console.log(`Error issuing token: ${err}`);
          response.status(500).send(`Issuance error: ${err}`);
        }
        break;

      // Discard other event types.
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

if (process.env.SERVEDEMO === "true") {
  app.use("/demo", express.static("demosite/build"));
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});
