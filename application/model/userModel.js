const db = require("../config/db.connect");

const userModel = {


    create: (userData) => {

        const q = `INSERT INTO user 
                (
                    name, 
                    email, 
                    mobile, 
                   
                    password, 
                    refreshToken,
                    gender
                )
        VALUES (?)`

        const insertArray = [
            userData.name,
            userData.email || '',
            userData.mobile,
            
            userData.password,
            userData.refreshToken || '',
            userData.gender
        ]
        return db.query(q, [insertArray])
    },

    updateToken: (userId, refreshToken) => {
        const q = `UPDATE user SET refreshToken = ? WHERE id = ?`
        return db.query(q, [refreshToken, userId])
    },


    count: () => {
        let q = `SELECT COUNT(*) as user_count FROM user`
        return db.query(q)
    },

    list: () => {
        const q = `SELECT * FROM user`
        return db.query(q)
    },

    getUser: (userId) => {
        const q = `SELECT * FROM user WHERE id = ?`
        return db.query(q, [userId])
    },
    getUserByMobile: (mobile) => {
        const q = `SELECT * FROM user WHERE mobile = ?`
        return db.query(q, [mobile])
    },

    getUserByEmail: (email) => {
        const q = `SELECT * FROM user WHERE email = ?`
        return db.query(q, [email])
    },
}


module.exports = userModel;