import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js' 
import authRouter from './routes/auth.route.js'
dotenv.config()

const app = express()
app.use(express.json())

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  })
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

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