const mongoose = require("mongoose");

const docsSchema = new mongoose.Schema(
    {
        binData: {
            type: mongoose.Schema.Types.Buffer,
            required: true
        },
        fileName: String,
        fileType: String,
        uploadedDate: Date
    }, 
    {
        collection: "docs"
    }
)

module.exports = mongoose.model("docs", docsSchema);