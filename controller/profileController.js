const profileService = require("../service/profileService");
const express = require("express");
const router = express.Router();
const networkErr = require("../utilities/networkErrHandler")
const multer = require("multer");
const upload = multer();

router.post("/saveProfile", async (req, res) => {
    const reqBody = req.body;
    try {
        let data = {...reqBody, name: reqBody?.empName}
        const profileData = await profileService.saveProfileDetails(data);
        return res.status(200).send({
            status: "success",
            data: profileData
        })
    } catch (err) {
        let errMsg = networkErr.buildNetworkErrorMessage(err?.config?.baseURL || req.url, err);
        return res.status(500).send({
            status: "failure",
            errMsg: errMsg
        })
    }
})

router.post("/getAllProfiles", async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        return res.status(200).send({
            status: "success",
            data: profiles
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            data: err?.message || err || "Fetch failed, Please Try Again Later"
        })
    }
});

router.get("/getJobDetails", async (req, res) => {
    try {
        const jobData = await profileService.getJobData();
        return res.status(200).send({
            status: "success",
            data: jobData
        })
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            data: err?.message || err || "Fetch failed, Please Try Again Later"
        })
    }
});

router.post("/getProfile", async (req, res) => {
    const body = req.body;
    try {
        const experience = await profileService.getProfile(body);
        if(experience) {
            console.log(experience)
            return res.status(200).json(experience);
        }
        return res.statusCode(400);
    } catch (err) {
        console.log(err)
        return res.sendStatus(500);
    }
})

module.exports = router;

