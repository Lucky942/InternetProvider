let checkAdminRole = async (req, res, next) => {
    if (req.decoded.userRole !== "admin")
        await res.json({
            data: {
                resultCode: 1
            }
        });
    next();
};

let checkMounterRole = async (req, res, next) => {
    if (req.decoded.userRole !== "mounter")
        await res.json({
            data: {
                resultCode: 1
            }
        });
    next();
};

module.exports = {
    checkAdminRole,
    checkMounterRole
};