'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Products', [{
            name: 'Pringles',
            qty: 122,
            picture: 'aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vY2hhcmFjdGVybW92aWUvcmF3L3VwbG9hZC92MTYzNzkwNjQ1OC9waWN0dXJlL3BpY3R1cmVzL3ByaW5nbGVzJTIwLSUyMDIwMjEtMTAtMjYlMjAtJTIwMTMtMC01NS0zODIud2VicA==',
            isActive: true,
            expiredAt: '2022-11-11',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, ]);
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('admins', null, {});
    }
};