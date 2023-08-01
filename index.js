const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

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
app.use('/addEmailAccount', emailAccountRouter);

const newUserRouter = require('./routes/user_signup')
app.use('/', newUserRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})
