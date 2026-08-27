const Service =
    require("../models/serviceModel");


const getSalonServices = async (req, res) => {

    try {

        const { id } = req.params;

        const { data, error } =
            await Service.getBySalonId(id);

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


const createService = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            serviceName,
            price,
            duration,
            isAvailable
        } = req.body;

        if (!serviceName || price === undefined) {
            return res.status(400).json({
                message: "serviceName and price are required"
            });
        }

        if (isNaN(price) || Number(price) < 0) {
            return res.status(400).json({
                message: "Price must be a valid positive number"
            });
        }

        const { data, error } = await Service.create({

            salon_id: id,

            service_name:
                serviceName.trim(),

            price: Number(price),

            duration: duration || "Not specified",

            is_available:
                isAvailable !== undefined
                    ? isAvailable
                    : true
        });

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(201).json({
            message: "Service added successfully",
            service: data
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const updateService = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            serviceName,
            price,
            duration,
            isAvailable
        } = req.body;

        const updateData = {};

        if (serviceName !== undefined) {
            updateData.service_name =
                serviceName.trim();
        }

        if (price !== undefined) {

            if (isNaN(price) || Number(price) < 0) {
                return res.status(400).json({
                    message: "Invalid price"
                });
            }

            updateData.price =
                Number(price);
        }

        if (duration !== undefined) {
            updateData.duration =
                duration;
        }

        if (isAvailable !== undefined) {
            updateData.is_available =
                isAvailable;
        }

        const { data, error } =
            await Service.update(id, updateData);

        if (error || !data) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service updated successfully",
            service: data
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const deleteService = async (req, res) => {

    try {

        const { id } = req.params;

        const { error } =
            await Service.delete(id);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        res.status(200).json({
            message: "Service deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


const getAvailableServices =
    async (req, res) => {

        try {

            const { data, error } =
                await Service.getAvailable();

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
    getSalonServices,
    createService,
    updateService,
    deleteService,
    getAvailableServices
};