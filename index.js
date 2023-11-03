import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/item.js';
import morgan from 'morgan';
import { verifyToken } from './middleware/auth.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//mongodb connection
mongoose.set("strictQuery", true);
const uri = process.env.ATLAS_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DATABASE CONNECTED SUCCESFULLY");
});


//authentication Part
app.use('/auth', authRoutes);
app.use('/item', verifyToken, itemRoutes);

const port = process.env.PORT || 3001;
app.listen(port, (req, res) => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
})