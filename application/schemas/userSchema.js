const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");
// const sequelize = require("../config/dbConnect.js");

const userSchema = sequelize.define("user", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: Sequelize.STRING(120),
        allowNull: false,
        comment: "Name of the user"
    },

    email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        comment: "Email of the user"
    },

    mobile: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
        length: 10,
        comment: "Mobile number of the user"
    },


    password: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            min: 5,
            notEmpty: true,
            notNull: true,
        },
        comment: "Password of the admin"
    },

    refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "JWT refresh token for user sessions"
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
    comment: "Table storing the user details"
});

module.exports = userSchema;