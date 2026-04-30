const mongoose = require("mongoose");

const applicationDetailsSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        experience: {
            type: mongoose.Schema.Types.Number,
            required: true
        },
        skills: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        sessionId: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        candidateId: {
            type: String,
            required: true
        },
        codingScore: Number,
        hrAssessment: {
                        availability: String,
                        currentEmp: String,
                        currentRoleDesc: String,
                        hrNotes: String
                    },
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "docs"
        }
    }, 
    {
        collection: "applicationDetails"
    }
)

module.exports = mongoose.model("applicationDetails", applicationDetailsSchema);