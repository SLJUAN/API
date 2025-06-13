import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

if (!process.env.DB_URL) {
    throw new Error('DB_URL is not defined in environment variables');
}

const db = new Sequelize(process.env.DB_URL, {
    models: [path.join(__dirname, '../models/*.model.{ts,js}')],
    logging: console.log
});

export default db;