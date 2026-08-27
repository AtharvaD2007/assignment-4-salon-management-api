const express = require("express");

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getTopSalons,
    getSalonsByCity
} = require("../controllers/salonController");

const router = express.Router();


router.get("/", getAllSalons);

router.get("/top", getTopSalons);

router.get("/city/:city", getSalonsByCity);

router.get("/:id", getSalonById);


router.post(
    "/",
    authMiddleware,
    createSalon
);


router.put(
    "/:id",
    authMiddleware,
    updateSalon
);


router.delete(
    "/:id",
    authMiddleware,
    deleteSalon
);


module.exports = router;