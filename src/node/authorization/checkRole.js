let checkRole = async (req, res, next) => {
    if (req.decoded.userRole !== "admin")
        await res.json({
            data: {
                resultCode: 1
            }
        });
    next();
};

module.exports = {
    checkRole
};