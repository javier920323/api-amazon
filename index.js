const express = require("express");
const cors = require('cors');
require('dotenv').config()
const stripe = require('stripe')('sk_test_51LF8gIIoOUbhnjTJ23vMJMtKhKMQoT7WjatgSA5NL7h9IW6YCaDmx3YjHQRFSSi7tNUw45hZamnQZ58zMzaEGwVm00SI2jKp36')

const port = process.env.PORT || 4242;

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.listen(port)

// se resive por la url el (total) apagar enviado desde el frontend por axio en la funcion getClientSecret
app.post('/payment/create', async (req, res) => {
  // se guarda en 'total' lo que se solicitud('req') mediante a la url con el query en este caso el total a pagar
  const total = req.query.total;
  console.log('BOOM', total)

  //funcion 'paymentIntent' que contine todos los objetos de la funcion 'stripe.paymentIntents.create' en este caso se asgina el amount y la currency 
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
// en la respuesta('res') se enviada al frontend el objeto 'clientSecret' obtenido en la funcion'paymentIntent'
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })

})