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

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

const userRouter = require('./routes/users')
app.use('/users', userRouter);

const createUserRouter = require('./routes/createUser')
app.use('/addUser', createUserRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})
