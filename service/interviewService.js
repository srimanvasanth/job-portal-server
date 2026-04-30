const connectDB = require("../config/dbConfig");
const applicationDetails = require("../modal/applicationDetails");
const docs = require("../modal/docs");
const codingQuestions = require("../modal/codingQuestions");
//const hrAssessment = require("../modal/hrAssessment");
const stp = require("../controller/stpController");

const getCandidate = async (candidateId) => {
    await connectDB();
    const candidate = await applicationDetails.findOne({candidateId});
    return candidate;    
}

const getCodingQuestions = async () => {
    await connectDB();
    const questions = await codingQuestions.find({}, {quesNbr:1, question:1, options:1, _id:false});
    return questions;
}

const evaluateAnswers = async (candidateId, data) => {
    await connectDB();
    const getAnsFromDB = await codingQuestions.find({}, {quesNbr:1, answer:1, _id: false});
    let correctAns = 0;
    getAnsFromDB.map((ques) => {
        if(ques.answer === data[ques.quesNbr]){
            correctAns++;
        }
    })
    const score = correctAns/getAnsFromDB.length * 100;
    await applicationDetails.updateOne({candidateId}, {$set: {codingScore: score}});
    const candidate = await applicationDetails.findOne({candidateId});
    const res = await stp.stpExecute(candidate?.sessionId, {candidateId});
    res?.result && ["currentStep", "response"].map((key) => delete res?.result[key]);
    return res?.result;
}

const getCodingScores = async (candidateId) => {
    await connectDB();
    const candidate = await applicationDetails.findOne({candidateId});
    return {score: candidate?.codingScore};
}

const saveHrQuestions = async (data) => {
    await connectDB();
    const candidateId = await applicationDetails.findOne({candidateId:data?.candidateId});
    const finData = {
        availability: data?.availability,
        currentEmp: data?.currentEmp,
        currentRoleDesc: data?.currentRoleDesc,
        hrNotes: data?.hrNotes
    };
    const savedData = await applicationDetails.updateOne({candidateId: data?.candidateId}, {$set: {hrAssessment: finData}});
    const res = await stp.stpExecute(candidateId.sessionId, {});
    if(res?.result?.type === "NAVIGATE"){
        const resp = await stp.stpExecute(candidateId.sessionId, {});
        resp?.result && ["currentStep", "response"].map((key) => delete resp?.result[key]);
        return resp?.result;
    } else if(res?.result?.type === "ABORT"){ 
        res?.result && ["currentStep", "response"].map((key) => delete res?.result[key]);
        return res?.result;
    }
    return null;
}

const getAvailability = async (candidateId) => {
    await connectDB();
    const candidate = await applicationDetails.findOne({candidateId});
    const availability = candidate.hrAssessment.availability;
    return { availability };
}

module.exports = { getCandidate, getCodingQuestions, evaluateAnswers, getCodingScores, saveHrQuestions, getAvailability };
