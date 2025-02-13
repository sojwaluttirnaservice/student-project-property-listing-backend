const getRouter = require("../utils/getRouter");
const authRouter = require("./apiRoutes/authRouter");

const propertyApiRouter = require("./apiRoutes/propertyApiRouter");

const apiRouter = getRouter();



apiRouter.use('/auth', authRouter)

apiRouter.use('/property', propertyApiRouter)


module.exports = apiRouter; 
