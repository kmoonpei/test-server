var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/user');
})

module.exports = router;