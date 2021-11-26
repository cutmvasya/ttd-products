const { Product } = require('../models');
const Joi = require('joi')
    .extend(require('@joi/date'));
const btoa = require('btoa');

module.exports = {
    addProduct: async(req, res) => {
        const body = req.body;
        const picture = req.file ? req.file.path : "picture"

        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                qty: Joi.number().required(),
                picture: Joi.string().required(),
                expiredAt: Joi.date().format('YYYY-MM-DD').utc(),
            });

            const { error } = schema.validate({
                name: body.name,
                qty: body.qty,
                picture,
                expiredAt: body.expiredAt,
            }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"].map(({ message }) => message),
                });
            }

            const findProduct = await Product.findOne({
                where: {
                    name: body.name
                },
            });

            if (findProduct) {
                return res.status(400).json({
                    status: "failed",
                    message: "Product already exist",
                    data: null
                });
            }

            const createProduct = await Product.create({
                name: body.name,
                qty: body.qty,
                picture: btoa(picture),
                expiredAt: body.expiredAt
            });

            if (!createProduct) {
                return res.status(400).json({
                    status: "failed",
                    message: " Unable to create product",
                    data: null,
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Successfully create the product",
                data: createProduct,
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
                data: null
            });
        }
    },

    getProducts: async(req, res) => {
        try {
            const allProducts = await Product.findAll({
                where: {
                    isActive: true
                },
                attributes: { exclude: ['deletedAt'] }
            });

            if (!allProducts) {
                return res.status(400).json({
                    status: "failed",
                    message: "You don't have any product yet",
                    data: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Successfully retrieved the products",
                data: allProducts,
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
                data: null
            });
        }
    },

    getProductById: async(req, res) => {
        const { id } = req.params;

        try {
            const findProduct = await Product.findOne({
                where: {
                    id,
                },
                attributes: { exclude: ['deletedAt'] }
            });

            if (!findProduct) {
                return res.status(400).json({
                    status: "failed",
                    message: "Product not found",
                    data: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Successfully retrieved the product",
                data: findProduct,
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
                data: null
            });
        }
    },

    removeProduct: async(req, res) => {
        const { id } = req.params;

        try {
            const findProduct = await Product.findOne({
                where: {
                    id,
                },
            });

            if (!findProduct) {
                return res.status(400).json({
                    status: "failed",
                    message: "Product not found",
                    data: null
                });
            }

            await Product.update({
                isActive: false,
            }, {
                where: {
                    id,
                },
            });

            await Product.destroy({
                where: {
                    id,
                },
            });

            return res.status(200).json({
                status: "success",
                message: "Successfully retrieved the product",
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
                data: null
            });
        }
    },

    updateProduct: async(req, res) => {
        const { id } = req.params;
        const body = req.body;
        const picture = req.file ? req.file.path : "picture"

        try {
            const findProduct = await Product.findOne({
                where: {
                    id,
                },
            });

            if (!findProduct) {
                return res.status(400).json({
                    status: "failed",
                    message: "Product not found",
                    data: null
                });
            }

            const schema = Joi.object({
                name: Joi.string(),
                qty: Joi.number(),
                picture: Joi.string(),
                expiredAt: Joi.date().format('YYYY-MM-DD').utc()
            });

            const { error } = schema.validate({
                name: body.name,
                qty: body.qty,
                picture,
                expiredAt: body.expiredAt,
            }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"].map(({ message }) => message),
                });
            }

            if (body.isActive) {
                return res.status(400).json({
                    status: "failed",
                    message: "You can't update this field",
                    data: null,
                });
            }

            await Product.update({
                name: body.name,
                qty: body.qty,
                picture: btoa(picture),
                expiredAt: body.expiredAt,
            }, {
                where: {
                    id,
                }
            });

            const product = await Product.findOne({
                where: {
                    id,
                },
            });

            return res.status(200).json({
                status: "success",
                message: "Successfully retrieved the product",
                data: product,
            });

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: "Internal Server Error",
                data: null
            });
        }
    }
}