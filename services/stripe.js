import stripe from "../config/stripe.config.js";

const makeStripeProduct = async ({ name, price, quantity, brand }) => {
  const product = await stripe.products.create({
    name: name,
  });

  // Now, create a price for the product
  const newprice = await stripe.prices.create({
    product: product.id,
    unit_amount: price * 100, // Amount in cents
    currency: "usd",
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: newprice.id,
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      },
    ],
    after_completion: {
      type: "redirect",
      redirect: {
        url: process.env.PAYMENT_SUCESS_REDIRECTION_URL,
      },
    },
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate: process.env.STRIPE_AIR_SHIPPING,
      },
      {
        shipping_rate: process.env.STRIPE_GROUND_SHIPPING,
      },
    ],
  });

  return { isSuccess: true, product, newprice, paymentLink };
};

export { makeStripeProduct };

const shippingRate = await stripe.shippingRates.create({
  display_name: "Ground shipping",
  type: "fixed_amount",
  fixed_amount: {
    amount: 500,
    currency: "usd",
  },
});
