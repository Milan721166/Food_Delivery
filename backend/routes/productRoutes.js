const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProductById,
    deleteProductById
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// POST route to create a product
router.post("/newProduct", createProduct);


// PUT route to update a product by id
router.put("/:id", updateProductById);

// DELETE route to delete a product by id
router.delete("/:id", deleteProductById);
module.exports = router;