const express = require("express");

const router = express.Router();
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling Get requests to products"
    })
})
router.post("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling post requests to products"
    })
})
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if (id == "Special") {
        res.status(200).json({
            message: "You discovered a special ID",
            id: id
        })
    }
    else {
        res.status(200).json({
            message: "You passed an Id"
        })
    }
})
router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Updated Product"
    })
})
router.delete("/:productId", (req, res, next) => {
    res.status(200).json({
        message: "Deleted Product"
    })
})
module.exports = router;