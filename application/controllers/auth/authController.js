const adminModel = require("../../model/auth/adminModel");
const userModel = require("../../model/userModel");
const asyncHandler = require("../../utlis/asyncHandler");
const { renderPage, sendError, sendResponse } = require("../../utlis/responses/ApiResponse");

const jwt = require('jsonwebtoken')

const authController = {

    // for login either amdin or user
    checkAuth: async (req, res, next) => {
        try {
            let session = req.session;

            let isDev = process.env.NODE_ENV == 'DEV'

            if (isDev) {
                req.session.user = { id: 1, username: 'a', role: 'admin' }
                next()
                return;
            }

            const isLoggedIn = session?.user && (session?.user?.role == 'admin' || session?.user?.role == 'user')

            if (!isLoggedIn) {
                renderPage(res, 'auth/login-page.ejs')
                return;
            }

            next()
        } catch (err) {
            return sendError(res, 500, false, 'Internal Server Error', null, err)
        }
    },


    checkAdminAuth: async (req, res, next) => {
        try {
            let session = req.session;

            console.log(process.env.NODE_ENV)

            let isDev = process.env.NODE_ENV == 'DEV'

            if (isDev) {
                req.session.user = { id: 1, username: 'a', role: 'admin' }
                next()
                return;
            }

            // There should be a session and role should be an admin
            let isAdminLoggedIn = session?.user && session.user.role == 'admin'

            if (!isAdminLoggedIn) {
                renderPage(res, 'auth/login-page.ejs')
                return;
            }
            // console.log("Session was created")
            next()
        } catch (error) {
            return sendError(res, 500, false, 'Internal Server Error', null, error)
        }
    },


    checkUserAuth: async (req, res, next) => {

        try {

            let token = req.headers.authorization

            if (!token) {
                return sendError(res, 401, false, 'Unauthorized')
            }

            let SECRET_KEY = process.env.JWT_SECRET_KEY


            // RETURNS BOOLEAN TYPE
            // if decoded ist true, valid token else invalid token
            let decoded = jwt.verify(token, SECRET_KEY)

            if (!decoded) {
                return sendError(res, 401, false, 'Unauthorized')
            }

            next();

        } catch (error) {
            return sendError(res, 500, false, 'Internal Server Error', null, error)
        }

    },


    login: asyncHandler(async (req, res) => {
        const { role } = req.body

        if (role == 'admin') {
            let { username, password, } = req.body



            if (!username || !password) {
                return sendError(res, 400, false, 'Username and password are required')
            }

            let _result = await adminModel.getAdmin({ username, password })

            if (!_result[0]?.length) {
                return sendError(res, 400, false, 'No such username found')
            }

            let _admin = _result[0][0]

            if (_admin.password != password) {
                return sendError(res, 400, false, 'Invalid username or  password')
            }

            req.session.user = {
                ..._admin,
                ...req.body,
                role: 'admin'
            }

            console.log(req.session);

            return sendResponse(res, 200, true, 'Login successful')

        }

        if (role == 'user') {
            let { email, password } = req.body

            if (!email || !password) {
                return sendError(res, 400, false, 'Email and password are required')
            }

            let _userResult = await userModel.getUserByEmail(email);

            if (!_userResult[0]?.length) {
                return sendError(res, 400, false, 'No such user found')
            }

            let _user = _userResult[0][0]

            if (_user.password != password) {
                return sendError(res, 400, false, 'Invalid username or  password')
            }


            // Create a json webtoken for the user using jwt i.e. jsonwebtoken package

            let SECRET_KEY = process.env.JWT_SECRET_KEY

            let token = jwt.sign(

                // first parameter is the object we watn to store
                {
                    ..._user,
                    role: 'user'
                },

                // Second is secrete key
                SECRET_KEY,

                // Exprire the token after 24 hours of login
                { algorithm: 'RS256', expiresIn: 24 * 60 * 60 }
            )

            return sendResponse(res, 200, true, 'Login successful', { token })
        }
    }),


    logout: asyncHandler(async (req, res) => {
        req.session.destroy();
        return sendResponse(res, 200, true, 'Logout successful',)
    })
}


module.exports = authController