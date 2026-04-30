const fs = require("fs").promises;
const connectDB = require("../config/dbConfig");
const codingQuestions = require("../modal/codingQuestions");
const jobDetails = require("../modal/jobDetails");

const readQuestions = async () => {
    try {
        // path for debug "./server/utilities/coding-questions.txt"
        const data = await fs.readFile('./utilities/coding-questions.txt', 'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }    
}

const readJobData = async () => {
    try {
        // path for debug "./server/utilities/coding-questions.txt"
        const data = await fs.readFile('./utilities/job-details.txt', 'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }    
}

const insertQuestionsToDB = async () => {
    try {
        await connectDB();
        const questionData = await readQuestions();
        const jobData = await readJobData();
        const newData = questionData.questions.map(q => ({...q,  options: JSON.parse(q.options.replace(/'/g, '"'))}));
        if(questionData?.insert){
            await codingQuestions.deleteMany({});
            await codingQuestions.insertMany(newData);
            console.log("Coding Questions Inserted");
        }
        if(jobData?.insert){
            await jobDetails.deleteMany({});
            await jobDetails.insertMany(jobData?.jobData);
            console.log("Job Details Inserted");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = insertQuestionsToDB;