const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.requireLogin, (req, res) => {
    res.render('index', { session: resq.session });
});

module.exports = router;