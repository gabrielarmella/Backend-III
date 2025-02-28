import {Router} from 'express';
import {generateMockPets, generateMockUsers, createMany} from '../mocks/mockings.js';

const router = Router();

router.get("/mockingpets", async (req, res) => {
    try {
        const pets = await generateMockPets(100);
        res.send({ status: "success", payload: pets });
    } catch (error) {
        req.logger?.error('Error generating mock pets:', error);
        res.status(500).send({ status: "error", error: "Error generating mock data" });
    }
});

router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        res.send({ status: 'success', payload: users });
    } catch (error) {
        req.logger?.error('Error generating mock users:', error);
        res.status(500).send({ status: "error", error: "Error generating mock data" });
    }
});
router.post('/generateData', async (req, res) => {
    try {
        const { users = [], pets = [] } = req.body;
        
            // Validar que se recibieron números
        if (typeof users !== 'number' || typeof pets !== 'number' || users < 0 || pets < 0) {
            return res.status(400).json({ 
                status: 'error', 
                error: 'Los parámetros "users" y "pets" deben ser números positivos' 
            });
        }
        // Generar los datos mock
        const mockUsers = users > 0 ? await generateMockUsers(users) : [];
        const mockPets = pets > 0 ? await generateMockPets(pets) : [];
        
        // Guardar los datos en la base de datos
        const result = await createMany(mockUsers, mockPets);
        
        res.json({ 
            status: 'success', 
            result,
            message: `Se generaron ${result.users.created} usuarios y ${result.pets.created} mascotas correctamente`
        });
    } catch (error) {
        req.logger?.error('Error generating data:', error);
        res.status(500).json({ status: 'error', error: 'Error al generar datos: ' + error.message });
    }
});

export default router;