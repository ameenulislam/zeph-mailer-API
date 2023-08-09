const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors({origin: true, credentials: true}));

require('dotenv').config();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// const password = encodeURIComponent('eIPdm07tnXKxL3td'); 
// const uri = 'mongodb+srv://ameenulislam4:eIPdm07tnXKxL3td@zephmailer.pycpj9a.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3000
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.use(express.json());

const userRouter = require('./routes/users')
app.use('/', userRouter);

const emailAccountRouter = require('./routes/add_email_account')
app.use('/emailAccount', emailAccountRouter);

const newUserRouter = require('./routes/user_signup')
app.use('/', newUserRouter);

const leadsRouter = require('./routes/leads')
app.use('/leads', leadsRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests on " + PORT);
  })
})
