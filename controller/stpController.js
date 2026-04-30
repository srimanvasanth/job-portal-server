const axios = require("axios");
const stpUrl = process.env.STP_URL;
const stpFlowId = process.env.STP_FLOW_ID;

const stpExecute = async (sessionId, formData) => {
    const body = {sessionId};
    if(formData && Object.keys(formData).length > 0) {
        body.formData = formData;
    }
    console.log("STP called...")

    const res = await axios.post(`${stpUrl}/api/executions/execute/${stpFlowId}`, 
        body,
        { headers: {'Content-Type': 'application/json'} }
    );

    return res.data;
}

module.exports = { stpExecute };
