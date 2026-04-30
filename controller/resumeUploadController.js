const express = require("express");
const router = express.Router();
const resumeService = require("../service/resumeUploadService");
const multer = require("multer");
const upload = multer();

router.post("/resumeUpload", upload.single("file"), async (req, res) => {
    const file = req.file;
    try {
        const body = JSON.parse(req.body?.metadata);
        const uploaded = await resumeService.saveResume(file, body?.candidateId, res);
        if(uploaded){
            return res.status(200).send({status: "success", data: uploaded});
        }
        return res.status(500).send({
            status: "failure",
            data: "Something Went Wrong"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failure",
            data: "Upload Failed!"
        })
    }
    
})

router.post("/getResume", async (req, res) => {
    try {
        const body = req.body;
        const fileData = await resumeService.getResume(body?.candidateId);
        res.setHeader("Content-Type", fileData.fileType);
        res.status(200).send(fileData.binData);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failure",
            data: "Fetch Failed!"
        })
    }
})

router.post("/verify-resume", async (req, res) => {
    try {
        const body = req.body;
        const resumeUploaded = await resumeService.verifyResume(body?.candidateId);
        if(resumeUploaded.uploaded) {
            return res.status(200).json({candidateId: resumeUploaded?.candidateId, experience: resumeUploaded.experience});
        }
        return res.status(400).json({status: "failure"});
    } catch (err) {
        res.statusCode(500);
    }    
})

module.exports = router;