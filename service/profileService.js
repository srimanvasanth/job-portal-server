const connectDB = require("../config/dbConfig");
const stp = require("../controller/stpController");
const applicationDetails = require("../modal/applicationDetails");
const docs = require("../modal/docs");
const jobDetails = require("../modal/jobDetails");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { application } = require("express");
const upload = multer();

const saveProfileDetails = async(data) => {
    await connectDB();
    const sessionId = `sess-${uuidv4()}`;
    const count = await applicationDetails.find();
    const candidateId = `CAND-${(count).length+1}`
    const formData = {
            name: data?.name, 
            email: data?.email,
            experience: data?.experience,
            skills: data?.skills,
            sessionId,
            candidateId
        }
    const profileData = new applicationDetails(formData);
    await profileData.save();
    
    const res = await stp.stpExecute(sessionId, formData);
    res?.result && ["response", "currentStep"].map((key) => delete res?.result[key]);
    const respData = {...res?.result, candidateId: candidateId};
    return respData;
}

const getProfile = async (data) => {
    await connectDB();
    const profile = await applicationDetails.findOne({name: data?.name, email: data?.email});
    return {experience : profile?.experience} || null; 
}

const getAllProfiles = async () => {
    await connectDB();
    const profiles = await applicationDetails.find().populate("resume");
    return profiles;
}

const getJobData = async() => {
    await connectDB();
    const jobData = await jobDetails.find();
    return jobData;
}

module.exports = { saveProfileDetails, getAllProfiles, getProfile, getJobData };