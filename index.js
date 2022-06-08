const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");

app.use(cors());



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

app.get('/hello', async (req, res) => {
    res.json("helllo").end();
});


const findFibonacci = (numberPosition)=>{
    let fibonacci = [0,1];
    for (let i = 1; i < numberPosition - 1; i++) {
        fibonacci.push(fibonacci[i] + fibonacci[i - 1]);
    }
    return fibonacci[fibonacci.length - 1] ;
}
  