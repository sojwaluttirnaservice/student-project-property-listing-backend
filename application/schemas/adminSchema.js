const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");
// const sequelize = require("../config/dbConnect.js");

const adminSchema = sequelize.define("admin", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        comment: "Username of the admin"
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 5,
            notEmpty: true,
            notNull: true,
        },
        comment: "Password of the admin"
    },



    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: "Timestamp when property was listed"
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        comment: "Timestamp when property was last updated"
    }
}, {
    timestamps: true,
    comment: "Table storing all property listings information"
});

module.exports = adminSchema;

