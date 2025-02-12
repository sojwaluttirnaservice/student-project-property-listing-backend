const { checkAdminAuth, checkAuth } = require("../../application/controllers/auth/authController");
const propertyController = require("../../application/controllers/property/propertyController");
const getRouter = require("../utils/getRouter");

const propertyRouter = getRouter();


propertyRouter.get('/', checkAdminAuth, propertyController.renderPropertyListPage)

propertyRouter.get('/p/:id', checkAuth, propertyController.renderPropertyDetailsPage)

propertyRouter.get('/add', checkAdminAuth, propertyController.renderAddPropertyPage)


module.exports = propertyRouter;
