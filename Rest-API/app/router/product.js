const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product")
const router = express.Router();
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling Get requests to products"
    })
    Product.find().exec().then(doc => {
        console.log(doc)

    }
    ).catch(err => console.log(err))
})
router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price

    }

    const products = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    res.status(200).json({
        message: "Handling post requests to products",
        createdproduct: products
    })
    products.save().then(result => {
        console.log(result);
    }).catch(error => console.log(error))
})
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log(doc)
        if (doc.length >= 0) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: "No entries found"
            })
        }


    }
    ).catch(err => console.log(err))
})
router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Updated Product"
    })
})
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id }).exec().then(result => { res.status(200).json(result) }).catch(err => console.log(err))
})
module.exports = router;