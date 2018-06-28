const confirmLogin = (req,res,next) => {
    if (req.cookies.userId) {
        next()
    } else {
        res.json({
            status: '1003',
            result: 'not login'
        })
    }
}

module.exports = confirmLogin;