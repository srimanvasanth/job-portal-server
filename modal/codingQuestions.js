const mongoose = require("mongoose");

const codingQuestionSchema = new mongoose.Schema(
    {
        quesNbr: {
            type: mongoose.Schema.Types.Number,
            required: true
        },
        question: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        options: {
            type: mongoose.Schema.Types.Array,
            required: true
        },
        answer: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    }, 
    {
        collection: "codingQuestions"
    })

module.exports = mongoose.model("codingQuestions", codingQuestionSchema);