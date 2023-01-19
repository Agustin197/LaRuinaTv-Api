const router = require("express").Router();
const mercadopago = require("mercadopago");
//const axios = require("axios");
const request = require("request");

router.post("/create-checkout", async (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.mercadopago.com/preapproval_plan",
    headers: {
      Authorization: "Bearer APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272",
      "Content-Type": "application/json",
    },
    body: {
      reason: "Plan Subscriptor",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        repetitions: 12,
        billing_day: 10,
        billing_day_proportional: true,
        free_trial: {
          frequency: 7,
          frequency_type: "days",
        },
        transaction_amount: 1000,
        currency_id: "ARS",
      },
      payment_methods_allowed: {
        payment_types: [{}],
        payment_methods: [{}],
      },
      back_url: "https://la-ruina-tv-client.vercel.app",
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body.init_point)
    res.json(body.init_point)
  });
});

router.post("/create-payment", async (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.mercadopago.com/checkout/preferences",
    headers: {
      Authorization: "Bearer APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272",
      "Content-Type": "application/json",
    },
    body: {
    payer_email: "test_user_1285388525@testuser.com",
      items: [
        {
          title: "Donacion a LaRuinaTv",
          description: "apoya a los creadores de contenido",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 250,
          currency_id:	"ARS"
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      },
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body.init_point)
    res.json(body.init_point)
  });
});


module.exports = router;
