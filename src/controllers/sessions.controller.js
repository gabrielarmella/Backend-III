import { sessionsService } from '../services/index.js';

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await sessionsService.login(email, password);
        if (!token) {
            req.logger.warn(`Invalid login attempt for email: ${email}`);
            return res.status(401).send({ status: "error", error: "Invalid credentials" });
        }
        req.logger.info(`User logged in: ${email}`);
        res.cookie('token', token, { httpOnly: true }).send({ status: "success", message: "Logged in" });
    } catch (error) {
        req.logger.error("Error logging in", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const logout = (req, res) => {
    res.clearCookie('token').send({ status: "success", message: "Logged out" });
};

export default {
    login,
    logout
};