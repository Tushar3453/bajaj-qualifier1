const express = require('express');
const router = express.Router();
const { healthCheck, handleBfhlRequest } = require('../controllers/bfhlController');

router.get('/health', healthCheck);
router.post('/bfhl', handleBfhlRequest);

module.exports = router;