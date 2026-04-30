const mongoose = require("mongoose");

const jobDetailsSchema = new mongoose.Schema(
    {
        role: String,
        company: String,
        experience: String,
        salary: String,
        location: String,
        posted: String,
        opening: Number,
        jobDesc: Array
    }, 
    {
        collection: "jobDetails"
    })

module.exports = mongoose.model("jobDetails", jobDetailsSchema);