const express = require('express') 
const  app = express();

const connectDB = require('./db/conn')

require('dotenv').config({path: './routes/.env'})

const user = require('./routes/user')
const admin = require('./routes/admin')
//middleware
app.use(express.json());

app.use('/api/v1/user',user);
app.use('/api/v1/admin',admin);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen('8000',()=>{
            console.log("Server is listening on 8000...")
        })
    } catch (error) {
        console.log(error);
    }
}

start();