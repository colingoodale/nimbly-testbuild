const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get("/math/:operation/:expression", (req, res) => {
    console.log("Hitting get route")
    axios.get('https://newton.now.sh/' + req.params.operation + '/' + req.params.expression).then(math => {
        console.log(math);
        return math;
    })
    res.json(math);
})


module.exports = router;