const supabase = require("./userModel");

const Service = {

    getBySalonId: async (salonId) => {

        return await supabase
            .from("services")
            .select("*")
            .eq("salon_id", salonId);

    },

    create: async (serviceData) => {

        return await supabase
            .from("services")
            .insert([serviceData])
            .select()
            .single();

    },

    update: async (id, serviceData) => {

        return await supabase
            .from("services")
            .update(serviceData)
            .eq("id", id)
            .select()
            .single();

    },

    delete: async (id) => {

        return await supabase
            .from("services")
            .delete()
            .eq("id", id);

    },

    getAvailable: async () => {

        return await supabase
            .from("services")
            .select("*")
            .eq("is_available", true);

    }

};

module.exports = Service;