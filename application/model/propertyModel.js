const db = require("../config/db.connect");

const propertyModel = {

    add: (propertyData) => {
        const query = `
            INSERT INTO property (
                title,
                type,
                status,
                address,
                city,

                state,
                country,
                zipcode,
                price,
                area_sqft,

                bedrooms,
                bathrooms,
                furnishing,
                parking_spaces,
                owner_name,
                
                owner_contact,
                rera_registered,
                thumbnail_image,
                gallery_images,
                description,

                amenities
            ) VALUES (
               ?
            )
        `;

        const values = [
            propertyData.title,
            propertyData.type,
            propertyData.status,
            propertyData.address,
            propertyData.city,

            propertyData.state,
            propertyData.country || 'India',
            propertyData.zipcode,
            propertyData.price,
            propertyData.area_sqft,

            propertyData.bedrooms,
            propertyData.bathrooms,
            propertyData.furnishing,
            propertyData.parking_spaces || 0,
            propertyData.owner_name,

            propertyData.owner_contact,
            propertyData.rera_registered || false,
            propertyData.thumbnail_image,
            JSON.stringify(propertyData.gallery_images || []),
            propertyData.description,

            JSON.stringify(propertyData.amenities || [])
        ];
        return db.query(query, [values]);
    },

    searchByQuery: (searchData) => {

        let { q: searchQuery, limit = 7, status } = searchData;

        let q = `SELECT * FROM property 
                 WHERE 
                 address LIKE ? 
                 OR city LIKE ? 
                 OR state LIKE ? 
                 OR country LIKE ? 
                 OR zipcode LIKE ?
                 AND status = ?
                 ${limit ? `LIMIT ${limit}` : ''}`;

        let searchPattern = `%${searchQuery}%`; // Add wildcard %

        return db.query(q, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, status]);
    },


    searchByParams: (searchData) => {
        const searchParamsArray = [];
        Object.entries(searchData).forEach(([key, value]) => {
            searchParamsArray.push({ key, value })
        })
        let q = `SELECT * FROM property WHERE ${searchParamsArray
            .map((paramName) => `${paramName.key} = ?`)
            .join(' AND ')}`;

        console.log(q)
        let values = searchParamsArray.map((paramName) => paramName.value);
        return db.query(q, values);
    },



    count: () => {
        let q = `SELECT COUNT(*) as property_count FROM property`
        return db.query(q)
    },

    delete: (propertyId) => {
        let q = `DELETE FROM property WHERE id = ?`
        return db.query(q, [propertyId])
    },

    list: () => {
        let q = `SELECT * FROM property`
        return db.query(q)
    },

    listByCallStats: () => {
        let q = `SELECT p.*, COUNT(cs.property_id_fk) AS call_count
                FROM 
                property AS p
                LEFT JOIN call_stats AS cs
                    ON
                p.id = cs.property_id_fk
                GROUP BY p.id 
                ORDER BY call_count DESC
                `
        return db.query(q)
    },


    get: (propertyId) => {
        let q = `SELECT * FROM property WHERE id = ?`
        return db.query(q, [propertyId])
    }
}


module.exports = propertyModel;
