import stripeModule from "stripe";

const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

export default stripe;
