import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo:{
        URL: process.env.MONGO_URL || 'mongodb+srv://gaboarmella:171218@cluster1.7dua5.mongodb.net/BACKEND-III'
    }
}