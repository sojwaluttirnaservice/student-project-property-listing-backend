const authController = require("../../../application/controllers/auth/authController");
const getRouter = require("../../utils/getRouter");

const authRouter = getRouter();



authRouter.post('/login', authController.login);

authRouter.post('/logout', authController.logout);
module.exports = authRouter;