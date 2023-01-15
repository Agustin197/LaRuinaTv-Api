const router = require('express').Router();
const mercadopago = require("mercadopago");

router.get("/success",(req,res) =>{
    res.send("the purchase its OK")
})

router.get("/notification",(req,res) =>{
    console.log("notificar")
})

router.get("/generate",(req,res) => {
    let preference = {
        back_urls:{
            success:"https://la-ruina-api.fly.dev/success"
        },
        items: [
          {
            title: "membresia premium",
            unit_price: 100,
            quantity: 1,
            currency_id: "ARS"
          },
        ],
        //notification_url: "https://la-ruina-api.fly.dev/notification" 
      };
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
            console.log(response.body.init_point)
            res.send(response.body.init_point)
        })
        .catch(function (error) {
          console.log(error);
        });
})
// SDK de Mercado Pago
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272",
});

//vendedor // acces_token=APP_USR-3374758636750385-011204-ef5d8937a22b33671a6e72dd289b567b-1284566272

module.exports = router;