const { checkAdminAuth } = require("../../../application/controllers/auth/authController");
const propertyController = require("../../../application/controllers/property/propertyController");
const getRouter = require("../../utils/getRouter");

const propertyApiRouter = getRouter()



// Add property 


propertyApiRouter.post('/', checkAdminAuth, propertyController.add)

propertyApiRouter.delete('/', checkAdminAuth, propertyController.delete)

propertyApiRouter.get('/', propertyController.list)

propertyApiRouter.get('/p/:id', propertyController.getPropertyById)

propertyApiRouter.get('/search', propertyController.searchByQuery)

module.exports = propertyApiRouter;
