const propertyModel = require("../model/propertyModel");
const userModel = require("../model/userModel");
const asyncHandler = require("../utlis/asyncHandler");
const { renderPage } = require("../utlis/responses/ApiResponse");

const indexController = {


    renderDashboard: asyncHandler(async (req, res) => {

        let { role } = req.session.user;

        if (role == 'admin') {

            let propertyCount = await propertyModel.count();

            // console.log(propertyCount[0][0] || 0)

            let userCount = await userModel.count();

            // console.log(usersCount[0][0] || 0)

            let _properties = await propertyModel.listByCallStats();

            renderPage(res, 'pages/admin/dashboard-page.ejs', {
                propertyCount: propertyCount?.[0]?.[0]?.property_count || 0,
                userCount: userCount?.[0]?.[0]?.user_count || 0,
                properties: _properties[0] || []
            })
            return;
        }

        if (role == 'user') {

            return;
        }
    })

}



module.exports = indexController