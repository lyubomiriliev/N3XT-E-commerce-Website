const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
const port = process.env.PORT;
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/pay", async (req, res) => {
  try {
    const charge = await Stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    });

    // Send a proper success response
    res.status(200).json({
      success: true,
      message: "Payment successful",
      charge, // Optional: include charge details
    });
  } catch (error) {
    console.error(error);

    // Send an error response
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
