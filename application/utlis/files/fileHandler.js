const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs').promises;

const fileHandler = {
    // Middleware configuration
    config: fileUpload({
        createParentPath: true,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        abortOnLimit: true,
        responseOnLimit: 'File size limit has been reached',
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }),

    // Upload single file
    addFile: async (file, customPath = '') => {
        try {
            if (!file) throw new Error('No file provided');

            // Create year/month based directory structure
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');

            // Build upload path
            const uploadDir = path.join('public/uploads', customPath, String(year), String(month));

            // Create directory if it doesn't exist
            await fs.mkdir(uploadDir, { recursive: true });

            // Generate unique filename
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExt = path.extname(file.name);
            const fileName = file.name.replace(fileExt, '') + '-' + uniqueSuffix + fileExt;

            // Full path for file
            const filePath = path.join(uploadDir, fileName);

            // Move file to upload directory
            await file.mv(filePath);

            // Return relative path for database storage
            return fileName;

        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },

    // Upload multiple files
    addFiles: async (files, customPath = '') => {
        try {
            if (!files) throw new Error('No files provided');

            // Convert to array if single file
            const fileArray = Array.isArray(files) ? files : [files];

            // Upload all files
            const uploadPromises = fileArray.map(file => fileHandler.addFile(file, customPath));

            // Wait for all uploads to complete
            const paths = await Promise.all(uploadPromises);

            console.log(paths)

            return paths;

        } catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    },

    // Remove single file
    removeFile: async (filePath) => {
        try {
            if (!filePath) return true;

            const fullPath = path.join('public', filePath);
            await fs.unlink(fullPath);
            return true;
        } catch (error) {
            console.error('Error removing file:', error);
            return false;
        }
    },

    // Remove multiple files
    removeFiles: async (filePaths = []) => {
        try {
            const removePromises = filePaths.map(path => fileHandler.removeFile(path));
            await Promise.all(removePromises);
            return true;
        } catch (error) {
            console.error('Error removing files:', error);
            return false;
        }
    },

    // Validate file type
    validateFileType: (file, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']) => {
        return allowedTypes.includes(file.mimetype);
    },

    // Validate file size (in bytes)
    validateFileSize: (file, maxSize = 5 * 1024 * 1024) => {
        return file.size <= maxSize;
    }
};

module.exports = fileHandler;