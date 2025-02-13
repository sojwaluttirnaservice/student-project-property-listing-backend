const authController = require("../../../application/controllers/auth/authController");
const getRouter = require("../../utils/getRouter");

const authRouter = getRouter()




// for both admin and the user 
authRouter.post('/login', authController.login);

// For admin only
authRouter.post('/logout', authController.logout);


module.exports = authRouter