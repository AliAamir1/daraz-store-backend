import stripe from "../config/stripe.config.js";
import { generateBooking } from "../services/booking.js";
const endpointSecret =
  "whsec_56255ba49f9be29e63600c9cd3e6e87687f675535552fcaa37cc33be64dc53f9";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
const stripeWebhook = (request, response) => {
  console.log("stripe webhook is being called");
  const sig = request.headers["stripe-signature"];
  console.log(sig, "signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log("Webhook Error", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object.metadata;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data;
      const userId = checkoutSessionCompleted.object.metadata.userId;
      const orderDetails =
        checkoutSessionCompleted.object.metadata.orderDetails;
      const totalAmount =  checkoutSessionCompleted.object.amount_total;
      console.log("checkoutSessionCompleted.object;", checkoutSessionCompleted.object);
      if (!generateBooking(userId, orderDetails, totalAmount)) {
        console.log("Error occured while generating booking");
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

export { stripeWebhook };
