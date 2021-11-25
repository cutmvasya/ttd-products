'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        id: DataTypes.BIGINT,
        name: DataTypes.STRING,
        qty: DataTypes.INTEGER,
        picture: DataTypes.TEXT,
        expiredAt: DataTypes.DATEONLY,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Product',
        deletedAt: 'deletedAt',
        paranoid: true,
        timestamps: true
    });
    return Product;
};