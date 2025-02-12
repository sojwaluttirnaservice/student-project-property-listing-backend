const userModel = require("../../model/userModel");
const asyncHandler = require("../../utlis/asyncHandler");
const { renderPage } = require("../../utlis/responses/ApiResponse");

const userController = {

    renderUsersListPage: asyncHandler(async (req, res) => {
        const _users = await userModel.list()
        renderPage(res, 'pages/user/user-list-page.ejs', { users: _users[0] })
    })
}


module.exports = userController;