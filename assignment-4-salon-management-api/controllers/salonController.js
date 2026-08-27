const Salon = require("../models/salonModel");


const getAllSalons = async (req, res) => {

    try {

        const { data, error } = await Salon.getAll();

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const getSalonById = async (req, res) => {

    try {

        const { id } = req.params;

        const { data, error } =
            await Salon.getById(id);

        if (error || !data) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const createSalon = async (req, res) => {

    try {

        const {
            name,
            city,
            address,
            rating
        } = req.body;

        if (!name || !city || !address) {
            return res.status(400).json({
                message: "Name, city and address are required"
            });
        }

        if (
            rating !== undefined &&
            (isNaN(rating) || rating < 0 || rating > 5)
        ) {
            return res.status(400).json({
                message: "Rating must be between 0 and 5"
            });
        }

        const { data, error } = await Salon.create({
            name: name.trim(),
            city: city.trim(),
            address: address.trim(),
            rating: rating || 0
        });

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(201).json({
            message: "Salon created successfully",
            salon: data
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const updateSalon = async (req, res) => {

    try {

        const { id } = req.params;

        const { data, error } =
            await Salon.update(id, req.body);

        if (error || !data) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        res.status(200).json({
            message: "Salon updated successfully",
            salon: data
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const deleteSalon = async (req, res) => {

    try {

        const { id } = req.params;

        const { data: existingSalon } =
            await Salon.getById(id);

        if (!existingSalon) {
            return res.status(404).json({
                message: "Salon not found"
            });
        }

        const { error } =
            await Salon.delete(id);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json({
            message: "Salon deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const getTopSalons = async (req, res) => {

    try {

        const supabase = require("../models/userModel");

        const { data, error } = await supabase
            .from("salons")
            .select("*")
            .order("rating", {
                ascending: false
            })
            .limit(5);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const getSalonsByCity = async (req, res) => {

    try {

        const { city } = req.params;

        const supabase = require("../models/userModel");

        const { data, error } = await supabase
            .from("salons")
            .select("*")
            .ilike("city", city);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getAllSalons,
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getTopSalons,
    getSalonsByCity
};