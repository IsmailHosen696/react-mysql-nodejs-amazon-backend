require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;
const authroute = require('./routes/authroute.js');



app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authroute);
app.use('/products', require('./routes/productroutes'));


app.listen(3001, () => console.log(`server started on ${port}`));