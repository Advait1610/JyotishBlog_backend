const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//rest object
const app = express();

//env config
dotenv.config();

//router import
const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

//mongoose connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

//port
const port=process.env.PORT || 8080;

//lister
app.listen(port , () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
})