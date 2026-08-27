const supabase = require("./userModel");

const Salon = {

    getAll: async () => {

        return await supabase
            .from("salons")
            .select("*");

    },

    getById: async (id) => {

        return await supabase
            .from("salons")
            .select("*")
            .eq("id", id)
            .single();

    },

    create: async (salonData) => {

        return await supabase
            .from("salons")
            .insert([salonData])
            .select()
            .single();

    },

    update: async (id, salonData) => {

        return await supabase
            .from("salons")
            .update(salonData)
            .eq("id", id)
            .select()
            .single();

    },

    delete: async (id) => {

        return await supabase
            .from("salons")
            .delete()
            .eq("id", id);

    }

};

module.exports = Salon;