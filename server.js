import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import signup from './controllers/signup.js';
import signin from './controllers/signin.js';
import image from './controllers/image.js';
import api from './controllers/api.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post('/apiCall',(req,res) => 
    api.handleApi(req, res)
);

app.put('/image',(req,res) => 
    image.handleImage(req, res, db)
);

app.post('/signin',(req,res) => 
    signin.handleSingIn(req, res, db, bcrypt)
);

app.post('/signup',(req,res) =>
    signup.handleSignUp(req, res, db, bcrypt)
);

app.listen(PORT || 3000, () => {
    console.log("Face Detect App is running");
});