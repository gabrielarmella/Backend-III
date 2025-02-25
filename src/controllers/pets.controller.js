import { petsService } from '../services/index.js';

const getAllPets = async (req, res) => {
    try {
        const pets = await petsService.getAll();
        req.logger.info("Fetched all pets");
        res.send({ status: "success", payload: pets });
    } catch (error) {
        req.logger.error("Error fetching pets", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const getPet = async (req, res) => {
    const petId = req.params.pid;
    try {
        const pet = await petsService.getPetById(petId);
        if (!pet) {
            req.logger.warn(`Pet not found: ${petId}`);
            return res.status(404).send({ status: "error", error: "Pet not found" });
        }
        req.logger.info(`Fetched pet: ${petId}`);
        res.send({ status: "success", payload: pet });
    } catch (error) {
        req.logger.error(`Error fetching pet: ${petId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createPet = async (req, res) => {
    const { name, specie, birthDate } = req.body;
    try {
        const pet = await petsService.create({ name, specie, birthDate });
        req.logger.info("Created new pet");
        res.send({ status: "success", payload: pet });
    } catch (error) {
        req.logger.error("Error creating pet", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const updatePet = async (req, res) => {
    const petId = req.params.pid;
    const updateBody = req.body;
    try {
        const pet = await petsService.getPetById(petId);
        if (!pet) {
            req.logger.warn(`Pet not found: ${petId}`);
            return res.status(404).send({ status: "error", error: "Pet not found" });
        }
        await petsService.update(petId, updateBody);
        req.logger.info(`Updated pet: ${petId}`);
        res.send({ status: "success", message: "Pet updated" });
    } catch (error) {
        req.logger.error(`Error updating pet: ${petId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const deletePet = async (req, res) => {
    const petId = req.params.pid;
    try {
        const pet = await petsService.getPetById(petId);
        if (!pet) {
            req.logger.warn(`Pet not found: ${petId}`);
            return res.status(404).send({ status: "error", error: "Pet not found" });
        }
        await petsService.delete(petId);
        req.logger.info(`Deleted pet: ${petId}`);
        res.send({ status: "success", message: "Pet deleted" });
    } catch (error) {
        req.logger.error(`Error deleting pet: ${petId}`, error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

export default {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet
};
