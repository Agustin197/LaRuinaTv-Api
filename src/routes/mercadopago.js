const router = require("express").Router();
const mercadopago = require("mercadopago");
//const axios = require("axios");
const request = require("request");
// Agrega credenciales
// mercadopago.configure({
//   access_token:
//     "APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272",
// });

// router.get("/success", (req, res) => {
//   res.send("the purchase its OK");
// });

// router.get("/notification", (req, res) => {
//   console.log("notificar");
// });

// router.get("/generate", (req, res) => {
//   let preference = {
//     back_urls: {
//       success: "https://la-ruina-api.fly.dev/success",
//     },
//     items: [
//       {
//         title: "membresia premium",
//         unit_price: 100,
//         quantity: 1,
//         currency_id: "ARS",
//       },
//     ],
//     //notification_url: "https://la-ruina-api.fly.dev/notification"
//   };
//   mercadopago.preferences
//     .create(preference)
//     .then(function (response) {
//       console.log(response.body.init_point);
//       res.send(response.body.init_point);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });
// SDK de Mercado Pago

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

// axios.get(url, {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`
//     }
// }).then(response => {
//     if(response.data.length == 0){
//         // Plan does not exist, you can create it
//         axios.post(urlSubs, data, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${access_token}`
//             }
//         }).then(response => {
//             console.log(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//     } else {
//         console.log("Plan already exists")
//     }
// }).catch(error => {
//     console.log(error);
// });

// axios.post(url, data, {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${access_token}`
//     }
// }).then(response => {
//     console.log(response.data);
// }).catch(error => {
//     console.log(error);
// });

// router.post("/create-checkout", async (req, res) => {
//   try {
//     const data = {
//         "name": "Plan_Subscriptor",
//         "description": "Access to all premium content",
//         "status": "active",
//         "auto_recurring": {
//             "frequency": 1,
//             "frequency_type": "months",
//             "transaction_amount": 1000,
//             "currency_id": "CLP",
//             "debit_date": 1
//         }
//     };
//     const paymentData = {
//         subscription_id: req.body.planId,
//       payer: {
//         name: req.body.name,
//         email: req.body.email,
//       },
//     };
//     axios.get(urlSubName, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${access_token}`
//         }
//     }).then(response => {
//         if(response.data.length == 0){
//             // Plan does not exist, you can create it
//             axios.post(urlSubs, data, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${access_token}`
//                 }
//             }).then(response => {
//                 console.log(response.data);
//                 axios.post(paymentUrl, paymentData, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${access_token}`
//                     }
//                 }).then(response => {
//                     const payment = response.data;
//                     console.log(payment);
//                 }).catch(error => {
//                     console.log(error);
//                 });
//             }).catch(error => {
//                 console.log(error);
//             });
//         } else {
//             console.log("Plan already exists")
//         }
//     }).catch(error => {
//         console.log(error);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// });

//vendedor // acces_token=APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272

module.exports = router;
