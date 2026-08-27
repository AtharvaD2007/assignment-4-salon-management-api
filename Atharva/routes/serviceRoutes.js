const express = require("express");

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getSalonServices,
    createService,
    updateService,
    deleteService,
    getAvailableServices
} = require("../controllers/serviceController");

const router = express.Router();


router.get(
    "/salons/:id/services",
    getSalonServices
);


router.post(
    "/salons/:id/services",
    authMiddleware,
    createService
);


router.get(
    "/services/available",
    getAvailableServices
);


router.put(
    "/services/:id",
    authMiddleware,
    updateService
);


router.delete(
    "/services/:id",
    authMiddleware,
    deleteService
);


module.exports = router;