exports.logout = (req, res) => {

    res.clearCookie("tokens", {
        httpOnly: true,
        sameSite: "lax",
        secure: true
    });

    return res.status(200).json({
        msg: "Logged out successfully"
    });
};