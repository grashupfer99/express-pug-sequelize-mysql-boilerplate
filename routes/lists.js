const express = require('express');
const router = express.Router();

// 라우터
router.get('/', (req, res) => {
    res.send('');
});

module.exports = router;