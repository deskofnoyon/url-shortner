const express = require('express');
const cors = require('cors');
const app = express();


// middlewares
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs')


// routes
app.get('/', (req, res) => {
    // console.log(req.path);
    res.status(200).render('index', {
        req,
        status: 200,
        statusMessage: "OK",
        protocol: "HTTP",
        contentType: "application/json",
        allow: "GET, HEAD, OPTIONS",
        url: req.protocol + '://' + req.get('host')+ req.path
    })
});

app.get("*", (req, res) => {
    // console.log(req.url);
    res.send("noting")
})


module.exports = app;