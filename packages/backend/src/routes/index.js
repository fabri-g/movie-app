// routes/index.js
const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');

router.use('/api/user', userRouter);

module.exports = router;
