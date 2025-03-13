const express =  require('express');
const app =  express(); 
const cors = require("cors");
const aiRoutes = require('./routes/ai.route')
app.use(express.json())
app.use(cors())

const  path = require("path");
const _dirname = path.resolve();

app.get('/', (req, res)=>{
    res.send("Hello from jahir bhai")
})

app.use(express.static(path.join(_dirname,"/frontend/dist")));

app.get('*', (_ , res)=>{
    res.sendFile(path.resolve(_dirname , "frontend" , "dist", "index.html"));
})

app.use('/ai', aiRoutes)

module.exports = app