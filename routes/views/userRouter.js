const { checkAdminAuth } = require("../../application/controllers/auth/authController");
const userController = require("../../application/controllers/user/userController");
const getRouter = require("../utils/getRouter");

const userRouter = getRouter()


userRouter.get('/', checkAdminAuth, userController.renderUsersListPage)



module.exports = userRouter;