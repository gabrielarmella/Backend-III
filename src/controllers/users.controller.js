import { usersService } from '../services/index.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        req.logger.info("Fetched all users");
        res.render('users', { users });
    } catch (error) {
        req.logger.error("Error fetching users", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        if (!user) {
            req.logger.warn(`User not found: ${userId}`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        req.logger.info(`Fetched user: ${userId}`);
        res.send({ status: "success", payload: user });
    } catch (error) {
        req.logger.error(`Error fetching user: ${userId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const user = await usersService.create({ first_name, last_name, email, password });
        req.logger.info("Created new user");
        res.send({ status: "success", payload: user });
    } catch (error) {
        req.logger.error("Error creating user", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.uid;
    const updateBody = req.body;
    try {
        const user = await usersService.getUserById(userId);
        if (!user) {
            req.logger.warn(`User not found: ${userId}`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        const updatedUser = await usersService.update(userId, updateBody);
        req.logger.info(`Updated user: ${userId}`);
        res.send({ status: "success", payload: updatedUser });
    } catch (error) {
        req.logger.error(`Error updating user: ${userId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        if (!user) {
            req.logger.warn(`User not found: ${userId}`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        await usersService.delete(userId);
        req.logger.info(`Deleted user: ${userId}`);
        res.send({ status: "success", message: "User deleted" });
    } catch (error) {
        req.logger.error(`Error deleting user: ${userId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

export default{ 
    getAllUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
};