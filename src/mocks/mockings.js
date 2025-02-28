import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import User from "../dao/models/User.js";
import Pet from "../dao/models/Pet.js";

export const generateMockPets = async (count) => {
    const pets = []
    const speciesList = ["dog","cat","fish"]

    for(let i=0;i<count;i++){
        pets.push({
            name:faker.person.firstName(),
            specie:faker.helpers.arrayElement(speciesList),
            birthDate:faker.date.birthdate({min:1,max:15,mode:"age"}).toISOString().split("T")[0]
        })
    }
    return pets;
};

export const generateMockUsers = async (count) => {
    const users = [];
    const roles = ['user', 'admin'];
    for (let i = 0; i < count; i++) {
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
    return users;
};


export const createMany = async (users = [], pets = []) => {
   try {
       const results = {
           users: { received: users.length, created: 0 },
           pets: { received: pets.length, created: 0 },
           errors: []
       };

       // Guardar usuarios
       if (users && users.length > 0) {
           try {
               const savedUsers = await User.insertMany(users);
               results.users.created = savedUsers.length;
           } catch (error) {
               results.errors.push({
                   entity: 'users',
                   message: error.message
               });
           }
       }

       // Guardar mascotas
       if (pets && pets.length > 0) {
           try {
               const savedPets = await Pet.insertMany(pets);
               results.pets.created = savedPets.length;
           } catch (error) {
               results.errors.push({
                   entity: 'pets',
                   message: error.message
               });
           }
       }

       return results;
   } catch (error) {
       throw new Error(`Error guardando datos mock: ${error.message}`);
   }
};