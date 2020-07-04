const express = require("express");

const router = express.Router();
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Orders Fetched"
    })
})
router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Orders were created",
        orderId: req.params.orderId
    })
})
router.get("/:ordersId", (req, res, next) => {
    res.status(200).json({
        message: "Orders were Updated",
        orderId: req.params.orderId
    })
})
router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "Orders were created",
        orderId: req.params.orderId
    })
})
module.exports = router;