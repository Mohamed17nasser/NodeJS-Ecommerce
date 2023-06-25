const express=require('express');
const app=express();
const port=3000;
const cors = require('cors');
const morgan = require('morgan');
require('./db.js');
require('dotenv/config');

// const userRoutes=require('./Routes/userRoutes.js');

require('express-async-errors');
// const userRoutes=require('./Routes/userRoutes.js');

const productRoutes = require('./Routes/productRoutes.js');
const categoryRoutes = require('./Routes/categoryRoutes.js');
// const orderRoutes = require('./Routes/orderRoutes.js');


app.use(cors());
app.options('*', cors())


//////////////MiddleWares////////////////
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
const tokenAuth=require('./Helpers/tokenAuth.js'); //for token authentication before loggin


//////////////Routes////////////////
// app.use('/users',userRoutes);
app.use('/products', productRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/orders', tokenAuth, orderRoutes);

/* globalErrorHandling */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        staus: statusCode,
        message: err.message || 'internal server error',
        errors: err.errors || []
    })

})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
