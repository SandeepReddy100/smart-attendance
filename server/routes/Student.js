const express=require('express');
const { HandleChangePassword } = require('../services/UpdatePassword');
const router=express.Router();
const mongoose = require("mongoose");
const { HandleInformation } = require('../controllers/Student');


router.post('/UpdtPass', HandleChangePassword);
router.post('/GetAllDetails', HandleInformation);

module.exports=router;