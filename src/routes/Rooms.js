const express = require('express');
const Rooms = require('../controller/RoomsController');

const router = express.Router();
const RoomsObj = new Rooms();

router.get('/', RoomsObj.index);

module.exports = router;