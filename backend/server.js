import express from 'express'
import cors from "cors"
import 'dotenv/config'

//app config
const app=express()
const port=process.env.PORT || 4000

//middlewares
app.use(express.json()) //req wala json object intaking
app.use(cors()) //allows frontend to connect with backend

//api endpoints

app.get('/',(req,res)=>{
res.send('API Working ')
})

app.listen(port, ()=>console.log("Server started",port)) //to start the express













