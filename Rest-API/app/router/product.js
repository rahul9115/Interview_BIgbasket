const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product")
const router = express.Router();
router.get("/", (req, res, next) => {

    Product.find().select("name price _id").exec().then(doc => {
        if (doc.length > 0) {
            res.status(200).json({
                count: doc.length,
                products: doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/products/" + doc._id
                        }
                    }
                })

            })
        } else {
            res.status(404).json({
                messgae: "No entries found"
            })
        }

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
    Product.findById(id).select("name price products").exec().then(doc => {
        console.log(doc)
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: "GET",
                    description: "Get all products",
                    url: "http://localhost:5000/products"
                }
            })
        } else {
            res.status(200).json({ message: "No such product found" })
        }


    }



    ).catch(err => console.log(err))
})
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId
    const updatedops = {}
    for (const ops of req.body) {
        updatedops[ops.propName] = ops.value
    }
    Product.update({ _id: id }, { $set: updatedops }).exec().then(result => {
        res.status(200).json({
            message: "product updated",
            request: {
                type: "GET",
                url: "http://localhost:5000/products/" + id
            }
        })
    }).catch(err => console.log(err))
})
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: "Product deleted",
            request: {
                type: "POST",
                url: "http://localhost:5000/products",
                data: { name: "String", price: "Number" }
            }
        })
    }).catch(err => console.log(err))
})
module.exports = router;