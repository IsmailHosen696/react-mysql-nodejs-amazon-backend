const jwt = require('jsonwebtoken');
module.exports.verifyToken = async (req, res, next) => {
    const authtoken = req.headers.token;
    const token = authtoken.split(' ')[1];
    if (token) {
        await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) return res.json({ err, auth: false });
            req.user = decoded;
            next();
        })
    } else {
        return res.json({ err: 'incorrect token ', auth: false })
    }

}