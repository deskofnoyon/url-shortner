const express = require('express');
const router = express.Router();


router
    .route("/")
    .post((req, res) => {
        res.json({
            msg: "User created"
        })
    })
    .get((req, res) => {
        res.json({
            name: "user",
            id: "user-uid"
        })
    })


module.exports = router;