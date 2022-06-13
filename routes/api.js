const { httpHeader } = require("../middlewares/http");
const { findFibonacci, getFibonacciList } = require("../services/fibonacciService");

const api = (app) => {
    app.use(httpHeader);

    app.post('/numberPosition', async (req, res) => {
        let numberPosition = req.query.number;
        let fibonacciNumber = findFibonacci(numberPosition)
        res.json(fibonacciNumber);
    });

    app.get('/getList', async (req, res) => {
        res.json(await getFibonacciList()).end();
    });

    app.get('/', async (req, res) => {
        res.send("App is running");
    });
}

module.exports = api
