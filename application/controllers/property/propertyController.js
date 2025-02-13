const path = require('path');
const propertyModel = require("../../model/propertyModel");
const asyncHandler = require("../../utlis/asyncHandler");
const { paths } = require("../../utlis/files/createDirectories");
const fileHandler = require("../../utlis/files/fileHandler");
const { renderPage, sendResponse } = require("../../utlis/responses/ApiResponse");
const fs = require('fs');

const propertyController = {


    renderAddPropertyPage: asyncHandler(async (req, res) => {
        renderPage(res, 'pages/property/add-property-page.ejs',)
    }),


    renderPropertyListPage: asyncHandler(async (req, res) => {
        let _properties = await propertyModel.list()
        renderPage(res, 'pages/property/property-list-page.ejs', { properties: _properties[0] || [], thumbnailPath: paths.thumbnail.renderPath, galleryPath: paths.gallery.renderPath })
    }),


    renderPropertyDetailsPage: asyncHandler(async (req, res) => {
        let propertyId = req.params.id
        let _property = await propertyModel.get(propertyId)

        // console.log(_property[0][0].gallery_images)

        renderPage(res, 'pages/property/property-details-page.ejs', { property: _property[0][0] || {}, thumbnailPath: paths.thumbnail.renderPath, galleryPath: paths.gallery.renderPath })
    }),

    add: asyncHandler(async (req, res) => {
        let propertyData = req.body;

        console.log(req.files)

        // console.log(paths)

        // let thumbnailPath = null;
        let galleryPaths = [];


        let thumbnailFile;
        let thumbnailFileName;
        // Handle thumbnail image upload
        if (req.files && req.files.thumbnail_image) {
            // Validate thumbnail
            // Get the original file extension
            thumbnailFile = req.files.thumbnail_image;
            const ext = path.extname(thumbnailFile.name);

            // Generate a unique filename using timestamp + random number
            thumbnailFileName = `thumbnail_${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`;

            if (!fileHandler.validateFileType(thumbnailFile)) {
                throw new Error('Invalid thumbnail file type');
            }
            if (!fileHandler.validateFileSize(thumbnailFile)) {
                throw new Error('Thumbnail file size exceeds limit');
            }
        }


        // Handle gallery images upload
        let galleryFiles;
        let galleryFileNames = []
        if (req.files && req.files.gallery_images) {
            galleryFiles = Array.isArray(req.files.gallery_images)
                ? req.files.gallery_images
                : [req.files.gallery_images];

            // Validate each gallery image
            for (const file of galleryFiles) {

                if (!fileHandler.validateFileType(file)) {
                    throw new Error('Invalid gallery image file type');
                }
                if (!fileHandler.validateFileSize(file)) {
                    throw new Error('Gallery image file size exceeds limit');
                }
            }
        }


        // Thumbnail imae upload thing 

        let thumbnailSaveTo = `${paths.thumbnail.directoryPath}/${thumbnailFileName}`;

        thumbnailFile.mv(thumbnailSaveTo)


        // Validate each gallery image
        for (const file of galleryFiles) {
            // Get the original file extension

            const ext = path.extname(file.name);

            // Generate a unique filename using timestamp + random number
            let galleryFileName = `gallery_${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}`;
            galleryFileNames.push(galleryFileName)
            let gallerySaveTo = `${paths.gallery.directoryPath}/${galleryFileName}`;
            await file.mv(gallerySaveTo)
        }


        // Parse amenities from string back to array if needed
        if (propertyData.amenities && typeof propertyData.amenities === 'string') {
            propertyData.amenities = JSON.parse(propertyData.amenities);
        }


        propertyData.thumbnail_image = thumbnailFileName;
        propertyData.gallery_images = galleryFileNames;
        const property = await propertyModel.add(propertyData);

        return sendResponse(res, 201, true, 'New property added successfully', property);
    }),


    delete: asyncHandler(async (req, res) => {
        let propertyId = req.body.id;

        let _result = await propertyModel.delete(propertyId)

        return sendResponse(res, 200, true, 'Property deleted successfully')
    }),


    getPropertyById: asyncHandler(async (req, res) => {

        const { id: propertyId } = req.params;

        let _property = await propertyModel.get(propertyId)

        return sendResponse(res, 200, true, "Property fetched successfully", { property: _property[0][0] || {}, thumbnailPath: paths.thumbnail.renderPath, galleryPath: paths.gallery.renderPath })
    }),

    list: asyncHandler(async (req, res) => {
        let _properties = await propertyModel.listByCallStats()
        return sendResponse(res, 200, true, "Properties fetched successfully", { properties: _properties[0] || [], thumbnailPath: paths.thumbnail.renderPath, galleryPath: paths.gallery.renderPath })
    }),


    searchByQuery: asyncHandler(async (req, res) => {
        let { q: searchQuery } = req.query;

        let _propeties = await propertyModel.searchByQuery(searchQuery, 7);

        console.log(_propeties[0])

        return sendResponse(res, 200, true, "Properties fetched successfully", { properties: _propeties[0] || [] })
    })
}


module.exports = propertyController;
