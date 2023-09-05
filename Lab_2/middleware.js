function logRequest(req, res, next) {
    res.send('Request received for: ${req.method} ${req.url}');
    next();
}

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.query.apiKey;

    if (!apiKey || apiKey !== "123") {
        return res.status(401).json({ error: 'You are not Authorized' });
    }

    next();
}


module.exports = {
    logRequest,
    apiKeyMiddleware
};  