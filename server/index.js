import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js' 
dotenv.config()


const app = express()

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server Runnning on PORT:${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log(err);
  })

  app.use("/api/user", userRouter)