const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');


const app = express();


require('dotenv').config();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

const userRouter = require('./routes/user_router')
app.use('/api', userRouter);

const emailAccountRouter = require('./routes/email_accounts_router')
app.use('/api', emailAccountRouter);

const contactListRouter = require('./routes/contact_list_router')
app.use('/api', contactListRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests on " + PORT);
  })
})
