const express = require('express');

const asyncHandler = require('../application/utlis/asyncHandler');
const indexController = require('../application/controllers/indexController');
const { checkAuth, checkAdminAuth } = require('../application/controllers/auth/authController');
const apiRouter = require('./api/apiRouter');
const propertyRouter = require('./views/propertyRouter');
const userRouter = require('./views/userRouter');


const indexRouter = express.Router();




// Related to all view related calls,
indexRouter.get('/', checkAuth, indexController.renderDashboard)

indexRouter.use('/property', checkAuth, propertyRouter)

indexRouter.use('/user', userRouter  )



// Purerly backend calls
indexRouter.use('/api/v1', apiRouter)


module.exports = indexRouter;
