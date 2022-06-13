const db = require('./db');

const findFibonacci = (numberPosition) => {
    let fibonacciList = [0, 1];
    let fibonacciNumber = null;
    if (numberPosition > 1) {
        for (let i = 1; i < numberPosition - 1; i++) {
            fibonacciList.push(fibonacciList[i] + fibonacciList[i - 1]);
        }
        fibonacciNumber = fibonacciList[fibonacciList.length - 1];
    }
    fibonacciNumber = fibonacciNumber ?? 0;
    db.addRequisition(fibonacciNumber, numberPosition, new Date().toISOString().slice(0, 19).replace('T', ' '));
    return fibonacciNumber;
}

const getFibonacciList = () => {
    return db.getList();
}

module.exports = { findFibonacci, getFibonacciList}