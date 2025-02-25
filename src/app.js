import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { faker } from '@faker-js/faker';
import errorHandler from './middlewares/errors.js'
import { addLogger, logger } from './utils/logger.js';
import { swaggerOptions } from './utils/swagger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import config from './config/config.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

mongoose.set('strictQuery', true);

mongoose.connect(config.mongo.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info('Connected to MongoDB');
}).catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
});
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(addLogger)
const specs = swaggerJsdoc(swaggerOptions)
app.use("/docs",swaggerUi.serve,swaggerUi.setup(specs))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);


app.get('/operacionsencilla', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    
    res.send({ sum });
});
app.get('/operacioncompleja', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({ sum });
});

app.get('/api/test/user', (req, res) => {
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    res.send({ first_name, last_name, email, password });
});

app.get("/loggertest",(req,res)=>{
    req.logger.debug("Debug message");
    req.logger.http("HTTP message");
    req.logger.info("Info message");
    req.logger.warn("Warning message");
    req.logger.error("Error message");
    req.logger.fatal("Fatal message");
    res.send("Logger test");
})

app.use(errorHandler)
app.listen(PORT,()=>logger.info(`Listening on ${PORT}`))
