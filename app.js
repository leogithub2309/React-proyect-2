import express, { query } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

import { fileURLToPath } from 'url';
import path from 'path';

import queryDB from './controllers/databaseControllers.js';

const app = express(),
    port = process.env.PORT || 3000;

const dirname = fileURLToPath(new URL('.', import.meta.url));


app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: false }));


app.get("/", queryDB.mainRoute);
app.post("/crearFactura", queryDB.agregarFactura);
app.get("/facturas", queryDB.getFacturas);

app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el http://localhost:${port}/`);
});