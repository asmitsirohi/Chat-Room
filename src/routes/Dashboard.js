const express = require('express');
const DashboardController = require('../controller/DashboardController');
const Dashboard = require('../controller/DashboardController');

const router = express.Router();
const DashboardObj = new Dashboard();

router.get('/', DashboardObj.index);

module.exports = router;