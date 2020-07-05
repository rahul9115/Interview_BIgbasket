const express = require("express");
const mongoose = require("mongoose");
const Order = require("./model/order");
const Product = require("./model/product")


const router = express.Router();
router.get("/", (req, res, next) => {
    Order.find().select("quantity product _id").populate("product", "name").exec().then(doc => {
        if (doc.length > 0) {
            res.status(200).json({
                count: doc.length,
                orders: doc.map(doc => {
                    return {
                        order: doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/orders/" + doc._id
                        }
                    }
                })

            })
        } else {
            res.status(404).json({
                messgae: "No entries found"
            })
        }

    })
})

router.post("/", (req, res, next) => {

    Product.count({ _id: req.body.productId }, function (err, count) {
        if (count > 0) {
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity

            })
            order.save().then(result => {
                console.log(result)
                res.status(200).json({ result })
            }).catch(err => res.status(500).json({ error: err }))
        } else {
            return res.status(404).json({
                message: "Product not found"
            })
        }
    });




})


router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id).select("productId quantity").populate("product", "name").exec().then(doc => {
        console.log(doc)
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: "GET",
                    description: "Get all Orders",
                    url: "http://localhost:5000/orders"
                }
            })
        } else {
            res.status(200).json({ message: "No such order found" })
        }


    }



    ).catch(err => console.log(err))

})
router.patch("/:ordersId", (req, res, next) => {
    const id = req.params.orderId
    const updatedops = {}
    for (const ops of req.body) {
        updatedops[ops.propName] = ops.value
    }
    Order.update({ _id: id }, { $set: updatedops }).exec().then(result => {
        res.status(200).json({
            message: "order updated",
            request: {
                type: "GET",
                url: "http://localhost:5000/orders/" + id
            }
        })
    }).catch(err => console.log(err))
})
router.delete("/:orderId", (req, res, next) => {
    const id = req.params.orderId
    Order.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: "Order deleted",
            request: {
                type: "POST",
                url: "http://localhost:5000/orders",
                data: { productId: "Object", quantity: "Number" }
            }
        })
    }).catch(err => console.log(err))
});

module.exports = router;