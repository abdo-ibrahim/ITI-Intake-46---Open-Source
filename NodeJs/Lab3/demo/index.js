const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/users');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();



const app = express();

// app level middleware
app.use(express.json());
app.use(cors());

// routers
app.use('/users', userRouter);


app.use(errorHandler);


const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {
        console.log('✅✅ Connected to MongoDB');
    }).catch((err) => {
        console.log('❌❌ Connected to MongoDB');
        console.log(err);
    });
    console.log(`✅✅ Server is running on Port:${PORT}`);
});


// Cross Origin Resource Sharing (CORS)


// server to server communication