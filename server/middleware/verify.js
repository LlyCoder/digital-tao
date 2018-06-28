const jwt = require('jsonwebtoken')
const config = require('../config')

const verify = async(req, res, next) => {
    const authorization = req.get('Authorization');
    if(authorization === '') {
        res.status(401).send('there is no token detected in http header \'Authorization\'');
    }
    const token = authorization.split(' ')[1];
    console.log(`token: ${token}`);
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, config.jwt.secret);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).send('token expired');
        }
        res.status(401).send('invalid token');
    }
    console.log('validate success');
    await next();
}

module.exports = verify;