import { Bookings, Users, Products } from "../db/connection.js";
import stripe from "../config/stripe.config.js";

const countryCodes = [
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CV",
  "CW",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SZ",
  "TA",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VN",
  "VU",
  "WF",
  "WS",
  "XK",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
];

const makePaymentIntent = async (req, res, next) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
  console.log("paymentIntent", paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

const makeProduct = async (req, res, next) => {
  const product = await stripe.products.create({
    name: "Gold Plan",
  });

  // Now, create a price for the product
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 1000, // Amount in cents
    currency: "usd",
  });

  const shippingRate = await stripe.shippingRates.create({
    display_name: "Ground shipping",
    type: "fixed_amount",
    fixed_amount: {
      amount: 500,
      currency: "usd",
    },
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
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
        url: "https://example.com",
      },
    },
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate: shippingRate.id,
      },
    ],
  });

  res.json({ product, price, shippingRate, paymentLink });
};

const generateCheckoutSession = async (req, res, next) => {
  const user = req.user;
  const { cart } = req.body;

  if (!(cart || cart.length === 0)) {
    return res
      .status(400)
      .json({ message: "Cart must have atleast one product" });
  }

  const productIds = cart.map((item) => item.productId);
  let products = await Products.findAll({
    where: {
      id: productIds,
    },
  });

  products = products.map((product) => {
    const matchingItem = cart.find((item) => item.productId === product.id);
    if (matchingItem.quantity > product.quantity) {
      throw new Error("Product Items cannot be more than Available Stock");
    }
    return {
      ...product.toJSON(),
      orderQuantity: matchingItem.quantity,
    };
  });

  const items = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100, // Amount in cents (e.g., $100.00)
      },
      quantity: product.orderQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000",
    line_items: items,
    mode: "payment",
    metadata: {
      userId: user.id,
      orderDetails: JSON.stringify(cart),
    },
  });

  res.status(200).json({ data: session });
};

export { makePaymentIntent, makeProduct, generateCheckoutSession };
