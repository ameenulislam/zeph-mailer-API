const mongoose = require('mongoose');
const express = require('express');
const app = express();

const password = encodeURIComponent('eIPdm07tnXKxL3td'); // URL encode the password
const uri = 'mongodb+srv://ameenulislam4:eIPdm07tnXKxL3td@zephmailer.pycpj9a.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

const userRouter = require('./routes/users')
app.use('/users', userRouter);

const createUserRouter = require('./routes/createUser')
app.use('/addUser', createUserRouter);

app.listen(3000, ()=> console.log('server started'));
