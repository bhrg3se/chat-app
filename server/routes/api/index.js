const router = require('express').Router();

router.use('/messages', require('./messages'));
router.use('/conversations', require('./conversations').router);
router.use('/users', require('./users'));
router.use('/seen', require('./seen'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;
