const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const api = require("./routes/api");

api(app);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


  