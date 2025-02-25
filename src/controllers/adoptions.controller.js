import { adoptionsService } from '../services/index.js';

const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await adoptionsService.getAll();
        req.logger.info("Fetched all adoptions");
        res.send({ status: "success", payload: adoptions });
    } catch (error) {
        req.logger.error("Error fetching adoptions", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const getAdoption = async (req, res) => {
    const adoptionId = req.params.aid;
    try {
        const adoption = await adoptionsService.getAdoptionById(adoptionId);
        if (!adoption) {
            req.logger.warn(`Adoption not found: ${adoptionId}`);
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }
        req.logger.info(`Fetched adoption: ${adoptionId}`);
        res.send({ status: "success", payload: adoption });
    } catch (error) {
        req.logger.error(`Error fetching adoption: ${adoptionId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createAdoption = async (req, res) => {
    const { userId, petId } = req.body;
    try {
        const adoption = await adoptionsService.create({ userId, petId });
        req.logger.info("Created new adoption");
        res.send({ status: "success", payload: adoption });
    } catch (error) {
        req.logger.error("Error creating adoption", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const updateAdoption = async (req, res) => {
    const adoptionId = req.params.aid;
    const updateBody = req.body;
    try {
        const adoption = await adoptionsService.getAdoptionById(adoptionId);
        if (!adoption) {
            req.logger.warn(`Adoption not found: ${adoptionId}`);
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }
        await adoptionsService.update(adoptionId, updateBody);
        req.logger.info(`Updated adoption: ${adoptionId}`);
        res.send({ status: "success", message: "Adoption updated" });
    } catch (error) {
        req.logger.error(`Error updating adoption: ${adoptionId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const deleteAdoption = async (req, res) => {
    const adoptionId = req.params.aid;
    try {
        const adoption = await adoptionsService.getAdoptionById(adoptionId);
        if (!adoption) {
            req.logger.warn(`Adoption not found: ${adoptionId}`);
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }
        await adoptionsService.delete(adoptionId);
        req.logger.info(`Deleted adoption: ${adoptionId}`);
        res.send({ status: "success", message: "Adoption deleted" });
    } catch (error) {
        req.logger.error(`Error deleting adoption: ${adoptionId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

export default {
    getAllAdoptions,
    getAdoption,
    createAdoption,
    updateAdoption,
    deleteAdoption
};