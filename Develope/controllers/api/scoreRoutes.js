const router = require('express').Router();
const { Scores } = require('../../models');
const withAuth = require('../../utils/auth');

//make routes