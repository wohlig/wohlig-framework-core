//Global Variables
global.express = require('express')
global.cron = require('node-cron');
global.ejs = require('ejs')
global._ = require("lodash")
global.path = require('path')
global.fs = require('fs')
global.mongoose = require('mongoose')
global.Schema = mongoose.Schema

//Validator
const Ajv = require("ajv")
global.ajv = new Ajv()