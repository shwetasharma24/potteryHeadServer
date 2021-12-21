const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        categories:{
            type: Array,
        },
        price: {
            type: String,
            required: true,
        },
        inStock:{
            type: Boolean,
            default: true,
        },
        material: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
       
    }, {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);