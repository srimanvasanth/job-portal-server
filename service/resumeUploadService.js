const connectDB = require("../config/dbConfig");
const applicationDetails = require("../modal/applicationDetails");
const docs = require("../modal/docs");
const stp = require("../controller/stpController");

const saveResume = async (file, candidateId, res) => {
    await connectDB();
    const candidate = await applicationDetails.findOne({candidateId});
    if(candidate?.resumeId){
        await docs.deleteOne({_id: candidate.resumeId});
    }
    const fileData = new docs({
        fileName: file?.originalname,
        fileType: file?.mimetype,
        binData: file.buffer,
        uploadedDate: new Date()
    });
    const uploadedFile = await fileData.save();
    await applicationDetails.updateOne({candidateId}, {$set: {resumeId: uploadedFile._id}});
    // const files = await docs.findOne({fileName: file.originalname});
    if(uploadedFile){
        const res = await stp.stpExecute(candidate?.sessionId, {candidateId, experience: candidate?.experience});
        if(res?.result?.type === "NAVIGATE"){
            const resp = await stp.stpExecute(candidate?.sessionId, {});
            resp?.result && ["response", "currentStep"].map((key) => delete resp?.result[key]);
            return resp?.result;
        } else if(res?.result?.type === "ABORT"){
            res?.result && ["currentStep", "response"].map((key) => delete res?.result[key]);
            return res?.result;
        }
    }
    return null;
}

const getResume = async (candidateId) => {
    await connectDB();
    const data = await applicationDetails.findOne({candidateId});
    const file = await docs.findOne({_id: data?.resumeId});
    return file;
}

const verifyResume = async (candidateId) => {
    await connectDB();
    const candidate = await applicationDetails.findOne({candidateId});
    const resume = await docs.findOne({_id: candidate.resumeId});
    const resp = {uploaded: resume ? true : false, experience: candidate?.experience, candidateId};
    return resp;
}

module.exports = { saveResume, getResume, verifyResume };