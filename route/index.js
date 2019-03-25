var router = require('./user');
router.get('/', (req, res) => {
    res.redirect('/user');
})

module.exports = router;