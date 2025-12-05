import express, { NextFunction, Request, Response } from 'express'
import initDB, { pool } from './config/db'
import logger from './middlewere/logger'
import { userRoutes } from './modules/user/user.route'
import { todoRoutes } from './modules/todo/todo.route'
import { authRoutes } from './modules/auth/auth.route'

const app = express()
app.use(express.json())


initDB()

// app.use(express.urlencoded())

app.get('/', logger, (req : Request, res : Response) => {
  res.send('Hello World!!!')
})

app.use("/users", userRoutes);

app.use("/todos", todoRoutes);

app.use("/auth", authRoutes);



// unknwon routes
app.use((req,res)=>{
  res.status(404).json({
    success  : false,
    message : "Route not found",
    path : req.path
  })
})

export default app;