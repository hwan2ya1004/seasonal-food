const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/food', (req, res) => {
    const apiUrl = `https://www.nongsaro.go.kr/api/thisMonthFood?key=20240930BMFN7QZWMDHIZONL1QOAPQ`;

    request(apiUrl).pipe(res);
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});