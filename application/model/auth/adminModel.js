const db = require("../../config/db.connect")

const adminModel = {
    getAdmin: (adminData) => {
        let q = `SELECT * FROM admin WHERE username = ?`
        return db.query(q, [adminData.username])
    }
}


module.exports = adminModel