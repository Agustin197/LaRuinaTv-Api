const router = require("express").Router();
const request = require("request");
const { updateUserPlan, getUserPlan } = require("../controllers/users.js");

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
          frequency: 1,
          frequency_type: "days",
        },
        transaction_amount: 1000,
        currency_id: "ARS",
      },
      payment_methods_allowed: {
        payment_types: [{}],
        payment_methods: [{}],
      },
      back_url: "https://la-ruina-tv-client.vercel.app/mercadopago/plan",
    },
    json: true,
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body.init_point)
    res.json(body.init_point)
  });
});

async function checkSubscriptionStatus(userId, preapprovalId) {
  console.log('el status es: ', preapprovalId)
  const options = {
    method: "GET",
    url: `https://api.mercadopago.com/preapproval/${preapprovalId}`,
    headers: {
      Authorization: "Bearer APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272",
      "Content-Type": "application/json",
    },
    json: true,
  };
  request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    console.log('EL STATUS: ', body.status)
    if (body.status.toString() === 'authorized') {
      const subscript = "Plan Subscriptor";
      const result = await updateUserPlan(subscript, userId);
      console.log(result)
      return result
    }else if(body.status === "rejected"){
      const nosub = "free plan";
      const result = await updateUserPlan(nosub, userId);
      return result
    }
    console.log(body.status)
  })
}

router.post('/plan', async (req, res) => {
  try {
    const checkSubs = await checkSubscriptionStatus(req.body.userId, req.body.preapproval_id)
    console.log(checkSubs)
    res.status(200).json(checkSubs)
  } catch (error) {
    console.log(error)
  }
})

router.post('/getplan', async (req, res) => {
  try {
    const response = await getUserPlan(req.body.userId)
    console.log(response)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
})


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
          currency_id: "ARS"
        }
      ],
      back_urls: "https://la-ruina-tv-client.vercel.app",
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
