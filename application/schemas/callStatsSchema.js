const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");


// Importing the tables for foreign key references
const userSchema = require("./userSchema");
const propertySchema = require("./propertySchema");




const callStatsSchema = sequelize.define("call_stats", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    user_email_fk: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: "User email of the the user",

        references: {
            model: userSchema,
            key: 'email'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    property_id_fk: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "Property ID of the property",

        references: {
            model: propertySchema,
            key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },


    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "Timestamp when property was listed"
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "Timestamp when property was last updated"
    }
}, {
    timestamps: true,
    comment: "Table storing all property listings information"
});

module.exports = callStatsSchema;

