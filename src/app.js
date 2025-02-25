import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import __dirname from './utils/utils.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { faker } from '@faker-js/faker';
import errorHandler from './middlewares/errors.js';
import { addLogger, logger } from './utils/logger.js';
import { generateMockPets } from './utils/mocking.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const connection = mongoose.connect(process.env.MONGO_URL);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.get('/api/test/user', (req, res) => {
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    res.send({ first_name, last_name, email, password });
});

app.get("/loggertest", (req, res) => {
    req.logger.debug("Debug message");
    req.logger.http("HTTP message");
    req.logger.info("Info message");
    req.logger.warn("Warning message");
    req.logger.error("Error message");
    req.logger.fatal("Fatal message");
    res.send("Logger test");
});

app.get("/mockingpets", (req, res) => {
    const num = parseInt(req.query.num) || 100;
    const pets = generateMockPets(num);
    res.send({ status: "success", payload: pets });
});

app.use(errorHandler);
app.listen(PORT, () => logger.info(`Running on http://localhost:${PORT}`));