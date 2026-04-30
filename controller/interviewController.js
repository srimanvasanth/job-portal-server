const express = require("express");
const router = express.Router();
const interviewService = require("../service/interviewService");

router.post("/screening", async (req, res) => {
    const body = req.body;
    try {
        const candidate = await interviewService.getCandidate(body?.candidateId);
        if(candidate) {
            return res.status(200).json({candidateId: candidate?.candidateId, experience: candidate?.experience});
        }
        return res.statusCode(400);
    } catch (error) {
        return res.statusCode(500);
    }
})

router.get("/getCodingQuestions", async (req, res) => {
    try {
        const questions = await interviewService.getCodingQuestions();
        return res.status(200).send({status: "success", data: questions});
    } catch (err) {

        return res.status(500).send({
            status: "failure",
            errMsg: "Can't Fetch Coding Questions"
        })
    }     
});

router.post("/evaluation", async (req, res) => {
    const body = req.body;
    try {
        const result = await interviewService.evaluateAnswers(body?.candidateId, body?.answers);
        return res.status(200).send({
            staus: "success", 
            data: result
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({staus: "failure", errMsg: "Something Went Wrong!"})
    }  
})

router.post("/get-scores", async (req, res) => {
    const body = req.body;
    try {
        const score = await interviewService.getCodingScores(body?.candidateId);
        if(score){
            return res.status(200).json(score);
        }
        return res.status(400);
    } catch (err) {
        return res.status(500);
    }
})

router.post("/saveHrQuestions", async (req, res) => {
    const body = req.body;
    try {
        const savedData = await interviewService.saveHrQuestions(body);
        if(savedData){
            return res.status(200).send({
                status: "success",
                data: savedData
            })
        }
        return res.status(400).send({
            status: "failure",
            errMsg: "Something Went Wrong"
        })        
    } catch (err) {
        return res.status(500).send({
            status: "failure",
            errMsg: "Can't Save. Please Try Again!"
        })
    }
})

router.post("/get-availability", async (req, res) => {
    const body = req.body;
    try {
        const availability = await interviewService.getAvailability(body?.candidateId);
        console.log(availability)
        if(availability){
            return res.status(200).json(availability);
        }
        return res.status(400);
    } catch (err) {
        return res.status(500);
    }
})

router.get("/final-decision", (req, res) => {
    return res.status(200).send();
})

module.exports = router;
