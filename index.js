const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");

// const cors = require('cors');

// app.use(cors({ origin: "https://syncvr-challenge-fe.herokuapp.com/", credentials: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.post('/numberPosition', async (req, res) => {
    let numberPosition = req.query.number;
    let fibonacciNumber = findFibonacci(numberPosition)
    db.addRequisition(fibonacciNumber, numberPosition, new Date().toISOString().slice(0, 19).replace('T', ' '));
    res.json(fibonacciNumber);
});

app.get('/getList', async (req, res) => {
    res.json(await db.getList()).end();
});

app.get('/', async (req, res) => {
    res.send("App is running");
});



const findFibonacci = (numberPosition)=>{
    let fibonacci = [0,1];
    for (let i = 1; i < numberPosition - 1; i++) {
        fibonacci.push(fibonacci[i] + fibonacci[i - 1]);
    }
    return fibonacci[fibonacci.length - 1] ;
}
  