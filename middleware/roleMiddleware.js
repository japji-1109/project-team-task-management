const roleMiddleware = (req, res, next) => {
    if (req.user.role !== "lead") {
        return res.status(403).json({
            message: "Only team leads are allowed to perform this action"
        });
    }
    next();
};

module.exports = roleMiddleware;