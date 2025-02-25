import {Router} from 'express';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker'; 

const router = Router();

router.get("/mockingpets",(req,res)=> {
    const pets = []
    const speciesList = ["dog","cat","fish"]

    for(let i=0;i<100;i++){
        pets.push({
            name:faker.person.firstName(),
            specie:faker.helpers.arrayElement(speciesList),
            birthDate:faker.date.birthdate({min:1,max:15,mode:"age"}).toISOString().split("T")[0]
        })
    }
    res.send({status:"success",payload:pets})
})
router.get('/mockingusers', async (req, res) => {
    const users = [];
    const roles = ['user', 'admin'];
    for (let i = 0; i < 50; i++) {
        const password = await bcrypt.hash('coder123', 10);
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: password,
            role: faker.helpers.arrayElement(roles),
            pets: []
        });
    }
    res.send({ status: 'success', payload: users });
});

/* router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;
        const result = await createMany(users, pets);
        res.json(result);
    } catch (error) {
        req.logger.error('Error generating data:', error);
        res.status(500).json({ status: 'error', error: 'Unhandled error' });
    }
}); */

export default router;