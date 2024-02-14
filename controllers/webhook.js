import stripe from "../config/stripe.config.js";
import { generateBooking } from "../services/booking.js";
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const stripeWebhook = (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
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
