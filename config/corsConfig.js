const corsConfig = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://job-portal-client-1ppa.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Accept, Authorization, Content-Type");

    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next()
}

module.exports = corsConfig;
