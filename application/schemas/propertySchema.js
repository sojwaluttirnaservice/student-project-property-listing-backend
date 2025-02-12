const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const propertySchema = sequelize.define("property", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "Primary key for the property"
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true,
        comment: "Title/Name of the property listing"
    },

    type: {
        type: Sequelize.ENUM('Apartment', 'House', 'Villa', 'Plot', 'Commercial'),
        allowNull: false,
        comment: "Type of property (Apartment, House, Villa, etc.)"
    },

    status: {
        type: Sequelize.ENUM('For Sale', 'For Rent', 'Sold', 'Rented'),
        allowNull: false,
        comment: "Current status of the property"
    },

    address: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Complete street address of the property"
    },

    city: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true,
        comment: "City where property is located"
    },

    state: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true,

        comment: "State where property is located"
    },

    country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'India',
        comment: "Country where property is located"
    },

    zipcode: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: "Postal/ZIP code of the property location"
    },

    price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        index: true,

        comment: "Price of the property in INR"
    },

    area_sqft: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Total area of property in square feet"
    },

    bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Number of bedrooms in the property"
    },

    bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Number of bathrooms in the property"
    },

    furnishing: {
        type: Sequelize.ENUM('Unfurnished', 'Semi-Furnished', 'Fully Furnished'),
        allowNull: true,
        comment: "Furnishing status of the property"
    },

    parking_spaces: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: "Number of parking spaces available"
    },

    owner_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Name of the property owner"
    },

    owner_contact: {
        type: Sequelize.STRING(15),
        allowNull: false,
        comment: "Contact number of the property owner"
    },

    rera_registered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Whether the property is RERA registered"
    },

    thumbnail_image: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Main/thumbnail image URL of the property"
    },

    gallery_images: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: "Array of additional property image URLs"
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Detailed description of the property"
    },

    amenities: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: "List of available amenities in the property"
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

module.exports = propertySchema;

