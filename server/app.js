const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/v1/auth.route');

// middlewares
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs')

// actual routes
app.use('/api/v1/auth', authRoute);


// default routes   
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
    res.status(404).render("404")
})


module.exports = app;