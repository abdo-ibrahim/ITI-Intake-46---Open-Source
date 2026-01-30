const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require("helmet");
const { sanitizeMongoInput } = require("express-v5-mongo-sanitize");
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
require('dotenv').config();

const rateLimiter = require('./middlewares/rateLimiter');

const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const donationRouter = require("./routers/donation");
const errorHandler = require('./middlewares/errorHandler');




const app = express();

// app level middleware
app.set('trust proxy', 1);
app.use(cors()); // to allow the request from the client
app.use(express.json()); // to parse the request body
app.use(helmet());
app.use(sanitizeMongoInput);
app.use(xss());
app.use(hpp());
app.use(rateLimiter);

// routers
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/donation', donationRouter);


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
